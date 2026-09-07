# Senate opening videos

The Fate of the Republic launch now presents the supplied Senator Lucius and Senator Cassius MP4s. They replace the paired senator illustration, drawn choice portraits, and separate narrated WAV dialogue on this launch. The existing question/reveal interaction still leads to the final-product preview and the nonfunctional **Future chatbot link** interface.

## Source and delivery

| Original in this directory  |            Size | Dimensions |       Duration |
| --------------------------- | --------------: | ---------- | -------------: |
| opening-Senator Lucius.mp4  | 3,395,914 bytes | 720 × 1280 | 10.005 seconds |
| opening-Senator Cassius.mp4 | 2,647,050 bytes | 720 × 1280 | 10.005 seconds |

Both originals are unchanged. Angular copies `docs/debate-studio/*.mp4` to `/debate-studio/openings/` during builds. Restart an already-running development server after this asset-mapping change. Filename spaces are encoded in configuration URLs.

The files contain H.264 video and AAC audio, with the MP4 metadata before the media payload. Their existing size and format are suitable for these short opening clips; no conversion is needed. Portrait framing is preserved without cropping. Players load metadata, never autoplay, and expose browser sound, seek, and fullscreen controls.

## Reusable capability

- `DecisionSceneConfig.speeches` is an optional validated list of local video presentations with speaker, title, contextual summary, and optional WebVTT captions. Existing silent opening media behavior is unchanged.
- `OpeningSpeechesComponent` renders the presentation list, pauses other players when one starts, and pauses playback on removal. Decision-scene replay, choice, and skip also stop playback.
- Subject-specific speaker names, questions, and asset URLs remain in `senate.teaser.ts`; the renderer contains no project-ID checks. The teaser version is now 1.1.0.
- No new runtime events, persistence changes, dependencies, or remaining template capability gaps.

## Verification and limitations

Production build and 27 focused launch/media tests passed. Browser checks verified both local assets decode, user-triggered playback, one speaker playing at a time, and mobile layout at 390px without horizontal overflow. Existing unrelated stylesheet budget warnings remain.

No caption files were supplied. The copy under each video is a discussion prompt, not a claimed transcript. The optional `captions` field supports a verified WebVTT file when available; this change does not invent subtitles from the old WAV dialogue.
