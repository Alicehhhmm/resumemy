import { HeroSection, ServicesSection, ProjectsSection, ContactSection } from '@/components/home'
import { GlowingBackdrop } from '@/components/common'

export default function HomePage() {
    return (
        <div className='main-h-screen w-screen flex flex-col mx-auto'>
            <div className='flex-1 h-[calc(100vh-146.4px)] bg-background dark:bg-[#101314]'>
                <div className='relative size-full'>
                    <GlowingBackdrop></GlowingBackdrop>
                    <HeroSection />
                </div>
            </div>
            {/* <ServicesSection />
            <ProjectsSection />
            <ContactSection /> */}
        </div>
    )
}
