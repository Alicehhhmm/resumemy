import type { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { DemoProjectType } from '@/types/project'

interface DemoProjectCardProps extends DemoProjectType {}

export const DemoProjectCard: FC<DemoProjectCardProps> = ({ title, description, image, technologies }) => {
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
