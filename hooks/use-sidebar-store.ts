import { create } from "zustand";

interface SidebarState {
    // 展开的菜单模块
    expandedSections: string[]
    // 用于切换菜单模块展开状态
    toggleSection: (menuKey: string) => void
    // 当前点击项
    activeItem: string | null
    // 更新最新点击项
    setActiveItem: (href: string) => void
}

export const useSidebarStore = create<SidebarState>(set => ({
    activeItem: null,
    expandedSections: [],
    toggleSection: menuKey =>
        set(state => ({
            expandedSections: state.expandedSections.includes(menuKey)
                ? state.expandedSections.filter(t => t !== menuKey)
                : [...state.expandedSections, menuKey],
        })),
    setActiveItem: (href) => set({ activeItem: href })
}))