import { memo } from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
    searchTerm?: string
    category?: string
}

export const EmptyState = memo(({ searchTerm, category }: EmptyStateProps) => {
    return (
        <div className='flex flex-col items-center justify-center py-16 px-4 text-center min-h-[400px]'>
            <div className='bg-gray-100 p-4 rounded-full mb-4'>
                <Search className='h-8 w-8 text-gray-400' aria-hidden='true' />
            </div>
            <h3 className='text-xl font-medium mb-2'>No projects found</h3>
            {searchTerm ? (
                <p className='text-gray-500 max-w-md'>
                    We couldn't find any projects matching "{searchTerm}"
                    {category && category !== 'all' ? ` in the ${category} category` : ''}.
                </p>
            ) : (
                <p className='text-gray-500 max-w-md'>
                    We couldn't find any projects{category && category !== 'all' ? ` in the ${category} category` : ''}.
                </p>
            )}
            <p className='text-gray-500 mt-2'>Try adjusting your search or filter criteria.</p>
        </div>
    )
})
