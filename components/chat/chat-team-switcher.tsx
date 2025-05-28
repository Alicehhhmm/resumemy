import * as React from 'react'
import type { FC } from 'react'
import { Command, ChevronDown } from 'lucide-react'

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { TeamType } from '@/types'

interface ChatTeamSwitcherProps {
    data: TeamType[]
    className?: string
    onTeamChange?: (team: TeamType) => void
}

export const ChatTeamSwitcher: FC<ChatTeamSwitcherProps> = ({ 
    data, 
    className,
    onTeamChange 
}) => {
    const [currentTeam, setCurrentTeam] = React.useState<TeamType>(() => {
        return data[0] || {
            name: 'Acme Inc',
            logo: Command,
            plan: 'Enterprise'
        }
    })

    const handleTeamChange = React.useCallback((team: TeamType) => {
        setCurrentTeam(team)
        onTeamChange?.(team)
    }, [onTeamChange])

    return (
        <SidebarMenu className={className}>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='md:h-8 md:p-0'>
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                {currentTeam.logo && <currentTeam.logo />}
                            </div>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>{currentTeam.name}</span>
                                <span className='truncate text-xs'>{currentTeam.plan}</span>
                            </div>
                            <ChevronDown className='size-4 opacity-50' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className='w-[200px]'>
                        {data.map((team) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => handleTeamChange(team)}
                                className='flex items-center gap-2'
                            >
                                {team.logo && <team.logo  />}
                                <div className='flex flex-col'>
                                    <span className='text-sm font-medium'>{team.name}</span>
                                    <span className='text-xs text-muted-foreground'>{team.plan}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
} 