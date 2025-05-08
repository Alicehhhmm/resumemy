'use client'

import type React from 'react'
import { memo, useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    debounceMs?: number
}

export const SearchInput = memo(({ value, onChange, placeholder = 'Search...', className = '', debounceMs = 300 }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState(value)

    // Update local state when prop value changes
    useEffect(() => {
        setInputValue(value)
    }, [value])

    // Debounce the onChange callback
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue !== value) {
                onChange(inputValue)
            }
        }, debounceMs)

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue, value, onChange, debounceMs])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const handleClear = useCallback(() => {
        setInputValue('')
        onChange('')
    }, [onChange])

    return (
        <div className={`relative ${className}`}>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' aria-hidden='true' />
            <Input
                type='text'
                placeholder={placeholder}
                className='h-12 pl-10 pr-10 rounded-full border border-gray-200 bg-white text-base'
                value={inputValue}
                onChange={handleChange}
                aria-label={placeholder}
            />
            {inputValue && (
                <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full hover:bg-gray-100'
                    onClick={handleClear}
                    type='button'
                    aria-label='Clear search'
                >
                    <X className='h-4 w-4 text-gray-500' aria-hidden='true' />
                </Button>
            )}
        </div>
    )
})
