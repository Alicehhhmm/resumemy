import { ReactElement, useMemo, FC, useState, useEffect } from 'react'

import { cn } from '@/lib/utils'
import styles from './index.module.css'
import { useArticleContext } from '@/hooks'

export interface TOCItem {
    id: string
    title: string
    level: number
    actionId?: string
    children?: TOCItem[]
}

interface NestedDirectoryProps {
    // 默认最大层级：4
    maxLayer?: number | string
    // 默认缩进：16
    indent?: number
    // 目录数据集
    directories: TOCItem[]
}

export const NestedDirectory: FC<NestedDirectoryProps> = ({ maxLayer = 4, indent = 16, directories }) => {
    const { tocOptions } = useArticleContext()
    const activeKey = tocOptions?.activeKey
    const [active, setActive] = useState(activeKey)

    const onClick = (id: string) => {
        setActive(id)
    }

    useEffect(() => {
        setActive(activeKey)
    }, [activeKey])

    // 限制在 1-6 层级之间
    const maxDepth = useMemo(() => {
        const parsed = typeof maxLayer === 'string' ? parseInt(maxLayer, 10) : maxLayer
        return Math.max(1, Math.min(parsed, 6))
    }, [maxLayer])

    // Recursive component to render directory items
    const DirectoryItem = ({ item }: { item: TOCItem }): ReactElement => {
        const currentDepth = item.level
        const autoIndent = indent * (currentDepth - 1)
        const isAction = item.id === active

        return (
            <>
                <li className={styles.directoryItem} onClick={() => onClick(item.id)}>
                    <a
                        href={`#${item.id}`}
                        className={cn(styles.subtitle, isAction ? styles['active'] : '')}
                        style={{ marginLeft: `${autoIndent}px` }}
                    >
                        <span>{item.title}</span>
                    </a>
                </li>
                {currentDepth < maxDepth && item.children && item.children.length > 0 && (
                    <>
                        {item.children.map(child => (
                            <DirectoryItem key={child.id} item={child} />
                        ))}
                    </>
                )}
            </>
        )
    }

    return (
        <nav className='mt-1'>
            <ul className='relative space-y-1 p-0'>
                {directories.map(item => (
                    <DirectoryItem key={item.id} item={item} />
                ))}
            </ul>
        </nav>
    )
}

export default NestedDirectory
