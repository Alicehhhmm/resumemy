'use strict'

import { Badge as WithBadge } from '@/components/ui/badge'

import ResponsiveGrid from '@/components/MDX/ResponsiveGrid'

/**
 * 所有需要传递给MDX的React（HOC）组件的完整列表
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
    // HOC for providing Badge Data
    WithBadge: WithBadge,
    ResponsiveGrid: ResponsiveGrid,
}
