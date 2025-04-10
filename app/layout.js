import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import IndianFlag from "@/components/IndianFlag";
import { ThemeProvider } from "@/providers/theme-provider";
import Link from "next/link";

export const metadata = {
  title: "Paisa",
  description: "One stop Finance Platform",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      navigation={{
        afterSignIn: "/dashboard",
        afterSignUp: "/dashboard" 
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-sans">
          <ThemeProvider>
            <Header />
            <main className="min-h-screen pt-20 md:pt-24">{children}</main>
            <Toaster richColors />

            <footer className="py-6 md:py-4 border-t">
              <div className="container flex justify-center items-center">
                <p className="text-muted-foreground font-medium">
                  Made by{" "}
                  <Link 
                    href="https://github.com/Pateriya27" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline transition-all"
                  >
                    Pateriya 27
                  </Link>{" "}
                  <span className="ml-1">
                    <IndianFlag className="inline-block ml-1 h-4 w-6 align-text-bottom" />
                  </span>
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
