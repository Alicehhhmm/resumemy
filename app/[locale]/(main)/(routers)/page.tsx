import { hexToRGBA } from '@/utils/color-change'
import { HeroSection, ServicesSection, ProjectsSection, ContactSection, Footer } from '@/components/home'
import { GlowingBackdrop } from '@/components/common'

export default function Home() {
    const background = `radial-gradient(circle, ${hexToRGBA('#ffffff')}, transparent)`

    return (
        <div className='main-h-screen w-screen flex flex-col mx-auto'>
            <div className='flex-1 h-[calc(100vh-146.4px)] bg-background dark:bg-[#101314]'>
                <div className='relative size-full'>
                    <GlowingBackdrop></GlowingBackdrop>
                    <HeroSection />
                </div>
            </div>
            <ServicesSection />
            {/* <ProjectsSection /> */}
            {/* <ContactSection /> */}
            {/* <Footer /> */}
        </div>
    )
}
