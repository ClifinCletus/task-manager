import { Inter } from "next/font/google";
import { Providers } from "@/utils/providers";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow | Elite Task Management",
  description: "Minimalist, high-performance task management for professionals.",
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
              duration: 3000,
              style: {
                background: '#09090b',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '1px solid #27272a',
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}