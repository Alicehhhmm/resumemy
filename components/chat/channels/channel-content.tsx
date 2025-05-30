import type { FC } from 'react'

import { SidebarContent, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'

import type { ChannelType } from '@/types/chat'
import { SidebarChannelCard } from './channel-card'

interface ChannelsContentProps {
    channels: ChannelType[]
    onChannelClick?: (channel: ChannelType) => void
}

export const ChannelsContent: FC<ChannelsContentProps> = ({ channels, onChannelClick }) => {
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
export default ChannelsContent
