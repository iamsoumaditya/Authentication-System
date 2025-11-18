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

export default function LoginPage() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successfull");
      router.push(`/profile/${response.data.data.username}`);
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
            <CardTitle className="text-2xl font-bold">Log in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
              disabled={buttonDisabled}
              onClick={onLogin}
            >
              Log in
            </Button>
          </CardFooter>
          <div className="mb-3 mx-6 flex justify-end">
            <Link
              href="/forgetpassword"
              className="text-black dark:text-white dark:hover:text-slate-200 hover:text-gray-600 transition duration-200"
            >
              forget password?
            </Link>
          </div>
          <div className="mb-2 flex justify-center">
            <Link
              href="/signup"
              className="text-blue-700 dark:text-blue-500 font-semibold hover:text-black dark:hover:text-white transition duration-200"
            >
              Visit Signup page
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
