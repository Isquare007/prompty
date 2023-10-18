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
    
    const user = new User({
      email,
      username,
      password,
    });

    await user.save();

    
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" });
}
