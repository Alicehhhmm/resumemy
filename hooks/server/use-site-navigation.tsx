import { useTranslations } from 'next-intl'
import type { RichTranslationValues } from 'next-intl'

import type { NavigationKeys, NavigationEntry, MappedNavigationEntry } from '@/types/navigation'
import type { FormattedMessage } from '@/types/formatted-message'

import { siteNavigation } from '@/config/next.json.mjs'

type ContextType = Record<string, RichTranslationValues>
type Navigation = Record<string, NavigationEntry>
type MapNavigationType = [string, MappedNavigationEntry]

const replaceLinkWithContext = (link: string, context?: RichTranslationValues) => {
    return Object.entries(context || {}).reduce(
        (finalLink, [find, replace]) => finalLink.replace(`{${find}}`, typeof replace === 'string' ? replace : ''),
        link
    )
}

const useSiteNavigation = () => {
    const t = useTranslations()

    // Map the navigation entries to the required format
    const mapNavigationEntries = (entries: Navigation, context: ContextType = {}) => {
        // This function maps the navigation entries to a format that includes the label and items
        const getFormattedMessage = (label: IntlMessageKeys, key: string) => {
            return t.rich(label, context[key] || {}) as FormattedMessage
        }

        // Iterate over the entries and map them to the desired format
        return Object.entries(entries).map(([key, { label, link, items, icon, target }]): MapNavigationType => {
            return [
                key,
                {
                    target,
                    icon: icon ? icon : '',
                    label: label ? getFormattedMessage(label, key) : '',
                    link: link ? replaceLinkWithContext(link, context[key]) : '',
                    items: items ? mapNavigationEntries(items, context) : [],
                },
            ]
        })
    }

    // Fn1: Get the translations for the navigation entries
    const getSideNavigation = (keys: Array<NavigationKeys>, context: ContextType = {}) => {
        const navigationEntries: Navigation = keys.reduce(
            (acc, key) => ({
                ...acc,
                [key]: siteNavigation.sideNavigation[key],
            }),
            {}
        )

        return mapNavigationEntries(navigationEntries, context)
    }

    // Fn2: Get the navigation items
    const navigationItems = mapNavigationEntries(siteNavigation.topNavigation)

    // Fn3: Get the Chat side navigation items
    const chatNavigationItems = mapNavigationEntries(siteNavigation.chatNavigation)

    return { getSideNavigation, navigationItems, chatNavigationItems }
}

export default useSiteNavigation
