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
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, []);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        ...user,
      });
      console.log(response);
      toast.success("Password reset successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Password reset failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.confirmPassword.length > 0 && user.password.length > 0) {
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
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter new password to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
              <div className="space-y-2">
                <label
                  htmlFor="confirm password"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
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
              onClick={onReset}
            >
              Reset Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
