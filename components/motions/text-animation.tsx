'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type TextAnimationProps = {
    children: ReactNode
    delay?: number
    className?: string
}

export function TextAnimation({ children, delay = 0, className = '' }: TextAnimationProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedWord({ children, delay = 0 }: TextAnimationProps) {
    const words = Array.isArray(children) ? children : [children]

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: delay }}
            className='inline-block'
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + delay }}
                    className='inline-block'
                >
                    {word}{' '}
                </motion.span>
            ))}
        </motion.span>
    )
}

export function TypedText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    const textArray = text.split('')

    return (
        <motion.span
            className={className}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.03, delayChildren: delay }}
        >
            {textArray.map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    )
}
