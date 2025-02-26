import { TOCItem } from '@/components/common/NestedDirectory'

export const TOCMOCK: TOCItem[] = [
    {
        id: "environment-setup",
        title: "环境准备",
        level: 2,
        children: [
            {
                id: "nodejs",
                title: "Node.js",
                level: 3,
            },
        ],
    },
    {
        id: "create-project",
        title: "创建新项目",
        level: 2,
        children: [
            {
                id: "use-rsbuild",
                title: "使用 Rsbuild",
                level: 3,
            },
            {
                id: "use-rspack-cli",
                title: "使用 Rspack CLI",
                level: 3,
            },
        ],
    },
    {
        id: "with-project",
        title: "支持项目",
        level: 2,
        children: [
            {
                id: "use-vite",
                title: "使用 vite",
                level: 3,
                children: [
                    {
                        id: "use-rsbuild-1",
                        title: "使用 Rsbuild",
                        level: 4,
                    },
                    {
                        id: "use-rspack-cli-1",
                        title: "使用 Rspack CLI",
                        level: 4,
                        children: [
                            {
                                id: "use-rsbuild-2",
                                title: "使用 Rsbuild",
                                level: 5,
                            },
                            {
                                id: "use-rspack-cli-2",
                                title: "使用 Rspack CLI",
                                level: 5,
                            },
                        ],
                    },
                ],
            },
            {
                id: "use-react",
                title: "使用 react",
                level: 3,
            },
            {
                id: "use-nextjs",
                title: "使用 nextjs",
                level: 3,
            },
        ],
    },
];