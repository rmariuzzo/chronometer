import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";

import "./layout.css";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chronometer",
  description: "Chronometer web app. No ads. Simple.",
  applicationName: "Chronometer",
  authors: [{ name: "Rubens Mariuzzo", url: "https://github.com/rmariuzzo" }],
  keywords: [
    "chronometer",
    "app",
    "free",
    "simple",
    "no ads",
    "tool",
    "online",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>{children}</body>
    </html>
  );
}
