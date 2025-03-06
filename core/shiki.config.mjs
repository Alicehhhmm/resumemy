'use strict';

import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import iniLanguage from 'shiki/langs/ini.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import yamlLanguage from 'shiki/langs/yaml.mjs';
import shikiNordTheme from 'shiki/themes/nord.mjs';

/**
 * 配置需要语法高亮的，所有编程语言
 *
 * @type {Array<import('shiki').LanguageRegistration>}
 */
export const LANGUAGES = [
  // 扩展 JavaScript 语言的别名，包含 CommonJS 和 ES Module 的别名
  // 这些别名在 API 文档和博客文章中常用（非标准别名）
  {
    ...javaScriptLanguage[0],
    aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
  },
  // INI 文件语言
  ...iniLanguage, 
  // JSON
  ...jsonLanguage, 
  // TypeScript 
  ...typeScriptLanguage, 
  // Shell 脚本
  ...shellScriptLanguage, 
  // Shell 会话
  ...shellSessionLanguage, 
  // PowerShell 
  ...powershellLanguage, 
  // Dockerfile 
  ...dockerLanguage, 
  // Diff 
  ...diffLanguage, 
  // YAML 
  ...yamlLanguage, 
];

/**
 * Shiki 语法高亮器的默认主题
 * 这里配置了新颜色，因为 Codebox 组件的背景色和注释文本颜色不符合无障碍标准
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export const DEFAULT_THEME = {
  // 替换颜色以提高对比度
  colorReplacements: { '#616e88': '#707e99' },
  // 基于 Nord 主题的扩展
  ...shikiNordTheme,
};
