"use client";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/lightswind/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/lightswind/card";
import { Input } from "@/src/components/lightswind/input";
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
import { TopLoader } from "@/src/components/lightswind/top-loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function ForgetPasswordPage() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onForget = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgetpassword", user);
      toast.success("Password Reset mail sent successfully");
    } catch (error: any) {
      console.log("Request failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
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
      <div className="min-h-screen flex items-center justify-center dark:bg-black bg-slate-50  p-4">
        <Card className="w-full max-w-md shadow-lg ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Forget Password</CardTitle>
            <CardDescription>
              Enter your email to get password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={buttonDisabled}
              onClick={onForget}
            >
              Forget Password
            </Button>
          </CardFooter>
          <div className="mb-2 flex justify-center">
            <Link
              href="/login"
              className="text-blue-700 dark:text-blue-500 font-semibold hover:text-black dark:hover:text-white transition duration-200"
            >
              Visit Login page
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
