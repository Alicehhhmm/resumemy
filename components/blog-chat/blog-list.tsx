import * as React from 'react'
import type { FC } from 'react'

import type { BlogPostsRSC } from '@/types/blog'
import { BlogPostCard } from '@/components/blog/blog-post-card'
import { BlogGridCard } from '@/components/blog/blog-grid-card'
import { useSidebarStore } from '@/hooks'

interface BlogListProps {
    data: BlogPostsRSC
}

export const BlogList: FC<BlogListProps> = ({ data }) => {
    const { posts, pagination } = data

    const { postLayout, togglePostLayout } = useSidebarStore()

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>博客文章</h1>
            {postLayout?.includes('grid') && (
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
            )}

            {postLayout?.includes('list') && (
                <div className='space-y-3 sm:space-y-4'>
                    {posts.map(post => (
                        <BlogGridCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
            {/* TODO: 分页组件 */}
        </div>
    )
}
