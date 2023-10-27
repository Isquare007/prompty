import OpenAI from "openai";

async function PromptGenerator(topic: string): Promise<string> {
  const openai = new OpenAI();
  const prompt =
    topic +
    `Imagine you're crafting a thought-provoking question or statement about ${topic}. Your goal is to inspire a meaningful and engaging prompt. Begin with a prompt that encourages creativity, depth, and informative responses, ensuring it's concise and specific. Please generate a prompt that fits this scenario: ${topic} approximately 5-10 lines in length. Format it to return only the prompt itself, without any additional prefix or suffix.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const response: string = completion.choices[0].message.content!;

  return response;
}

export default PromptGenerator;
