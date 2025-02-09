import { Footer } from '@/components/footer'

export default function Home() {
    return (
        <div className='h-full flex flex-col bg-white dark:bg-[#313333]'>
            <main className='flex-1'>{/* 页面内容 */}</main>
            <Footer />
        </div>
    )
}
