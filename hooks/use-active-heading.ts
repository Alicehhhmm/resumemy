import { RefObject, useEffect, useState, useRef } from 'react'

type Options = {
    /** 顶部触发边界（px）默认 80px */
    topBoundary?: number
    /** 触发阈值（0-1）默认 0.1 */
    threshold?: number | number[]
}

/**
 * 获取顶部触发顶部交界值的元素ID
 * 
 * @param containerRef 外部包裹元素的 ref 值
 * @param options 预设条件对象
 * @returns 返回触发设定边界值的标题 ID
 */
export const useActiveHeading = (
    containerRef: RefObject<HTMLElement | null>,
    options?: Options
) => {
    // 存储当前活跃标题的 ID
    const [activeId, setActiveId] = useState('')
    // 存储 IntersectionObserver 实例
    const observerRef = useRef<IntersectionObserver>(null)
    // 缓存已观察的标题元素
    const headingsRef = useRef<Element[]>([])

    const { topBoundary = 80, threshold = 0.1 } = options || {}

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // 处理元素与视口交集变化的回调函数
        const handleIntersect: IntersectionObserverCallback = (entries) => {
            // 存储最近的交集元素
            let closestEntry: IntersectionObserverEntry | null = null as IntersectionObserverEntry | null
            // 初始化最小距离为无穷大
            let minDistance = Infinity

            entries.forEach(entry => {
                // 获取元素顶部相对于视口的位置
                const top = entry.boundingClientRect.top
                // 判断元素是否正在接近顶部边界（在可视区顶部附近）
                const isApproaching = top < topBoundary && top > -100
                // 这里的 -100 是一个经验值，用于扩展检测范围，确保元素在接近但还未完全进入边界时也能被检测到

                // 判断元素是否正在离开可视区
                const isLeaving = entry.intersectionRatio < 0.1 && top < 0

                // 如果元素正在接近或离开边界：
                // 计算元素与目标边界的绝对距离
                // 如果当前距离小于已记录的最小距离，更新最近的交集元素与最小距离
                if (isApproaching || isLeaving) {
                    const distance = Math.abs(top - topBoundary)
                    if (distance < minDistance) {
                        closestEntry = entry
                        minDistance = distance
                    }
                }
            })

            if (closestEntry && closestEntry.target.id) {
                setActiveId(closestEntry.target.id)
            }
        }

        // 创建 IntersectionObserver 实例, 并设定顶部交界值
        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: `-${topBoundary}px 0px 0px 0px`,
            threshold: threshold
        })

        // 获取容器内的所有标题元素（h2 到 h6）
        headingsRef.current = Array.from(
            container.querySelectorAll('h2, h3, h4, h5, h6')
        )
        // 遍历所有标题元素并开始观察
        headingsRef.current.forEach(heading => {
            if (heading.id) observerRef.current?.observe(heading)
        })

        return () => {
            // 停止观察所有标题元素
            headingsRef.current.forEach(h => observerRef.current?.unobserve(h))
            // 断开 IntersectionObserver 实例
            observerRef.current?.disconnect()
        }
    }, [containerRef, topBoundary, threshold])

    return activeId
}