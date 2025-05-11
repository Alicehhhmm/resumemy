export interface Project {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    technologies: string[]
    forks: number
    stars: number
    image: string
    avatar: string
    author: string
    createdAt: string
}

export type ProjectsResponse = {
    projects: Project[]
    total: number
    hasMore: boolean
}

export type SortOption = "trending" | "newest" | "popular" | "forks" | "stars"

export type CategoryOption = "all" | "apps" | "games" | "sites" | "components" | "blocks" | "starters"

export interface ProjectFilters {
    search: string
    category: CategoryOption
    sort: SortOption
    page: number
    limit: number
}

export interface FilterOption {
    id: string
    label: string
}

export interface DemoProjectType {
    title: string
    description: string
    image: string
    technologies: string[]
}