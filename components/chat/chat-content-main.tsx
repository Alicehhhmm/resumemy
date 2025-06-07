import type { FC, ReactNode } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

type ChatContentMainProps = {
    children: ReactNode
}

export const ChatContentMain: FC<ChatContentMainProps> = ({ children }) => {
    return <ScrollArea className='flex flex-1 flex-col gap-4 p-4 dark:bg-fluo-background'>{children}</ScrollArea>
}
