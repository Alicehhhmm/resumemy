import type { HTMLAttributeAnchorTarget } from 'react';

import { type LucideIcon } from 'lucide-react'
import { type UserType } from '@/types/user'

export type NavigationKeys =
    | 'blog'
    | 'booklet'
    | 'project'
    | 'design'
    | 'bookmarks';

export interface NavigationEntry {
    label?: IntlMessageKeys;
    link?: string;
    icon?: string;
    items?: Record<string, NavigationEntry>;
    target?: HTMLAttributeAnchorTarget | undefined;
}

export interface NavItemsType {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: NavItemsType[]
}[]

export interface TeamType {
    name: string
    logo: React.ElementType
    plan: string
}

export interface PageSidebarType {
    user: UserType
    teams: TeamType[]
    navMain: NavItemsType[]
}

export interface FooterConfig {
    text: IntlMessageKeys;
    link: string;
}

export interface SocialConfig {
    icon: string;
    link: string;
    alt?: string;
}

export interface SiteNavigation {
    topNavigation: Record<NavigationKeys, NavigationEntry>;
    footerLinks: Array<FooterConfig>;
    socialLinks: Array<SocialConfig>;
    sideNavigation: Record<NavigationKeys, NavigationEntry>;
}