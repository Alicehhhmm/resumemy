import { HexagonGrid, RectangleGrid, HexagonGridAnimation } from '@/components/special-effects'

import { hexToRGBA } from '@/utils/color-change'
import { GridBackdrop, GlowingBackdrop } from '@/components/common'

export default function Home() {
    const background = `radial-gradient(circle, ${hexToRGBA('#ffffff')}, transparent)`

    return (
        <div className='flex-1 h-[calc(100vh-146.4px)] bg-background dark:bg-[#101314]'>
            <div className='relative w-full h-full'>
                <GlowingBackdrop></GlowingBackdrop>
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-transparent py-10 px-20'>
                    <div className='size-full flex justify-between items-center'>
                        {/* <div className='w-full h-full bg-fluo-deep flex-1'>
                            <HexagonGrid />
                        </div>
                        <div className='w-full h-full flex-1 bg-gradient-fluo opacity-90'>
                            <RectangleGrid />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
