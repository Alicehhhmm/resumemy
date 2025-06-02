import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import WithBreadcrumbs from '@/components/WithBreadcrumbs'

type ChatNavHeaderProps = {}

export const ChatNavHeader = ({}: ChatNavHeaderProps) => {
    const t = useTranslations()
    // TODO: add NextPage and BackPage components and changeLange btn, layout btn

    return (
        <header className='h-[60px] z-50 sticky top-0 flex shrink-0 items-center gap-1 border-b bg-background p-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='h-4' />
            <WithBreadcrumbs navKeys={['blog']} />
        </header>
    )
}
