import type { FC, PropsWithChildren } from 'react'
import { memo, Children } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const masonryGridVariants = cva('w-full', {
    variants: {
        columns: {
            '1': 'columns-1',
            '2': 'columns-1 sm:columns-2',
            '3': 'columns-1 sm:columns-2 md:columns-3',
            '4': 'columns-1 sm:columns-2 md:columns-3 lg:columns-4',
        },
        gap: {
            none: '',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
        },
        padding: {
            none: '',
            sm: 'px-2 py-2',
            md: 'px-4 py-4',
            lg: 'px-6 py-6',
        },
    },
    defaultVariants: {
        columns: '3',
        gap: 'md',
        padding: 'md',
    },
})

export interface MasonryGridProps extends PropsWithChildren, VariantProps<typeof masonryGridVariants> {
    className?: string
}

const MasonryGrid: FC<MasonryGridProps> = memo(({ children, className, columns, gap, padding }) => {
    return (
        <div className={cn(masonryGridVariants({ columns, gap, padding }), className)}>
            {Children.map(children, (child, i) => (
                <div key={i} className='break-inside-avoid mb-4'>
                    {child}
                </div>
            ))}
        </div>
    )
})

MasonryGrid.displayName = 'MasonryGrid'

export { MasonryGrid }
