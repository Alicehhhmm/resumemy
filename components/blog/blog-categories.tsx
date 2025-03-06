'use client'

import { FC, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { MobileSelect, SelectOption } from '@/components/common/mobile-select'

import { cn } from '@/lib/utils'
import { Link } from '@/components/common'
import { BlogPostsRSC, LinkTab } from '@/types/blog'
import { BlogPostCard, BlogPostCardRow, BlogGridCard } from '@/components/blog'

type WithBlogCategoriesProps = {
    categories: Array<LinkTab>
    blogData: BlogPostsRSC
}

export const WithBlogCategories: FC<WithBlogCategoriesProps> = ({ categories, blogData }) => {
    const [selectedKey, setSelectedKey] = useState<string>(blogData.category || 'default')

    const handleTabChange = (key: string) => {
        setSelectedKey(key)
    }

    const categoryOptions: SelectOption[] = categories.map(category => ({
        value: category.key,
        label: category.label,
        link: category.link,
    }))

    return (
        <ResizablePanelGroup direction='vertical' className='rounded-lg overflow-hidden'>
            <Tabs value={selectedKey} onValueChange={handleTabChange} className='w-full'>
                <ResizablePanel defaultSize={25} className='bg-white dark:bg-neutral-900/80 shadow-sm max-sm:rounded-lg'>
                    {/* 移动端 Select */}
                    <div className='max-sm:block hidden'>
                        <MobileSelect
                            options={categoryOptions}
                            value={selectedKey}
                            onValueChange={handleTabChange}
                            placeholder='选择分类'
                            triggerClassName='h-10 px-3 py-2'
                        />
                    </div>

                    {/* 桌面端 Tabs */}
                    <div className='max-sm:hidden flex justify-between items-center p-1 sm:p-2 px-2 sm:px-4'>
                        <TabsList className={cn('flex justify-start items-center p-0 bg-transparent')}>
                            {categories.map(category => (
                                <Link href={category.link} key={category.key} className='hover:no-underline'>
                                    <TabsTrigger
                                        value={category.key}
                                        className={cn(
                                            `relative py-2 sm:py-3 px-2 sm:px-3`,
                                            `text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200`,
                                            selectedKey === category.key ? 'active-item' : 'inactive-item'
                                        )}
                                    >
                                        {category.label}
                                    </TabsTrigger>
                                </Link>
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
                <ResizableHandle className='max-sm:hidden' />
                <ResizablePanel defaultSize={75} className='bg-gray-50 dark:bg-neutral-950/10 pt-4 sm:pt-6 px-2 sm:px-4'>
                    <div className='container mx-auto'>
                        {categories.map(category => (
                            <TabsContent key={category.key} value={category.key} className='p-0 pb-6 sm:pb-10 w-full'>
                                {['all', 'news'].includes(category.key) && (
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
                                        {blogData.posts.map(post => (
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

                                {!['all', 'news', 'release'].includes(category.key) && (
                                    <div className='space-y-3 sm:space-y-4'>
                                        {blogData.posts.map(post => (
                                            <BlogPostCardRow
                                                key={post.slug}
                                                title={post.title}
                                                author={post.author}
                                                category={post.categories[0]}
                                                date={post.date}
                                                slug={post.slug}
                                            />
                                        ))}
                                    </div>
                                )}

                                {['release'].includes(category.key) && (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                                        {blogData.posts.map(post => (
                                            <BlogGridCard key={post.slug} post={post} />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </div>
                </ResizablePanel>
            </Tabs>
        </ResizablePanelGroup>
    )
}
