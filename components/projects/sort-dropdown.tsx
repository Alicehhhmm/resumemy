'use client'

import { memo } from 'react'
import { FilterDropdown } from '@/components/common/filter-dropdown'
import { SORT_OPTIONS } from '@/lib/constants'
import type { SortOption } from '@/types/project'

interface SortDropdownProps {
    value: SortOption
    onChange: (value: SortOption) => void
    className?: string
}

export const SortDropdown = memo(function SortDropdown({ value, onChange, className = '' }: SortDropdownProps) {
    return (
        <FilterDropdown
            label='Sort by'
            options={SORT_OPTIONS}
            value={value}
            onChange={value => onChange(value as SortOption)}
            className={className}
        />
    )
})
