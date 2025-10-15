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
  title: "AJIT KUMAR PANDIT | Portfolio",
  description:
    "AJIT KUMAR PANDIT | Portfolio |Full Stack Web Developer | Web Developer | React.js | Next.js | Node.js | Express.js | MongoDB | Mongoose | HTML | CSS | JavaScript | TypeScript | SCSS | Tailwind CSS | Git | GitHub | Netlify | Vercel | Cloudflare Workers | Cloudflare Pages | Cloudflare D1 | Cloudflare KV | Cloudflare R2 | Cloudflare AI | Cloudflare Workers AI | Cloudflare Workers KV | Cloudflare Workers R2 | Cloudflare Workers AI R2",
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
