export interface ProjectTypeOverview {
  readonly title: string;
  readonly description: string;
}

export const projectTypeOverviews: Readonly<Record<string, ProjectTypeOverview | undefined>> = {
  'engineering-design': {
    title: 'Engineering / Design Challenge',
    description:
      'Students showcase learning by designing and building a race car, measuring its performance in test runs, analyzing data, and using evidence to defend their design decisions. Engagement comes from testing a car they built, learning from failed trials, improving the design, and putting it to the test in a final race or performance challenge.',
  },
  'astronomy-calendar-monument': {
    title: 'Astronomy / Calendar & Monument Building',
    description:
      'Students demonstrate learning by exploring the solar system, observing the positions and patterns of the Sun, Moon, and stars, and researching how people throughout history developed calendars. They apply their observations and historical research to build a monument that marks time through celestial alignments. Engagement comes from experimenting with a changing sky, testing shadows and alignments across days and seasons, and seeing their own monument connect astronomy with the human history of timekeeping.',
  },
  investigation: {
    title: 'Investigation / Mystery Lab',
    description:
      'Students demonstrate mastery by gathering evidence, identifying patterns, developing competing explanations, and defending a conclusion. Engagement comes from not knowing the answer at the beginning and gradually uncovering the mystery through experiments, clues, documents, or observations.',
  },
  'evidence-case': {
    title: 'Evidence / Case File Investigation',
    description:
      'Students showcase learning by constructing an organized case from sources, evidence, maps, data, artifacts, or witness accounts and presenting a supported claim. The case-board format makes learning feel like detective work as students decide what evidence supports, contradicts, or changes their theory.',
  },
  'exhibit-hall': {
    title: 'Museum / Exhibit Hall / Showcase',
    description:
      "Students prove learning by curating artifacts, models, explanations, graphics, and evidence into an exhibit that teaches an audience. Engagement comes from seeing everyone's work become part of a shared digital museum or exhibition rather than simply turning in an assignment.",
  },
  'history-live-broadcast': {
    title: 'Broadcast Studio / Live Newsroom',
    description:
      'Students demonstrate learning by researching events or issues, gathering evidence, interviewing sources or historical characters, and turning that work into reports, analysis segments, graphics, and a polished broadcast. Engagement comes from authentic newsroom roles, live or simulated breaking events, deadlines, and the feeling that students are reporting from inside the story rather than just summarizing it afterward.',
  },
  'debate-studio': {
    title: 'Debate / Trial / Hearing',
    description:
      'Students showcase mastery through claims, evidence, counterclaims, questioning, rebuttals, and oral defense. Engagement increases because opposing teams can challenge their reasoning and the final verdict or decision is not predetermined.',
  },
  'journey-replay': {
    title: 'Exploration / Voyage / Route Mission',
    description:
      'Students demonstrate learning by using maps, calculations, research, and evidence to choose routes and defend decisions during a journey. New locations, hazards, discoveries, and choices make the project feel like an evolving expedition.',
  },
  'simulation-decision': {
    title: 'Trading / Resource Decision Simulation',
    description:
      'Students prove learning through repeated calculations, economic decisions, resource management, data analysis, and explanations of their strategy. Changing prices, routes, shortages, events, and competitors make every decision affect what happens next.',
  },
  'live-strategy-league': {
    title: 'Live Competition League',
    description:
      'Students showcase mastery through recurring rounds where academic calculations or decisions determine team performance and leaderboard position. Students can improve their strategy throughout the project and finish with a competitive championship round.',
  },
  'programming-automation': {
    title: 'Robot Coding / Automation Challenge',
    description:
      'Students demonstrate learning by planning movements, using measurements and variables, coding, debugging errors, and explaining the efficiency of their solution. Engagement comes from immediately seeing a robot respond to their commands and eventually competing on a shared course or mission.',
  },
  'crisis-operations': {
    title: 'Crisis Operations Center',
    description:
      'Students showcase learning by analyzing incoming maps, data, reports, probabilities, and stakeholder information before making and defending group decisions. A changing command center with alerts, maps, video reports, NPC activity, and unexpected developments creates urgency and makes teamwork important.',
  },
  'competition-show': {
    title: 'Semi-Live Game Show / Tournament',
    description:
      'Students showcase learning through recorded mini-rounds, evidence challenges, rapid-response tasks, and a final live tournament or game-show round. Scores, buzz-in questions, short competitions, highlight reels, and a championship ending keep energy high throughout the project.',
  },
  heist: {
    title: 'Heist / Break-In Challenge',
    description:
      'Students demonstrate mastery by applying academic knowledge to operate locks, identify correct evidence, navigate routes, and solve interconnected puzzles. Engagement comes from manipulating mechanisms and discovering that academic knowledge directly unlocks the next part of the environment.',
  },
  'publication-preview': {
    title: 'Community Story Network',
    description:
      'Students showcase learning by researching real people or events, conducting interviews, verifying information, and publishing polished stories, podcasts, videos, or reports. Engagement comes from creating work about athletes, families, businesses, organizations, and community events for an authentic audience.',
  },
  'research-symposium': {
    title: 'Research Symposium / Expert Conference',
    description:
      'Students demonstrate mastery by becoming knowledgeable about a focused question, synthesizing credible research, and defending evidence-based conclusions. Students develop ownership by becoming the class expert and participating in presentations, panels, poster sessions, questioning, and peer discussion.',
  },
  'time-repair': {
    title: 'Time Repair / Timeline Restoration Mission',
    description:
      'Students prove learning by identifying what is wrong in a corrupted historical or literary timeline, researching what actually happened, and using evidence to determine what must be repaired. Engagement comes from entering disrupted historical events or book worlds and progressively restoring the correct timeline.',
  },
  'narrative-studio': {
    title: 'Branching Narrative / Story Studio',
    description:
      'Students demonstrate learning by researching a setting, developing characters, and writing connected story paths with meaningful choices and consequences. Engagement comes from playtesting one another’s stories, revising the experience, and publishing an adventure an audience can explore.',
  },
  'historical-forgery': {
    title: 'Historical Forgery Hunt / Living Artwork Restoration',
    description:
      'Students demonstrate learning by examining artworks for historical inaccuracies—wrong technology, clothing, architecture, plants, animals, people, geography, customs, or objects—then researching the time period and using evidence to explain exactly why the image is a forgery. Engagement comes from students entering the artwork’s setting as an immersive historical environment, interacting with people and objects to gather clues, then returning to the present to repair the forged artwork so every major detail accurately represents the period.',
  },
};
