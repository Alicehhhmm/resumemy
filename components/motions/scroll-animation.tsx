'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { type ReactNode, useRef } from 'react'

type FadeInWhenVisibleProps = {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeInWhenVisible({ children, delay = 0, className = '' }: FadeInWhenVisibleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function ScaleInWhenVisible({ children, delay = 0, className = '' }: FadeInWhenVisibleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function ParallaxSection({ children, className = '' }: { children: ReactNode; className?: string }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}
