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