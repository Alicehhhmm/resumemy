import type { HTMLAttributeAnchorTarget } from 'react';

import type { RIconType, UserType, FormattedMessage } from '@/types';

export type NavigationKeys =
    | 'blog'
    | 'booklet'
    | 'project'
    | 'design'
    | 'bookmarks';

export interface NavigationEntry {
    label?: IntlMessageKeys;
    link?: string;
    icon?: RIconType;
    items?: Record<string, NavigationEntry>;
    target?: HTMLAttributeAnchorTarget | undefined;
}

export interface MappedNavigationEntry {
    label: FormattedMessage
    link: string
    icon?: RIconType
    target?: HTMLAttributeAnchorTarget | undefined
    items: Array<[string, MappedNavigationEntry]>
}

export interface NavItemsType extends MappedNavigationEntry {
    isActive?: boolean
}

export interface TeamType {
    name: string
    logo: RIconType
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
    sourceRepositoryNav: Record<string, NavigationEntry>
}