"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center px-6">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, we couldn’t find the page you were looking for.  
        It might have been removed, renamed, or doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
      >
        Go back home
      </Link>

      <p className="mt-10 text-sm text-gray-400">
        <span className="font-mono">Error Code:</span> 404_NOT_FOUND
      </p>
    </main>
  );
}
