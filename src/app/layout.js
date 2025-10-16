import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "@/styles/globals.scss";
import ClientLayout from "@/components/common/ClientLayout/ClientLayout";
import LaserPointer from "@/components/common/LaserPointer/LaserPointer";
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
    "AJIT KUMAR PANDIT is A Full Stack Web Developer! Welcome to the digital world of Ajit Kumar Pandit! Ajit is a passionate Full Stack Web Developer known for crafting innovative and user-friendly web applications. With a unique blend of creativity and technical expertise, he dedicates himself to building digital solutions that not only meet the client's needs but also exceed expectations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SchemaMarkupAjitKumarPandit />
        <ThemeProvider attribute="class">
          <ClientLayout>{children}</ClientLayout>
          <LaserPointer />
        </ThemeProvider>
      </body>
    </html>
  );
}
