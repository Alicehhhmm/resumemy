import type { FC, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoadMoreButtonProps {
    /**
     * 点击按钮时触发的回调函数，通常用于加载下一页数据。
     */
    onClick: () => void

    /**
     * 是否处于加载中状态。
     * 控制按钮禁用状态和文案切换。
     */
    isLoading: boolean

    /**
     * 按钮正常状态下的显示文本（默认："加载更多"）。
     */
    label?: string

    /**
     * 加载中状态下显示的文案（默认："加载中..."）。
     */
    loadingLabel?: string

    /**
     * 按钮前置图标，可传入任意 ReactNode。
     */
    icon?: ReactNode

    /**
     * 包裹按钮的外层容器 className（默认居中布局）。
     */
    className?: string

    /**
     * 按钮自身的额外 className，用于自定义样式。
     */
    buttonClassName?: string

    /**
     * 强制禁用按钮，即使不是 loading 状态（默认 false）。
     */
    disabled?: boolean
}

/**
 * <LoadMoreButton />
 * ---
 * 通用分页加载按钮组件，适用于“加载更多”场景。
 *
 * 常用于 `useInfiniteQuery()` 等分页结构中，提供清晰的用户交互反馈。
 *
 * ✅ 默认包含：
 * - 按钮点击触发 `onClick`
 * - 根据 `isLoading` 自动切换文案并禁用按钮
 * - 外层容器自动居中，便于快速布局
 *
 * @example 基本用法
 * ```tsx
 * <LoadMoreButton
 *   onClick={fetchNextPage}
 *   isLoading={isFetchingNextPage}
 * />
 * ```
 *
 * @example 自定义图标和文案
 * ```tsx
 * <LoadMoreButton
 *   onClick={fetchNextPage}
 *   isLoading={isFetchingNextPage}
 *   label="加载更多内容"
 *   loadingLabel="努力加载中..."
 *   icon={<ChevronDown className="w-4 h-4" />}
 * />
 * ```
 */
export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
    onClick,
    isLoading,
    label = '加载更多',
    loadingLabel = '加载中...',
    icon,
    className,
    buttonClassName,
    disabled = false,
}) => {
    return (
        <div className={cn('mt-4 flex flex-col items-center justify-center', className)}>
            <Button size='sm' variant='outline' onClick={onClick} className={cn(buttonClassName)} disabled={isLoading || disabled}>
                {isLoading ? (
                    loadingLabel
                ) : (
                    <>
                        {label}
                        {icon && <span className='mr-1'>{icon}</span>}
                    </>
                )}
            </Button>
        </div>
    )
}
