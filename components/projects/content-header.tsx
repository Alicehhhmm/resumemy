'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'

export function ContentHeader() {
    return (
        <header className='h-[60px] z-50 sticky top-0 flex items-center justify-between gap-1 bg-background p-4'>
            <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
            </div>
        </header>
    )
}
