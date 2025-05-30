import type { FC } from 'react'

interface RightsReservedProps {
    className?: string
    textClassName?: string
    companyName?: string
    startYear?: number
}

const RightsReserved: FC<RightsReservedProps> = ({
    className = '',
    textClassName = 'text-sm text-muted-foreground max-sm:text-xs',
    companyName = 'Norush',
    startYear = 2024,
}) => {
    const currentYear = new Date().getFullYear()

    return (
        <div className={className}>
            <p className={textClassName}>
                © {startYear}-PRESENT({currentYear}). by {companyName}
            </p>
        </div>
    )
}

export default RightsReserved
