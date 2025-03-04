'use client'

import { createContext } from 'react'
import type { FC, PropsWithChildren } from 'react'

import type { ClientSharedServerContext } from '@/types/server'
import { assignClientContext } from '@/utils/assignClientContext'

/**
 * 创建全局共享的内容上下文
 * 使用默认值初始化，避免服务端数据未传入时的空值问题
 */
export const MatterContext = createContext<ClientSharedServerContext>(
    assignClientContext({})
);

/**
 * 内容上下文提供者组件属性类型
 * 继承客户端共享上下文的所有可选属性
 */
type MatterProviderProps = PropsWithChildren<Partial<ClientSharedServerContext>>;

/**
 * 全局内容上下文提供者组件
 * @param children 子组件
 * @param data 来自服务端的上下文数据
 * @returns 包裹子组件的上下文提供者
 */
export const MatterProvider: FC<MatterProviderProps> = ({ children, ...data }) => {
    // 合并服务端数据与客户端默认值
    const contextValue = assignClientContext({ ...data });
    
    return (
        <MatterContext.Provider value={contextValue}>
            {children}
        </MatterContext.Provider>
    );
};
