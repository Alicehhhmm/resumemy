'use strict'

import { cn as classNames } from '@/lib/utils'
import { toString } from 'hast-util-to-string'
import { SKIP, visit } from 'unist-util-visit'

import { highlightToHast } from '@/utils/getHighlighter'

// <pre> 元素的类名前缀,用于标识当前语言
const languagePrefix = 'language-'

/**
 * 从 meta 字符串中提取指定键的值
 * Retrieve the value for the given meta key.
 *
 * @example - Returns "CommonJS"
 * getMetaParameter('displayName="CommonJS"', 'displayName');
 *
 * @param {any} meta - The meta parameter.
 * @param {string} key - The key to retrieve the value.
 *
 * @return {string | undefined} - The value related to the given key.
 */
function getMetaParameter(meta, key) {
    if (typeof meta !== 'string') {
        return
    }

    const matches = meta.match(new RegExp(`${key}="(?<parameter>[^"]*)"`))
    const parameter = matches?.groups.parameter

    return parameter !== undefined && parameter.length > 0 ? parameter : undefined
}


/**
 * 检查给定节点是否为有效的代码块元素
 * Checks if the given node is a valid code element.
 *
 * @param {import('unist').Node} node - The node to be verified.
 *
 * @return {boolean} - True when it is a valid code element, false otherwise.
 */
function isCodeBlock(node) {
    return Boolean(node?.tagName === 'pre' && node?.children[0].tagName === 'code')
}

/**
 * 用于处理代码高亮和代码标签
 * TODO: 添加 lang-memai 处理
 *
 * @returns {function} 返回处理后的AST函数
 */
export default function rehypeShikiji() {
    return function (tree) {
        visit(tree, 'element', (_, index, parent) => {
            const languages = []
            const displayNames = []
            const codeTabsChildren = []

            let defaultTab = '0'
            let currentIndex = index

            while (isCodeBlock(parent?.children[currentIndex])) {
                const codeElement = parent?.children[currentIndex].children[0]

                // 从 meta 中提取显示元素名称
                const displayName = getMetaParameter(codeElement.data?.meta, 'displayName')

                // 从类名中提取语言类型
                if (codeElement.properties.className?.length) {
                    const className = codeElement.properties.className.join(' ')
                    const matches = className.match(/language-(?<language>.*)/)

                    languages.push(matches?.groups.language ?? 'text')
                }

                // Map the display names of each variant for the CodeTab
                displayNames.push(displayName?.replaceAll('|', '') ?? '')

                codeTabsChildren.push(parent?.children[currentIndex])

                // If `active="true"` is provided in a CodeBox
                // then the default selected entry of the CodeTabs will be the desired entry
                const specificActive = getMetaParameter(codeElement.data?.meta, 'active')

                if (specificActive === 'true') {
                    defaultTab = String(codeTabsChildren.length - 1)
                }

                const nextNode = parent?.children[currentIndex + 1]

                // If the CodeBoxes are on the root tree the next Element will be
                // an empty text element so we should skip it
                currentIndex += nextNode && nextNode?.type === 'text' ? 2 : 1
            }

            // 如果有多个代码块，则将其转换为代码标签
            if (codeTabsChildren.length >= 2) {
                const codeTabElement = {
                    type: 'element',
                    tagName: 'CodeTabs',
                    children: codeTabsChildren,
                    properties: {
                        languages: languages.join('|'),
                        displayNames: displayNames.join('|'),
                        defaultTab,
                    },
                }

                // 移除原始代码块，并插入代码标签元素
                // This removes all the original Code Elements and adds a new CodeTab Element
                // at the original start of the first Code Element
                parent.children.splice(index, currentIndex - index, codeTabElement)

                // Prevent visiting the code block children and for the next N Elements
                // since all of them belong to this CodeTabs Element
                return [SKIP]
            }
        })

        // 处理单个代码块的高亮
        visit(tree, 'element', (node, index, parent) => {
            // We only want to process <pre>...</pre> elements
            if (!parent || index == null || node.tagName !== 'pre') {
                return
            }

            // We want the contents of the <pre> element, hence we attempt to get the first child
            const preElement = node.children[0]

            // If thereÄs nothing inside the <pre> element... What are we doing here?
            if (!preElement || !preElement.properties) {
                return
            }

            // Ensure that we're not visiting a <code> element but it's inner contents
            // (keep iterating further down until we reach where we want)
            if (preElement.type !== 'element' || preElement.tagName !== 'code') {
                return
            }

            // Get the <pre> element class names
            const preClassNames = preElement.properties.className

            // The current classnames should be an array and it should have a length
            if (typeof preClassNames !== 'object' || preClassNames.length === 0) {
                return
            }

            // 从<pre>类名中提取语言类型
            // We want to retrieve the language class name from the class names
            const codeLanguage = preClassNames.find(c => typeof c === 'string' && c.startsWith(languagePrefix))

            // If we didn't find any `language-` classname then we shouldn't highlight
            if (typeof codeLanguage !== 'string') {
                return
            }

            // Retrieve the whole <pre> contents as a parsed DOM string
            const preElementContents = toString(preElement)

            // Grabs the relevant alias/name of the language
            const languageId = codeLanguage.slice(languagePrefix.length)

            // NOTE(*): 处理代码行高亮处理
            // Parses the <pre> contents and returns a HAST tree with the highlighted code
            const { children } = highlightToHast(preElementContents, languageId)

            // Adds the original language back to the <pre> element
            children[0].properties.class = classNames(children[0].properties.class, codeLanguage)

            const showCopyButton = getMetaParameter(preElement.data?.meta, 'showCopyButton')

            // 如果 meta 中指定了 `showCopyButton`，则添加复制按钮
            if (showCopyButton && ['true', 'false'].includes(showCopyButton)) {
                children[0].properties.showCopyButton = showCopyButton
            }

            // 替换原始 <pre> 元素为高亮后的内容
            parent.children.splice(index, 1, ...children)
        })
    }
}
