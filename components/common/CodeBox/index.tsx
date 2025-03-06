'use client'

import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Fragment, isValidElement, useRef } from 'react'

import { useTranslations } from 'next-intl'
import { Copy, CodeXml } from 'lucide-react'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/common'

import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks'

import styles from './index.module.css'

/**
 * 将纯文本内容的代码元素转换为更结构化的格式，以便渲染行号
 *
 * @param {ReactNode} code - 需要转换的代码元素
 * @param {string} language - 代码语言
 * @returns {ReactNode} 转换后的代码元素
 */
const transformCode = (code: ReactNode, language: string): ReactNode => {
    // 如果传入的 `code` 不是有效的 React 元素，则直接返回
    if (!isValidElement(code)) {
        return code
    }

    const content = (code.props as { children?: ReactNode })?.children

    // 如果元素类型不是 `code` 或内容不是字符串，则直接返回
    if (code.type !== 'code' || typeof content !== 'string') {
        return code
    }

    // 将代码内容按行分割
    // 注意：使用 `.split` 会在末尾生成一个空字符串，需要移除
    const lines = content.split('\n')

    const extraStyle = language.length === 0 ? { fontFamily: 'monospace' } : {}

    return (
        <code style={extraStyle}>
            {lines
                .flatMap((line, lineIndex) => {
                    const columns = line.split(' ')

                    return [
                        <span key={lineIndex} className='line'>
                            {columns.map((column, columnIndex) => (
                                <Fragment key={columnIndex}>
                                    <span>{column}</span>
                                    {columnIndex < columns.length - 1 && <span> </span>}
                                </Fragment>
                            ))}
                        </span>,
                        '\n',
                        // 添加换行符，确保复制到剪贴板时格式正确
                    ]
                })
                // 移除末尾的空行和多余的换行符
                .slice(0, -2)}
        </code>
    )
}

type CodeBoxProps = {
    /** 代码片段语言 */
    language: string
    /** 显示代码块复制按钮 */
    showCopyButton?: boolean
    className?: string
}

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({ children, language, showCopyButton = true, className }) => {
    const t = useTranslations()
    const ref = useRef<HTMLPreElement>(null)
    const [, copyToClipboard] = useCopyToClipboard()

    const onCopy = async () => {
        if (ref.current?.textContent) {
            copyToClipboard(ref.current.textContent)

            toast.message(
                <div className={styles.notification}>
                    <CodeXml className={styles.icon} />
                    <p>{t('components.common.codebox.copied')}</p>
                </div>
            )
        }
    }

    return (
        <div className={styles.root}>
            <pre ref={ref} tabIndex={0} dir='ltr' className={cn(styles.content, className)}>
                {transformCode(children, language)}
            </pre>

            {/* TODO: copy code to comp herder */}
            {language && (
                <div className={styles.footer}>
                    <span className={styles.language}>{language}</span>
                    {showCopyButton && (
                        <ActionTooltip side='left' label={t('components.common.codebox.copy')}>
                            <Button variant='copy' className={styles.action} onClick={onCopy}>
                                <Copy className={styles.icon} />
                            </Button>
                        </ActionTooltip>
                    )}
                </div>
            )}
        </div>
    )
}

export default CodeBox
