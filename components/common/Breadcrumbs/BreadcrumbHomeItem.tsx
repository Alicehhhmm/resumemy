import type { FC, ComponentProps } from 'react'
import { Home } from 'lucide-react'
import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'

type BreadcrumbHomeLinkProps = Omit<ComponentProps<typeof BreadcrumbLink>, 'href'> &
    Partial<Pick<ComponentProps<typeof BreadcrumbLink>, 'href'>>

const BreadcrumbHomeItem: FC<BreadcrumbHomeLinkProps> = ({ href = '/', ...props }) => (
    <BreadcrumbItem>
        <BreadcrumbLink href={href} {...props}>
            <Home className='size-4' aria-label={props['aria-label']} />
        </BreadcrumbLink>
    </BreadcrumbItem>
)

export default BreadcrumbHomeItem
