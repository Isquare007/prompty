import RegisterForm from "./registerForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const Register = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/')
  }
  return (
    <RegisterForm />
  )
};

export default Register;
