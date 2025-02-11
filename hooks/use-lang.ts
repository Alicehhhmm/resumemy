import { useTranslations, useLocale } from 'next-intl'
import type { } from '@/i18n/i18n.d.ts'

export const useLang = () => {
    const rawT = useTranslations()
    const locale = useLocale()

    const t = (key: string, values?: Record<string, string | number>) => {
        try {
            return rawT(key, values)
        } catch {
            return key.split('.').pop() || key
        }
    }

    return {
        t,
        isZh: locale.startsWith('zh')
    }
}