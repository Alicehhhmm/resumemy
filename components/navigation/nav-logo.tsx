import { Logon } from '@/components/icons'
import { Link } from '@/components/common'

export const NavLogo = () => (
    <Link href='/' className='flex aspect-square size-8 items-center justify-center rounded-full bg-fluo-logobg text-fluo-logo '>
        <Logon />
    </Link>
)
