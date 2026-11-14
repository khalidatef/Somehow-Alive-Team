# Final Godot export handoff

The website uses the November 14 `game.zip` export. Its binaries are preserved byte for byte. The large PCK is versioned in parts and reconstructed automatically before dev/build; see the README. English controls and the garden task were visible in the previous build's smoke test; every scene and dialogue still needs an English pass by the game team.

1. Use “Somehow Alive” in the project title, menus and credits.
2. Ensure English exists for all dialogue, objectives, choices, tooltips, tutorials and reports. Set English as the fallback/default locale. The website passes `--language en`, which only helps when the game supports English.
3. Add a persistent, high-contrast “AI-generated” label in a CanvasLayer wherever Freddy’s Gemini sprite or other AI-generated/edited artwork is shown. Include it in native builds, game screenshots and recordings. The website’s HTML overlay is for browser display only.
4. Keep the correct premise: the crew is on an ice mission; Freddy and ORBI operate the base. Sol 2 and Sol 3 are planned chapters until implemented.
5. Supply the original creator names/links/licenses for Moonbase tiles, music, sound effects and any other third-party game assets. Website credits must use the real asset list.
6. Export all Web files together, retaining the current single-threaded setup unless deliberately changed. Replace the active files under `public/game/`, retain the submission shell adaptations and update its file sizes. Run `npm run game:pack` to update the versioned PCK parts before committing. The README describes filename changes and the full workflow.
7. Check the direct game URL, embedded Play, fullscreen, mouse interaction and a real phone. Do not infer touch support from a responsive webpage.

The supplied reference presentation has nine slides and uses #EFC07B, #0F3460, #16213E and #1A1A2E. The website now follows this palette, with teal details inspired by ORBI. Before final submission, the presentation needs a seven-slide version, the Somehow Alive cover name, a 4–24 minute communication-delay correction, and visible AI-generated labels wherever applicable. Its claims of a fully playable Sol 1, touch support and an Arabic/English toggle must be checked against the final build. No final video has been supplied. The team’s limit remains a 30-second subtitled English video OR at most seven English slides.
