"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@components/Spinner/Spinner";
import Form from "@components/Form";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  const [submitting, setsubmitting] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromtDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);

        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Failed to load content");
      } finally {
        // Set loading to false once data is fetched (or in case of an error)
        setLoading(false);
      }
    };
    if (promptId) getPromtDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) return alert("Prompt id not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    isLoading ? (
      <Spinner />
    ) : (
    <Form
      type="Edit Post"
      desc="Edit and share amazing prompts with the world and let your imagination run wild with an AI-powered platform."
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
    )
  );
};

export default EditPrompt;
