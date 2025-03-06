/**
 * 响应式网格布局组件
 * @param {Object} config - 配置参数
 * @param {ReactNode} config.children - 子元素
 * @param {number} [config.minWidth=300] - 最小列宽（像素）
 * @param {string} [config.gap='1.5rem'] - 网格间距
 * @param {string} [config.padding='1rem'] - 内边距
 * @param {string} [config.breakpoint='768px'] - 响应式断点
 */
export default function ResponsiveGrid({
    children,
    minWidth = 300,
    gap = '1.5rem',
    padding = '1rem',
    breakpoint = '768px',
}: {
    children: React.ReactNode
    minWidth?: number
    gap?: string
    padding?: string
    breakpoint?: string
}) {
    // 动态生成唯一类名
    const className = `responsive-grid-${Math.random().toString(36).substr(2, 9)}`

    // 动态插入样式
    const styleSheet = `
      .${className} {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(${minWidth}px, 1fr));
        gap: ${gap};
        padding: ${padding};
      }
      
      @media (max-width: ${breakpoint}) {
        .${className} {
          grid-template-columns: 1fr;
        }
      }
    `

    return (
        <>
            <style>{styleSheet}</style>
            <div className={className}>{children}</div>
        </>
    )
}
