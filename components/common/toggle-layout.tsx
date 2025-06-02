'use client'

import type { FC } from 'react'
import { useTranslations } from 'next-intl'

import { LayoutGridIcon, LayoutListIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common'

export interface ToggleLayoutProps {
    layout: 'grid' | 'list'
    onToggle: () => void
    size?: number | string
    className?: string
}

const ToggleLayout: FC<ToggleLayoutProps> = ({ layout, onToggle, size = 7, className }) => {
    const t = useTranslations()
    const LayoutIconMap = {
        grid: LayoutGridIcon,
        list: LayoutListIcon,
    }

    const IconComp = LayoutIconMap[layout]

    const title = t('components.common.togglelayout.label') || '切换布局'

    return (
        <ActionTooltip side='bottom' label={title}>
            <Button onClick={onToggle} variant='ghost' size='icon' className={`size-${size} ${className ?? ''}`} aria-label={title}>
                <IconComp className='size-7' />
            </Button>
        </ActionTooltip>
    )
}

ToggleLayout.displayName = 'ToggleLayout'

export default ToggleLayout
function t(arg0: string) {
    throw new Error('Function not implemented.')
}
