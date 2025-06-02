import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'

import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import type { ChatSidebarType } from '@/types'
import { ChatNavHeader } from './chat-navhaeder'
import { ChatContentMain } from './chat-content-main'

interface ChatLayoutProps {
    sidebarData: ChatSidebarType
    toggleScreen: () => void
    children: ReactNode
}

export const ChatLayout = forwardRef<HTMLDivElement, ChatLayoutProps>(({ sidebarData, toggleScreen, children }, ref) => (
    <SidebarProvider
        style={
            {
                '--sidebar-width': '400px',
            } as CSSProperties
        }
        ref={ref}
    >
        <ChatSidebar data={sidebarData} />
        <SidebarInset>
            <ChatNavHeader fullScreen={toggleScreen} />
            <ChatContentMain>{children}</ChatContentMain>
        </SidebarInset>
    </SidebarProvider>
))

ChatLayout.displayName = 'ChatLayout'
