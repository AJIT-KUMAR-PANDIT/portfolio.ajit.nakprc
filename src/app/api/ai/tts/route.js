import { EdgeSpeechTTS } from "@lobehub/tts";
import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "edge";

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
    const knowledgeBaseResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/knowledge`);
    const knowledgeBase = JSON.stringify(knowledgeBaseResponse.data);

    const aiResponse = await run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        {
          role: "system",
          content: `This is knowledgebase of AJIT KUMAR PANDIT AUTHENTIC USE THIS KNOWLWDGE BASE TO ANSWER ALL QUESTIONS RELATED TO AJIT , AND BE CONCISE ${knowledgeBase}`,
        },
        {
          role: "user",
          content: `ANSWER QUESTIOS REALATED TO AJIT KUMAR PANDITE IN CONCISE ${query}`,
        },
      ],
    });

    const aiTextResponse = aiResponse.result.response; // Assuming the AI response structure

    const tts = new EdgeSpeechTTS();
    const audio = await tts.create({
      input: aiTextResponse,
      options: {
        voice: "en-US-GuyNeural",
      },
    });
    const audioBuffer = Buffer.from(await audio.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");
    return NextResponse.json({ audioBase64 });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
