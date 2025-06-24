import 'server-only'

import { z } from 'zod'
import qs from 'query-string'
import type { RaindropItem, RaindropCollection, RaindropResponse } from '@/types/bookmark'

const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1'
const RAINDROP_API_TOKEN = process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN

/**
 * 创建通用请求配置
 */
const createRequestOptions = (): RequestInit => ({
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RAINDROP_API_TOKEN}`,
    },
    cache: 'force-cache',
    next: {
        revalidate: 60 * 60 * 24 * 2, // 2 days 
    },
    signal: AbortSignal.timeout(10000),
})

/**
 * Raindrop Api Schema
 * 统一查询参数格式校验
 */
export const RaindropQuerySchema = z.object({
    collectionId: z.union([z.string(), z.number(), z.literal(0)]).default(0),
    page: z.coerce.number().min(0).default(0),
    perpage: z.coerce.number().min(1).max(100).default(30),
    search: z.string().optional(),
    tag: z.string().optional(),
})

export type RaindropQuery = z.infer<typeof RaindropQuerySchema>

/**
 * 通用 Raindrop API 请求逻辑
 * @param url - Requry URL
 * @returns Promise<T> | null
 */
async function fetchFromRaindrop<T = unknown> (url: string): Promise<T | null> {
    try {
        if (!RAINDROP_API_TOKEN) {
            throw new Error('[RAINDROP_TOKEN]: Raindrop API token is not set in environment')
        }

        const res = await fetch(url, createRequestOptions())
        if (!res.ok) {
            throw new Error(`[RAINDROP_ERROR]: HTTP error! status: ${res.status}`)
        }

        return await res.json()
    } catch (error: any) {
        console.error(`[RAINDROP_ERROR]: Raindrop fetch failed: ${error.message}`)
        return null
    }
}

/**
 * ✅ 获取根所有收藏夹（支持嵌套结构）
 * @returns Promise<Array<RaindropCollection> | null>
 * @see https://developer.raindrop.io/v1/collections/methods#get-root-collections
 */
export async function getBookmarkCollections (): Promise<RaindropCollection[] | null> {
    const url = qs.stringifyUrl({ url: `${RAINDROP_API_URL}/collections` })
    const data = await fetchFromRaindrop<{ items: RaindropCollection[] }>(url)
    return data?.items ?? null
}

/**
 * ✅ 获取所有子收藏夹(所有包含 parent.$id 的收藏夹) 
 * @returns Promise<Array<RaindropCollection> | null>
 * @see https://developer.raindrop.io/v1/collections/methods#get-child-collections
 */
export async function getSubCollections (): Promise<RaindropCollection[] | null> {
    const url = qs.stringifyUrl({
        url: `${RAINDROP_API_URL}/collections/childrens`,
    })
    const data = await fetchFromRaindrop<{ items: RaindropCollection[] }>(url)
    return data?.items ?? null
}

/**
 * ✅ 获取指定收藏夹的详细信息
 * @param collectionId - 收藏夹 ID
 * @returns Promise<Array<RaindropCollection> | null>
 * @see https://developer.raindrop.io/v1/collections/methods#get-collection
 */
export async function getCollectionById (collectionId: string | number): Promise<RaindropCollection | null> {
    const url = `${RAINDROP_API_URL}/collection/${collectionId}`
    const data = await fetchFromRaindrop<{ item: RaindropCollection }>(url)
    return data?.item ?? null
}

/**
 * ✅ 获取指定收藏夹下的书签列表（分页 + 可筛选）
 * @param query={collectionId、page、perpage、search、tag} - 查询参数
 * @returns Promise<Array<RaindropCollection> | null>
 * @see https://developer.raindrop.io/v1/raindrops/multiple#get-raindrops
 */
export async function getBookmarksByCollection (query: unknown): Promise<RaindropItem[] | null> {
    const parsed = RaindropQuerySchema.parse(query)

    const url = qs.stringifyUrl({
        url: `${RAINDROP_API_URL}/raindrops/${parsed.collectionId}`,
        query: {
            page: parsed.page,
            perpage: parsed.perpage,
            search: parsed.search,
            tag: parsed.tag,
        },
    })

    const data = await fetchFromRaindrop<RaindropResponse>(url)
    return data?.items ?? null
}


