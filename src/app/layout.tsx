import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuthProvider } from "@/context/auth-context";
import { ToastProvider } from "@/context/toast-context";
import { Metadata } from "next";
import PWAInstallBanner from "@/components/pwa-install-banner";

// Definir metadatos para la aplicación
export const metadata: Metadata = {
  title: "Fireplay - Tu tienda de videojuegos",
  description: "Compra tus videojuegos favoritos para PC y consolas",
  manifest: "/manifest.json",
  themeColor: "#1d4ed8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fireplay"
  },
};

export default function RootLayout({ children }: { children: ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-white text-black">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <PWAInstallBanner />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}