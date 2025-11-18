import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";
import { render } from "@react-email/components";
import { VerifyEmail, ForgotPasswordEmail } from "@/src/components/email";

const generatetemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const HashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return { unHashedToken, HashedToken, tokenExpiry };
};

const sendEmail = async (options) => {
  const { unHashedToken, HashedToken, tokenExpiry } = generatetemporaryToken();

  if (options.emailType === "VERIFY") {
    await User.findByIdAndUpdate(options.userId.toString(), {
      verifyToken: HashedToken,
      verifyTokenExpiry: tokenExpiry,
    });
  } else {
    await User.findByIdAndUpdate(options.userId.toString(), {
      forgotPasswordToken: HashedToken,
      forgotPasswordTokenExpiry: tokenExpiry,
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.YOUR_GMAIL,
      pass: process.env.YOUR_APP_PASSWORD,
    },
  });

  const emailVerifyHtml = await render(
    <VerifyEmail
      username={options.username}
      verificationUrl={`${process.env.DOMAIN}/verifyemail?token=${unHashedToken}`}
    />
  );

  const emailForgotHtml = await render(
    <ForgotPasswordEmail
      username={options.username}
      passwordResetUrl={`${process.env.DOMAIN}/resetpassword?token=${unHashedToken}`}
    />
  );

  const emailHtml =
    options.emailType === "VERIFY" ? emailVerifyHtml : emailForgotHtml;

  const mail = {
    from: process.env.YOUR_GMAIL,
    to: options.email,
    subject:
      options.emailType === "VERIFY"
        ? "Verify your email"
        : "Password reset request",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email Service failed silently.Make sure that you have provided your credentials in the .env file"
    );
    console.error("Error: ", error);
    throw new Error(error.message);
  }
};

export { sendEmail };