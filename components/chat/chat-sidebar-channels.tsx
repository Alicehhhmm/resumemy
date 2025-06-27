import * as React from 'react'
import type { FC } from 'react'

import { Sidebar } from '@/components/ui/sidebar'

import type { ChatSidebarType, ChannelType } from '@/types/chat'

import { ChannelsHeader } from './channels/channel-header'
import { ChannelsContent } from './channels/channel-content'

// TODO:
// 1. Add a loading state for channels
// 2. Add a no channels state

interface ChatSidebarChannelsProps {
    activeItem: ChatSidebarType['navMain'][0]
    channels: ChannelType[]
    onChannelClick?: (channel: ChannelType) => void
}

export const ChatSidebarChannels: FC<ChatSidebarChannelsProps> = ({ activeItem, channels, onChannelClick }) => {
    return (
        <Sidebar collapsible='none' className='hidden flex-1 md:flex bg-sidebar-accent/50 text-sidebar-accent-foreground/60'>
            <ChannelsHeader activeItem={activeItem} />
            <ChannelsContent channels={channels} onChannelClick={onChannelClick} />
        </Sidebar>
    )
}
