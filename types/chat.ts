import type {
    LinkTab,
    UserType,
    TeamType,
    RIconType,
    NavigationKeys,
    NavItemsType,
    BookmarkItemType
} from '@/types'

export type ChatModleType =
    | NavigationKeys
    | 'chat'
    | 'blog-chat'
    | 'booklet-chat'
    | 'project-chat'
    | 'design-chat'
    | 'bookmarks-chat';

export interface ChatNavItemType extends NavItemsType { }

export type ChatNavItemsType = ChatNavItemType[]

export interface ChannelType extends LinkTab {
    link: string
    label: string
    icon?: RIconType
    desc?: string
    count?: number
    isActive?: boolean
}

export interface MessagesType {
    bookmarks?: BookmarkItemType[]
    channels?: ChannelType[]
}

export type ChatSidebarType = {
    user: UserType
    teams: TeamType[]
    navMain: ChatNavItemsType
    messages: MessagesType
}

