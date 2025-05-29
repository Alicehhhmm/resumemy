import type { FC, SVGProps } from 'react'

interface LogonProps extends SVGProps<SVGSVGElement> {
    bgfill?: boolean
}

export const Logon: FC<LogonProps> = ({ bgfill, fill = 'currentColor', ...props }) => (
    <svg id='logon' width='100%' height='100%' viewBox='0 0 165 165' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx='82.5' cy='82.5' r='82.5' fill={bgfill ? 'currentColor' : 'none'} />
        <path
            d='M33 66.3179C33 58.6943 33 48.0163 33 42.5423C33 40.9849 34.6749 40.0123 36.0078 40.8179C48.6976 48.4876 98.7564 78.7429 132.437 99.0993V122.872C132.437 124.429 130.735 125.389 129.403 124.583L33 66.3179Z'
            fill={fill}
        />
        <path d='M55.4007 92.543L33 78.8841V115.49C36.8245 126.417 46.1126 126.417 55.4007 126.417V92.543Z' fill={fill} />
        <path d='M111.675 74.5132V39C126.536 39 131.709 47.3775 132.437 51.5662V86.5331L111.675 74.5132Z' fill={fill} />
    </svg>
)
