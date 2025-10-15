import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = 'edge';

export async function GET() {
  //Get the path to the JSON file
  const jsonDirectory = path.join(process.cwd(), "src", "config");
  //Read the JSON file
  const fileContents = await fs.readFile(
    jsonDirectory + "/hero.json",
    "utf8"
  );
  //Return the content of the JSON file
  return NextResponse.json(JSON.parse(fileContents));
}