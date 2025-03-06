import GitHubSlugger from 'github-slugger';

/**
 * 获取 GitHub 用户头像的 URL
 * 
 * @param {string} username GitHub 用户名
 * @returns {string} 用户头像的 URL
 */
export const getGitHubAvatarUrl = (username: string): string =>
  `https://avatars.githubusercontent.com/${username}`;

/**
 * 用于生成与 GitHub 一致的 slug
 * 
 * @returns {(text: string) => string} 返回指定文本生成的 GitHub slug
 */
export const createGitHubSlugger = () => {
  const githubSlugger = new GitHubSlugger();

  return (text: string) => githubSlugger.slug(text);
};
