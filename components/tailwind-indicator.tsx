/**
 * 屏幕尺寸指示器：用于在开发环境中显示当前的屏幕尺寸（如 xs、sm、md、lg、xl、2xl）。
 * 在生产环境中，该组件不会渲染任何内容。
 */
export function TailwindIndicator() {
    if (process.env.NODE_ENV === 'production') return null

    return (
        <div className='fixed bottom-4 left-4 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200 p-4 font-mono text-xs font-semibold text-white dark:text-gray-600 shadow-lg border border-gray-500'>
            <div className='block sm:hidden'>xs</div>
            <div className='hidden sm:block md:hidden'>sm</div>
            <div className='hidden md:block lg:hidden'>md</div>
            <div className='hidden lg:block xl:hidden'>lg</div>
            <div className='hidden xl:block 2xl:hidden'>xl</div>
            <div className='hidden 2xl:block'>2xl</div>
        </div>
    )
}
