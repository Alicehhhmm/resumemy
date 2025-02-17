import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { BunIcon, NpmIcon, PnpmIcon, YarnIcon } from '@/components/icons/package-manager'

export default function Home() {
    const t = useTranslations('HomePage')

    return (
        <div className='h-full flex flex-col bg-white dark:bg-fluo-background'>
            <main className='flex-1'>
                {/* 页面内容 */}
                <h1>{t('title')}</h1>
                <Link href='/about'>{t('about')}</Link>
                <BunIcon />
                <NpmIcon />
                <PnpmIcon />
                <YarnIcon />
            </main>
        </div>
    )
}
