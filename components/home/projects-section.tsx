'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { FadeInWhenVisible, ScaleInWhenVisible } from '@/components/motions/scroll-animation'
import { DemoProjectCard } from '@/components/projects/demo-project-card'
import { demo_projects } from '@/fatch-data/data/projects-data'
import type { DemoProjectType } from '@/types/project'

const projects = [...demo_projects]

export function ProjectsSection() {
    const [columns, setColumns] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setColumns(1)
            } else if (window.innerWidth < 1024) {
                setColumns(2)
            } else {
                setColumns(3)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const projectColumns = Array.from({ length: columns }, () => [] as DemoProjectType[])
    projects.forEach((project, index) => {
        const columnIndex = index % columns
        projectColumns[columnIndex].push(project)
    })

    return (
        <section id='work' className='py-20 px-20 overflow-x-hidden'>
            <div className='container px-4 sm:px-6 md:px-8'>
                <FadeInWhenVisible className='text-center mb-16'>
                    <Button variant='outline' className='text-xl text-fluo-500 font-medium rounded-full bg-muted/30 dark:bg-black mb-1'>
                        Projects
                    </Button>
                    <h2 className='text-3xl font-bold mb-4'>Featured Projects</h2>
                    <p className='text-muted-foreground max-w-2xl mx-auto'>
                        A selection of my recent work. These projects showcase my skills and expertise in different areas.
                    </p>
                </FadeInWhenVisible>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {projectColumns.map((column, colIndex) => (
                        <div key={colIndex} className='flex flex-col space-y-6'>
                            {column.map((project, projIndex) => (
                                <ScaleInWhenVisible key={projIndex} delay={(projIndex * 0.1) % 0.3}>
                                    <DemoProjectCard
                                        title={project.title}
                                        description={project.description}
                                        image={project.image}
                                        technologies={project.technologies}
                                    />
                                </ScaleInWhenVisible>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
