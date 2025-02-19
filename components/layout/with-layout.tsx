import type { FC, PropsWithChildren } from 'react'
import type { Layouts } from '@/types/layouts'

import { DefaultLayout, HomeLayout, BlogLayout, ArticleLayout } from '@/components/layout'

const layouts = {
    home: HomeLayout,
    blog: BlogLayout,
    article: ArticleLayout,
} satisfies Record<Layouts, FC>

type WithLayoutProps<Layouts> = PropsWithChildren<{ layout: Layouts }>

const WithLayout: FC<WithLayoutProps<Layouts>> = ({ layout, children }) => {
    const LayoutComponent = layouts[layout] ?? DefaultLayout

    return <LayoutComponent>{children}</LayoutComponent>
}

export default WithLayout
