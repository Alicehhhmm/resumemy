import { create } from "zustand"
import type { ChatSidebarType, ChannelType } from '@/types'
import type { BreadcrumbLinks } from '@/components/common/Breadcrumbs'

interface BreadcrumbType extends BreadcrumbLinks { }

interface SidebarState {
    expandedSections: string[]
    toggleSection: (menuKey: string) => void

    activeItem: string | null
    setActiveItem: (href: string) => void

    selectChannel: ChannelType | null
    setSelectChannel: (val: ChannelType) => void

    // 面包屑导航
    breadcrumbLinks: BreadcrumbType[]
    setBreadcrumbLinks: (val: BreadcrumbType) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
    activeItem: null,
    expandedSections: [],
    selectChannel: null,
    selectPost: null,
    breadcrumbLinks: [],

    toggleSection: (menuKey) =>
        set((state) => ({
            expandedSections: state.expandedSections.includes(menuKey)
                ? state.expandedSections.filter((t) => t !== menuKey)
                : [...state.expandedSections, menuKey],
        })),

    // set method
    setActiveItem: (href) => set({ activeItem: href }),

    setSelectChannel: (val) => set({ selectChannel: val }),

    setBreadcrumbLinks: (link) =>
        set((state) => {
            const { label, href } = link
            if (!href) return {}

            const parts = href.split('/').filter(Boolean)

            // 构建当前层级路径
            const levels: string[] = []
            for (let i = 0; i < parts.length; i++) {
                levels.push('/' + parts.slice(0, i + 1).join('/'))
            }

            // 保留属于当前路径祖先的面包屑
            const filtered = state.breadcrumbLinks.filter((item) =>
                item.href && levels.includes(item.href)
            ).filter(i => i.href !== href)

            const updated = [...filtered, { label, href }]
            return { breadcrumbLinks: updated }
        }),


    // clear method
    clearBreadcrumbs: () => set({ breadcrumbLinks: [] }),

}))
