'use client'

import type { ReactNode, FC } from 'react'
import { useRef } from 'react'

import type { RichTranslationValues } from 'next-intl'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Logon, ChatSidebarIconMap, ChannelsIconMap } from '@/components/icons'
import { ChatLayout } from '@/components/chat/chat-layout'
import type { ChatSidebarType, ChatModleType, MessagesType, NavigationKeys } from '@/types'

import { useFullscreen } from '@/hooks/client'
import { useSiteNavigation } from '@/hooks/server'
import { useSidebarStore } from '@/hooks'
import { getCurrentPathname } from '@/lib/next-router'

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

    // FullScreen
    const sidebarInsetRef = useRef(null)
    const [isFullscreen, { toggleFullscreen }] = useFullscreen(sidebarInsetRef)

    let navKeys = (modelKey as Array<NavigationKeys>) || []

    // TODO : other navigation items form localization or context
    // NOTE: for exmaple bookmarks
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
            target: undefined,
        }))
    }

    let mes: ChatSidebarType['messages'] = {}
    if (messages || mappedSidebarItems) {
        // TODO: mergen mappedSidebarItems and messages.channels
        let newChannels: any = []

        if (navKeys.includes('blog')) {
            newChannels = messages.channels?.map(item => ({
                ...item,
                icon: ChannelsIconMap[item.key] || '',
                desc: 'This is a new channel for discussion',
                isActive: false,
            }))
        }

        if (navKeys.includes('bookmarks')) {
            const channelMap = new Map(messages.channels?.map(c => [c.link, c]) ?? [])
            console.log(`[WithChatLayout]: getSideNavigation:`, getSideNavigation(navKeys, context))
            console.log(`[WithChatLayout]: mappedSidebarItems:`, mappedSidebarItems)
            console.log(`[WithChatLayout]: messages.bookmarks:`, messages.bookmarks)

            newChannels = mappedSidebarItems[0].items.map(item => {
                const matched = channelMap.get(item.link)

                if (matched) {
                    return {
                        ...item,
                        icon: ChannelsIconMap['all'] ?? '',
                        desc: matched?.desc ?? 'No bookmarks',
                    }
                } else {
                    return {
                        ...item,
                        icon: ChannelsIconMap['all'] || '',
                        desc: `${messages.bookmarks?.length} bookmarks` || 'No bookmarks',
                        isActive: false,
                    }
                }
            })
        }

        mes = {
            channels: newChannels,
        }
    }

    // TODO: get user and teams info from FeachtAPI or context
    const sidebarGroups: ChatSidebarType = {
        user: {
            name: 'norush',
            email: 'm@example.com',
            avatar: '',
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

    return (
        <ChatLayout toggleScreen={toggleFullscreen} sidebarData={sidebarGroups} ref={sidebarInsetRef}>
            {children}
        </ChatLayout>
    )
}
