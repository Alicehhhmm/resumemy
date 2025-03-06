import { LANGUAGES } from '@/core/shiki.config.mjs';

/**
 * 用于获取<Pre>标签类名中，定义的代码块编程语言
 * 
 * @param {string} language 
 * @returns {string} language-[any]
 */
export const getLanguageDisplayName = (language: string): string => {
    const languageByIdOrAlias = LANGUAGES.find(
        ({ name, aliases }) =>
            name.toLowerCase() === language.toLowerCase() ||
            (aliases !== undefined && aliases.includes(language.toLowerCase()))
    );

    return languageByIdOrAlias?.displayName ?? language;
};
