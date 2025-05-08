'use client'

import { useState } from 'react'

/**
 * 屏幕尺寸指示器：用于在开发环境中显示当前的屏幕尺寸（如 xs、sm、md、lg、xl、2xl）。
 * 在生产环境中，该组件不会渲染任何内容。
 */
export function TailwindIndicator() {
    if (process.env.NODE_ENV === 'production') return null

    const [isVisible, setIsVisible] = useState(true)

    return (
        <div
            className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-gray-800 dark:bg-gray-900 px-3 py-1.5 font-mono text-xs font-semibold text-white dark:text-gray-100 shadow-lg border border-gray-600 dark:border-gray-500 cursor-default transition-all duration-300 ${
                !isVisible ? 'opacity-0 scale-95 pointer-events-none' : 'hover:shadow-xl'
            }`}
        >
            <div className='flex items-center'>
                <span className='inline sm:hidden'>xs</span>
                <span className='hidden sm:inline md:hidden'>sm</span>
                <span className='hidden md:inline lg:hidden'>md</span>
                <span className='hidden lg:inline xl:hidden'>lg</span>
                <span className='hidden xl:inline 2xl:hidden'>xl</span>
                <span className='hidden 2xl:inline'>2xl</span>
            </div>

            <button
                onClick={e => {
                    e.stopPropagation()
                    setIsVisible(false)
                }}
                className='ml-1 -mr-1.5 p-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors'
                aria-label='Close screen size indicator'
            >
                <svg className='w-3 h-3 text-current' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
            </button>
        </div>
    )
}
