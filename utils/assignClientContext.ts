import type { ClientSharedServerContext } from '@/types';

/**
 * 创建客户端上下文默认值
 * @param props 来自服务端的部分上下文属性
 * @returns 合并默认值后的完整客户端上下文对象
 */
export const assignClientContext = <T extends ClientSharedServerContext>(
  props: Partial<T>
) =>
  ({
    frontmatter: props.frontmatter ?? {},
    pathname: props.pathname ?? '',
    readingTime: props.readingTime ?? {
      text: '',
      minutes: 0,
      time: 0,
      words: 0,
    },
    filename: props.filename ?? '',
    // headings: props.headings ?? [],
    // os: props.os ?? 'OTHER',
    // architecture: props.architecture ?? 'x64',
    // bitness: props.bitness ?? 64,
  }) as T;
