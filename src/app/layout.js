import { Inter } from "next/font/google";
import { Providers } from "@/utils/providers";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow | Elite Task Management",
  description: "A minimalist and efficient task management solution built for modern professionals who value high-performance productivity tools.",
  keywords: ["Task Management", "Productivity", "Next.js", "Firebase", "Noir UI", "Developer Tools"],
  authors: [{ name: "Clifin Cletus", url: "https://github.com/ClifinCletus" }],
  creator: "Clifin Cletus",
  publisher: "TaskFlow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#ffffff',
                color: '#000000',
                fontSize: '0.8125rem',
                fontWeight: '800',
                borderRadius: '4px',
                padding: '12px 20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
                border: '2px solid #000000',
              },
              success: {
                style: {
                  background: '#dcfce7',
                  border: '2px solid #10b981',
                  color: '#064e3b',
                },
              },
              error: {
                style: {
                  background: '#fee2e2',
                  border: '2px solid #ef4444',
                  color: '#7f1d1d',
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}