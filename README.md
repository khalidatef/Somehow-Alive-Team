# Somehow Alive

English React + Vite website for the team’s Mars learning game. The crew leaves on an ice mission; Freddy and ORBI look after the base. Content follows the supplied `somehow_alive_website_data_submission.docx`, with credited science references and clearly separated fiction and gameplay simplifications.

## Run and verify

```sh
npm install
npm run dev
node --test tests/spaceWeather.test.js
npm run build
npm run preview
```

Production files are in `dist/`. This revision is local; it has not been pushed or deployed. The existing Vercel configuration is retained.

## Content and identity

| Edit | File |
| --- | --- |
| Brand, game entry, default theme, 30-second opening, final demo link | `src/config/site.js` |
| Shared English interface copy | `src/data/content.js` |
| Four opening scenes | `src/data/story.js` |
| 22 science cards, sources, team names and roles | `src/data/science.js` |
| Mars palette and light-theme tokens | `src/config/theme.css` |
| Page styling and responsive layouts | `src/index.css` |
| Educator worksheet | `public/worksheet.html` |
| Current Godot export | `public/game/` |

Routes: `#home`, `#game`, `#resources`, `#educators`, `#team`. Older `#mission`, `#play`, `#sources`, and `#science` links remain supported. Navigation supports arrow keys, Home and End. The skip link appears on keyboard focus. The opening has English captions, a focus trap, Next, Skip and Escape, and respects reduced motion.

Fonts are self-hosted Fredoka for headings, Nunito for body text, Cairo for Arabic glyphs and Press Start 2P for pixel accents. Their OFL licenses are alongside them in `public/assets/fonts/`. The approved website palette uses #16213E for the background, #0F3460 for cards, #EFC07B for headings and buttons, #FFFFFF for primary text, #AAB4C0 for muted text, #2CE8F5 for LIVE/ORBI accents and #F77622 for small Mars lines and icons. These named values and derived UI tokens live in `src/config/theme.css`; light mode uses corresponding contrast adjustments.

## NASA resources

The Science page contains filterable research cards, each linking to its publisher and explaining its connection to the mission design. Historical facts are labeled ARCHIVE; concepts are labeled CONCEPT. This does not imply all planned mechanics are implemented in the current game.

Sun Today requests NASA CCMC DONKI/WS/get/FLR for the last seven days. A successful fresh response is LIVE. A saved result, network failure, empty feed, timeout or rate limit is ARCHIVE; the page always retains a sourced historical example (May 2024 G5). Dates and source links are visible. Cached records are never presented as live. Both the live endpoint and archive fallback were verified locally.

NASA migrated DONKI in September 2026. The current public endpoint, `https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR`, supports browser CORS and needs no API key. The legacy api.nasa.gov endpoint returned 404 during review. Official migration and API links: https://ccmc.gsfc.nasa.gov/tools/DONKI/ .

The bundled 20-second Mars audio comes from NASA’s SuperCam Sol 1 recording. Source: https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/ . Credit: NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaero. It is a science resource, not the final project demo.

## Game integration

`src/pages/play/gameConfig.js` resolves `siteConfig.gameEntry` against Vite’s base URL. React embeds the export in an iframe; leaving Play or restarting removes it and ends the session. Website settings do not modify Godot’s internal state. No score or mission-state messaging protocol is currently implemented.

The latest pulled PCK, WASM, engine JS and game assets are preserved. Only the export HTML shell was adapted: page title, English engine locale argument, approved loading-screen colors and fonts, and a visible AI disclosure. `submission-shell.js` keeps the title stable and redirects canvas fullscreen to the document so the disclosure remains visible. The website fullscreen control includes the whole game view.

The current build rendered with English controls and the task “Water the garden” during review. This is a smoke test, not verification of every dialogue or scene. `--language en` selects Godot’s locale; it cannot translate hardcoded strings. Game-source changes require the original Godot project. See `docs/GAME_HANDOFF.md` for the final export requirements.

To replace the build, copy all export files together into `public/game/`, update `gameEntry` if needed, and preserve or reapply the shell disclosure, English locale and `submission-shell.js` include. Prefer a permanent in-game watermark in the source project. Test both the direct game URL and the embedded player. Archived files under `public/game/old/` are not the active game and were left as supplied.

## AI disclosure and final submission assets

Website concept SVGs carry a visible, embedded “AI-generated” label. The game’s HTML shell places the same label over the canvas, including direct view and document fullscreen. This covers the browser presentation; it does not alter the underlying Freddy sprite or provide disclosure in a native Godot build. Final artwork and in-game labels should be applied in the source project too.

The website opening is a skippable storyboard preview, not the submission demo. A nine-slide presentation was supplied as a reference: “Mars Mission — Learn by Keeping the Base Alive”. Its four primary colors are now used on the website. It is not linked as the final demo: it needs a seven-slide submission version, the Somehow Alive cover name, a 4–24 minute communication-delay correction, verified build-support claims, and visible labels on any AI-generated artwork. No final video was supplied. `submissionDemoUrl` remains empty until an approved public link is available. Apply the team’s submission constraints to those files: English; a subtitled video of at most 30 seconds OR a deck of at most 7 slides; visible AI-generated labels on every AI-generated/edited image. The Team page credits AI assistance and identifies asset credits still needed from the game team.

No offline gameplay guarantee or physical-device touch-support claim is made. A real phone and the final hosted build still need testing before submission.
