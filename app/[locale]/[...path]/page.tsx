import { notFound } from 'next/navigation'
import { WithLayout } from '@/components/layout'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { Layouts } from '@/types/layouts'

type Params = {
    params: {
        locale: string
        path?: string[]
        title?: string
    }
}

// 安全的静态生成配置
export async function generateStaticParams() {
    // TODO:
    // 1.创建博客文章所在目录下，所有文件夹路径名称组成的动态路由数组
    // 2.获取生成的动态数组，将其生成静态页面的路由路径
    const result = [
        { locale: 'zh', path: ['posts'] },
        { locale: 'en', path: ['posts'] },
        { locale: 'zh', path: ['blog'] },
        { locale: 'en', path: ['blog'] },
    ]

    return result
}

const DynamicPage = ({ params }: Params) => {
    const { locale, path = [] } = params

    // 1. 验证语言配置
    if (!routing.locales.includes(locale)) {
        return notFound()
    }

    const [staticPath] = path

    // TODO:
    // 1.将当前路径转给存储所有静态页面路径的对接，判断是否存在
    // 2.如果存在，定义一个方法，将当前路径传递给对应的页面布局组件
    if (['posts', 'blog'].includes(staticPath)) {
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

export const dynamicParams = false
export const revalidate = 300

export default DynamicPage
