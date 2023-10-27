"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import Spinner from "@components/Spinner/Spinner";
import AccessDenied from "@components/access-denied";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`api/users/${session?.user?.id}/posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        // Set loading to false once data is fetched (or in case of an error)
        setLoading(false);
      }
    };
    
    if (session?.user?.id) fetchPrompt();
  }, [session?.user?.id]);
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
      );
      
      if (hasConfirmed) {
        try {
          const response = await fetch(`api/prompt/${post._id}`, {
            method: "DELETE",
          });
          
          if (response.ok) {
            // Remove the deleted post from the local state
            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    };
    
    
    return isLoading ? (
      <Spinner />
  ) : (
    <div>
      <Profile
        name={session?.user?.name}
        desc="Welcome to my personalized profile"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
  if (!session) {
    return (
        <AccessDenied />
    )
  }
};

export default ProfilePage;
