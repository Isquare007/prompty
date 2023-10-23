import { NextResponse } from "next/server";
import User from "@models/user";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    let { username, email, password } = await req.json();

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      username.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    password = await hash(password, 10);
    
    const user =  User.create({
      email,
      username,
      image: 'https://uploads-ssl.webflow.com/64589a6828a7f325a8221e67/6536674bb4530e2e5016022f_icon2use.jpg',
      password,
    });

    return user;
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
