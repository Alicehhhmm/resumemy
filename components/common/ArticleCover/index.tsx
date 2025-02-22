import type { FC } from 'react'

import { Kail } from '@/components/icons'
import { HexagonGrid } from '@/components/special-effects'
import type { BlogPreviewType } from '@/types/blog'

import { cn } from '@/lib/utils'
import styles from './index.module.css'

type ArticleCoverProps = {
    title: string
    type?: BlogPreviewType
}

const ArticleCover: FC<ArticleCoverProps> = ({ type = 'default', title }) => (
    <div className={cn(styles.root, styles[type])}>
        <div className={styles.container} aria-hidden={true}>
            <HexagonGrid className={styles.hexagon} stopOpacity='0.2' />
            <Kail className={styles.logo} />
            {title}
        </div>
    </div>
)

export default ArticleCover
