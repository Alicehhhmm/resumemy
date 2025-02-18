import type { FC, SVGProps } from 'react'

type RectangleGridProps = {
    /** 小网格尺寸（单位：像素）默认 20px */
    smallGridSize?: number
    /** 大网格包含的小网格数量 默认 5 */
    gridCount?: number
    /** 小网格颜色 默认 #E1E1E1 */
    smallColor?: string
    /** 大网格颜色 默认 #e2e3e4 */
    largeColor?: string
    /** 小网格线宽 默认 0.5 */
    smallStroke?: number
    /** 大网格线宽 默认 1 */
    largeStroke?: number
} & SVGProps<SVGSVGElement>

export const RectangleGrid: FC<RectangleGridProps> = ({
    smallGridSize = 20,
    gridCount = 5,
    smallColor = 'rgba(225,225,225,0.4)',
    largeColor = 'rgba(226,227,228,0.4)',
    smallStroke = 0.5,
    largeStroke = 1,
    ...props
}) => {
    const largeGridSize = smallGridSize * gridCount

    return (
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' preserveAspectRatio='none' {...props}>
            <defs>
                <pattern id='smallGrid' width={smallGridSize} height={smallGridSize} patternUnits='userSpaceOnUse'>
                    <path d={`M ${smallGridSize} 0 L 0 0 0 ${smallGridSize}`} fill='none' stroke={smallColor} strokeWidth={smallStroke} />
                </pattern>

                <pattern id='largeGrid' width={largeGridSize} height={largeGridSize} patternUnits='userSpaceOnUse'>
                    <rect width={largeGridSize} height={largeGridSize} fill='url(#smallGrid)' />
                    <path d={`M ${largeGridSize} 0 L 0 0 0 ${largeGridSize}`} fill='none' stroke={largeColor} strokeWidth={largeStroke} />
                </pattern>
            </defs>

            <rect x='0' y='0' width='100%' height='100%' fill='url(#largeGrid)' />
        </svg>
    )
}

export default RectangleGrid
