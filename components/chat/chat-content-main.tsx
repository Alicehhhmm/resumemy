import type { FC, ReactNode } from 'react'

type ChatContentMainProps = {
    children: ReactNode
}

export const ChatContentMain: FC<ChatContentMainProps> = ({ children }) => {

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            {children}
        </div>
    )
}
