import { notFound, redirect } from 'next/navigation'

import { setRequestLocale } from 'next-intl/server'
import { dynamicRouter } from '@/core/dynamic-route.mjs'
import { availableLocaleCodes, allLocaleCodes, defaultLocale } from '@/core/next.locales.mjs'
import { ENABLE_STATIC_EXPORT, ENABLE_STATIC_EXPORT_LOCALE } from '@/core/dynamic-route-constants'

import { WithLayout } from '@/components/layout'

type DynamicPageParamsProps = {
    params: {
        locale: string
        path?: string[]
    }
}

/**
 * [中文文档]
 * 根据国际化配置生成静态路径
 *
 * @behavior
 * - 静态导出禁用时:
 *   - ENABLE_STATIC_EXPORT=false: 返回空数组启用动态渲染
 * - 静态导出启用时:
 *   - ENABLE_STATIC_EXPORT_LOCALE=true ? 生成所有语言路径 : 否则仅生成默认语言路径
 * @returns {Array<{locale: string, path: string[], ...}>}
 * @example 启用多语言静态导出
 * [
 *   { locale: 'zh-CN', path: ['blog'] },
 *   { locale: 'zh-CN', path: ['docs', 'intro'] },
 *   { locale: 'en-US', path: ['about'] }
 * ]
 *
 * @example 仅默认语言
 * [
 *   { locale: 'en-US', path: ['home'] },
 *   { locale: 'en-US', path: ['contact'] }
 * ]
 * -------------------------------------------------------------------------------
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    console.log('Generates ENABLE_STATIC_EXPORT@', ENABLE_STATIC_EXPORT)
    // When static export disabled
    if (!ENABLE_STATIC_EXPORT) {
        return []
    }

    // When static export enabled
    const locales = ENABLE_STATIC_EXPORT_LOCALE ? availableLocaleCodes : [defaultLocale.code]

    // 获取当前语言模式下，所有映射的路由路径
    const getRoutesForLocale = async (locale: string) => {
        const routes = await dynamicRouter.getRoutesByLanguage(locale)
        // [ 'blog', 'blog\\new\\new-welcon' ]
        return routes.map(pathname => dynamicRouter.mapPathToRoute(locale, pathname))
    }

    // Generates all possible routes for all available locales [{ locale: 'zh', path: [ 'demo' ] }, ...]
    const routes = await Promise.all(locales.map(getRoutesForLocale))

    return routes.flat().sort()
}

/**
 * 该页面用于动态渲染，根据 pages 文件夹下的目录结构自动生成动态路由。
 * 路径中的每个文件夹名称将作为路由的路径名称，最终映射到对应的页面组件。
 * 例如：pages/[Locale]/demo/tamplate.mdx 将会生成动态路由路径: /zh/demo/tamplate
 * @returns {JSX.Element} 返回对应的页面布局组件或404页面
 */
const DynamicPage = async ({ params }: DynamicPageParamsProps) => {
    const { locale, path = [] } = await params

    // 验证语言配置是否有效
    if (!availableLocaleCodes.includes(locale)) {
        setRequestLocale(defaultLocale.code)

        if (!allLocaleCodes.includes(locale)) {
            return notFound()
        }

        // Redirect to the default locale path
        const pathname = dynamicRouter.getPathname(path)

        return redirect(`/${defaultLocale.code}/${pathname}`)
    }

    const [staticPath] = path

    // TODO:
    // 1.将当前路径转给存储所有静态页面路径的对接，判断是否存在
    // 2.如果存在，定义一个方法，将当前路径传递给对应的页面布局组件
    if (['posts', 'blog', 'demo'].includes(staticPath)) {
        return <WithLayout layout={'blog'}></WithLayout>
    }

    // TODO: 针对mdx文件的动态布局:
    // 1.根据获取的 frontmatter 中的 layout 字段，动态渲染对应的布局组件
    // 2.如果 frontmatter 中没有 layout 字段，则使用默认布局组件
    // 3.如果 mdx 文件使用组件, 将根据返回的文件信息: content 直接渲染对应的组件

    // const { source, filename } = await dynamicRouter.getMarkdownFile(
    //     locale,
    //     pathname
    //   );
    // mocks
    const source = 'mdx source'
    const filename = 'mdx filename'

    if (source.length && filename.length) {
        // 获取文件内容
        // const {content,frontmatter } = await dynamicRouter.getMarkdownContent(source, filename);

        // mocks
        const frontmatter: any = { layout: 'article' }
        const content = <div className='p-2 bg-amber-500'>mdx components content</div>

        return <WithLayout layout={frontmatter.layout}>{content}</WithLayout>
    }

    // 404
    return notFound()
}

// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamicParams = false

// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300

export default DynamicPage
