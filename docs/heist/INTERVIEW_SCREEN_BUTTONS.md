# Three interview screen buttons

The main coastal painting and exploration scene now contain three compact image buttons: Crop Farmer, Fisherman, Canoe Builder. The controls overlay the activity, with no extra content band. They appear in both coastal lessons and the isolated lesson 1 field preview. The painting hides them while the learner is selecting repair regions.

Implementation: optional `PanoramaDefinition.interviews`, validated local media paths, and reusable `InterviewScreensComponent`. A configured interview opens a native modal player with controls, English caption track, and Return to scene. Closing pauses playback, removes the player and restores button focus; the scene stays mounted behind it.

Current media status: **no interview clips are supplied**. All three buttons say Video pending and are disabled; no broken URL, old camera-zoom video, fake playback or invented transcript is used. The connected Runway workspace was checked and its free plan does not permit video generation. No credits were spent and no purchase was made. This is completion of the requested button layout, not delivery of interview videos.

To connect reviewed assets, add `video: {src: '/projects/shadow-gallery/interviews/<name>.mp4', captions: '/projects/shadow-gallery/interviews/<name>.vtt'}` to each entry in `docs/heist/configure-coastal-panorama.mjs`, put both files in public, and rerun the generator. The button then enables and says Play interview. Existing panorama images are location thumbnails, not frames from a completed interview.

Checks cover pending state, supplied-video/caption binding, close/pause behavior and invalid media paths, plus existing coastal/weekly behavior. Logs: `output/spatial-foundation/interview-screens-tests.log` and `interview-screens-build.log`. Production preview build passed; browser visual review remains unavailable due to the computer-control initialization error.
