import * as googleTTS from "google-tts-api";
import axios from "axios";
import { NextResponse } from "next/server";

async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(request) {
  try {
    const { query } = await request.json();

    // Fetch knowledge base within the request
    const origin = new URL(request.url).origin;
    const knowledgeBaseResponse = await axios.get(
      `${origin}/api/knowledge`
    );
    const knowledgeBase = JSON.stringify(knowledgeBaseResponse.data);

    const aiResponse = await run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        {
          role: "system",
          content: `This is knowledgebase of AJIT KUMAR PANDIT AUTHENTIC USE THIS KNOWLWDGE BASE TO ANSWER ALL QUESTIONS RELATED TO AJIT , AND BE CONCISE "ajit.nakprc.com" having all social connection of ajit kumar pandit his email id is" ajit@nakprc.com" ${knowledgeBase}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });

    const aiTextResponse = aiResponse.result.response; // Assuming the AI response structure

    // Replace @lobehub/tts with google-tts-api
    const ttsResults = await googleTTS.getAllAudioBase64(aiTextResponse, {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
      splitPunct: ",.?!",
    });

    // MP3 files can be concatenated by appending their buffers
    const buffers = ttsResults.map(result => Buffer.from(result.base64, 'base64'));
    const audioBuffer = Buffer.concat(buffers);
    const audioBase64 = audioBuffer.toString('base64');

    return NextResponse.json({ audioBase64, textResponse: aiTextResponse });
  } catch (error) {
    console.error("TTS API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.message, details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}
