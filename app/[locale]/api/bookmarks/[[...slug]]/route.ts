import { NextRequest, NextResponse } from 'next/server'
import { loadBookmarks } from '@/fatch-data/fatch-bookmark-data'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'

export async function GET (
    req: NextRequest,
    contextPromise: { params: Promise<{ slug?: string[] }> }
) {
    try {
        const { slug } = await contextPromise.params

        // 将 string | string[] | undefined 转换为 string[]
        const slugParts = [slug].flat().filter(Boolean) as string[]

        const pathname = slugParts.length > 0
            ? `/bookmarks/${slugParts.join('/')}`
            : '/bookmarks'

        const page = Number(req.nextUrl.searchParams.get('page')) || 1
        const start = (page - 1) * DEFAULT_PAGE_SIZE
        const end = start + DEFAULT_PAGE_SIZE

        const { bookmarks } = await loadBookmarks(pathname)
        const paged = bookmarks.slice(start, end) ?? []

        const result = {
            list: paged,
            hasMore: end < bookmarks.length,
            nextPage: end < bookmarks.length ? page + 1 : undefined,
            total: bookmarks.length,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[API ERROR] /api/bookmarks/[...slug]', error)
        return NextResponse.json({ message: 'Failed to load bookmarks.' }, { status: 500 })
    }
}
