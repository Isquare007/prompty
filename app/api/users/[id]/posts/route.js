import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const userId = params.id
    
    const prompts = await Prompt.find({
        creator: userId
    }).populate("creator");

    return new Response(JSON.stringify(prompts, { status: 200 }));
  } catch (error) {
    return new Response("Failed to get user", { status: 500 });
  }
};
