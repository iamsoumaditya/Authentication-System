"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
import { TopLoader } from "@/src/components/lightswind/top-loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/lightswind/card";
import { Button } from "@/src/components/lightswind/button";
import { toast, Toaster } from "react-hot-toast";

export default function ProfilePage() {

  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "Username",
  });
  const [loading, setLoading] = useState(false);
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const getUserDetails = async () => {
    setLoading(true)
    const res = await axios.get("/api/users/me")
    setData(res.data.data)
    setLoading(false)
  }
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
      <Card>
        <CardHeader>
          <Link href={`/profile/${data.username}`}>
            <CardTitle>{data.username}</CardTitle>
          </Link>
          <CardDescription>Email :- {data.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            An inquisitive and reflective soul, always eager to explore new
            ideas, unravel challenges, and bring order to complexity. Finds joy
            in clarity, thrives on creativity, and cherishes conversations that
            spark insight and connection.
          </p>
          <p className="py-2 text-gray-700 dark:text-gray-300 text-base font-medium tracking-wide">
            Instruction: To view a personalized profile, simply click on the
            username.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={getUserDetails}>Get Me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
  