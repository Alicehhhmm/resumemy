'use client'

import type { ReactNode, FC } from 'react'

import type { RichTranslationValues } from 'next-intl'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { HomeIcon, BookOpen, Bot, FolderIcon, Settings2, BookmarkIcon, MenuIcon, AlertOctagon } from 'lucide-react'

import { Logon } from '@/components/icons'
import { ChatLayout } from '@/components/chat/chat-layout'
import type { ChatSidebarType, ChatModleType, MessagesType, RIconType, NavigationKeys } from '@/types'

import { useSiteNavigation } from '@/hooks/server'
import { getCurrentPathname } from '@/lib/next-router'

const ChatSidebarIconMap: Record<string, RIconType> = {
    home: HomeIcon,
    blog: Bot,
    booklet: BookOpen,
    projects: FolderIcon,
    bookmarks: BookmarkIcon,
    design: MenuIcon,
    settings: Settings2,
}

const ChannelsIconMap: Record<string, RIconType> = {
    all: Bot,
    news: AlertOctagon,
}

interface WithChatLayoutProps {
    modelKey: Array<ChatModleType>
    messages: MessagesType
    context?: Record<string, RichTranslationValues>
    children: ReactNode
}

export const WithChatLayout: FC<WithChatLayoutProps> = ({ modelKey, messages, context, children }) => {
    const pathname = usePathname()!
    const locale = useLocale()

    const { getSideNavigation, chatNavigationItems } = useSiteNavigation()

    let navKeys = (modelKey as Array<NavigationKeys>) || []

    const mappedSidebarItems = getSideNavigation(navKeys, context).map(([_, { label, items }]) => ({
        groupName: label,
        items: items.map(([, item]) => item),
    }))

    let currentPathname = getCurrentPathname(locale, pathname)

    let navMain: ChatSidebarType['navMain'] = []
    if (chatNavigationItems) {
        navMain = chatNavigationItems.map(([key, item]) => ({
            ...item,
            icon: ChatSidebarIconMap[key] || '',
            target: item.link ? (currentPathname === item.link ? '_self' : '_blank') : undefined,
        }))
    }

    let mes: ChatSidebarType['messages'] = {}
    if (mappedSidebarItems || messages) {
        // TODO: mergen mappedSidebarItems and messages.channels

        const newChannels = messages.channels?.map(item => ({
            ...item,
            icon: ChannelsIconMap[item.key] || '',
            desc: 'This is a new channel for discussion',
            isActive: false,
        }))

        mes = {
            channels: newChannels || [],
        }
    }

    // TODO: get user and teams info from FeachtAPI or context
    const sidebarGroups: ChatSidebarType = {
        user: {
            name: 'norush',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
        },
        teams: [
            {
                name: 'Codeing Repository',
                logo: Logon,
                plan: 'free',
            },
        ],
        navMain,
        messages: mes,
    }

    return <ChatLayout sidebarData={sidebarGroups}>{children}</ChatLayout>
}
