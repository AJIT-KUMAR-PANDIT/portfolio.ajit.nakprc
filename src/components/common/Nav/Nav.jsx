import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[999999999] flex w-full items-center justify-center px-4 pt-4">
      <div className="w-full max-w-[1440px] flex justify-start">
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/70 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4f75ff]/50 hover:bg-white/85 hover:shadow-[0_20px_50px_rgba(37,99,235,0.16)]"
          aria-label="Ajit Kumar Pandit home"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#dbeafe]/50 via-transparent to-[#cffafe]/40 opacity-80" />
          <Image
            src="/ajitkumarpandit/AJITKUMARPANDIT_LOGO.png"
            alt="Ajit Kumar Pandit logo"
            width={260}
            height={74}
            priority
            className="relative h-[52px] w-auto max-w-[240px] object-contain drop-shadow-[0_8px_18px_rgba(30,41,59,0.12)] sm:h-[60px]"
          />
        </Link>
      </div>
    </nav>
  );
};
