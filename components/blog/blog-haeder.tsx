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
        <header className='relative overflow-hidden rounded-lg'>
            <div className='relative bg-white dark:bg-neutral-950/60 px-3 sm:px-4 pt-3 sm:pt-4 rounded-lg shadow-sm'>
                {cover && (
                    <>
                        {/* 动态遮罩层 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent z-10 rounded-lg'
                        />

                        {/* 背景图片 */}
                        <motion.div {...ANIMATION.image} className='absolute inset-0 rounded-lg overflow-hidden'>
                            <Image
                                src={cover}
                                alt={title}
                                fill
                                priority
                                className='object-cover'
                                sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, 80vw'
                            />
                        </motion.div>
                    </>
                )}

                {/* 内容容器 */}
                <div className='relative z-20 mx-auto flex flex-col justify-start pb-3 sm:pb-4 md:pb-6 px-2 sm:px-4'>
                    <div className='max-w-4xl space-y-2 md:space-y-3'>
                        {/* 标题动画 */}
                        <motion.h1
                            {...ANIMATION.text}
                            transition={ANIMATION.text.transition(0)}
                            className={`text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-tight
                                ${cover ? 'text-white' : 'text-gray-900 dark:text-muted-foreground'}`}
                        >
                            {title}
                        </motion.h1>

                        {/* 描述动画 */}
                        {description && (
                            <motion.p
                                {...ANIMATION.text}
                                transition={ANIMATION.text.transition(1)}
                                className={`text-sm sm:text-base leading-relaxed max-w-2xl font-normal
                                    ${cover ? 'text-white/90' : 'text-gray-600 dark:text-muted-foreground/80'}`}
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
