"use client";
import ParticlesBackground from "@/src/components/ui/particles-background";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
import { TopLoader } from "@/src/components/lightswind/top-loader";
import { TypingText } from "@/src/components/ui/typing-text";
import { toast, Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
        toast.success("Email verified")
    } catch (error: any) {
        setError(true);
        toast.error(error.message)
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setLoading(true);
      verifyUserEmail();
      setLoading(false);
    }
  }, [token]);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
        <ParticlesBackground />
        <ToggleTheme duration={600} animationType="round-morph" />
        <Toaster
          toastOptions={{
            style: {
              background: isDark ? "#363636" : "#fff",
              color: isDark ? "#fff" : "#363636",
            },
          }}
        />
        <TopLoader isLoading={loading} />
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-50 dark:bg-black">
          <TypingText
            delay={0.5}
            duration={2}
            fontSize="text-5xl"
            fontWeight="font-extrabold"
            color="text-gray-800 dark:text-gray-100"
            letterSpacing="tracking-wider"
            align="center"
          >
            Verify Email
          </TypingText>
          {verified && (
            <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-50 dark:bg-black rounded-xl">
              <TypingText
                delay={0.5}
                duration={2}
                fontSize="text-2xl"
                fontWeight="font-extrabold"
                color="text-green-800 dark:text-green-400"
                letterSpacing="tracking-wider"
                align="center"
              >
                Email verified
              </TypingText>
              <Link
                href="/login"
                className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Visit for log in
              </Link>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-50 dark:bg-black rounded-xl">
              <TypingText
                delay={0.5}
                duration={2}
                fontSize="text-2xl"
                fontWeight="font-extrabold"
                color="text-red-700 dark:text-red-400"
                letterSpacing="tracking-wider"
                align="center"
              >
                Error occurred
              </TypingText>
            </div>
          )}
        </div>
      </div>
    );
}
