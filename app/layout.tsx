import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { BotIcon } from "lucide-react";
import { GitHub, Ollama } from "@/components/icons";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://models.raulcarini.dev"),
  title: "AI Models | An Open-Source Database of AI Models",
  description:
    "Explore, compare, and discover AI models from providers like OpenAI, Google, Anthropic, Mistral, and more. A comprehensive, open-source database with a modern interface.",
  authors: [{ name: "Raul Carini", url: "https://www.raulcarini.dev" }],
  openGraph: {
    url: new URL("https://models.raulcarini.dev"),
    siteName: "AI Models",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Models",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <div className="bg-sidebar m-2 p-2 rounded-xl space-y-2 min-h-[calc(100vh-1rem)]">
            <header className="flex items-center justify-between gap-3 pl-2">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <BotIcon className="size-4" />
                  <h1 className="font-bold text-sm">AI MODELS</h1>
                </Link>
                <Separator
                  orientation="vertical"
                  className="!h-4 hidden md:block"
                />
                <p className="text-muted-foreground hidden md:block line-clamp-1 text-xs">
                  An open-source database of AI models
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="size-8"
                  >
                    <Link href="/ollama" aria-label="Ollama Models">
                      <Ollama />
                    </Link>
                  </Button>
                  <Separator
                    orientation="vertical"
                    className="!h-4 hidden md:block"
                  />
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="size-8"
                  >
                    <a
                      href="https://github.com/R4ULtv/ai-models"
                      aria-label="Github Repo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHub />
                    </a>
                  </Button>
                </div>
                <Suspense fallback={<div className="w-[241px] h-8" />}>
                  <SearchInput />
                </Suspense>
              </div>
            </header>
            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
