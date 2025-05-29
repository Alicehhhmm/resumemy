import type { FC } from 'react'

import type { ChatSidebarType } from '@/types/chat'
import { NavMain } from '@/components/navigation'

interface ChatNavMainProps {
    navMain: ChatSidebarType['navMain']
    onMenuClick?: (item: ChatSidebarType['navMain'][0]) => void
}

export const ChatNavMain: FC<ChatNavMainProps> = ({ navMain, onMenuClick }) => {
    return <NavMain items={navMain} onMenuClick={onMenuClick} />
}
