'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Download, Github, Linkedin, Instagram, Twitter } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TextAnimation, AnimatedWord, TypedText } from '@/components/motions/text-animation'

export function HeroSection() {
    const t = useTranslations()

    const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'UI/UX']

    const IconMap = [
        { icon: <Github size={18} />, label: 'GitHub' },
        { icon: <Linkedin size={18} />, label: 'LinkedIn' },
        { icon: <Instagram size={18} />, label: 'Instagram' },
        { icon: <Twitter size={18} />, label: 'Twitter' },
    ]

    return (
        <section className='min-h-[calc(100vh-146.4px)] p-20 max-sm:p-4 flex items-center'>
            <div className='container'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    <div className='flex justify-center'>
                        <div className='p-2'>
                            <TextAnimation delay={0.1}>
                                <p className='text-muted-foreground font-mono mb-2'>Software Developer</p>
                            </TextAnimation>

                            <motion.h1
                                className='text-5xl md:text-6xl font-bold mb-6'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <AnimatedWord delay={0.3}>{t('home.hi')}</AnimatedWord>
                                <br />
                                <TypedText text='Norush' delay={0.8} className='text-primary mt-2 block' />
                            </motion.h1>

                            <TextAnimation delay={1.2}>
                                <p className='text-muted-foreground max-w-md mb-6'>{t('home.introduce')}</p>
                            </TextAnimation>

                            <motion.div
                                className='flex flex-wrap gap-2 mb-8'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                            >
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant='outline' className='skill-tag py-1 px-3 cursor-pointer'>
                                        {skill}
                                    </Badge>
                                ))}
                            </motion.div>

                            <motion.div
                                className='flex flex-wrap gap-4 mb-8'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.6 }}
                            >
                                <Button className='rounded-full gap-2 btn-pulse overflow-hidden relative dark:bg-fluo-500'>
                                    <span className='relative z-10 flex items-center gap-2 '>
                                        <Download size={16} />
                                        DOWNLOAD CV
                                    </span>
                                    <motion.div
                                        className='absolute inset-0 bg-primary/10'
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '0%' }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </Button>

                                <div className='flex gap-3'>
                                    {IconMap.map((social, index) => (
                                        <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} custom={index}>
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                className='rounded-full hover-glow hover:border-primary hover:text-primary transition-all duration-300'
                                                aria-label={social.label}
                                            >
                                                {social.icon}
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className='hidden lg:flex justify-center '
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                    >
                        <div className='w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className='w-full h-full'>
                                    <Image
                                        src='/banner/shape.svg?height=400&width=400'
                                        alt='Norush'
                                        width={400}
                                        height={400}
                                        className='object-cover cursor-grab'
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
