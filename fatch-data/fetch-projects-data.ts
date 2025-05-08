import type { Project } from "@/types/project"
import { projects } from './data/projects-data'

export async function getProjects ({
    search = "",
    category = "all",
    sort = "trending",
    page = 1,
    limit = 6,
}: {
    search?: string
    category?: string
    sort?: string
    page?: number
    limit?: number
}) {
    let filteredProjects = [...projects]

    // Filter by search term
    if (search) {
        const searchLower = search.toLowerCase()
        filteredProjects = filteredProjects.filter(
            (project) =>
                project.title.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                project.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
        )
    }

    // Filter by category
    if (category && category !== "all") {
        filteredProjects = filteredProjects.filter((project) => project.category === category)
    }

    // Sort projects
    switch (sort) {
        case "newest":
            filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
        case "popular":
            filteredProjects.sort((a, b) => b.stars + b.forks - (a.stars + a.forks))
            break
        case "forks":
            filteredProjects.sort((a, b) => b.forks - a.forks)
            break
        case "stars":
            filteredProjects.sort((a, b) => b.stars - a.stars)
            break
        case "trending":
        default:
            // For trending, we'll use a combination of recency and popularity
            filteredProjects.sort((a, b) => {
                const aScore = a.stars + a.forks + new Date(a.createdAt).getTime() / 1000000000
                const bScore = b.stars + b.forks + new Date(b.createdAt).getTime() / 1000000000
                return bScore - aScore
            })
            break
    }

    // Calculate pagination
    const total = filteredProjects.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProjects = filteredProjects.slice(start, end)
    const hasMore = end < total

    return {
        projects: paginatedProjects,
        total,
        hasMore,
    }
}
