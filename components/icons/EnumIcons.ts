import type { RIconType } from '@/types'

import { HomeIcon, BookOpen, Bot, FolderIcon, Settings2, BookmarkIcon, Palette, AlertOctagon } from 'lucide-react'

export const ChatSidebarIconMap: Record<string, RIconType> = {
    home: HomeIcon,
    blog: Bot,
    booklet: BookOpen,
    projects: FolderIcon,
    bookmarks: BookmarkIcon,
    design: Palette,
    settings: Settings2,
}

export const ChannelsIconMap: Record<string, RIconType> = {
    all: Bot,
    news: AlertOctagon,
}