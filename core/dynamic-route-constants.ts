'use strict'

/**
 * standard dynamic route constants
 * format: NAME_NAME
 */

/**
 * 收录文章的顶层文件夹名称
 * @type {string}
 */
export const POSTS_FOLDER_NAME = 'pages';


/**
 * This is used for telling Next.js to do a Static Export Build of the Website
 */
export const ENABLE_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";


/**
 * This is used to ensure that pages are Static Export for all locales or only
 * in the default (`zh`) locale.
 *
 * Note that this is a manual Environment Variable defined by us during the
 * build process in CI.
 */
export const ENABLE_STATIC_EXPORT_LOCALE = process.env.NEXT_PUBLIC_STATIC_EXPORT_LOCALE === 'true'


