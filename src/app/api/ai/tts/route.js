import { EdgeSpeechTTS } from "@lobehub/tts";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
  try {
    const { query } = await request.json();
    const tts = new EdgeSpeechTTS();
    const audio = await tts.create({
      input: query,
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
