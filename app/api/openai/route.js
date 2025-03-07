import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export async function POST(req) {
    
    try {
        const { prompt } = await req.json();

        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful assistant who tells great, funny jokes and do not repeat the question."
                },
                {
                    "role": "system",
                    "content": prompt,
                }
            ],
            stream: true,
            max_tokens: 300,
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await(const chunk of res)  {
                    controller.enqueue(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""))
                }
                controller.close();
            }
        })

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain"
            }
        })
    } catch(e) {
        console.log("error getting OpenAI prompts");
    }
}