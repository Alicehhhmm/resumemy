'use client'

import { useState, useMemo } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { NestedDirectory, TOCItem } from '@/components/common/NestedDirectory'

interface ArticleAsideProps {
    toc: TOCItem[]
}

export const ArticleAside = ({ toc }: ArticleAsideProps) => {
    return (
        <ScrollArea className='bg-background dark:bg-background pt-10 scrollbar-hide'>
            <h3 className='text-sm text-foreground font-semibold mb-4 pl-3'>ON THIS PAGE</h3>
            <NestedDirectory directories={toc} maxLayer={4} />
        </ScrollArea>
    )
}

export default ArticleAside
