import { memo } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

import type { Project } from '@/types/project'

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
                <div className='flex flex-wrap items-center gap-1 my-3'>
                    {project.technologies.map((tech, i) => (
                        <div key={i}>
                            <Badge variant='secondary' className='hover:bg-primary/10 transition-colors'>
                                {tech}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
})

export const ProjectCardSkeleton = memo(() => {
    return (
        <Card className='overflow-hidden border border-gray-200 rounded-xl h-full flex flex-col'>
            <div className='aspect-video w-full'>
                <Skeleton className='w-full h-full' />
            </div>
            <div className='p-4 flex-1 flex flex-col'>
                <Skeleton className='h-6 w-3/4 mb-2' />
                <div className='flex-1'>
                    <Skeleton className='h-4 w-full mb-1' />
                </div>
                <div className='flex items-center gap-1 my-3'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className='h-4 w-10' />
                </div>
            </div>
        </Card>
    )
})
