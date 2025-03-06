'use strict'

import { htmlComponents, clientMdxComponents, mdxComponents } from '@/components/MDX'
/**
 * Combine all MDX Components to be used
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const MDX_COMPONENTS = {
    ...htmlComponents,
    ...clientMdxComponents,
    ...mdxComponents,
}
