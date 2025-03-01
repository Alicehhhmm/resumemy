import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { getDefaultLocale } from '@/i18n/lib'


// 设置全局语言环境
const defaultLocale = getDefaultLocale()?.code == 'zh' ? 'zh-cn' : 'en'
dayjs.locale(defaultLocale)

type DayjsOrString = dayjs.Dayjs | Date | string
type Format = string

// 预设格式模板
const DEFAULT_FORMATS = {
    en: 'dddd, MMMM D YYYY',      // 英语格式示例: "Tuesday, July 9 1997"
    zh: 'YYYY年MM月DD日 dddd',     // 中文格式示例: "1997年01月01日 星期二"
    'zh-cn': 'YYYY年MM月DD日 dddd' // 兼容中文简写
} as const

/**
 * 格式化时间
 * @param date 要格式化的日期，可以是字符串、Dayjs 对象或原生 Date 对象
 * @param fmt 格式化模板，默认为 YYYY-MM-DD
 * @returns 格式化后的字符串
 */
export const formatDate = (
    date: DayjsOrString,
    fmt: Format = ''
): string => {
    let formatTemplate: Format;
    const day = dayjs(date);
    const currentLocale = day.locale();

    if (fmt) {
        formatTemplate = fmt;
    } else if (currentLocale === 'en') {
        formatTemplate = DEFAULT_FORMATS.en;
    } else if (['zh', 'zh-cn'].includes(currentLocale)) {
        formatTemplate = DEFAULT_FORMATS.zh;
    } else {
        formatTemplate = 'YYYY-MM-DD';
    }

    return day.isValid() ? day.format(formatTemplate) : '';
};