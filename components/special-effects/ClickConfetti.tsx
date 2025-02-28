import React, { useState, useEffect, useRef, CSSProperties, useCallback } from 'react'

// 经典彩色碎片粒子定义
type ConfettiParticle = {
    type: 'confetti' // 粒子类型标识
    id: number // 唯一标识符
    x: number // X轴坐标
    y: number // Y轴坐标
    color: string // 粒子颜色
    angle: number // 运动角度(度)
    velocity: number // 运动速度(px/frame)
    scale: number // 缩放比例(0-1)
    life: number // 剩余生命周期(ms)
}

// Unicode字符粒子定义
type UnicodeParticle = {
    type: 'unicode' // 粒子类型标识
    id: number // 唯一标识符
    x: number // X轴坐标
    vx: number // X轴速度
    vy: number // Y轴速度
    y: number // Y轴坐标
    shape: string // Unicode字符
    life: number // 剩余生命周期(ms)
    rotation: number // 旋转角度(度)
}

// 联合粒子类型
type Particle = ConfettiParticle | UnicodeParticle

interface ClickConfettiProps {
    /**
     * 粒子效果类型
     * @default 'confetti'
     * @description 决定生成的粒子类型，可选值为 `'confetti'` 或 `'unicode'`。
     */
    effectType?: 'confetti' | 'unicode'

    /**
     * 是否启用效果
     * @default true
     * @description 是否启用粒子喷射效果。
     */
    active?: boolean

    /**
     * 每次点击生成粒子数
     * @default 50
     * @description 每次点击时生成的粒子数量。
     */
    particleCount?: number

    /**
     * 最大同时存在粒子数
     * @default 200
     * @description 粒子池的最大容量，超过此数量时，旧粒子会被自动回收。
     */
    maxParticles?: number

    /**
     * 自定义颜色池
     * @default []
     * @description 用于 `'confetti'` 类型粒子的颜色列表，粒子会从该列表中随机选择颜色。
     */
    colors?: string[]

    /**
     * Unicode模式字符池
     * @default ['🎉', '✨', '🎈', '🎁', '🌟']、 ['❤', '💘', '💝']
     * @description 用于 `'unicode'` 类型粒子的字符列表，粒子会从该列表中随机选择字符。
     */
    unicodeShapes?: string[]

    /**
     * 重力加速度
     * @default 0.2
     * @description 模拟重力对粒子的加速度，单位为 `px/frame²`。
     */
    gravity?: number

    /**
     * 空气阻力系数
     * @default 0.95
     * @description 模拟空气阻力对粒子速度的衰减系数，取值范围为 `0-1`。
     */
    airResistance?: number
}

/** 粒子系统常量 */
const CLASSIC_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'] // 默认经典颜色
const UNICODE_SHAPES = ['✦', '❋', '✻', '❄', '❁', '★', '❆'] // 默认Unicode字符
const DEFAULT_GRAVITY = 0.3 // 默认重力值
const DEFAULT_AIR_RESISTANCE = 0.98 // 默认空气阻力

/**
 * @example
 * <ClickConfetti
 *   effectType='unicode'
 *   colors={['#ff4081', '#ff79b0', '#ffb6c1']}
 *   unicodeShapes={['🎉', '🎁', '🎈', '🎁', '🎁']}
 *   particleCount={30}
 * />
 */
