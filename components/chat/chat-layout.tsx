import type { FC, ReactNode, CSSProperties } from 'react'

import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import type { ChatSidebarType } from '@/types'
import { ChatNavHeader } from './chat-navhaeder'
import { ChatContentMain } from './chat-content-main'

interface ChatLayoutProps {
    sidebarData: ChatSidebarType
    children: ReactNode
}

export const ChatLayout: FC<ChatLayoutProps> = ({ sidebarData, children }) => (
    <>
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '400px',
                } as CSSProperties
            }
        >
            <ChatSidebar data={sidebarData} />
            <SidebarInset>
                <ChatNavHeader />
                <ChatContentMain>{children}</ChatContentMain>
            </SidebarInset>
        </SidebarProvider>
    </>
)
