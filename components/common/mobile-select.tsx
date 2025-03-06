'use client'

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Link } from '@/components/common'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export type SelectOption = {
    value: string
    label: string
    link: string
}

type MobileSelectProps = {
    options: SelectOption[]
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    label?: string
    placeholder?: string
    className?: string
    triggerClassName?: string
    contentClassName?: string
    disabled?: boolean
}

export const MobileSelect: FC<MobileSelectProps> = ({
    options,
    defaultValue,
    value,
    onValueChange,
    label,
    placeholder = '请选择',
    className,
    triggerClassName,
    contentClassName,
    disabled = false,
}) => {
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue || '')

    useEffect(() => {
        if (value !== undefined && value !== selectedValue) {
            setSelectedValue(value)
        }
    }, [value, selectedValue])

    const handleValueChange = (newValue: string) => {
        setSelectedValue(newValue)
        if (onValueChange) {
            onValueChange(newValue)
        }

        const selectedOption = options.find(option => option.value === newValue)
        if (selectedOption) {
            router.push(selectedOption.link)
        }
    }

    return (
        <Select value={selectedValue} onValueChange={handleValueChange} disabled={disabled}>
            <SelectTrigger
                className={cn(
                    'w-full border-none bg-white dark:bg-neutral-900/50 shadow-sm',
                    'text-gray-800 dark:text-foreground/60',
                    'hover:bg-lime-50 dark:hover:bg-neutral-900/80',
                    'transition-colors duration-200',
                    triggerClassName
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={cn('bg-white dark:bg-neutral-950/90 ', 'text-gray-800 dark:text-gray-200', contentClassName)}>
                {label && <SelectLabel className='text-gray-500 dark:text-lime-400'>{label}</SelectLabel>}
                <SelectGroup>
                    {options.map(option => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className={cn(
                                'cursor-pointer',
                                'hover:bg-gray-100 dark:hover:bg-gray-700',
                                'focus:bg-gray-100 dark:focus:bg-gray-700',
                                'data-[state=checked]:text-lime-600 dark:data-[state=checked]:text-lime-500',
                                'data-[state=checked]:bg-lime-50 dark:data-[state=checked]:bg-lime-900/20'
                            )}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
