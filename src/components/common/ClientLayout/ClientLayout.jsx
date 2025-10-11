"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/common/Loader/Loader";
import Dock from "@/components/common/Dock/Dock";
import { Nav } from "@/components/common/Nav/Nav";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav />
          {children}
          <Dock />
        </>
      )}
    </>
  );
}
