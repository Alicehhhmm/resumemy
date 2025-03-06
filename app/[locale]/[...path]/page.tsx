import { notFound, redirect } from 'next/navigation'

import { setRequestLocale } from 'next-intl/server'
import { setGlobClientContext } from '@/core/server'
import { dynamicRouter } from '@/core/dynamic-route.mjs'
import { availableLocaleCodes, allLocaleCodes, defaultLocale } from '@/core/next.locales.mjs'
import { ENABLE_STATIC_EXPORT, ENABLE_STATIC_EXPORT_LOCALE } from '@/core/dynamic-route-constants'
import { DYNAMIC_ROUTES } from '@/core/next.dynamic.constants.mjs'

import { WithLayout } from '@/components/layout'
import { MatterProvider } from '@/components/providers/matter-provider'

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

    // Gets the current full pathname for a given path
    const pathname = dynamicRouter.getPathname(path)

    const staticGeneratedLayout = DYNAMIC_ROUTES.get(pathname)

    if (staticGeneratedLayout != undefined) {
        const sharedContext = { pathname: `/${pathname}` }

        // 设置服务端请求的全局共享上下文
        // 客户端需要通过 MatterProvider 传递
        setGlobClientContext(sharedContext)

        return (
            <MatterProvider {...sharedContext}>
                <WithLayout layout={staticGeneratedLayout}></WithLayout>
            </MatterProvider>
        )
    }

    // 根据当前文章动态路由路径，读取md文件内容
    const { source, filename } = await dynamicRouter.getMarkdownFile(locale, pathname)

    if (source.length && filename.length) {
        // 解析文件内容：根据提供的文件名、原文件md(x)内容解析并
        // 返回：可渲染的Html、ReactJSX组件内容content、以及相关文件信息
        const { content, frontmatter, headings, readingTime } = await dynamicRouter.getMDXContent(source, filename)

        const sharedContext = {
            frontmatter,
            headings,
            pathname: `/${pathname}`,
            readingTime,
            filename,
        }

        // 设置服务端请求的全局共享上下文
        // 以及客户端需要的 MatterProvider
        setGlobClientContext(sharedContext)

        // 根据文章frontmatter信息中的layout,动态选中对应的布局模块
        return (
            <MatterProvider {...sharedContext}>
                <WithLayout layout={frontmatter.layout}>{content}</WithLayout>
            </MatterProvider>
        )
    }

    // 404
    return notFound()
}

// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamicParams = false

// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300

export default DynamicPage
