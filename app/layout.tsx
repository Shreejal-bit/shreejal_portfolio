import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | UI/UX Designer",
  description: "Creative UI/UX Designer with expertise in Figma, Canva, and modern web technologies. Former intern at Gecko Works Nepal.",
  icons: {
    icon: "logo.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-foreground`}
      >
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 15, 0.95)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
