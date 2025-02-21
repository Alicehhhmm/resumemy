import { notFound } from 'next/navigation'

import { dynamicRouter } from '@/core/dynamic-route.mjs'
import { availableLocaleCodes, defaultLocale } from '@/core/next.locales.mjs'
import { ENABLE_STATIC_EXPORT, ENABLE_STATIC_EXPORT_LOCALE } from '@/core/dynamic-route-constants'

import { WithLayout } from '@/components/layout'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { Layouts } from '@/types/layouts'

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

const DynamicPage = async ({ params }: DynamicPageParamsProps) => {
    const { locale, path = [] } = await params

    // 1. 验证语言配置
    if (!routing.locales.includes(locale)) {
        return notFound()
    }

    const [staticPath] = path

    // TODO:
    // 1.将当前路径转给存储所有静态页面路径的对接，判断是否存在
    // 2.如果存在，定义一个方法，将当前路径传递给对应的页面布局组件
    if (['posts', 'blog', 'demo'].includes(staticPath)) {
        return (
            <WithLayout layout={'blog'}>
                <div className=''>
                    <h1>博客页面{staticPath}</h1>
                </div>
            </WithLayout>
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
