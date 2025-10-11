import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const socialPath = path.join(process.cwd(), 'src', 'config', 'social.json');
  const socialData = await fs.readFile(socialPath, 'utf8');

  return new Response(socialData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}