/**
 * strip Langs Prefix form Path
 * @param path pathname 
 * @returns /path
 * @explame
 * stripLangPrefixPath('/en/blog') => output：/blog
 */
export const stripLangPrefixPath = (path: string | null) => {
    if (!path) return path
    return `/${path.substring(1).split('/')[1]}`
}

/**
 * Check if the path is active
 * @param pathname : current pathname
 * @param path : path to check 
 */
export const isActivePath = (pathname: string, path: string) => {
    if (!pathname || !path) return false
    const strippedPathname = stripLangPrefixPath(pathname)
    return strippedPathname === path
} 
