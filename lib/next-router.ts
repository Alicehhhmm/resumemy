
export const getCurrentPathname = (locale: string, pathname: string): string => {
    // Remove the locale prefix from the pathname
    return pathname.replace(`/${locale}`, '');
}