const ClickConfetti = ({
    active = true,
    effectType = 'confetti',
    particleCount = 30,
    maxParticles = 500,
    colors = CLASSIC_COLORS,
    unicodeShapes = UNICODE_SHAPES,
    gravity = DEFAULT_GRAVITY,
    airResistance = DEFAULT_AIR_RESISTANCE,
}: ClickConfettiProps) => {
    // 粒子状态管理
    const [particles, setParticles] = useState<Particle[]>([])
    // 动画帧引用(用于清理)
    const animationFrame = useRef<number>(null)

    /**
     * 粒子工厂函数 - 根据配置生成不同类型的粒子
     * @param e 鼠标事件 - 用于获取生成位置
     * @param index 粒子索引 - 用于生成唯一ID
     * @returns 新粒子实例
     */
    const createParticle = useCallback(
        (e: MouseEvent, index: number): Particle => {
            const baseX = e.clientX
            const baseY = e.clientY

            // 生成经典碎片粒子
            if (effectType === 'confetti') {
                return {
                    type: 'confetti',
                    id: Date.now() + index, // 时间戳+索引确保唯一性
                    x: baseX,
                    y: baseY,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * 360, // 随机初始角度
                    velocity: 4 + Math.random() * 4, // 基础速度+随机量
                    scale: 0.7 + Math.random(), // 基础缩放+随机量
                    life: 800 + Math.random() * 400, // 基础生命周期+随机量
                }
            }

            // 生成Unicode字符粒子
            return {
                type: 'unicode',
                id: Date.now() + index,
                x: baseX,
                y: baseY,
                vx: (Math.random() - 0.5) * 8, // X轴随机速度(-4到4)
                vy: -5 - Math.random() * 3, // Y轴初始向上速度
                shape: unicodeShapes[Math.floor(Math.random() * unicodeShapes.length)],
                life: 1000 + Math.random() * 500,
                rotation: Math.random() * 360, // 初始随机旋转
            }
        },
        [effectType, colors, unicodeShapes]
    )

    /** 粒子生成逻辑 - 监听点击事件并生成新粒子 */
    useEffect(() => {
        if (!active) return

        const handleClick = (e: MouseEvent) => {
            setParticles(prev => {
                // 生成新粒子数组
                const newParticles = Array(particleCount)
                    .fill(null)
                    .map((_, i) => createParticle(e, i))

                // 执行粒子数量限制策略：保留旧粒子中不超过(max - new)的部分
                return [...prev.slice(-(maxParticles - particleCount)), ...newParticles]
            })
        }

        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [active, createParticle, particleCount, maxParticles])

    /** 粒子物理引擎 - 使用requestAnimationFrame更新粒子状态 */
    useEffect(() => {
        const updateParticles = () => {
            setParticles(prev => {
                return (
                    prev
                        // 过滤存活粒子
                        .filter(p => p.life > 0)
                        // 更新粒子状态
                        .map(p => {
                            const lifeRemaining = p.life - 16 // 按60fps衰减

                            if (p.type === 'confetti') {
                                // 经典碎片物理模拟
                                return {
                                    ...p,
                                    x: p.x + Math.cos(p.angle) * p.velocity,
                                    y: p.y + Math.sin(p.angle) * p.velocity * 0.5 + gravity * 2,
                                    velocity: p.velocity * airResistance, // 应用空气阻力
                                    life: lifeRemaining,
                                }
                            }

                            // Unicode字符物理模拟
                            return {
                                ...p,
                                x: p.x + p.vx,
                                y: p.y + p.vy,
                                vx: p.vx * airResistance, // X轴阻力
                                vy: p.vy * airResistance + gravity, // Y轴阻力+重力
                                rotation: p.rotation + p.vx * 2, // 根据水平速度旋转
                                life: lifeRemaining,
                            }
                        })
                )
            })

            // 维持动画循环
            animationFrame.current = requestAnimationFrame(updateParticles)
        }

        // 启动动画循环
        animationFrame.current = requestAnimationFrame(updateParticles)
        return () => {
            // 组件卸载时清理动画帧
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current)
            }
        }
    }, [gravity, airResistance])

    /**
     * 粒子样式生成器 - 根据粒子状态生成动态CSS
     * @param p 粒子实例
     * @returns 对应CSS属性对象
     */
    const getParticleStyle = useCallback((p: Particle): CSSProperties => {
        const baseStyle: CSSProperties = {
            position: 'fixed',
            pointerEvents: 'none', // 防止粒子阻挡点击
            willChange: 'transform', // 优化动画性能
            transition: 'transform 0.1s linear', // 平滑运动
        }

        // 经典碎片样式
        if (p.type === 'confetti') {
            return {
                ...baseStyle,
                left: 0,
                top: 0,
                opacity: Math.min(1, p.life / 600), // 生命周期后期淡出
                transform: `
                    translate(${p.x}px, ${p.y}px)
                    rotate(${p.angle}deg)
                    scale(${p.scale})
                `,
                width: '8px',
                height: '8px',
                backgroundColor: p.color,
                clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', // 菱形裁剪
            }
        }

        // Unicode字符样式
        return {
            ...baseStyle,
            left: p.x,
            top: p.y,
            opacity: Math.min(1, p.life / 800),
            transform: `rotate(${p.rotation}deg)`,
            fontSize: '20px',
            color: '#fff',
            textShadow: '0 0 8px rgba(0,0,0,0.5)', // 添加文字阴影增强可见性
            userSelect: 'none', // 防止文字选择
        }
    }, [])

    return (
        <>
            {particles.map(p =>
                p.type === 'confetti' ? (
                    <div key={p.id} style={getParticleStyle(p)} />
                ) : (
                    <span key={p.id} style={getParticleStyle(p)}>
                        {p.shape}
                    </span>
                )
            )}
        </>
    )
}

export default ClickConfetti
