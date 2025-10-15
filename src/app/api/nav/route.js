import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'edge';

export async function GET() {
  const navPath = path.join(process.cwd(), 'src', 'config', 'nav.json');
  const navData = await fs.readFile(navPath, 'utf8');

  return new Response(navData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}