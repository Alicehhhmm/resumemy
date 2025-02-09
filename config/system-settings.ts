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
                name: 'Home',
                link: '/',
                blank: false,
            }
        ],
    },
    {
        type: 'me',
        children: [
            {
                name: 'GitHub',
                link: 'https://github.com/Alicehhhmm',
                blank: true,
            },
            {
                name: 'Juejin',
                link: '',
                blank: true,
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
        name: 'Blog',
    },
    {
        key: 'categories',
        path: '/categories',
        name: 'Categories',
    },
    {
        key: 'projects',
        path: '/projects',
        name: 'Projects',
        subMenu: [
            {
                type: 'Demos',
            },
            {
                type: 'React Ecosystem',
            },
            {
                type: 'Vue Ecosystem',
            },
            {
                type: 'Webgl Ecosystem',
            },
            {
                type: 'Rust Ecosystem',
            }
        ],
    },
    {
        key: 'design',
        path: '/design',
        name: 'Design',
        subMenu: [
            {
                type: 'Portfolio Ui/UX',
            },
            {
                type: 'Portfolio Web',
            },
            {
                type: 'Portfolio Mobile',
            }
        ],
    }
]