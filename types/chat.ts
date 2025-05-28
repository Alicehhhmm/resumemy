import type {
  LinkTab,
  UserType,
  TeamType,
  RIconType,
  NavigationKeys,
  MappedNavigationEntry,
} from '@/types'

export type ChatModleType =
  | NavigationKeys
  | 'chat'
  | 'blog-chat'
  | 'booklet-chat'
  | 'project-chat'
  | 'design-chat'
  | 'bookmarks-chat';

export interface ChatNavItemType extends MappedNavigationEntry {
  icon?: RIconType
  isActive?: boolean
}

export type ChatNavItemsType = ChatNavItemType[]

export interface ChannelType extends LinkTab {
  link: string
  label: string
  icon?: RIconType
  desc?: string
  isActive?: boolean
}

export interface BookmarksType {
  label: string
  link: string
  description: string
  date: Date
}

export interface MessagesType {
  bookmarks?: BookmarksType[]
  channels?: ChannelType[]
}

export type ChatSidebarType = {
  user: UserType
  teams: TeamType[]
  navMain: ChatNavItemsType
  messages: MessagesType
}

