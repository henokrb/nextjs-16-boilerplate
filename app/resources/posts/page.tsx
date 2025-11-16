import React from 'react'
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postst List | NextJS 16 Boilerplate",
  description: "This is a Post's list Page",
  keywords: ["posts", "NextJS", "Test App"],
};

export default async function Posts() {
const response = await fetch('https://jsonplaceholder.typicode.com/posts')
const posts = await response.json()

  return (
    <div className="p-6">
      <h5 className="text-2xl font-semibold mb-4">Post List</h5>
      <ul className="space-y-3">
        {posts.map((post: { id: number; title: string }) => (
          <li
            key={post.id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <Link
              href={`/resources/posts/${post.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
   
  )
}

