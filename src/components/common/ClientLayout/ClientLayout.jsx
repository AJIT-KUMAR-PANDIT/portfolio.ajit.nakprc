"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/common/Loader/Loader";
import Dock from "@/components/common/Dock/Dock";
import { Nav } from "@/components/common/Nav/Nav";
import Lenis from "lenis";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav />
          <div className="mt-[5vmin] mb-[35vmin]">{children}</div>
          <Dock />
        </>
      )}
    </>
  );
}
