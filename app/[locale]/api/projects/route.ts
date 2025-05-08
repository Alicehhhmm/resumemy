import { type NextRequest, NextResponse } from "next/server"
import { getProjects } from "@/fatch-data/projects-data"
import { DEFAULT_PAGE_SIZE } from "@/lib/constants"

export async function GET (request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get("search") || ""
        const category = searchParams.get("category") || "all"
        const sort = searchParams.get("sort") || "trending"
        const page = Number.parseInt(searchParams.get("page") || "1", 10)
        const limit = Number.parseInt(searchParams.get("limit") || DEFAULT_PAGE_SIZE.toString(), 10)

        // Validate parameters
        if (isNaN(page) || page < 1) {
            return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 })
        }

        if (isNaN(limit) || limit < 1 || limit > 50) {
            return NextResponse.json({ error: "Invalid limit parameter" }, { status: 400 })
        }

        // Get projects with filters
        const result = await getProjects({ search, category, sort, page, limit })

        return NextResponse.json(result)
    } catch (error) {
        console.error("Error in projects API:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
