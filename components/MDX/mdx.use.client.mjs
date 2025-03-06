'use strict'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/common'
import MDXCodeBox from '@/components/MDX/CodeBox'

/**
 * 所有MDX中需要的客户端组件列表
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
    Button: Button,
}

/**
 * 所有 HTML 元素需要映射到对应 React 组件的列表
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
    a: Link,
    pre: MDXCodeBox,
}
