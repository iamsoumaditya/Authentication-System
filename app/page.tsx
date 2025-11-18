import Image from "next/image";
import { ToggleTheme } from "@/src/components/ui/toggle-theme";
export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black ">
      <ToggleTheme duration={600} animationType="round-morph" />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              To get started, Sign up with us.
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a full stack auth system? This is the one{" "}
              <a
                href={process.env.DOMAIN}
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Live Link
              </a>{" "}
              or the{" "}
              <a
                href="https://github.com/iamsoumaditya"
                target="_blank"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Github
              </a>{" "}
              Profile.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 transition-colors dark:bg-white text-white dark:text-black md:w-[158px]"
              href={`${process.env.DOMAIN}/signup`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Sign Up
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 dark:text-white px-5 transition-colors dark:border-white/[.145] md:w-[158px]"
              href={`${process.env.DOMAIN}/login`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Log in
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
