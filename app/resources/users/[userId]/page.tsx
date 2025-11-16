import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Details | NextJS 16 Boilerplate",
  description: "This is our user details Page",
  keywords: ["user details", "NextJS", "Test App"],
};

async function fetchUserData(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if(!response.ok) {
    // 
    return null;
  }
  const user = await response.json()
  return user;
}

export default async function UserPage({ params,}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await fetchUserData(userId);
  
  if (!user) {
    return <div>User not found</div>;
    // notFound()
  }
   
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
    User Details
  </h2>

  <div className="space-y-2 text-gray-700">
    <p>
      <strong className="text-gray-900">Name:</strong> {user.name}
    </p>
    <p>
      <strong className="text-gray-900">Username:</strong> {user.username}
    </p>
    <p>
      <strong className="text-gray-900">Email:</strong> {user.email}
    </p>
    <p>
      <strong className="text-gray-900">Phone:</strong> {user.phone}
    </p>
    <p>
      <strong className="text-gray-900">Website:</strong> {user.website}
    </p>
    <p>
      <strong className="text-gray-900">Company:</strong> {user.company.name}
    </p>
    <p>
      <strong className="text-gray-900">Address:</strong>{" "}
      {user.address.street}, {user.address.suite}, {user.address.city},{" "}
      {user.address.zipcode}
    </p>
  </div>
</div>
    
  )
}

