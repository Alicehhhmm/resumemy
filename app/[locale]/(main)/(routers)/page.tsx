import { HexagonGrid, RectangleGrid } from '@/components/special-effects'

import { hexToRGBA } from '@/utils/color-change'
import GlowingBackdrop from '@/components/layout/GlowingBackdrop'

export default function Home() {
    const background = `radial-gradient(circle, ${hexToRGBA('#ffffff')}, transparent)`

    return (
        <div className='flex-1 h-[calc(100vh-146.4px)] bg-fluo-background dark:bg-fluo-background'>
            <div className='relative w-full h-full'>
                {/* <HexagonGrid style={{ background }} className='w-full h-full' /> */}
                <GlowingBackdrop></GlowingBackdrop>
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-transparent py-10 px-20'>
                    <div className='flex justify-between items-center'>
                        <div className='bg-green-500 w-full h-60 '></div>
                        <div className='bg-pink-500 w-full h-60 '></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
