'use strict'

/**
 * This is used to verify if the current Website is running on a Development Environment
 */
export const IS_DEV_ENV = process.env.NODE_ENV === 'development'

/**
 * This is used for telling Next.js if the Website is deployed on Vercel
 *
 * Can be used for conditionally enabling features that we know are Vercel only
 *
 * @see https://vercel.com/docs/projects/environment-variables/system-environment-variables#VERCEL_ENV
 */
export const VERCEL_ENV = process.env.VERCEL_ENV || undefined

/**
 * This is used for telling Next.js to do a Static Export Build of the Website
 *
 * This is used for static/without a Node.js server hosting, such as on our
 * legacy Website Build Environment on Node.js's DigitalOcean Droplet.
 *
 * Note that this is a manual Environment Variable defined by us during `npm run deploy`
 */
export const ENABLE_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' || process.env.NEXT_PUBLIC_STATIC_EXPORT === true

/**
 * 这定义了每个分页页面应该有多少篇博客文章
 * This defines how many blog posts each pagination page should have
 */
export const BLOG_POSTS_PER_PAGE = 6
