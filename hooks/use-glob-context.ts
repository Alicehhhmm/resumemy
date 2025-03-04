'use client';

import { useContext } from 'react';

import { MatterContext } from '@/components/providers/matter-provider';
import type { ClientSharedServerContext } from '@/types/server';

export const useGlobClientContext = (): ClientSharedServerContext => {
    const {
        frontmatter,
        pathname,
        readingTime,
        filename,
    } = useContext(MatterContext);

    return {
        pathname,
        frontmatter,
        readingTime,
        filename,
    };
};

export default useGlobClientContext;
