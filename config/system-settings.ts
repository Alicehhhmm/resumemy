/**
 * 系统的一些默认配置
 * Some default configurations of the system
 */

/**
 * 外部链接配置
 */
export const WebLinkSettings = [
    {
        type: 'Navigation',
        children: [
            {
                name: 'system.nav.home',
                link: '/',
                blank: false,
            }
        ],
    },
    {
        type: 'me',
        children: [
            {
                name: 'system.links.github',
                link: 'https://github.com/Alicehhhmm',
                blank: true,
            },
            {
                name: 'system.links.juejin',
                link: '',
                blank: true,
            },
            {
                name: 'system.links.gmail',
                link: '',
                blank: true,
            },
            {
                name: 'system.links.twitter',
                link: '',
                blank: true,
            },
            {
                name: 'system.links.linkedin',
                link: '',
                blank: true,
            },
        ],
    },
    {
        type: 'repositories-source',
        children: [
            {
                name: 'system.links.resumemy',
                link: 'https://github.com/Alicehhhmm/resumemy',
                blank: true,
            },
        ],
    }

]
