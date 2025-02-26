import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  // ✅ Mensaje de sistema para que el chatbot actúe como juez
  const systemMessage = {
    role: 'system',
    content:
      'Eres un analista de datos del cne y experto en decir cual va liderando las encuestas entre luisa y noboa, puedes dar un porcentaje de cual va a ganar la elecciones. Evalúa el contexto',
  };

  // ✅ Asegura que el primer mensaje sea siempre el del juez
  const updatedMessages = [systemMessage, ...messages];

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: updatedMessages,
  });

  return result.toDataStreamResponse();
}

