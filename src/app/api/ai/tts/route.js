
import { Buffer } from "node:buffer";
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
    const origin = new URL(request.url).origin;
    const knowledgeBaseResponse = await fetch(`${origin}/api/knowledge`);
    if (!knowledgeBaseResponse.ok) {
        throw new Error(`Failed to fetch knowledge base: ${knowledgeBaseResponse.statusText}`);
    }
    const knowledgeBaseData = await knowledgeBaseResponse.json();
    const knowledgeBase = JSON.stringify(knowledgeBaseData);

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

    // Limit text length to avoid 400 Bad Request from simple TTS endpoints (200 char max usually)
    const truncatedText = aiTextResponse.substring(0, 200);

    // Fetch TTS audio directly using native fetch a stable, tokenless endpoint
    const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      truncatedText
    )}&tl=en&client=tw-ob`;
    const ttsResponse = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text().catch(() => "");
      throw new Error(`TTS Fetch Failed: ${ttsResponse.status} ${ttsResponse.statusText} - ${errText}`);
    }

    const arrayBuffer = await ttsResponse.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const audioBase64 = audioBuffer.toString("base64");

    return NextResponse.json({ audioBase64, textResponse: aiTextResponse });
  } catch (error) {
    console.error("TTS API error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
