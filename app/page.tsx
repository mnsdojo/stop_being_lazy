"use client";
import { AlertCircle, Search, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [redirectCount, setRedirectCount] = useState(3);

  const revealSecret = () => setShowSecret((prev) => !prev);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (showSecret) {
      setLoading(true);
      interval = setInterval(() => {
        setRedirectCount((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeout = setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
      setLoading(false);
      setRedirectCount(3);
    };
  }, [showSecret]);

  return (
    <div className="min-h-dvh flex bg-gradient-to-b from-gray-100 to-gray-200 items-center justify-center p-4">
      <div className="container px-4 mx-auto w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl mb-2 tracking-tight font-extrabold text-red-600">
          Stop Being Lazy!
        </h1>
        <p className="mb-2 text-gray-700">I know that's un🐾sible </p> ( ≧ᗜ≦)
        <p className="text-gray-700 mb-8 text-xl">
          Butt You can do much better... maybe... if you try... eventually...
        </p>
        <Image
          src="/lazycat.gif"
          unoptimized
          className="rounded-lg shadow-md mb-6 mx-auto"
          alt="Lazy cat gif"
          width={500}
          height={300}
        />
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning: Extreme Laziness Detected!</AlertTitle>
          <AlertDescription>
            This website is for developers who ask questions without any effort.
            Proceed with caution (or don&apos;t, we know you&apos;re too lazy to
            care). 😳
          </AlertDescription>
        </Alert>
        <div className="mt-10 p-6 ">
          <h2 className="text-2xl font-bold mb-4">
            Wanna know the secret to solving most of your problems?
          </h2>
          <Button
            variant="destructive"
            onClick={revealSecret}
            className="transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {showSecret
              ? "Hide the obvious"
              : "Reveal the mystery (if you dare) 😱"}
          </Button>
          {showSecret && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-xl font-semibold mb-2">
                The ultimate secret is...
              </p>
              {loading ? (
                <div>
                  <p className="text-lg">
                    <span className="animate-pulse">
                      Preparing to blow your mind in {redirectCount}...
                    </span>
                  </p>
                  <Coffee className="animate-spin mx-auto mt-2" />
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
                  <Search className="w-8 h-8" />
                  <span>Google It!</span>
                </div>
              )}
              <p className="mt-2 text-gray-600">
                (But let&apos;s be honest, you&apos;ll probably just ask ChatGPT
                instead)
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Remember: The easiest way to solve a problem is to let someone else do
          it for you. That&apos;s the true spirit of a lazy developer! or just
          use chatgpt lol to guide you 🤭
        </div>
      </div>
    </div>
  );
}
