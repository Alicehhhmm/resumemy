'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface TopLoaderProps {
    color?: string
    crawlSpeed?: number
    initialPosition?: number
}

export function TopLoader({ color = '#000', crawlSpeed = 800, initialPosition = 0.08 }: TopLoaderProps) {
    const [progress, setProgress] = useState(0)
    const animationRef = useRef<number>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // 使用缓动函数优化动画效果
    const easeOutQuad = (t: number) => t * (2 - t)

    useEffect(() => {
        let currentProgress = initialPosition * 100
        let startTime: number
        let timer: NodeJS.Timeout

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime

            // 动画时长控制
            currentProgress = Math.min(elapsed / crawlSpeed, 1)
            // 最高到95%，等待完成时再到100%
            setProgress(easeOutQuad(currentProgress) * 100)

            if (currentProgress < 1) {
                animationRef.current = requestAnimationFrame(animate)
            }
        }

        // 设置初始进度
        setProgress(currentProgress)
        // 启动新动画前先取消旧动画
        cancelAnimationFrame(animationRef.current!)
        animationRef.current = requestAnimationFrame(animate)

        // 清理函数
        return () => {
            cancelAnimationFrame(animationRef.current!)
            setProgress(100)
            timer = setTimeout(() => setProgress(0), 300)
            clearTimeout(timer)
        }
    }, [pathname, searchParams, crawlSpeed, initialPosition])

    if (progress === 0) return null

    return (
        <div className='fixed top-0 left-0 w-full z-[9999]'>
            <Progress
                value={progress}
                className={cn(
                    'h-[1.5px] rounded-none bg-transparent',
                    'transition-all duration-300 ease-[cubic-bezier(0.65,0.05,0.36,1)]',
                    progress >= 100 && 'opacity-0'
                )}
                style={
                    {
                        '--progress-foreground': color,
                    } as React.CSSProperties
                }
            />
        </div>
    )
}
