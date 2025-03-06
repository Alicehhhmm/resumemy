'user client'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ActionTooltipProps {
    label: string
    children: React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    className?: string
    labelClass?: string
}

export const ActionTooltip = ({ label, children, side = 'top', align = 'start', className, labelClass }: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className={cn('bg-gray-50 p-1 py-1.5', className)}>
                    <p className={cn('font-sans text-xs text-gray-500 capitalize', labelClass)}>{label.toLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
