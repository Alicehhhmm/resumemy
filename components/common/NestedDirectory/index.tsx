import { ReactElement, useMemo, FC } from 'react'

import styles from './index.module.css'
import { cn } from '@/lib/utils'

export interface TOCItem {
    id: string
    title: string
    level: number
    children?: TOCItem[]
}

interface NestedDirectoryProps {
    // 默认最大层级：4
    maxLayer?: number | string
    // 默认缩进：16
    indent?: number
    // 默认开始标题级别：2
    startLevel?: number
    directories: TOCItem[]
}

export const NestedDirectory: FC<NestedDirectoryProps> = ({ maxLayer = 4, indent = 16, startLevel = 2, directories }) => {
    const memoizedDirectories = useMemo(() => {
        return directories
    }, [directories])

    // Convert maxLayer to a number
    const maxDepth = typeof maxLayer === 'string' ? parseInt(maxLayer, 10) : maxLayer

    // Recursive component to render directory items
    const DirectoryItem = ({ item }: { item: TOCItem }): ReactElement => {
        const currentDepth = item.level
        const autoIndent = indent * (currentDepth - startLevel)

        return (
            <>
                <li className={styles.directoryItem}>
                    <a href={`#${item.title.replace(/\s+/g, '-')}`} className={styles.subtitle} style={{ marginLeft: `${autoIndent}px` }}>
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
            <ul className='relative'>
                {memoizedDirectories.map(item => (
                    <DirectoryItem key={item.id} item={item} />
                ))}
            </ul>
        </nav>
    )
}

export default NestedDirectory
