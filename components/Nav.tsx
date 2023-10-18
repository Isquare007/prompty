"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();

  const pathname = usePathname();


  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="product logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompty</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image as string}
                width={37}
                height={37}
                className="rounded-full"
                alt="user image"
              />
            </Link>
          </div>
        ) : pathname === "/login" || pathname === '/register' ? (
          <></>
        ) : (
          <div className="flex">
          <Link className="black_btn mr-2" href="/login">
            Sign In
          </Link>
          <Link className="outline_btn ml-2" href="/register">
          Sign Up
        </Link>
        </div>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image as string}
              width={37}
              height={37}
              className="rounded-full"
              alt="user image"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
