"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    // Fetch providers when the component mounts
    fetchProviders();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res  = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (res.ok) {
      router.push('/')
    }
  };
  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="head_text blue_gradient">Sign up an account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-cyan-600 hover:text-cyan-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full  justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="w-full mt-5 mb-5">
          <p className="text-center">or</p>
        </div>
        <div>
          {providers &&
            Object.values(providers)
              .filter((provider) => provider.name === "Google")
              .map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="outline_btn w-full"
                >
                  Sign up with Google
                </button>
              ))}
          {session?.user && router.push("/")}
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{"  "}
          <a
            href="/login"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
