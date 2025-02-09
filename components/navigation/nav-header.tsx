import { ThemeToggleBtn } from '@/components/theme-toggle'
import { NavItem } from '@/components/navigation/nav-item'
import { LangToggle } from '@/components/lang-toggle'
import { MobileNav } from '@/components/navigation/mobile-nav'

import { NavItemSettings } from '@/config/system-settings'

export const NavHeader = () => {
    const headmap = NavItemSettings
    return (
        <div className='w-full h-[60px] border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
            <div className='h-full px-4 sm:px-6 lg:px-20 flex items-center justify-between'>
                {/* Logo */}
                <div>
                    <h2 className='text-xl sm:text-2xl font-medium text-foreground'>Resume My</h2>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='hidden md:flex items-center gap-2 mr-2'>
                        {headmap.map(hnav => (
                            <NavItem key={hnav.key} name={hnav.name} path={hnav.path} subMenu={hnav.subMenu} />
                        ))}
                        <div className='h-6 w-[1px] mx-2 bg-border/60' />
                        <LangToggle />
                        <div className='h-6 w-[1px] mx-2 bg-border/60' />
                        <ThemeToggleBtn />
                    </div>
                    <div className='md:hidden flex items-center gap-1'>
                        <ThemeToggleBtn />
                        <div className='h-5 w-[1px] mx-1 bg-border/60' />
                        <MobileNav />
                    </div>
                </div>
            </div>
        </div>
    )
}
