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

Production files are in `dist/`. GitHub pushes to `main` trigger the existing Vercel deployment. The existing Vercel configuration is retained.

## Content and identity

| Edit | File |
| --- | --- |
| Brand, game entry, default theme, 30-second opening, final demo link | `src/config/site.js` |
| Shared English interface copy | `src/data/content.js` |
| Four opening scenes | `src/data/story.js` |
| 22 science cards, sources, team names and roles | `src/data/science.js` |
| Mars palette and light-theme tokens | `src/config/theme.css` |
| Page styling and responsive layouts | `src/index.css` |
| Supplied Freddy/ORBI artwork and pixel expressions | `public/assets/characters/` |
| Educator worksheet | `public/worksheet.html` |
| Current Godot export | `public/game/` |
| Versioned game data parts and checksum manifest | `game-build/` |

Routes: `#home`, `#game`, `#resources`, `#educators`, `#team`. Older `#mission`, `#play`, `#sources`, and `#science` links remain supported. Navigation supports arrow keys, Home and End. The skip link appears on keyboard focus. The opening has English captions, a focus trap, Next, Skip and Escape, and respects reduced motion.

Fonts are self-hosted Fredoka for headings, Nunito for body text, Cairo for Arabic glyphs and Press Start 2P for pixel accents. Their OFL licenses are alongside them in `public/assets/fonts/`. The updated website palette uses #07245A for the background, #0F3460 for cards, #C75426 for the Mars accent, #E38951 for readable headings, #F6E7DB for warm primary text, #AAB4C0 for muted text and #2CE8F5 for LIVE/ORBI accents. Buttons use #B94C22 with white labels to improve contrast. These named values and derived UI tokens live in `src/config/theme.css`; light mode uses corresponding contrast adjustments.

The header spans the viewport; page content uses a fluid shared container up to 1760px with responsive gutters. The mission hero uses the team's supplied Freddy/ORBI sunset illustration, framed in CSS with a visible AI-generated label. The source JPEG is unchanged. Four supplied ORBI pixel expressions appear in companion notes and learning cards. Only the hero avatar floats gently; hover movement is small and all motion respects reduced-motion preferences. `PageIntro` shares the layout of the four supporting pages. Team credits spell Asiyah as requested.

## NASA resources

The Science page contains filterable research cards, each linking to its publisher and explaining its connection to the mission design. Historical facts are labeled ARCHIVE; concepts are labeled CONCEPT. This does not imply all planned mechanics are implemented in the current game.

Sun Today requests NASA CCMC DONKI/WS/get/FLR for the last seven days. A successful fresh response is LIVE. A saved result, network failure, empty feed, timeout or rate limit is ARCHIVE; the page always retains a sourced historical example (May 2024 G5). Dates and source links are visible. Cached records are never presented as live. Both the live endpoint and archive fallback were verified locally.

NASA migrated DONKI in September 2026. The current public endpoint, `https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR`, supports browser CORS and needs no API key. The legacy api.nasa.gov endpoint returned 404 during review. Official migration and API links: https://ccmc.gsfc.nasa.gov/tools/DONKI/ .

The bundled 20-second Mars audio comes from NASA’s SuperCam Sol 1 recording. Source: https://science.nasa.gov/resource/first-audio-recording-of-sounds-on-mars/ . Credit: NASA/JPL-Caltech/LANL/CNES/CNRS/ISAE-Supaero. It is a science resource, not the final project demo.

## Game integration

`src/pages/play/gameConfig.js` resolves `siteConfig.gameEntry` against Vite’s base URL. React embeds the export in an iframe; leaving Play or restarting removes it and ends the session. Website settings do not modify Godot’s internal state. No score or mission-state messaging protocol is currently implemented.

The November 14 `game.zip` export is integrated without modifying its PCK, WASM, engine JS or artwork. Only the export HTML shell was adapted: page title, English engine locale argument, approved loading-screen colors and fonts, and a visible AI disclosure. `submission-shell.js` keeps the title stable and redirects canvas fullscreen to the document so the disclosure remains visible. The website fullscreen control includes the whole game view.

The current PCK is 110,442,620 bytes, above GitHub's ordinary per-file limit. `game-build/` stores it as three binary parts of at most 40 MiB with SHA-256 checksums. The original `public/game/somehow-alive.pck` is generated and ignored by Git. Both `npm run dev` and `npm run build` automatically reconstruct and verify the exact original bytes before Vite runs. Vercel's Git integration runs the same build; no Git LFS toggle, external file host, browser reassembly or game-engine changes are needed. Parts stay outside `public/` and are not shipped alongside the reconstructed game. Always use the npm scripts instead of invoking `vite` directly after a fresh clone.

An earlier export rendered with English controls and the task “Water the garden” during browser review. The November 14 replacement was checked for exact binary integrity and HTTP delivery; interactive browser review was unavailable during this update. Every dialogue and scene still needs a playthrough. `--language en` selects Godot’s locale; it cannot translate hardcoded strings. Game-source changes require the original Godot project. See `docs/GAME_HANDOFF.md` for the final export requirements.

To replace the build:

1. Copy the matching Web export files into `public/game/`, retaining the current filename `somehow-alive`. Skip editor-only `.import` sidecars. Update `gameEntry` and the packaging script paths if the export basename changes.
2. Preserve or reapply the shell disclosure, English locale, loading colors and `submission-shell.js` include. Set the HTML `GODOT_CONFIG.fileSizes` values to the new PCK/WASM byte counts.
3. Run `npm run game:pack` after copying the new PCK. This replaces the versioned parts and checksum manifest. Do not stage the generated PCK or use `git add -f` on it.
4. Run `node --test tests/gamePack.test.mjs tests/spaceWeather.test.js` and `npm run build`. Test both the direct game URL and the embedded player, then commit the export shell, assets and `game-build/` together and push.

Prefer a permanent in-game watermark in the source project. Archived files under `public/game/old/` are not the active game and were left as supplied.

## AI disclosure and final submission assets

Website concept SVGs carry a visible, embedded “AI-generated” label. The game’s HTML shell places the same label over the canvas, including direct view and document fullscreen. This covers the browser presentation; it does not alter the underlying Freddy sprite or provide disclosure in a native Godot build. Final artwork and in-game labels should be applied in the source project too.

The website opening is a skippable storyboard preview, not the submission demo. A nine-slide presentation was supplied as a reference: “Mars Mission — Learn by Keeping the Base Alive”. Its four primary colors are now used on the website. It is not linked as the final demo: it needs a seven-slide submission version, the Somehow Alive cover name, a 4–24 minute communication-delay correction, verified build-support claims, and visible labels on any AI-generated artwork. No final video was supplied. `submissionDemoUrl` remains empty until an approved public link is available. Apply the team’s submission constraints to those files: English; a subtitled video of at most 30 seconds OR a deck of at most 7 slides; visible AI-generated labels on every AI-generated/edited image. The Team page credits AI assistance and identifies asset credits still needed from the game team.

No offline gameplay guarantee or physical-device touch-support claim is made. A real phone and the final hosted build still need testing before submission.
