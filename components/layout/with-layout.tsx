import type { FC, PropsWithChildren } from 'react'
import type { Layouts } from '@/types/layouts'

import { DefaultLayout, HomeLayout, ArticleLayout, PostLayout, ProjectLayout, BookletLayout } from '@/components/layout'

import BlogLayout from '@/components/layout/blog-layout'
import BookmarkLayout from '@/components/layout/bookmark-layout'

const layouts = {
    home: HomeLayout,
    blog: BlogLayout,
    article: ArticleLayout,
    project: ProjectLayout,
    booklet: BookletLayout,
    bookmarks: BookmarkLayout,
    'bookmarks-category': BookmarkLayout,
    'blog-post': BlogLayout,
    'blog-category': BlogLayout,
} satisfies Record<Layouts, FC>

type WithLayoutProps<Layouts> = PropsWithChildren<{ layout: Layouts }>

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
    const LayoutComponent = layouts[layout] ?? DefaultLayout
    console.log('LayoutComponent', layout, layouts)

    return <LayoutComponent>{children}</LayoutComponent>
}

export default WithLayout
