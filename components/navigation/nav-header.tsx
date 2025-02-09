import { ThemeToggleBtn } from '@/components/theme-toggle'
import { NavItem } from '@/components/navigation/nav-item'
import { LangToggle } from '@/components/lang-toggle'

import { NavItemSettings } from '@/config/system-settings'

export const NavHeader = () => {
    const headmap = NavItemSettings
    return (
        <div className='w-full h-[60px] px-20 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 '>
            <div>
                <h2 className='text-2xl font-medium text-foreground'>Resume My</h2>
            </div>
            <div className='flex items-center gap-2'>
                {headmap.map(hnav => (
                    <NavItem key={hnav.key} name={hnav.name} path={hnav.path} subMenu={hnav.subMenu} />
                ))}
                <div className='h-6 w-[1px] mx-2 bg-border/60' />
                <LangToggle />
                <div className='h-6 w-[1px] mx-2 bg-border/60' />
                <ThemeToggleBtn />
            </div>
        </div>
    )
}
