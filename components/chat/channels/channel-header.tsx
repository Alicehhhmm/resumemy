import type { FC } from 'react'
import { EllipsisVertical } from 'lucide-react'

import { SidebarHeader } from '@/components/ui/sidebar'

import type { ChatSidebarType } from '@/types/chat'
import { ChatSidebarSearch } from '../chat-sidebar-search'

interface ChannelsHeaderProps {
    activeItem: ChatSidebarType['navMain'][0]
    showSearch?: boolean
}

export const ChannelsHeader: FC<ChannelsHeaderProps> = ({ activeItem, showSearch = false }) => {
    return (
        <SidebarHeader className='gap-3.5 border-b p-4 h-[60px] '>
            <div className='flex w-full items-center justify-between'>
                <div className='text-base font-medium text-foreground'>{activeItem?.label}</div>
                <div className='flex items-center gap-2 text-sm'>
                    <EllipsisVertical className='size-4' />
                </div>
            </div>
            {showSearch && <ChatSidebarSearch />}
        </SidebarHeader>
    )
}

export default ChannelsHeader
