'use client'

import { FullscreenIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { ToggleLayout } from '@/components/common'
import WithBreadcrumbs from '@/components/WithBreadcrumbs'

import { useSidebarStore } from '@/hooks'

type ChatNavHeaderProps = {
    fullScreen: () => void
}

export const ChatNavHeader = ({ fullScreen }: ChatNavHeaderProps) => {
    const { postLayout, togglePostLayout } = useSidebarStore()

    return (
        <header className='h-[60px] z-50 sticky top-0 flex items-center justify-between gap-1 border-b bg-background p-4'>
            <div className='flex shrink-0 items-center gap-1'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='h-4' />
                <WithBreadcrumbs navKeys={['blog']} />
            </div>
            <div className='flex shrink-0 items-center gap-1'>
                <Button onClick={fullScreen} variant='ghost' size='icon' className='size-7'>
                    <FullscreenIcon />
                </Button>
                <ToggleLayout layout={postLayout[0]} onToggle={togglePostLayout} />
            </div>
        </header>
    )
}
