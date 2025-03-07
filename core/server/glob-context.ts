import { cache } from "react";

import type { ClientSharedServerContext } from '@/types';
import { assignClientContext } from '@/utils/assignClientContext';

/**
 * 获取服务端请求的共享上下文实例
 * 
 * 作用:
 * 1. 为每个请求创建独立的上下文实例
 * 2. 通过 React 的 cache 机制确保同一请求内的上下文一致性
 * 3. 提供默认的上下文值，避免未设置时的空值问题
 * 
 * 注意:
 * 
 * - 仅在服务端组件中生效
 * - 每个请求都会创建独立的上下文实例
 * - 默认值通过 assignClientContext 提供
 */
export const getGlobClientContext = cache(() => {
    const serverSharedContext = assignClientContext({});

    return serverSharedContext;
});

/**
 * 更新服务端共享上下文数据
 * 
 * 作用:
 * 1. 在请求处理过程中动态更新上下文数据
 * 2. 确保上下文数据与当前请求的路由信息一致
 * 
 * @param data 需要更新的上下文数据（部分字段）
 * 
 * 注意:
 * - 仅在服务端组件中生效
 * - 更新操作会直接修改当前请求的上下文实例
 * - 数据会通过 assignClientContext 合并默认值
 */
export const setGlobClientContext = (data: Partial<ClientSharedServerContext>) => {
    const _data = assignClientContext(data);

    getGlobClientContext().frontmatter = _data.frontmatter;
    getGlobClientContext().pathname = _data.pathname;
    getGlobClientContext().readingTime = _data.readingTime;
    getGlobClientContext().filename = _data.filename;
    getGlobClientContext().headings = _data.headings;
};
