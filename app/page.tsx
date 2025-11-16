import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | NextJS 16 Boilerplate",
  description: "This is our home Page",
  keywords: ["Contact", "NextJS", "Test App"],
};

export default function Home() {
  return (
    <div className="bdark:bg-black">Home...</div>
  )
}
