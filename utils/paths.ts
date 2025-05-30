/**
 * strip Langs Prefix form Path
 * @param path pathname 
 * @returns /path
 * @explame
 * stripLangPrefixPath('/en/blog') => output：/blog
 */
export const stripLangPrefixPath = (path: string | null) => {
    if (!path || path === '/') return path;

    const langPrefixReg = /^\/[a-z]{2}(?:-[A-Z]{2})?\//i;

    if (langPrefixReg.test(path)) return path.replace(langPrefixReg, '/');

    return path;
};

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
