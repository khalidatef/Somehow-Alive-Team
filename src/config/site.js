export const siteConfig = {
  name: 'Somehow Alive',
  subtitle: 'Three sols. One rookie.',
  defaultLanguage: 'en',
  defaultTheme: 'dark',
  gameEntry: 'game/somehow-alive.html',
  storyDurationSeconds: 30,
  storyImages: [1, 2, 3, 4].map((number) => `assets/story/scene-${number}.svg`),
  publicUrl: 'https://somehow-alive-team.vercel.app/',
  submissionDemoUrl: '', // Add the team's final public video (<=30 s) or deck (<=7 slides).
};
