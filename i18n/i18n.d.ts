import 'next-intl'
import enMessages from './messages/en.json'
import zhMessages from "./messages/zh.json";

// 自动生成基础类型
type baseMessages = typeof zhMessages
type DeepMessages = typeof enMessages
type Namespace = keyof DeepMessages

// 扩展模块类型
declare module 'next-intl' {
    interface IntlMessages {
        common: DeepMessages['common']
        system: DeepMessages['system']
        HomePage: DeepMessages['HomePage']

        // 动态模块支持（新增模块自动合并）
        [K in Namespace]: DeepMessages[K]
    }
}

export type LocaleType = 'en' | 'zh';

// 导出辅助类型
export type {
    Namespace as TNamespace,
    DeepMessages as TDeepMessages,
    baseMessages as IntBaseMessages
}

