import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Details | NextJS 16 Boilerplatet",
  description: "This is our post details Page",
  keywords: ["post details", "NextJS", "Test App"],
};

async function fetchPostData(postId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) {
    return null;
  }
  const post = await response.json(); 
  return post;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await fetchPostData(postId);

  if (!post) {
    return <div>Post not found</div>;
    // notFound()
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Post Details
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong className="text-gray-900">Title:</strong> {post.title}
        </p>
        <p>
          <strong className="text-gray-900">Details:</strong> {post.body}
        </p>
      </div>
    </div>
  );
}
