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
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast,Toaster } from "react-hot-toast";
import { TopLoader } from "@/src/components/lightswind/top-loader";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Successfully signed up & verify mail have been sent.");
      router.push("/login");
    } catch (error: any) {
      toast.error("Error occurred");
      console.log("SignUp failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
      <TopLoader isLoading={loading} />
      <Toaster
        toastOptions={{
          style: {
            background: isDark ? "#363636" : "#fff",
            color: isDark ? "#fff" : "#363636",
          },
        }}
      />
      <ToggleTheme duration={600} animationType="round-morph" />
      <div className="min-h-screen flex items-center justify-center dark:bg-black bg-slate-50  p-4">
        <Card className="w-full max-w-md shadow-lg ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your credentials to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  username
                </label>
                <Input
                  id="username"
                  type="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="somu"
                />
              </div>
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
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={onSignup}
              disabled={buttonDisabled}
            >
              Sign Up
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
