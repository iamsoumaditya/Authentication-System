"use client";
import { DynamicNavigation } from "@/src/components/lightswind/dynamic-navigation";
import { Home, Info, LogOut, UserStar } from "lucide-react";
import TerminalCard from "@/src/components/ui/terminal-card";
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { use } from "react";
import { useRouter } from "next/navigation";

const links = [
  { id: "profile", label: "Profile", href: "/profile", icon: <UserStar /> },
  { id: "home", label: "Home", href: "/", icon: <Home /> },
  { id: "about", label: "About", href: "/about", icon: <Info /> },
  { id: "logout", label: "Logout", href: "/logout", icon: <LogOut /> },
];

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
      <Toaster
        toastOptions={{
          style: {
            background: isDark ? "#363636" : "#fff",
            color: isDark ? "#fff" : "#363636",
          },
        }}
      />
      <DynamicNavigation
        className="dark:bg-black"
        links={links}
        glowIntensity={5}
        onLinkClick={(href) => {
          if (href !== "/logout") {
            router.push(href);
          } else {
            logout();
          }
        }}
      />
      <ToggleTheme duration={600} animationType="round-morph" />
      <div className="min-h-screen flex flex-col gap-9 items-center justify-center dark:bg-black bg-slate-50  p-4">
        <TerminalCard command={`npm welcomes ${username}`} language="bash" />;
      </div>
    </div>
  );
}
