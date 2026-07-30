import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "@/styles/globals.scss";
import ClientLayout from "@/components/common/ClientLayout/ClientLayout";
import SchemaMarkupAjitKumarPandit from "../../schema/SchemaMarkupAjitKumarPandit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AJIT KUMAR PANDIT :::=> A Full Stack Web Developer",
  description:
    "AJIT KUMAR PANDIT is A Full Stack Web Developer! Welcome to the digital world of Ajit Kumar Pandit!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SchemaMarkupAjitKumarPandit />
        <ThemeProvider attribute="class" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
