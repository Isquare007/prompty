"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const HumanPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent) => {
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
    <Form
      type="Create"
      desc="Create and share amazing prompts with the world and let your imagination run wild with an AI-powered platform."
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default HumanPrompt;
