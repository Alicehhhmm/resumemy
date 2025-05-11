import { memo } from 'react'
import type { ReactNode, FC } from 'react'
import styles from './index.module.css'

interface CardComponentProps {
    active?: boolean
    isLink?: boolean
    children: ReactNode
    className?: string
}

const CardComponent: FC<CardComponentProps> = ({ children, isLink = true, active = false, className }) => {
    return (
        <div className={`${styles.r3dcard} ${!isLink ? styles.noLink : ''} ${active ? styles.activeDot : ''} ${className}`}>{children}</div>
    )
}

CardComponent.displayName = 'R3DCard'

export const R3DCard = memo(CardComponent)

export default R3DCard
