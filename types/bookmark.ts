export type BookmarksCategory = IntlMessageKeys<'layouts.bookmarks.categories'>;

export interface BookmarkItemType {
    title: string;
    link: string;
    domain?: string;
    desc?: string;
    cover?: string
    icon?: string;
    tags?: string[];
    category?: BookmarksCategory;
}

export type SiteConfigBookmarks = {
    [key in BookmarksCategory]?: BookmarkItemType[];
};

export interface RaindropCollection {
    _id: number
    title: string
    count?: number
    slug?: string
    description?: string
    parent?: {
        $id: number
        $ref: string
    }
}

export interface RaindropItem {
    _id: number
    title: string
    excerpt?: string
    link: string
    tags?: string[]
    cover?: string
    created: string
}

export interface RaindropResponse {
    items: RaindropItem[]
    result: boolean
}
