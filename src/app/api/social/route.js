import { NextResponse } from "next/server";
import socialData from "@/config/social.json";

export async function GET() {
  return NextResponse.json(socialData);
}
