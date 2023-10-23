// auth.js

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/db";
import User from "@models/user";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectToDB();

        if (email.trim().length === 0 || password.trim().length === 0) {
          return NextResponse.json(
            { message: "Invalid input data" },
            { status: 400 }
          );
        }

        const user = await User.findOne({
          email: email,
        });
        if (!user) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 403 }
          );
        }

        const rightUser = await compare(password, user.password);
        
        if (rightUser) {
          return {
            id: user._id,
            email: user.email,
            username: user.username,
            image: user.image,
          };
        } else {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 400 }
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.name = sessionUser.username
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDB();

          const userExist = await User.findOne({
            email: profile.email,
          });

          if (!userExist) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return user
    },
  },
});

export { handler as GET, handler as POST };
