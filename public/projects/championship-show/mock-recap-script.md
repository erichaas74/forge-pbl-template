# THREE WEEKS. ONE FINAL.
## Mock warm-up video kit — 75 seconds

**Purpose:** Sell the final experience by making the audience remember the learning that led here. This is a fictional demonstration, not a recording of real students or a claim that the system already generates highlight videos automatically.

**Opening image:** `art/final-opening-v1.png` — the supplied HD studio opening frame. Use it for the first five seconds and as the video poster. Keep the small label **FICTIONAL DEMONSTRATION** in one corner throughout your mock video.

**Delivery:** 1920 × 1080, 16:9, MP4 with H.264 video and AAC audio, approximately 75 seconds. A 24 or 30 fps edit is fine. Use a clean broadcast narrator, restrained music, and fully readable captions. The supplied `mock-recap-captions.vtt` follows the narration below.

## Shot-by-shot script

| Time | Picture / edit | Narration | Graphics and sound |
|---|---|---|---|
| 00:00–00:05 | Hold the opening image. Very slow push toward the central screen. | “Three weeks. Eight teams. A championship built on more than a fast answer.” | Low musical pulse, one warm impact. Show title already on the screen. |
| 00:05–00:13 | Cut to stylized mock classroom footage or staged close-ups: hands moving budget cards, four supply kits, a calculator. No real student identities needed. | “It started with a simple challenge: make a plan, prove it with evidence, and be ready to defend it.” | WEEK 01 · MAKE A PLAN. Quick close-up of a written calculation. |
| 00:13–00:25 | Nova's neat $75 budget fills a screen. A delivery charge slides into view. Freeze for a beat; then show the corrected $81.50 total. | “Nova's first budget looked perfect. Until delivery arrived. Their best move wasn't the first answer. It was the correction.” | NOVA · $75.00 → $81.50. One gentle comic sound on DELIVERY, then a confident correction sting. Celebrate revision; don't mock a student. |
| 00:25–00:39 | Show a mock graph with a cropped axis. Atlas marks the scale; Comets points to the claim. Cut between the two team logos and their annotated work. | “Then came the graph nobody agreed on. Atlas spotted the scale. Comets questioned the claim. The room got louder. The evidence got stronger.” | WEEK 02 · FOLLOW THE EVIDENCE. Highlight the scale and a revised claim. Use a brief split-screen comparison. |
| 00:39–00:51 | Falcons crosses out a weak explanation and replaces it with a clearer claim plus evidence. Nova locks its final qualifier answer. | “By week three, the Falcons had rebuilt their explanation, and Nova had found its rhythm. Nobody stayed where they started.” | WEEK 03 · MAKE IT BETTER. Falcons comeback moment. A quiet applause swell. |
| 00:51–01:04 | Reveal eight seed cards in order. Move them into a quarterfinal bracket. Let the top four paths brighten without giving away the final winner. | “Three rounds of learning became the seeds. Eight teams. Four places in the championship show. Everyone stays part of the night.” | 1 Nova 124; 2 Atlas 116; 3 Comets 109; 4 Falcons 101; 5 Titans 96; 6 Ravens 92; 7 Orbit 88; 8 Pulse 82. These are competition points, not grades. |
| 01:04–01:15 | Return to the studio. Lights warm up. Quick views of four podiums, the buzzer, the covered question screen, and the trophy. Finish on a wide shot and hold the last frame. | “The next answer could change the scoreboard. The last wager could change the ending. Teams, take your places. This is the Championship Show.” | Music rises, then leaves space for the host. ON SCREEN: THE FINAL STARTS NOW. Fade music cleanly; no baked-in countdown. |

## Narration-only copy

Three weeks. Eight teams. A championship built on more than a fast answer.

It started with a simple challenge: make a plan, prove it with evidence, and be ready to defend it.

Nova's first budget looked perfect. Until delivery arrived. Their best move wasn't the first answer. It was the correction.

Then came the graph nobody agreed on. Atlas spotted the scale. Comets questioned the claim. The room got louder. The evidence got stronger.

By week three, the Falcons had rebuilt their explanation, and Nova had found its rhythm. Nobody stayed where they started.

Three rounds of learning became the seeds. Eight teams. Four places in the championship show. Everyone stays part of the night.

The next answer could change the scoreboard. The last wager could change the ending. Teams, take your places. This is the Championship Show.

## How the reel uses the earlier project events

The demonstration has three invented earlier events in `final-demo.json`: `budget-blowup`, `graph-detectives`, and `comeback`. Each contains a story, a skill, narration, and team competition-point contributions. Those exact contributions are summed to create the bracket seeds. The reel and the bracket therefore tell the same story.

For a real project, the intended workflow is: meaningful saved round/response → teacher selects a useful moment → approved still/clip and caption enter a recap playlist → the teacher plays that video before the bracket reveal. Include a mistake followed by revision, a strong explanation, a rivalry over evidence, and a comeback. Do not select only the fastest or highest-scoring students. Individual mastery remains separate from competition points.

The current demo plays a polished three-card storyboard when no video is supplied. It does not fabricate student recordings. When your mock video is ready, put it at `public/projects/championship-show/media/mock-recap.mp4` and add these fields to `final-demo.json`:

```json
"recapVideo": "/projects/championship-show/media/mock-recap.mp4",
"recapCaptions": "/projects/championship-show/mock-recap-captions.vtt"
```

The Season Rewind chapter uses the video, keeps playback controls available, and moves to the bracket after the video ends when demo autoplay is on. Starting the final questions remains a separate cue; watching the video never consumes question time.

## The fictional final story after the video

Quarterfinals send Nova, Falcons, Atlas, and Comets into the show. The first question gives everyone 100 points. Atlas wins the buzzer question and leads with 200. A silly break releases the tension. In the final wager, Atlas risks 200 and forgets delivery; Nova remembers its early mistake, wagers 100, and finishes at 200. Comets finishes at 180 and Falcons at 140. Nova wins. The opening story pays off in the final answer.

## Quiz-break bits

- **Mystery Zoom, 15 seconds:** Crop tightly into the sunglasses duck image. Invite guesses: “A very confident duck,” “A tiny submarine,” or “The principal's spaceship.” Zoom out. Host: “It was a duck. We apologize to the space program.”
- **Wrong Answers Only, 15–20 seconds:** “Why did the calculator join the band?” Deliver: “Excellent algorithm and blues,” “The decimal drums,” or “It could count on the bass player.” The audience picks a favorite. No academic scoring.
- **Victory Pose Freeze, 10–15 seconds:** “A robot who just won a science fair.” Count five seconds, then freeze. Other prompts: “A penguin presenting a serious budget” or “A superhero who discovered a remainder.” Seated participation and passing are welcome.

These breaks keep eliminated teams involved. They are optional entertainment, not mastery evidence, and never change the championship score.
