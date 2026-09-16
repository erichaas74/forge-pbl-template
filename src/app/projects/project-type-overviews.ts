export interface ProjectTypeOverview {
  readonly title: string;
  readonly description: string;
}

export const projectTypeOverviews: Readonly<Record<string, ProjectTypeOverview | undefined>> = {
  'engineering-design': {
    title: 'Engineering / Design Challenge',
    description:
      'Build it. Test it. Make it faster! Kids turn measurement and data into a race car design, learning from every trial before the final race.',
  },
  'astronomy-calendar-monument': {
    title: 'Astronomy / Calendar & Monument Building',
    description:
      'Build with sunlight! Kids track shadows, test seasonal alignments, and discover how Earth’s tilt shapes the year as they create a monument that tells time.',
  },
  investigation: {
    title: 'Investigation / Mystery Lab',
    description:
      'Every experiment brings the answer closer! Kids compare properties, test reactions, and challenge their theories, turning scientific evidence into the solution to a mystery.',
  },
  'evidence-case': {
    title: 'Evidence / Case File Investigation',
    description:
      'Follow the clues. Build the case! Kids connect sources, spot contradictions, and weigh evidence on a detective board where one discovery can change their whole theory.',
  },
  'exhibit-hall': {
    title: 'Museum / Exhibit Hall / Showcase',
    description:
      'Turn discoveries into a museum worth exploring! Kids investigate artifacts, uncover their stories, and curate exhibits that bring history to life for an audience.',
  },
  'history-live-broadcast': {
    title: 'Broadcast Studio / Live Newsroom',
    description:
      'Put kids in the newsroom! They investigate sources, check the facts, and sharpen their writing as they turn a big story into a team news broadcast.',
  },
  'debate-studio': {
    title: 'Debate / Trial / Hearing',
    description:
      'Make the case that changes minds! Kids investigate history, build arguments, and answer tough challenges in a debate where evidence gives every voice its power.',
  },
  'journey-replay': {
    title: 'Exploration / Voyage / Route Mission',
    description:
      'Chart a course into the unknown! Kids read maps, weigh historical evidence, and manage supplies as changing conditions turn geography and decision-making into an unfolding adventure.',
  },
  'simulation-decision': {
    title: 'Trading / Resource Decision Simulation',
    description:
      'Make every trade count! Kids calculate costs, compare prices, and balance risk as they build a trading company through changing markets and unpredictable journeys.',
  },
  'live-strategy-league': {
    title: 'Live Competition League',
    description:
      'Smart math. Bold moves. A shot at the top! Kids analyze demand, calculate profit, and rethink their strategy as each market round reshapes the standings.',
  },
  'programming-automation': {
    title: 'Robot Coding / Automation Challenge',
    description:
      'Code it, run it, crack the course! Kids turn geometry and measurement into robot commands, using loops and debugging to conquer increasingly tricky delivery missions.',
  },
  'crisis-operations': {
    title: 'Crisis Operations Center',
    description:
      'Take command when every decision matters! Kids connect weather, water, and geography, check incoming reports, and direct limited resources as an emergency unfolds around them.',
  },
  'competition-show': {
    title: 'Semi-Live Game Show / Tournament',
    description:
      'Bring math to the championship stage! Kids tackle number challenges, explain their thinking, and learn from each round before buzzers and final wagers raise the stakes.',
  },
  heist: {
    title: 'Heist / Break-In Challenge',
    description:
      'Crack the locks. Free the animals! Kids put fractions, decimals, and measurement to work on moving mechanisms, making every solved puzzle part of a daring rescue.',
  },
  'publication-preview': {
    title: 'Community Story Network',
    description:
      'Give local stories a bigger voice! Kids learn to interview, verify facts, and craft compelling reports, creating a community publication with real people at its heart.',
  },
  'research-symposium': {
    title: 'Research Symposium / Expert Conference',
    description:
      'Become the expert everyone wants to hear! Kids pursue a big question, connect credible research, and defend their discoveries through posters, presentations, and lively peer discussion.',
  },
  'time-repair': {
    title: 'Time Repair / Timeline Restoration Mission',
    description:
      'History has a missing piece! Kids trace clues, compare sources, and test cause and effect as they repair a broken timeline and discover why one invention matters.',
  },
  'narrative-studio': {
    title: 'Branching Narrative / Story Studio',
    description:
      'Write an adventure someone can play! Kids build characters, shape choices and consequences, and sharpen their storytelling by testing and revising every path through a branching tale.',
  },
  'historical-forgery': {
    title: 'Historical Forgery Hunt / Living Artwork Restoration',
    description:
      'Step inside a painting. Catch history’s impostors! Kids investigate sources, spot details from the wrong time or place, and use evidence to restore the historical scene.',
  },
};
