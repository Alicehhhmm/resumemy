'use client'

import { useState } from 'react'
import type { FC } from 'react'

import type { TeamType } from '@/types'
import { NavTeam } from '@/components/navigation'

interface ChatTeamSwitcherProps {
    data: TeamType[]
}

export const ChatTeamSwitcher: FC<ChatTeamSwitcherProps> = ({ data }) => {
    const [currentTeam, ] = useState<TeamType>(data[0])

    return (
        <NavTeam title={currentTeam.name} subhead={currentTeam.plan} />
    )
}
