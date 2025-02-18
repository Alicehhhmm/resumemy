import type { FC } from 'react'

import { HexagonGrid } from '@/components/special-effects'
import styles from './index.module.css'

export const GlowingBackdrop: FC = () => {
    return (
        <div className={styles.glowingBackdrop}>
            <HexagonGrid className='w-full h-full' />
        </div>
    )
}

export default GlowingBackdrop
