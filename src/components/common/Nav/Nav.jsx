import React from "react";
import Image from "next/image";

export const Nav = () => {
  return (
    <>
      <nav className="z-[999999999] fixed top-0 left-0 right-0 flex items-center sm:justify-center md:justify-center px-10 w-[100vw] ">
        <Image
          src="/ajitkumarpandit/AJITKUMARPANDIT_LOGO.png"
          alt="logo"
          width={200}
          height={100}
        />
      </nav>
    </>
  );
};
