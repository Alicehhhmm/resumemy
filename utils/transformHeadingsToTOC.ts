import type { Heading } from '@vcarl/remark-headings'
import type { TOCItem } from '@/components/common/NestedDirectory'

/**
 * 将 @vcarl/remark-headings' 的平面结构转换为嵌套目录树结构
 *
 * @param {import('@vcarl/remark-headings').Heading[]} headings - 原始标题数据集
 * @param {number} [startLevel=1] - 起始渲染层级（1-6），如设为2则忽略h1
 * @returns {TOCItem[]} 嵌套目录结构，符合树形组件渲染需求
 *
 * @example 典型输入输出结构
 * // 输入：depth=1 → 2 → 3 → 2 的层级序列
 * // 输出：1
 * //      ├─2
 * //      │ └─3
 * //      └─2
 *
 * @note 关键处理逻辑
 * - 当检测到层级回退时（如当前层级≤栈顶层级），执行栈弹出直到找到合适父级
 * - 栈顶始终指向当前节点的直接父级
 * - 自动处理不连续层级（如从h2直接到h4）
 */
export const transformHeadingsToTOC = (headings: Array<Heading>, startLevel: number = 1): TOCItem[] => {
    if (headings.length <= 0) return []
    const toc: TOCItem[] = []
    const stack: { item: TOCItem; level: number }[] = []

    // 参数校验: 默认只支持1-6层级
    const validStartLevel = Math.min(Math.max(Math.floor(startLevel), 1), 6)

    const processedHeadings = headings
        // 过滤低于起始层级的节点
        .filter(h => h.depth >= validStartLevel)
        // 层级偏移计算（保持level≥1）
        .map(h => ({
            ...h,
            depth: h.depth - (validStartLevel - 1)
        }))

    for (const heading of processedHeadings) {
        const currentItem: TOCItem = {
            id: heading.data.id,
            title: heading.value,
            level: heading.depth,
            children: [],
        }

        // 层级回溯：弹出所有层级>=当前层级的父级
        while (stack.length > 0 && stack[stack.length - 1].level >= currentItem.level) {
            stack.pop()
        }

        // 根节点直接加入结果集
        if (stack.length === 0) {
            toc.push(currentItem)
        } else {
            // 作为子节点挂载到最近父级
            const parent = stack[stack.length - 1].item
            parent.children = parent.children || []
            parent.children.push(currentItem)
        }

        // 当前节点成为后续节点的潜在父级
        stack.push({ item: currentItem, level: currentItem.level })
    }

    return toc
}

export default transformHeadingsToTOC