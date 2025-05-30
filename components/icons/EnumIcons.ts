import type { RIconType } from '@/types'

import { GitHub, JueJin, LinkedIn, Twitter } from '@/components/icons/social'
import { HomeIcon, BookOpen, Bot, FolderIcon, Settings2, BookmarkIcon, Palette, AlertOctagon, Mail } from 'lucide-react'

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

export const SocialIconMap: Record<string, RIconType> = {
    github: GitHub,
    juejin: JueJin,
    gmail: Mail,
    twitter: Twitter,
    linkedin: LinkedIn,
}