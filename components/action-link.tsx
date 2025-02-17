import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'

interface ActionLinkProps {
  href: string
  label: string
  icon?: React.ReactNode
  className?: string
  target?: '_blank' | '_self'
  rel?: string
}

export const ActionLink = ({
    href,
    label,
    icon,
    className,
    target = '_self',
    rel = 'noopener',
}: ActionLinkProps) => {
    const baseStyle = cn(
        'rounded-lg p-2 transition-all duration-300 ease-out',
        'hover:bg-gray-100 dark:hover:bg-gray-800/30',
        'transform hover:scale-105 active:scale-95',
        'text-gray-600/90 dark:text-gray-400/90',
        'hover:text-primary flex items-center gap-2',
        className
    )

    return (
        <Link
            href={href}
            aria-label={label}
            className={baseStyle}
            target={target}
            rel={rel}
        >
            {icon}
        </Link>
    )
}