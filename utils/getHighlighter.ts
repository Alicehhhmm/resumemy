import { createHighlighterCoreSync } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';

import { LANGUAGES, DEFAULT_THEME } from '@/core/shiki.config.mjs';

// 重新创建一个最小化的 Shikiji 语法高亮器
export const shiki = createHighlighterCoreSync({
  themes: [DEFAULT_THEME],
  langs: LANGUAGES,
  // 使用 Shikiji 的实验性 JS 正则引擎
  engine: createJavaScriptRegexEngine(),
});

/**
 * 将代码行转为高亮的 HTML 字符串
 *
 * @param {string} code - 需要高亮的代码
 * @param {string} language - 代码语言
 * @returns {string} 高亮后的 HTML 片段
 */
export const highlightToHtml = (code: string, language: string) => {
  // 将代码转换为 HTML
  // Shiki 会返回包裹在 <pre> 和 <code> 标签中的高亮代码
  // 本项目在 CodeBox 组件已经处理了 <code> 标签，因此只需提取内部高亮的代码行
  return shiki
    .codeToHtml(code, { lang: language, theme: DEFAULT_THEME })
    .match(/<code>(.+?)<\/code>/s)![1];
}

/**
 * 将代码高亮为 HAST（HTML Abstract Syntax Tree）格式
 *
 * @param {string} code - 需要高亮的代码
 * @param {string} language - 代码语言
 * @returns {import('hast').Element} 高亮后的 HAST 树
 */
export const highlightToHast = (code: string, language: string) =>
  shiki.codeToHast(code, { lang: language, theme: DEFAULT_THEME });
