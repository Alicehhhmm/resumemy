'use strict';

import _siteNavigation from './navigation.json' with { type: 'json' };
import _siteSettings from "./system-settings.json" with { type: 'json' };
import _bookmarks from './bookmarks.json' with { type: 'json' };

/** @type {import('./types').SiteNavigation} */
export const siteNavigation = _siteNavigation;

/** @type {import('./types').SiteSettings} */
export const siteConfig = _siteSettings

/** @type {import('./types').SiteConfigBookmarks} */
export const bookmarksJSON = _bookmarks;