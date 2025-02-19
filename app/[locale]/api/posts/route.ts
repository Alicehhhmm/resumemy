import { NextResponse } from 'next/server'

export async function GET() {
    // 开发环境模拟数据
    const mockPosts = [
        { slug: '1', title: '欢迎文章' },
        { slug: 'hello-world', title: '欢迎文章' },
        { slug: 'nextjs-tutorial', title: 'Next.js 教程' }
    ]

    return NextResponse.json(mockPosts)
} 