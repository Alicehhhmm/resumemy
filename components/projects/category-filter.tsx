'use client'

import { memo } from 'react'
import { Badge } from '@/components/ui/badge'

import { CATEGORIES } from '@/lib/constants'
import type { CategoryOption } from '@/types/project'

interface CategoryFilterProps {
    activeCategory: CategoryOption
    onChange: (category: CategoryOption) => void
    className?: string
}

export const CategoryFilter = memo(({ activeCategory, onChange, className = '' }: CategoryFilterProps) => {
    return (
        <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
            {CATEGORIES.map(category => (
                <Badge
                    key={category.id}
                    variant={category.id === activeCategory ? 'default' : 'outline'}
                    className='px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors'
                    onClick={() => onChange(category.id as CategoryOption)}
                >
                    {category.label}
                </Badge>
            ))}
        </div>
    )
})
