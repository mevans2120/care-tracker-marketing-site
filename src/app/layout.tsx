import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Pal - Recovery is hard enough. Your care plan shouldn't be.",
  description:
    "Post Pal transforms your hospital discharge instructions into a simple, day-by-day recovery timeline. Powered by AI. Guided by your doctor's instructions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
