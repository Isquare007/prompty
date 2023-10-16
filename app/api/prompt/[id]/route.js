import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt, { status: 200 }));
  } catch (error) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const currentPrompt = await Prompt.findById(params.id);

    if (!currentPrompt)
      return new Response("Prompt not found", { status: 404 });

    currentPrompt.prompt = prompt;
    currentPrompt.tag = tag;


    await currentPrompt.save();

    return new Response(JSON.stringify(currentPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndRemove(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
