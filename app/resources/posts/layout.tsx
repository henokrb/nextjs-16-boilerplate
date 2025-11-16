import React from 'react'

export default function PostsLayout( { children }: { children: React.ReactNode }) {
  return (
    <div>
        <h1 className='text-blue-500'>Posts Layout</h1>
        {children}
    </div>
  )
}
