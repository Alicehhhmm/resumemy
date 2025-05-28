import * as React from 'react'
import type { FC } from 'react'
import { EllipsisVertical } from 'lucide-react'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from '@/components/ui/sidebar'

import type { ChatSidebarType, ChannelType } from '@/types/chat'
import { ChatSidebarSearch } from './chat-sidebar-search'
import { SidebarChannelCard } from './sidebar-channel-card'

// TODO:
// 1. Add a loading state for channels
// 2. Add a no channels state
// 3. change ChatSidebarChannelsHeaderProps and ChatSidebarChannelsContentProps

interface ChatSidebarChannelsHeaderProps {
    activeItem: ChatSidebarType['navMain'][0]
}

const ChatSidebarChannelsHeader: FC<ChatSidebarChannelsHeaderProps> = ({ activeItem }) => {
    return (
        <SidebarHeader className='gap-3.5 border-b p-4'>
            <div className='flex w-full items-center justify-between'>
                <div className='text-base font-medium text-foreground'>{activeItem?.label}</div>
                <div className='flex items-center gap-2 text-sm'>
                    <EllipsisVertical className='size-4' />
                </div>
            </div>
            <ChatSidebarSearch />
        </SidebarHeader>
    )
}

interface ChatSidebarChannelsContentProps {
    channels: ChannelType[]
    onChannelClick?: (channel: ChannelType) => void
}

const ChatSidebarChannelsContent: FC<ChatSidebarChannelsContentProps> = ({ channels, onChannelClick }) => {
    return (
        <SidebarContent>
            <SidebarGroup className='px-0'>
                <SidebarGroupContent>
                    {channels?.map(channel => (
                        <SidebarChannelCard group={channel} key={channel.link} onClick={() => onChannelClick?.(channel)} />
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}

interface ChatSidebarChannelsProps {
    activeItem: ChatSidebarType['navMain'][0]
    channels: ChannelType[]
    onChannelClick?: (channel: ChannelType) => void
}

export const ChatSidebarChannels: FC<ChatSidebarChannelsProps> = ({ activeItem, channels, onChannelClick }) => {
    return (
        <Sidebar collapsible='none' className='hidden flex-1 md:flex bg-background/60'>
            <ChatSidebarChannelsHeader activeItem={activeItem} />
            <ChatSidebarChannelsContent channels={channels} onChannelClick={onChannelClick} />
        </Sidebar>
    )
}
