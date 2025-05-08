'use client'

import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export interface FilterOption {
    id: string
    label: string
}

interface FilterDropdownProps {
    label: string
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
    className?: string
}

export const FilterDropdown = memo(({ label, options, value, onChange, className = '' }: FilterDropdownProps) => {
    // Find the selected option label
    const selectedOption = options.find(option => option.id === value)

    return (
        <div className={`relative ${className}`}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex items-center justify-between gap-1 min-w-32 px-4'
                        aria-label={`${label} filter`}
                    >
                        <span className='mr-1'>{label}:</span>
                        <span className='font-medium'>{selectedOption?.label}</span>
                        <ChevronDown className='h-4 w-4 ml-1 transition-transform' aria-hidden='true' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                    {options.map(option => (
                        <DropdownMenuItem
                            key={option.id}
                            className='flex items-center justify-between cursor-pointer'
                            onSelect={() => onChange(option.id)}
                        >
                            <span>{option.label}</span>
                            {option.id === value && <Check className='h-4 w-4 text-primary' aria-hidden='true' />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
})
