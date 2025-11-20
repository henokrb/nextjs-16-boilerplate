"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const ThemeToggle = dynamic(() => import("../ThemeToggle"), { ssr: false });
const Navigation = dynamic(() => import("./Navigation"), { ssr: false });

function Header() {
  return (
    <header className="w-full bg-white shadow-md dark:bg-black/50 dark:text-gray-100">
  <div className="p-0 max-w-7xl mx-auto md:px-6 md:py-4 flex items-center justify-between">
    {/* Logo Section - Left on Desktop, Centered on Mobile */}
    <div className="order-2 md:order-1 flex-1 flex justify-center md:flex-none md:justify-start"> {/* Added flex-1 and justify-center for mobile */}
      <Link href="/" aria-label="Atlantic IT Solutions Home">
        {/* Mobile Logos - Remove absolute positioning, use flex instead */}
        <div className="md:hidden">
          <div className="w-[150px] h-[40px] bg-logo-mobile-dark bg-cover bg-no-repeat dark:hidden" />
          <div className="w-[150px] h-[40px] bg-logo-mobile-light bg-cover bg-no-repeat hidden dark:block" />
        </div>

        {/* Desktop Logos - Left aligned */}
        <div className="hidden md:block">
          <div className="w-[140px] h-[40px] bg-logo-desktop-dark bg-cover bg-no-repeat dark:hidden" />
          <div className="w-[140px] h-[40px] bg-logo-desktop-light bg-cover bg-no-repeat hidden dark:block" />
        </div>
      </Link>
    </div>

    {/* Navigation Menu - Center on Desktop, Hidden on Mobile */}
    <div className="order-1 md:order-2 md:flex-1 md:flex md:justify-center">
      <Navigation />
    </div>

    {/* CTA Button (Desktop) - Right on Desktop, Theme Toggle on Mobile */}
    <div className="order-3 flex items-center gap-x-2">
      <div className="hidden md:block">
        <Link
          href="/get-started"
          className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </div>
      <div className="pr-2 md:pr-0">
        <ThemeToggle />
      </div>
    </div>
  </div>
</header>
  );
}

export default Header;
