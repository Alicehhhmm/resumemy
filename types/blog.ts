/**
 * tabs 栏默认可预览类型
 */
export type BlogPreviewType = 'default' | 'announcements' | 'release' | 'vulnerability';

/**
 * 博客文章的所有分类
 * 基于i18n中定义的categories字段
 * @type {import('@/i18n/messages/i18n.d.ts')}
 */
export type BlogCategory = IntlMessageKeys<'layouts.blog.categories'>;

export interface BlogPost {
    title: string;
    author: string;
    username?: string;
    category: string;
    categories: Array<BlogCategory>;
    date: Date;
    slug: string;
}

export interface BlogData {
    posts: Array<BlogPost>;
    categories: Array<BlogCategory>;
}

export interface BlogPagination {
    next: number | null;
    prev: number | null;
    pages: number;
    total: number;
}

export interface BlogPostsRSC {
    posts: Array<BlogPost>;
    pagination: BlogPagination;
    category?: string;
}

export type LinkTab = {
    key: string;
    label: string;
    link: string
};

export interface ExtendedType extends BlogPost {
    category: string;
    coverImage?: string
    excerpt?: string
    description?: string
}

export interface ArticleColumn {
    title: string;
    author: string;
    username?: string;
    category: string;
    date: Date;
    slug: string;
    coverImage?: string
    viewCount?: number
    commentCount?: number
    description?: string
}