'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { NavLogo } from '@/components/navigation'
import { ToggleLayout, ThemeToggleBtn } from '@/components/common'

export function ContentHeader() {
    return (
        <header className='h-[60px] z-50 sticky top-0 flex items-center justify-between gap-1 bg-background p-4'>
            <div className='flex items-center gap-2 px-4 max-sm:hidden'>
                <SidebarTrigger className='-ml-1' />
            </div>

            {/* Mobile */}
            <div className='max-sm:block hidden'>
                <NavLogo />
            </div>
            <div className='max-sm:block hidden'>
                <ThemeToggleBtn className='size-8' />
                <SidebarTrigger className='size-8' />
            </div>
        </header>
    )
}
