import type { FilterOption } from "@/types/project"

export const CATEGORIES: FilterOption[] = [
    { id: "all", label: "All" },
    { id: "apps", label: "Apps" },
    { id: "games", label: "Games" },
    { id: "sites", label: "Sites" },
    { id: "components", label: "Components" },
    { id: "blocks", label: "Blocks" },
    { id: "starters", label: "Starters" },
]

export const SORT_OPTIONS: FilterOption[] = [
    { id: "trending", label: "Trending" },
    { id: "newest", label: "Newest" },
    { id: "popular", label: "Most Popular" },
    { id: "forks", label: "Most Forked" },
    { id: "stars", label: "Most Starred" },
]

export const DEFAULT_PAGE_SIZE = 6

// Artificial delay for demo purposes (ms)
export const DEMO_LOADING_DELAY = 600

// The Default Raindrop. io collections ID 
// that needs to be rendered in this project
export const DEFAULT_RAINDROP_COLLECTIONS_ID = 56759839