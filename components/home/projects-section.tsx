'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeInWhenVisible, ScaleInWhenVisible } from '@/components/motions/scroll-animation'

const projects = [
    {
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with payment processing and inventory management.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    },
    {
        title: 'Health & Fitness App',
        description:
            'Mobile application for tracking workouts, nutrition, and health metrics with personalized training programs and diet suggestions.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['React Native', 'Firebase', 'Redux'],
    },
    {
        title: 'Real Estate Dashboard',
        description: 'Admin dashboard for real estate agents to manage listings and client interactions.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    },
    {
        title: 'Social Media Analytics',
        description: 'Tool for analyzing social media performance and audience engagement metrics from multiple platforms.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['React', 'D3.js', 'Python', 'AWS'],
    },
    {
        title: 'Educational Platform',
        description: 'Online learning platform with course management and student progress tracking.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['Next.js', 'PostgreSQL', 'GraphQL'],
    },
    {
        title: 'Financial Dashboard',
        description: 'Personal finance tracker with budgeting tools and investment analytics with real-time market data.',
        image: '/placeholder.svg?height=300&width=500',
        technologies: ['React', 'Express', 'Chart.js'],
    },
]

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

    const projectColumns = Array.from({ length: columns }, () => [])
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
                                    <ProjectCard
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

interface ProjectProps {
    title: string
    description: string
    image: string
    technologies: string[]
}

function ProjectCard({ title, description, image, technologies }: ProjectProps) {
    return (
        <motion.div
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(var(--primary-rgb), 0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='h-full'
        >
            <Card className='overflow-hidden h-full border-transparent hover:border-primary/30 transition-colors duration-300'>
                <motion.div className='relative h-48 overflow-hidden' whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image src={image || '/placeholder.svg'} alt={title} fill className='object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
                </motion.div>
                <CardContent className='p-6'>
                    <motion.div
                        className='flex flex-wrap gap-2 mb-3'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {technologies.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                            >
                                <Badge variant='secondary' className='hover:bg-primary/10 transition-colors'>
                                    {tech}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                    <h3 className='text-xl font-bold mb-2'>{title}</h3>
                    <p className='text-muted-foreground mb-4'>{description}</p>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                        <Button variant='outline' size='sm' className='gap-2 hover:text-primary hover:border-primary transition-colors'>
                            View Project <ExternalLink size={14} />
                        </Button>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
