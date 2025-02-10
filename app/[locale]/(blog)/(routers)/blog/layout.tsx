import React from 'react'

const BlogLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <h1>BlogLayout</h1>
            <main className='pt-[60px] h-full'>{children}</main>
        </div>
    )
}

export default BlogLayout
