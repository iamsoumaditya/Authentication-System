import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email } = reqBody;

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User doesnot exists" }, { status: 404 });
  }

  try {
    await sendEmail({
      username: user.username,
      email,
      emailType: "FORGET",
      userId: user._id,
    });
  } catch (error: any) {
    console.log("Error occurred", error);
    throw new Error(error.message);
  }

  return NextResponse.json({
    message: "Password reset mail sent successfully",
    success: true,
  });
}
