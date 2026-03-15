import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <>
      <nav className="z-[999999999] fixed top-0 left-0 right-0 flex items-center justify-center w-[100vw] ">
        <Link href="/" className="backdrop-blur-md w-[100vw] bg-black-50">
          <Image
            src="/ajitkumarpandit/AJITKUMARPANDIT_LOGO.png"
            alt="logo"
            width={200}
            height={100}
            className="w-[200px] h-[79px] object-cover"
          />
        </Link>
      </nav>
    </>
  );
};
