"use client"

import { createStore } from "zustand/vanilla"
import { immer } from "zustand/middleware/immer"
import type { Project, ProjectsResponse, CategoryOption, SortOption } from "@/types/project"
import { DEFAULT_PAGE_SIZE, DEMO_LOADING_DELAY } from "@/lib/constants"
import { getDefaultLocale } from '@/i18n/lib';

export interface ProjectsState {
    // Data
    projects: Project[]
    hasMore: boolean
    total: number

    // UI State
    loading: boolean
    loadingMore: boolean
    initialLoading: boolean

    // Filters
    page: number
    search: string
    category: CategoryOption
    sort: SortOption

    // State
    error: string | null

    // Actions
    setProjects: (projects: Project[]) => void
    appendProjects: (projects: Project[]) => void
    setHasMore: (hasMore: boolean) => void
    setTotal: (total: number) => void
    setLoading: (loading: boolean) => void
    setLoadingMore: (loadingMore: boolean) => void
    setInitialLoading: (initialLoading: boolean) => void
    setPage: (page: number) => void
    setSearch: (search: string) => void
    setCategory: (category: CategoryOption) => void
    setSort: (sort: SortOption) => void
    resetPage: () => void

    // Fetch actions
    fetchProjects: (reset?: boolean) => Promise<void>
    initializeStore: (initialProjects: ProjectsResponse) => void
}

export const createProjectsStore = () => createStore<ProjectsState>()(
    immer((set, get) => ({
        projects: [],
        hasMore: false,
        total: 0,
        loading: false,
        loadingMore: false,
        initialLoading: true,
        error: null,
        page: 1,
        search: "",
        category: "all",
        sort: "trending",

        // 设置项目列表
        setProjects: (projects) => set((s) => void (s.projects = projects)),

        // 追加新项目到现有项目列表
        appendProjects: (newProjects) =>
            set((s) => {
                const existingIds = new Set(s.projects.map((p) => p.id))
                const unique = newProjects.filter((p) => !existingIds.has(p.id))
                s.projects.push(...unique)
            }),

        // 设置是否还有更多项目
        setHasMore: (hasMore: boolean) => set((s) => void (s.hasMore = hasMore)),

        // 设置项目总数
        setTotal: (total: number) => set((s) => void (s.total = total)),

        // 设置加载状态
        setLoading: (loading: boolean) => set((s) => void (s.loading = loading)),

        // 设置加载更多状态
        setLoadingMore: (loadingMore: boolean) => set((s) => void (s.loadingMore = loadingMore)),

        // 设置初始加载状态
        setInitialLoading: (v: boolean) => set((s) => void (s.initialLoading = v)),

        // 设置错误信息
        setError: (error: string | null) => set((s) => void (s.error = error)),

        // 设置当前页码
        setPage: (page: number) => set((s) => void (s.page = page)),

        // 设置搜索关键词
        setSearch: (search: string) => set((s) => void (s.search = search)),

        // 设置当前选择的分类
        setCategory: (cat: CategoryOption) => set((s) => void (s.category = cat)),

        // 设置当前排序方式
        setSort: (sort: SortOption) => set((s) => void (s.sort = sort)),

        // 重置页码为 1
        resetPage: () => set((s) => void (s.page = 1)),

        // 重置搜索、分类和排序
        resetFilters: () =>
            set((s) => {
                s.search = ""
                s.category = "all"
                s.sort = "trending"
                s.page = 1
            }),

        // 初始化状态，设置初始项目
        initializeStore: (initialProjects) => {
            set((s) => {
                s.projects = initialProjects.projects
                s.hasMore = initialProjects.hasMore
                s.total = initialProjects.total
                s.error = null
            })
            setTimeout(() => {
                set((s) => void (s.initialLoading = false))
            }, DEMO_LOADING_DELAY)
        },

        // 获取项目数据
        fetchProjects: async (reset = false) => {
            const s = get()
            const currentPage = reset ? 1 : s.page

            set((s) => {
                if (reset) {
                    s.loading = true
                    s.page = 1
                    s.error = null
                } else {
                    s.loadingMore = true
                }
            })

            try {
                await new Promise((r) => setTimeout(r, DEMO_LOADING_DELAY))
                const params = new URLSearchParams({
                    search: s.search,
                    category: s.category,
                    sort: s.sort,
                    page: currentPage.toString(),
                    limit: DEFAULT_PAGE_SIZE.toString(),
                })

                // 动态获取当前 locale
                const locale = getDefaultLocale()?.code || 'zh';
                const baseURL = process.env.NEXT_PUBLIC_DATA_URL;

                const fetchURL = `${baseURL}/${locale}/api/projects?${params.toString()}`;

                const response = await fetch(fetchURL)

                if (!response.ok) throw new Error(`Error fetching projects: ${response.status}`)

                const data: ProjectsResponse = await response.json()
                set((s) => {
                    if (reset) s.projects = data.projects
                    else {
                        const existingIds = new Set(s.projects.map((p) => p.id))
                        const newProjects = data.projects.filter((p) => !existingIds.has(p.id))
                        s.projects.push(...newProjects)
                    }
                    s.hasMore = data.hasMore
                    s.total = data.total
                    s.loading = false
                    s.loadingMore = false
                })
            } catch (error) {
                console.error(error)
                set((s) => {
                    s.loading = false
                    s.loadingMore = false
                    s.error = error instanceof Error ? error.message : "An unknown error occurred"
                })
            }
        },
    }))
)

export const projectsStore = createProjectsStore()
