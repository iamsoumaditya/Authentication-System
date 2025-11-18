import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen overflow-auto">
        <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
          <ToggleTheme duration={600} animationType="round-morph" />
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-slate-50 dark:bg-black text-center">
            <h1 className="text-5xl font-extrabold text-red-700 dark:text-red-400 mb-4">
              404 - Page Not Found
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mb-6">
              Sorry, the page you're looking for doesn't exist or may have been
              moved.
            </p>
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg transition-colors duration-200"
            >
              ⟵ Go back home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
