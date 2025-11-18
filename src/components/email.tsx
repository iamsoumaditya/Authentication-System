import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from "@react-email/components";

export function VerifyEmail(props: any) {
  const { username, verificationUrl } = props;
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to our app!</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Text style={{ fontSize: "16px" }}>Hi {username},</Text>
          <Text style={{ fontSize: "16px" }}>
            Welcome to our app! We're thrilled to have you join our community.
          </Text>
          <Text style={{ fontSize: "16px" }}>
            To complete your registration and verify your account, please click
            the button below.
          </Text>
          <Button
            href={verificationUrl}
            style={{
              backgroundColor: "#22BC66",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Verify Your Email
          </Button>
          <Text style={{ fontSize: "16px" }}>
            Curious how this full-stack authentication system works under the
            hood? Click the button below to explore the implementation on our
            GitHub or reply to this email for guidance.
          </Text>
          <Button
            href="https://github.com/iamsoumaditya/Authentication-System"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Explore now
          </Button>

          <Text style={{ fontSize: "16px", marginTop: "20px" }}>
            Need help or have questions? Just reply to this email — we're happy
            to assist.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function ForgotPasswordEmail(props:any) {
    const { username, passwordResetUrl } = props;
  return (
    <Html>
      <Head />
      <Preview>Password reset request</Preview>
      <Body
        style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}
      >
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Text style={{ fontSize: "16px" }}>Hi {username},</Text>
          <Text style={{ fontSize: "16px" }}>
            We received a request to reset the password of your account.
          </Text>
          <Text style={{ fontSize: "16px" }}>
            To reset your password, please click the button below:
          </Text>
          <Button
            href={passwordResetUrl}
            style={{
              backgroundColor: "#22BC66",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Reset Password
          </Button>
          <Text style={{ fontSize: "16px", marginTop: "20px" }}>
            Need help or have questions? Just reply to this email — we'd love to
            help.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
