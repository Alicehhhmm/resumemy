'use client';

import { useContext } from 'react';

import { ArticleContext } from '@/components/providers/article-provider';

export const useArticleContext = () => useContext(ArticleContext)

export default useArticleContext;
