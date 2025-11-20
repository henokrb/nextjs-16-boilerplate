import React from 'react'
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
     <footer className="w-full bg-white shadow-md  dark:bg-black/50 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600" aria-label="Atlantic IT Solutions Home">
              <span className="block dark:hidden">
                <Image
                  src="/logo-mobile-light.png"
                  alt="Website logo (light theme)"
                  width={142}
                  height={40}
                  priority
                />
              </span>
              <span className="hidden dark:block">
                <Image
                  src="/logo-mobile-dark.png"
                  alt="Website logo (dark theme)"
                  width={142}
                  height={40}
                  priority
                />
              </span>
            </Link>
          </div>

          {/* Copyright Text */}
          <div> Copyright | Atlantic IT Solutions | 2025</div>
          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex">
            <Link
              href="/get-started"
              className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Email Us
            </Link>
          </div>
        </div>      

 
        </footer>
  )
}

export default Footer