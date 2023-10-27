import OpenAI from "openai";


export const POST = async (req) => {
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const data = await req.json()
    const topic = JSON.stringify(data);
    try {
        const prompt =
          topic +
          `Imagine you're crafting a thought-provoking question or statement about ${topic}. Your goal is to inspire a meaningful and engaging prompt. Begin with a prompt that encourages creativity, depth, and informative responses, ensuring it's concise and specific. Please generate a prompt that fits this scenario: ${topic} approximately 5-10 lines in length. Format it to return only the prompt itself, without any additional prefix or suffix.`;
          const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
          });
          
          const response = completion.choices[0].message.content;
          
          return new Response(JSON.stringify(response), {status: 200}) ;
    } catch (error) {
        return new Response("Failed to generate prompt", {status: 500})
      }
}

