import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

interface Props {}

export const ChatNavHeader = ({}: Props) => {
    // TODO: add NextPage and BackPage components and changeLange btn, layout btn
    return (
        <header className='h-[60px] z-50 sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-90'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className='hidden md:block'>
                        <BreadcrumbLink href='#'>All Inboxes</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Inbox</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}
