import type { FC } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LinkTab } from '@/types/blog'

type TabsProps = {
    activeKey: string
    isSearch?: boolean
    navItems: LinkTab[]
    onNavChange: (key: string) => void
    handleSearch: (arg: boolean) => void
}

export const BlogTabs: FC<TabsProps> = ({ navItems, activeKey, onNavChange, isSearch = false, handleSearch }) => {
    const baseItemStyles = cn(
        'relative py-4 px-3 text-sm font-medium transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    )

    const activeItemStyles = cn(
        'text-primary font-semibold',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:h-[2px] after:bg-primary after:scale-x-100 after:origin-left',
        'after:transition-transform after:duration-300 after:ease-out'
    )

    const inactiveItemStyles = cn(
        'text-muted-foreground hover:text-primary',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left',
        'hover:after:scale-x-100',
        'after:transition-transform after:duration-300 after:ease-out'
    )

    return (
        <nav className='sticky top-0 z-10 bg-background shadow-sm'>
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center overflow-x-auto'>
                        <div className='absolute bottom-0 left-0 h-[1px] w-full bg-primary/10 opacity-90' />
                        <div className='flex items-center space-x-5'>
                            {navItems.map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => onNavChange(item.key)}
                                    className={cn(baseItemStyles, activeKey === item.key ? activeItemStyles : inactiveItemStyles)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <button
                            onClick={() => handleSearch(!isSearch)}
                            className={cn('rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-accent')}
                        >
                            <Search size={20} className='shrink-0' />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
