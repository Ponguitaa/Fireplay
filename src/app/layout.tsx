import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({ children }: { children: ReactNode
}) {
 return (
 <html lang="es">
 <body className="bg-white text-black">
   <AuthProvider>
     <Header />
     <main className="min-h-screen">{children}</main>
     <Footer />
   </AuthProvider>
 </body>
 </html>
 );
}