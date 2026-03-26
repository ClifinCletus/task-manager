import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../utils/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ProTask | Smart Task Management",
  description: "Organize, track, and optimize your workflow with ProTask. The ultimate task manager for professionals.",
  keywords: ["task management", "productivity", "workflow", "nextjs", "redux"],
  authors: [{ name: "Antigravity AI" }],
  openGraph: {
    title: "ProTask | Smart Task Management",
    description: "Organize, track, and optimize your workflow with ProTask.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}