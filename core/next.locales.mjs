'use strict'

import { getAvailableLocales, getAvailableLocaleCodes, getDefaultLocale, getAvailableLocalesMap, getAllLocaleCodes } from '@/i18n/lib'

/**
 * [English Docs]
 * All supported locale codes (BCP 47 format)
 *
 * @type {string[]}
 * @returns {string[]} Array of BCP 47 language tags
 * @example ['zh-CN', 'en-US']
 * @usage Language detection and full locale list display
 * -----------------------------------------------------------
 * [中文文档]
 * 支持的全部语言代码（BCP 47格式）
 * @usage 语言检测及完整语言列表展示
 */
const allLocaleCodes = getAllLocaleCodes()

/**
 * [English Docs]
 * Active locale configurations (RFC 5646 compliant)
 *
 * @type {Array<import('@/i18n/types').LocaleConfig>}
 * @example
 * [{
 *   code: 'zh-CN',
 *   name: 'Simplified Chinese',
 *   localName: '简体中文',
 *   enabled: true
 * }]
 * @usage Language selector component data source
 * -----------------------------------------------------------
 * [中文文档]
 * 已激活的语言配置（符合RFC 5646标准）
 * @usage 语言选择组件数据源
 */
const availableLocales = getAvailableLocales()

/**
 * [English Docs]
 * Active locale codes (BCP 47 format)
 *
 * @type {string[]}
 * @returns {string[]} Enabled BCP 47 tags
 * @example ['zh-CN', 'en-US']
 * @usage Routing validation and cache key generation
 * -----------------------------------------------------------
 * [中文文档]
 * 已激活的语言代码（BCP 47格式）
 *
 * @returns {string[]} 已启用的BCP 47标签数组
 * @example ['zh-CN', 'en-US']
 * @usage 路由验证及缓存键生成
 */
const availableLocaleCodes = getAvailableLocaleCodes()

/**
 * -----------------------------------------------------------
 * [English Docs]
 * Default locale configuration (Fallback strategy)
 *
 * @type {import('@/i18n/types').LocaleConfig}
 * @example {
 *   code: 'en-US',
 *   name: 'English (US)',
 *   localName: 'English',
 *   default: true
 * }
 * @usage Fallback content rendering and SEO optimization
 * -----------------------------------------------------------
 * [中文文档]
 * 默认语言配置（回退策略）
 */
const defaultLocale = getDefaultLocale()

/**
 * -----------------------------------------------------------
 * [English Docs]
 * Locale configuration registry (BCP 47 key-value mapping)
 *
 * @type {Object.<string, import('@/i18n/types').LocaleConfig>}
 * @returns {Object} Key-value pairs of locale configs
 * @example {
 *   'zh-CN': {
 *     code: 'zh-CN',
 *     name: 'Simplified Chinese',
 *     localName: '简体中文'
 *   }
 * }
 * @usage Fast locale metadata lookup and validation
 * -----------------------------------------------------------
 * [中文文档]
 * 语言配置注册表（BCP 47键值映射）
 *
 * @returns {Object} 语言配置的键值对集合
 * @usage 快速元数据查询及验证
 */
const availableLocalesMap = getAvailableLocalesMap()

export { allLocaleCodes, availableLocales, availableLocaleCodes, availableLocalesMap, defaultLocale }
