// Final handoff settings. Edit content in src/data/ and colors in theme.css.
export const siteConfig = {
    name: 'OUTPOST 07',
    subtitle: 'THE LAST SIGNAL',
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    gameEntry: 'game/somehow-alive.html',
    storyDurationSeconds: 30,
    storyImages: [1, 2, 3, 4].map((number) => `assets/story/scene-${number}.svg`),
};
