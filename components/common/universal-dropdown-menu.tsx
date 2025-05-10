import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export interface MenuItem {
    label: string
    shortcut?: string
    disabled?: boolean
    onSelect?: () => void
    selected?: boolean
    children?: MenuItem[]
}

export interface UniversalDropdownMenuProps {
    trigger: ReactNode
    className?: string
    groups: {
        label?: string
        items: MenuItem[]
    }[]
}

export const UniversalDropdownMenu = ({ trigger, className, groups }: UniversalDropdownMenuProps) => {
    const activecss = `
        rounded-sm px-2 py-1.5 outline-none bg-accent 
        text-sm text-muted-foreground hover:text-primary 
        hover:bg-accent/50 transition-all duration-200 ease-out
    `

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent className={cn('w-52', className)}>
                {groups.map((group, i) => (
                    <DropdownMenuGroup key={i} className='space-y-1'>
                        {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}
                        {group.label && <DropdownMenuSeparator />}
                        {group.items.map((item, index) =>
                            item.children ? (
                                <DropdownMenuSub key={index}>
                                    <DropdownMenuSubTrigger disabled={item.disabled}>{item.label}</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        {item.children.map((subItem, subIndex) => (
                                            <DropdownMenuItem
                                                key={subIndex}
                                                disabled={subItem.disabled}
                                                onSelect={e => {
                                                    e.preventDefault()
                                                    subItem.onSelect?.()
                                                }}
                                                className={cn(subItem.selected && activecss)}
                                                aria-selected={subItem.selected}
                                            >
                                                {subItem.label}
                                                {subItem.shortcut && (
                                                    <span className='ml-auto text-xs text-muted-foreground'>{subItem.shortcut}</span>
                                                )}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            ) : (
                                <DropdownMenuItem
                                    key={index}
                                    disabled={item.disabled}
                                    onSelect={e => {
                                        e.preventDefault()
                                        item.onSelect?.()
                                    }}
                                    className={cn(item.selected && activecss)}
                                    aria-selected={item.selected}
                                >
                                    {item.label}
                                    {item.shortcut && <span className='ml-auto text-xs text-muted-foreground'>{item.shortcut}</span>}
                                </DropdownMenuItem>
                            )
                        )}
                        {i < groups.length - 1 && <DropdownMenuSeparator />}
                    </DropdownMenuGroup>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
