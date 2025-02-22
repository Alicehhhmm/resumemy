'use client'

import { useEffect, useRef, useCallback } from 'react'

interface InkParticle {
    x: number
    y: number
    radius: number
    dx: number
    dy: number
    life: number
    opacity: number
}

export const InkEffects = ({
    color = '30, 30, 30',
    particleCount = 150,
    maxRadius = 2.5,
    speedFactor = 0.3,
}: {
    color?: string
    particleCount?: number
    maxRadius?: number
    speedFactor?: number
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<InkParticle[]>([])
    const animationFrameId = useRef<number>(null)

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const container = canvas.parentElement
        const dpr = window.devicePixelRatio || 1

        if (container) {
            const rect = container.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            canvas.style.width = `${rect.width}px`
            canvas.style.height = `${rect.height}px`
        }

        return canvas.getContext('2d')
    }, [])

    const createParticle = (ctx: CanvasRenderingContext2D): InkParticle => {
        const angle = Math.random() * Math.PI * 2
        const speed = (Math.random() * 2 + 1) * speedFactor
        return {
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height,
            radius: Math.random() * maxRadius + 1,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: 1,
            opacity: Math.random() * 0.5 + 0.2,
        }
    }

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: InkParticle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${particle.opacity * particle.life})`
        ctx.fill()
    }

    const updateParticles = (ctx: CanvasRenderingContext2D) => {
        particlesRef.current.forEach((p, index) => {
            p.x += p.dx
            p.y += p.dy
            p.life -= 0.005

            // 边界反弹
            if (p.x < 0 || p.x > ctx.canvas.width) p.dx *= -1
            if (p.y < 0 || p.y > ctx.canvas.height) p.dy *= -1

            // 生命周期结束则重置粒子
            if (p.life <= 0) {
                particlesRef.current[index] = createParticle(ctx)
            }
        })
    }

    const animate = useCallback(() => {
        const ctx = initCanvas()
        if (!ctx) return

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        // 添加水墨扩散效果
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = `rgba(${color}, 0.03)`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        particlesRef.current.forEach(p => drawParticle(ctx, p))
        updateParticles(ctx)

        animationFrameId.current = requestAnimationFrame(animate)
    }, [color, initCanvas])

    useEffect(() => {
        const ctx = initCanvas()
        if (ctx) {
            // 初始化粒子
            particlesRef.current = Array.from({ length: particleCount }, () => createParticle(ctx))
            animate()
        }

        const handleResize = () => {
            initCanvas()
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [animate, initCanvas, particleCount])

    return <canvas ref={canvasRef} className='pointer-events-none fixed inset-0 z-0' aria-hidden='true' />
}
