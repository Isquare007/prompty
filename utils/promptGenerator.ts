const openai = require("openai"); // Import the OpenAI library

interface ChatResponse {
  role: string;
  content: string;
}

interface ChatCompletion {
  model: string;
  messages: ChatResponse[];
}

const PromptGenerator = async (topic: string): Promise<string> => {

  const prompt =
    topic +
    `Imagine you're crafting a thought-provoking question or statement about ${topic}. Your goal is to inspire a meaningful and engaging prompt. Begin with a prompt that encourages creativity, depth, and informative responses, ensuring it's concise and specific. Please generate a prompt that fits this scenario: ${topic} approximately 5-10 lines in length. Format it to return only the prompt itself, without any additional prefix or suffix.`;

  // Set your OpenAI API key
  openai.api_key = process.env.OPENAI;

  // Use OpenAI to generate information based on the prompt
  const completion: openai.ChatCompletion = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  };

  try {
    const response = await openai.ChatCompletion.create(completion);

    const chatResponse: string = response.choices[0].message.content;
    console.log(chatResponse);
    return chatResponse;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

export default PromptGenerator;
