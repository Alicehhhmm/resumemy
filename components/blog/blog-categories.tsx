'use client'

import { FC, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { cn } from '@/lib/utils'
import { BlogPostsRSC, PostRow } from '@/types/blog'
import { BlogPostCard, BlogPostCardRow, BlogGridCard } from '@/components/blog'

type WithBlogCategoriesProps = {
    categories: Array<string>
    blogData: BlogPostsRSC & { category: string; description?: string } & { grid: Array<PostRow> }
}

export const WithBlogCategories: FC<WithBlogCategoriesProps> = ({ categories, blogData }) => {
    const defaultValue = categories[0]
    const [action, setAction] = useState(defaultValue)

    const handelChang = (val: any) => {
        setAction(val)
    }

    return (
        <ResizablePanelGroup direction='vertical' className='rounded-lg overflow-hidden'>
            <Tabs defaultValue={defaultValue} onValueChange={handelChang} className='w-full'>
                <ResizablePanel
                    defaultSize={25}
                    className='bg-white dark:bg-neutral-900/50 shadow-sm border-b border-gray-200 dark:border-gray-700/30'
                >
                    <div className='h-full flex justify-between items-center p-1 sm:p-2 container mx-auto px-2 sm:px-4'>
                        <TabsList className={cn('flex justify-start items-center p-0 bg-transparent ')}>
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className={cn(
                                        `relative py-2 sm:py-3 px-2 sm:px-3  `,
                                        `text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200`,
                                        action === category ? 'active-item' : 'inactive-item'
                                    )}
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <Button
                            variant='outline'
                            size='icon'
                            className={cn(
                                'border-none rounded-full p-1.5 sm:p-2 dark:bg-neutral-900/20',
                                'text-gray-500 dark:text-foreground/60',
                                'hover:text-lime-600 dark:hover:text-lime-500',
                                'hover:bg-gray-100 dark:hover:bg-neutral-950/30',
                                'transition-colors'
                            )}
                        >
                            <Search size={18} className='shrink-0' />
                        </Button>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75} className='bg-gray-50 dark:bg-neutral-950/10 pt-4 sm:pt-6 px-2 sm:px-4'>
                    <div className='container mx-auto'>
                        {categories.map((category, index) => (
                            <div key={index} className='flex h-full'>
                                {category === defaultValue && (
                                    <TabsContent value={defaultValue} className='p-0 pb-6 sm:pb-10 w-full'>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
                                            {blogData.posts.map(post => (
                                                <BlogPostCard
                                                    key={post.slug}
                                                    title={post.title}
                                                    category={post.categories[0]}
                                                    author={post.author}
                                                    date={post.date}
                                                    slug={post.slug}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>
                                )}

                                {category !== defaultValue && category !== categories[2] && (
                                    <TabsContent value={category} className='p-0 flex-1 pb-6 sm:pb-10 w-full'>
                                        <div className='space-y-3 sm:space-y-4'>
                                            {blogData.posts.map(post => (
                                                <BlogPostCardRow
                                                    key={post.slug}
                                                    title={post.title}
                                                    category={post.categories[0]}
                                                    author={post.author}
                                                    date={post.date}
                                                    slug={post.slug}
                                                    description={'description'}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>
                                )}

                                {category === categories[2] && (
                                    <TabsContent value={category} className='p-0 flex-1 pb-6 sm:pb-10 w-full'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                                            {blogData.grid.map(post => (
                                                <BlogGridCard key={post.slug} post={post} />
                                            ))}
                                        </div>
                                    </TabsContent>
                                )}
                            </div>
                        ))}
                    </div>
                </ResizablePanel>
            </Tabs>
        </ResizablePanelGroup>
    )
}
