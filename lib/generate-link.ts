import { WebLinkSettings } from '@/config/system-settings'

interface LinkItem {
    name: string
    link: string
    blank: boolean
}

interface LinkSection {
    type: string
    children: LinkItem[]
}

/**
 * 获取指定类型的链接列表
 * @param type - 链接类型 ('Navigation' | 'me' | 'repositories-source')
 * @returns LinkItem[] - 返回指定类型的链接数组
 */
export const getRepositoryLinks = (type: string): LinkItem[] => {
    const section = WebLinkSettings.find((section: LinkSection) => section.type === type)
    return section?.children || []
}

/**
 * 获取指定类型的有效链接列表（排除空链接）
 * @param type - 链接类型 ('Navigation' | 'me' | 'repositories-source')
 * @returns LinkItem[] - 返回指定类型的非空链接数组
 */
export const getValidRepositoryLinks = (type: string): LinkItem[] => {
    return getRepositoryLinks(type).filter(item => item.link)
}

/**
 * 获取指定类型的单个链接
 * @param type - 链接类型
 * @param name - 链接名称
 * @returns LinkItem - 返回匹配的链接项
 * @example
 * -------------------------example-----------------------------------
 * const resumeLink = getRepositoryLink('repositories-source', 'system.links.resumemy')
 * -------------------------------------------------------------------
 */
export const getRepositoryLink = (type: string, name: string): LinkItem => {
    const links = getRepositoryLinks(type)
    const link = links.find(item => item.name === name)
    return link ?? {
        name: '',
        link: '#',
        blank: false
    }
}