import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const  AccessDenied = () => {
    const router = useRouter();

  useEffect(() => {
    const delay = 3000; 

    const timeoutId = setTimeout(() => {
      router.push('/login'); 
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <>
      <h1 className="head_text">Access Denied</h1>
      <p>
        <a
          href="/"
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  )
}

export default AccessDenied