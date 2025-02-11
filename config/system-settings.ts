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
                blank: false,
            },
        ],
    },

]

/**
 * 导航栏配置
 */
export const NavItemSettings = [
    {
        key: 'blog',
        path: '/blog',
        name: 'system.nav.blog',
    },
    {
        key: 'categories',
        path: '/categories',
        name: 'system.nav.categories',
    },
    {
        key: 'projects',
        path: '/projects',
        name: 'system.nav.projects',
        subMenu: [
            {
                type: 'demo',
                label: 'system.submenu.demos',
            },
            {
                type: 'react',
                label: 'system.submenu.react',
            },
            {
                type: 'vue',
                label: 'system.submenu.vue',
            },
            {
                type: 'webgl',
                label: 'system.submenu.webgl',
            },
            {
                type: 'rust',
                label: 'system.submenu.rust',
            }
        ],
    },
    {
        key: 'design',
        path: '/design',
        name: 'system.nav.design',
        subMenu: [
            {
                type: 'Portfolio',
                label: 'system.submenu.portfolio',
            },
            {
                type: 'Ui/UX',
                label: 'system.submenu.uiux',
            },
            {
                type: 'Web',
                label: 'system.submenu.web',
            },
            {
                type: 'Mobile',
                label: 'system.submenu.mobile',
            }
        ],
    }
]