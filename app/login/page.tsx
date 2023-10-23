import { getServerSession } from "next-auth";
import LoginForm from "./loginForm";
import { redirect } from "next/navigation";

const authSignIn = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/')
  }
  return (
    <LoginForm />
  )
  };

export default authSignIn;
