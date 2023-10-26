"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import Spinner from "@components/Spinner/Spinner";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const [posts, setPosts] = useState<Array<{ _id: string }>>([]);
  const [isLoading, setLoading] = useState(true);

  const search = useSearchParams();

  const userId = params?.id;
  const name = search.get("name");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        // Set loading to false once data is fetched (or in case of an error)
        setLoading(false);
      }
    };

    if (userId) {
      fetchPost();
    }
  }, [userId]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Profile
        name={name || ""} // Use an empty string as a default when name is null
        desc={`Welcome to ${
          name || "your"
        }'s personalized profile page. Explore their
         exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
      />
    </div>
  );
};

export default ProfilePage;
