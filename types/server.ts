import type { ReadTimeResults } from 'reading-time';

import type { LegacyFrontMatter } from '@/types/frontmatter';

/**
 * 服务端与客户端共享的上下文数据结构
 * 包含页面渲染所需的核心元数据
 */
export interface ClientSharedServerContext {
  /** 当前页面的 FrontMatter 元数据 */
  frontmatter: LegacyFrontMatter;
  /** 当前页面路径（包含语言前缀） */
  pathname: string;
  /** 源文件路径（基于项目根目录） */
  filename: string;
  /** 基于内容计算的阅读时间估算 */
  readingTime: ReadTimeResults;
}
