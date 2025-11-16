import React from 'react'
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users List | NextJS 16 Boilerplate",
  description: "This is a User's list Page",
  keywords: ["users", "NextJS", "Test App"],
};

export default async function Users() {
const response = await fetch('https://jsonplaceholder.typicode.com/users')
const users = await response.json()

  return (
    <div className="p-6">
      <h5 className="text-2xl font-semibold mb-4">User List</h5>
      <ul className="space-y-3">
        {users.map((user: { id: number; name: string }) => (
          <li
            key={user.id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <Link
              href={`/resources/users/${user.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
   
  )
}

