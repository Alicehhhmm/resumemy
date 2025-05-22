import { type LucideIcon } from 'lucide-react'
import { type UserType } from '@/types/user'

export type NavigationKeys =
    | 'blog'
    | 'booklet'
    | 'project'
    | 'bookmarks';

export interface NavItemsType {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: NavItemsType[]
}[]

export interface TeamType {
    name: string
    logo: React.ElementType
    plan: string
}

export interface PageSidebarType {
    user: UserType
    teams: TeamType[]
    navMain: NavItemsType[]
}