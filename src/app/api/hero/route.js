import { NextResponse } from "next/server";
import heroData from "../../../config/hero.json";

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(heroData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}