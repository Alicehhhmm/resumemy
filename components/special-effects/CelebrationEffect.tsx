'use client'
/**
 * 鼠标点击礼花特效组件
 * 功能特性：
 * - 点击位置触发彩色礼花爆炸效果
 * - 粒子物理模拟（重力、空气阻力、随机初速度）
 * - 自动粒子回收机制
 * - 多色渐变粒子效果
 * - 性能优化渲染
 */
import React, { useState, useEffect, useRef, CSSProperties, useCallback } from 'react'

// 礼花粒子类型定义
type FireworkParticle = {
    id: number
    x: number
    y: number
    vx: number // X轴速度
    vy: number // Y轴速度
    size: number // 粒子尺寸
    color: string // 颜色
    life: number // 剩余生命周期(ms)
    rotation: number // 旋转角度
}

// 组件属性接口
interface CelebrationEffectProps {
    active?: boolean // 是否激活效果
    particleCount?: number // 每次爆炸粒子数
    maxParticles?: number // 最大存在粒子数
    explosionForce?: number // 爆炸力度
    colors?: string[] // 粒子颜色集合
    gravity?: number // 重力加速度
    airResistance?: number // 空气阻力
}

// 默认配置常量
const DEFAULT_COLORS = [
    '#FF3366', // 品红
    '#FF6633', // 橙色
    '#FF33CC', // 粉红
    '#33CCFF', // 天蓝
    '#33FFCC', // 蓝绿
]
const DEFAULT_EXPLOSION_FORCE = 15
const DEFAULT_GRAVITY = 0.35
const DEFAULT_AIR_RESISTANCE = 0.96

const CelebrationEffect = ({
    active = true,
    particleCount = 60,
    maxParticles = 800,
    explosionForce = DEFAULT_EXPLOSION_FORCE,
    colors = DEFAULT_COLORS,
    gravity = DEFAULT_GRAVITY,
    airResistance = DEFAULT_AIR_RESISTANCE,
}: CelebrationEffectProps) => {
    // 粒子状态存储
    const [particles, setParticles] = useState<FireworkParticle[]>([])
    // 动画帧引用
    const animationFrame = useRef<number>(null)

    /**
     * 创建爆炸粒子
     * @param originX 爆炸原点X坐标
     * @param originY 爆炸原点Y坐标
     */
    const createExplosion = useCallback(
        (originX: number, originY: number) => {
            const newParticles: FireworkParticle[] = Array(particleCount)
                .fill(null)
                .map((_, i) => {
                    // 极坐标生成随机方向
                    const angle = Math.random() * Math.PI * 2
                    const force = explosionForce * (0.7 + Math.random() * 0.3)

                    return {
                        id: Date.now() + i,
                        x: originX,
                        y: originY,
                        vx: Math.cos(angle) * force,
                        vy: Math.sin(angle) * force,
                        size: 3 + Math.random() * 5,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        life: 1000 + Math.random() * 500,
                        rotation: Math.random() * 360,
                    }
                })

            setParticles(prev => [...prev.slice(-(maxParticles - particleCount)), ...newParticles])
        },
        [particleCount, maxParticles, explosionForce, colors]
    )

    // 点击事件监听
    useEffect(() => {
        if (!active) return

        const handleClick = (e: MouseEvent) => {
            createExplosion(e.clientX, e.clientY)
        }

        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [active, createExplosion])

    // 粒子动画引擎
    useEffect(() => {
        const updateParticles = () => {
            setParticles(prev =>
                prev
                    .filter(p => p.life > 0)
                    .map(p => {
                        // 物理参数更新
                        const newVy = p.vy * airResistance + gravity
                        const newVx = p.vx * airResistance

                        return {
                            ...p,
                            x: p.x + newVx,
                            y: p.y + newVy,
                            vx: newVx,
                            vy: newVy,
                            life: p.life - 16, // 60fps时间衰减
                            rotation: p.rotation + newVx * 3, // 根据速度旋转
                        }
                    })
            )
            animationFrame.current = requestAnimationFrame(updateParticles)
        }

        animationFrame.current = requestAnimationFrame(updateParticles)
        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current)
            }
        }
    }, [gravity, airResistance])

    /**
     * 生成粒子样式
     * @param p 粒子对象
     * @returns CSS属性对象
     */
    const getParticleStyle = useCallback(
        (p: FireworkParticle): CSSProperties => ({
            position: 'fixed',
            left: 0,
            top: 0,
            transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, white, ${p.color})`,
            pointerEvents: 'none',
            opacity: Math.min(1, p.life / 600),
            transition: 'transform 0.1s linear',
            willChange: 'transform, opacity',
        }),
        []
    )

    return (
        <>
            {particles.map(p => (
                <div key={p.id} className='firework-particle' style={getParticleStyle(p)} />
            ))}
        </>
    )
}

export default CelebrationEffect
