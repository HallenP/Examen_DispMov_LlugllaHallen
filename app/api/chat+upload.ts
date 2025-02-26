import { openai } from '@ai-sdk/openai';
import { readFile } from 'fs/promises';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return new Response('No se proporcionó un archivo', { status: 400 });

  const textContent = await file.text();

  const messages = [{ role: 'system', content: `Este es el contenido del archivo:\n${textContent}` }];

  return new Response(JSON.stringify({ success: true, message: 'Archivo procesado', messages }));
}