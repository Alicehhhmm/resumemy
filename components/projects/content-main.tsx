'use client'

import type { ReactNode } from 'react'

export function ContentMain({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <div className='flex flex-col items-center gap-4 py-10'>
                <div
                    data-testid='community-tagline'
                    className='font-heading max-w-[700px] text-pretty text-center text-[29px] font-semibold leading-tight tracking-tighter text-gray-900 sm:text-[32px] md:text-[40px]'
                >
                    Discover the best apps, components and starters from the community.
                </div>
                <div className='mx-auto w-full max-w-3xl'>
                    <input type='text' />
                </div>
                <div className='flex justify-center'>
                    <div>bage1</div>
                    <div>bage2</div>
                    <div>bage3</div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className=''>left</div>
                <div className=''>right</div>
            </div>
            <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                <div className='aspect-video rounded-xl bg-muted/50' />
                <div className='aspect-video rounded-xl bg-muted/50' />
                <div className='aspect-video rounded-xl bg-muted/50' />
            </div>
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>{children}</div>
        </div>
    )
}
