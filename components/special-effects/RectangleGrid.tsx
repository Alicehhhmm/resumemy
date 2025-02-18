import type { FC, SVGProps } from 'react'

interface RectangleGridProps extends SVGProps<SVGSVGElement> {
    smallGridColor?: string
    largeGridColor?: string
    smallGridSize?: number
    largeGridSize?: number
    smallGridWidth?: number
    largeGridWidth?: number
}

export const RectangleGrid: FC<RectangleGridProps> = ({
    smallGridColor = 'rgba(194, 195, 197, 0.5)',
    largeGridColor = 'rgba(162, 163, 165, 0.5)',
    smallGridSize = 10,
    largeGridSize = 50,
    smallGridWidth = 0.5,
    largeGridWidth = 1,
    ...props
}) => (
    <svg 
        viewBox="0 0 1216 726" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
        {...props}
    >
        <mask 
            id="rectangleGridMask" 
            style={{ maskType: 'alpha' }} 
            maskUnits="userSpaceOnUse" 
            x="0" 
            y="0" 
            width="1216" 
            height="726"
        >
            <rect width="1216" height="726" fill="url(#gridGradient)" />
        </mask>
        <g mask="url(#rectangleGridMask)">
            <defs>
                <pattern 
                    id="smallGrid" 
                    width={smallGridSize} 
                    height={smallGridSize} 
                    patternUnits="userSpaceOnUse"
                >
                    <path 
                        d={`M ${smallGridSize} 0 L 0 0 0 ${smallGridSize}`}
                        fill="none"
                        stroke={smallGridColor}
                        strokeWidth={smallGridWidth}
                    />
                </pattern>
                <pattern 
                    id="largeGrid" 
                    width={largeGridSize} 
                    height={largeGridSize} 
                    patternUnits="userSpaceOnUse"
                >
                    <rect 
                        width={largeGridSize} 
                        height={largeGridSize} 
                        fill="url(#smallGrid)" 
                    />
                    <path 
                        d={`M ${largeGridSize} 0 L 0 0 0 ${largeGridSize}`}
                        fill="none"
                        stroke={largeGridColor}
                        strokeWidth={largeGridWidth}
                    />
                </pattern>
                <radialGradient
                    id="gridGradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#D9D9D9" stopOpacity="0.1" offset="0%" />
                    <stop stopColor="#D9D9D9" stopOpacity="0" offset="80%" />
                </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#largeGrid)" />
        </g>
    </svg>
)

export default RectangleGrid