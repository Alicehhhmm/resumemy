'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface BlogHeaderProps {
    cover?: string
    title?: string
    description?: string
}

// 动画配置常量
const ANIMATION = {
    image: {
        initial: { scale: 1.1, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    text: {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: (delay: number) => ({
            duration: 0.8,
            delay: 0.4 + delay * 0.1,
            ease: [0.33, 1, 0.68, 1],
        }),
    },
    accent: {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition: {
            duration: 1.4,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

export const BlogHeader = ({ cover, title = '', description = '' }: BlogHeaderProps) => {
    return (
        <header className='relative overflow-hidden'>
            {/* 背景容器 */}
            <div className='relative '>
                {cover && (
                    <>
                        {/* 动态遮罩层 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent z-10'
                        />

                        {/* 背景图片 */}
                        <motion.div {...ANIMATION.image} className='absolute inset-0'>
                            <Image src={cover} alt={title} fill priority className='object-cover' sizes='(max-width: 768px) 100vw, 80vw' />
                        </motion.div>
                    </>
                )}

                {/* 内容容器 */}
                <div className='relative z-20 container mx-auto flex flex-col justify-start pb-2 md:pb-4 lg:pb-8 px-6 sm:px-8'>
                    <div className='max-w-4xl space-y-2 md:space-y-3'>
                        {/* 标题动画 */}
                        <motion.h1
                            {...ANIMATION.text}
                            transition={ANIMATION.text.transition(0)}
                            className='text-xl md:text-2xl lg:text-4xl font-medium text-foreground dark:text-foreground tracking-tight leading-[1.15] md:leading-[1.15] '
                        >
                            {title}
                        </motion.h1>

                        {/* 描述动画 */}
                        {description && (
                            <motion.p
                                {...ANIMATION.text}
                                transition={ANIMATION.text.transition(1)}
                                className='text-base md:text-lg text-foreground dark:text-white/90 leading-relaxed max-w-2xl font-normal'
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>

            {/* 装饰性动画线条 */}
            <motion.div
                {...ANIMATION.accent}
                className='h-[3px] bg-gradient-to-r from-emerald-500/95 to-cyan-400/95 
                 w-full origin-left'
                style={{
                    boxShadow: '0 2px 12px rgba(34, 197, 94, 0.15)',
                }}
            />
        </header>
    )
}
