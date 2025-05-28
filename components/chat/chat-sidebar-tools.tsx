import * as React from 'react'
import { SettingsIcon } from 'lucide-react'
import { ThemeToggleBtn } from '@/components/common/theme-toggle'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export function ChatSidebarTools({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ThemeToggleBtn IconClassname='size-4' />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={{
                                children: 'Settings',
                                hidden: false,
                            }}
                        >
                            <SettingsIcon />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
