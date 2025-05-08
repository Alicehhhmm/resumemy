import { memo } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar } from '@/components/ui/avatar'
import type { Project } from '@/types/project'
import { formatNumber } from '@/lib/date'

interface ProjectCardProps {
    project: Project
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
    return (
        <Card className='overflow-hidden border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200 h-full flex flex-col'>
            <div className='aspect-video w-full overflow-hidden'>
                <img
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform hover:scale-105 duration-300'
                    loading='lazy'
                />
            </div>
            <div className='p-4 flex-1 flex flex-col'>
                <h3 className='font-medium text-lg'>{project.title}</h3>
                <p className='text-sm text-gray-500 mt-1 line-clamp-2 flex-1'>{project.description}</p>
                <div className='flex items-center gap-2 mt-3'>
                    <Avatar className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0'>
                        <img src={project.avatar || '/placeholder.svg'} alt={`${project.author}'s avatar`} loading='lazy' />
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <span className='text-sm text-gray-500'>{formatNumber(project.forks)} Forks</span>
                        <span className='text-sm text-gray-500'>{formatNumber(project.stars)} Stars</span>
                    </div>
                </div>
            </div>
        </Card>
    )
})

export const ProjectCardSkeleton = memo(() => {
    return (
        <Card className='overflow-hidden border border-gray-200 rounded-xl h-full flex flex-col'>
            {/* Image skeleton - fixed aspect ratio */}
            <div className='aspect-video w-full'>
                <Skeleton className='w-full h-full' />
            </div>

            <div className='p-4 flex-1 flex flex-col'>
                {/* Title skeleton */}
                <Skeleton className='h-6 w-3/4 mb-2' />

                {/* Description skeleton - two lines with flex-1 to push avatar to bottom */}
                <div className='flex-1'>
                    <Skeleton className='h-4 w-full mb-1' />
                    <Skeleton className='h-4 w-5/6 mb-3' />
                </div>

                {/* Avatar and stats skeleton */}
                <div className='flex items-center gap-2 mt-3'>
                    <Skeleton className='h-8 w-8 rounded-full flex-shrink-0' />
                    <div className='flex items-center gap-3 flex-1'>
                        <Skeleton className='h-4 w-16' />
                        <Skeleton className='h-4 w-16' />
                    </div>
                </div>
            </div>
        </Card>
    )
})
