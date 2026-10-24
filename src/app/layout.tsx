import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Study Maze | Study. Play. Compete. Earn.";
const description = "Study Maze brings studying, learning games, class challenges, AI support and rewards together in one connected learning experience.";
// Vercel supplies the real hostname. Local builds do not invent a public domain.
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const metadataBase = deploymentHost ? new URL(`https://${deploymentHost}`) : undefined;

export const metadata: Metadata = {
  title,
  description,
  metadataBase,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Study Maze",
    ...(metadataBase ? { images: [{ url: "/artwork/game-maze-runner.png", width: 800, height: 800, alt: "Study Maze robot exploring a violet maze with golden coins." }] } : {}),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
