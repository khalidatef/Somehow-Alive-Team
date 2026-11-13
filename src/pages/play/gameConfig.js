import { siteConfig } from '../../config/site';

// Keep the complete Godot web export in public/game/ with its original filenames.
// The final build's entry path is configured in src/config/site.js.
export const GAME_URL = siteConfig.gameEntry
  ? /^(https?:)?\/\//.test(siteConfig.gameEntry)
    ? siteConfig.gameEntry
    : `${import.meta.env.BASE_URL}${siteConfig.gameEntry.replace(/^\//, '')}`
  : '';
