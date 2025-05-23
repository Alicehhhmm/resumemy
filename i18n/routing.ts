import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { getAllLocaleCodes, getDefaultLocale } from "./lib";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: getAllLocaleCodes(),

    // Used when no locale matches
    defaultLocale: getDefaultLocale()?.code || 'zh',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
