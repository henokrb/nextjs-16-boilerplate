import React from 'react'

export default function PostsLayout( { children }: { children: React.ReactNode }) {
  return (
    <div>
        <h1 className='text-blue-700 dark:text-blue-400'>Posts Layout</h1>
        {children}
    </div>
  )
}
