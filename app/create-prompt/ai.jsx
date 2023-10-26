"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PromptGenerator from "@utils/promptGenerator";
import Link from "next/link";

const AI = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const handleSubmit = async (e) => {
    // : FormEvent<HTMLFormElement>
    e.preventDefault();
    setGenerating(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await PromptGenerator(formData.get("prompt-input"));
      if (result) {
        setPost({
          ...post,
          prompt: result,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGenerating(false);
    }
  };

  const savePrompt = async (e) => {
    // : React.FormEvent
    e.preventDefault();
    setsubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">AI Generated Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        Share captivating prompts created by our AI on your chosen topics with
        the world.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            What you want to generate a prompt on
          </span>

          <input
            id="prompt-input"
            name="prompt-input"
            type="text"
            placeholder="In your words"
            required
            className="form_input "
          />
        </label>

        <div className="flex-center mx-3 mb-5 ">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm ml-8 bg-orange-500 hover:bg-orange-400 rounded-full text-white"
          >
            {generating ? "generating" : "generate"}
          </button>
        </div>
      </form>

      <form
        onSubmit={savePrompt}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-center mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm mr-8">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm ml-8 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white"
          >
            {submitting ? "creating" : "create"}
          </button>
        </div>
      </form>
      {/* <Form
                type="Create"
                desc="Create and share amazing prompts with the world and let your imagination run wild with an AI-powered platform."
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={savePrompt} /> */}
    </section>
  );
};

export default AI;
