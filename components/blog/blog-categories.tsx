'use client'

import { FC, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { cn } from '@/lib/utils'
import { BlogPostsRSC } from '@/types/blog'
import { BlogPostCard, BlogPostCardRow } from '@/components/blog'

type WithBlogCategoriesProps = {
    categories: Array<string>
    blogData: BlogPostsRSC & { category: string; description?: string }
}

export const WithBlogCategories: FC<WithBlogCategoriesProps> = ({ categories, blogData }) => {
    const defaultValue = categories[0]
    const [action, setAction] = useState(defaultValue)

    const handelChang = (val: any) => {
        setAction(val)
    }

    return (
        <ResizablePanelGroup direction='vertical'>
            <Tabs defaultValue={defaultValue} onValueChange={handelChang}>
                <ResizablePanel defaultSize={25} className='bg-white dark:bg-background shadow'>
                    <div className='h-full flex justify-between items-center p-2 container mx-auto px-4'>
                        <TabsList className={cn('flex justify-between items-center p-0')}>
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className={cn(`relative py-4 px-3`, action === category ? 'active-item' : 'inactive-item')}
                                >
                                    <span className='text-sm font-medium active:text-lime-500 hover:text-lime-500'>{category}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Button
                            variant='outline'
                            size='icon'
                            className={
                                'border-none rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-accent'
                            }
                        >
                            <Search size={20} className='shrink-0' />
                        </Button>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                    <div className='pt-6'>
                        {categories.map((category, index) => (
                            <div key={index} className='flex h-full'>
                                {category === defaultValue && (
                                    <TabsContent value={defaultValue} className='p-0'>
                                        <div className='grid grid-cols-2 gap-12'>
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
                                {category !== defaultValue && (
                                    <TabsContent value={category} className='p-0 flex-1'>
                                        <div className='space-y-4'>
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
                            </div>
                        ))}
                    </div>
                </ResizablePanel>
            </Tabs>
        </ResizablePanelGroup>
    )
}
