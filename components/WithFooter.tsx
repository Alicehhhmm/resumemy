'use client'

import { FooterSimple } from '@/components/common'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { Link } from '@/components/common'
import { usePathname } from 'next/navigation'
import { siteNavigation } from '@/config/next.json.mjs'

const WithFooter: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()!;

    const { socialLinks } = siteNavigation

    const updatedSocialLinks = socialLinks.map((link: any) => ({ ...link, text: t(link.name) }))

    const navigation = { socialLinks: updatedSocialLinks, footerLinks: [] }

    return <FooterSimple navigation={navigation} as={Link} pathname={pathname} />
}

export default WithFooter
