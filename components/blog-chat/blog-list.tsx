import * as React from 'react'
import type { FC } from 'react'

import type { BlogPostsRSC } from '@/types/blog'
import { BlogPostCard } from '@/components/blog/blog-post-card'

interface BlogListProps {
    data: BlogPostsRSC
}

export const BlogList: FC<BlogListProps> = ({ data }) => {
    const { posts, pagination } = data

    // TODO: get channel info from hooks

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>博客文章</h1>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
                {posts.map(post => (
                    <BlogPostCard
                        key={post.slug}
                        title={post.title}
                        author={post.author}
                        category={post.categories[2]}
                        date={post.date}
                        slug={post.slug}
                    />
                ))}
            </div>
            {/* TODO: 分页组件 */}
        </div>
    )
}
