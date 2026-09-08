import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';
import dialogue from './frontier.dialogue.json';

const street = {
  image: '/frontier-trading/shop-scenes/town-street.webp',
  alt: 'A busy illustrated trading town with storefronts and a dusty road.',
};
export const frontierTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'frontier-first-trade',
  version: '1.2.0',
  interaction: 'cargo',
  replayLabel: 'Replay my first trade',
  kicker: 'Frontier Trading Company · The two-load challenge',
  headline: 'One wagon. Thirty coins. Please tell us you packed something useful.',
  invitation:
    'The wagon leaves soon. Your trading company has two empty cargo spaces—and you get to fill them.',
  sceneLabel: 'DEPARTURE BOARD · NEXT STOP: MILL CREEK',
  speeches: [
    {
      id: 'rowan-recruitment',
      speaker: 'Rowan · Returning trader',
      title: 'Your first trade with Rowan',
      summary:
        'Rowan invites you to help choose goods for the road. Try a practice trade with 30 coins and two cargo spaces: choose supplies, check your costs, and discover what buyers will offer.',
      video: '/project-intros/frontier/trading-town-launch.mp4',
    },
  ],
  prologue: {
    title: 'The road is full of opportunity.',
    setting:
      'A mud-splashed wagon rolls into town at sundown. Rowan climbs down, sets a weathered ledger on a crate, and gathers a crowd. You step closer to hear the tale of a trader just back from the route.',
    media: {
      image: '/project-intros/frontier/returning-trader-v1.png',
      alt: 'Rowan, a returning trader, tells an attentive crowd about the route beside a loaded wagon, with an open ledger and a mountain road behind him at sunset.',
    },
    dialogue: dialogue.prologue,
    continueLabel: 'I’m ready to try my first trade',
  },
  cargo: {
    startingCoins: 30,
    capacity: 2,
    vehicleImage: '/frontier-trading/vehicle-scenes/trade-wagon-realistic.webp',
    vehicleAlt: 'Your trading wagon',
  },
  transition: { style: 'load', label: 'Cargo aboard. Next stop: the market!' },
  sceneCaption:
    'Mara, the driver, has a weather report: rain ahead. A merchant promises a big price for cloth. The mule has contributed by eating the corner of the report. Choose two different supplies for this practice trade.',
  media: {
    image: '/project-intros/frontier/Opening-scene-image.png',
    alt: 'A frontier trading company prepares wagons and cargo in a busy mountain town while a trade ledger summarizes trips, profit, and goods sold.',
  },
  dialogue: [],
  prompt: 'Load the wagon. Which two supplies will you bring?',
  revealButton: 'Put my name on the company charter',
  choices: [
    {
      id: 'rope',
      cargo: { name: 'Sturdy rope', cost: 8, sale: 15 },
      label: 'Load sturdy rope',
      detail: 'Costs 8 coins. Useful equipment, modest expected demand.',
      image: '/frontier-trading/cargo-scenes/rope-coil.webp',
      imageAlt: 'Coil of trading rope.',
      badge: '8 COINS · 1 SPACE',
      result: {
        title: 'The rain changed the market.',
        text: 'At Mill Creek, a damaged ferry needs rope. A buyer offers 15 coins for your load. You make the sale! The driver calls you a genius. You remember that the storm helped, too.',
        evidence:
          'Practice trade: Rope costs 8 coins and sells for 15. Profit: 7 coins. Unexpected demand changed the offer.',
        surprise: 'THE FERRY NEEDS YOU!',
        media: street,
        metrics: [
          { label: 'Cost', value: '8' },
          { label: 'Sale', value: '15' },
          { label: 'Profit', value: '7' },
        ],
      },
    },
    {
      id: 'cloth',
      cargo: { name: 'Fine cloth', cost: 15, sale: 12 },
      label: 'Load fine cloth',
      detail: 'Costs 15 coins. A merchant predicts a sale for 24.',
      image: '/frontier-trading/cargo-scenes/wrapped-bale.webp',
      imageAlt: 'A wrapped bale of cloth.',
      badge: '15 COINS · 1 SPACE',
      result: {
        title: 'Big promise. Smaller offer.',
        text: 'You arrive to find three wagons selling cloth. The best offer is 12 coins, so this cloth sells for less than you paid. Mara unfolds the merchant’s forecast. It says “probably” in extremely tiny writing.',
        evidence:
          'Practice trade: Cloth costs 15 coins and sells for 12. Loss: 3 coins. A predicted price was not a guaranteed sale.',
        surprise: 'READ THE TINY “PROBABLY.”',
        media: street,
        metrics: [
          { label: 'Cost', value: '15' },
          { label: 'Sale', value: '12' },
          { label: 'Loss', value: '3' },
        ],
      },
    },
    {
      id: 'provisions',
      cargo: { name: 'Provisions', cost: 10, sale: 14 },
      label: 'Load provisions',
      detail: 'Costs 10 coins. Travelers always need to eat.',
      image: '/frontier-trading/cargo-scenes/provisions-sack.webp',
      imageAlt: 'Sack of travel provisions.',
      badge: '10 COINS · 1 SPACE',
      result: {
        title: 'A small profit. A very happy lunch line.',
        text: 'Travelers buy your provisions for 14 coins. You earn a steady profit. The mule looks disappointed that “company inventory” does not mean “free snacks.” What might another cargo have earned?',
        evidence:
          'Practice trade: Provisions cost 10 coins and sell for 14. Profit: 4 coins. Choosing provisions also meant giving up another possible trade.',
        surprise: 'SOLD. NOT SNACKED.',
        media: street,
        metrics: [
          { label: 'Cost', value: '10' },
          { label: 'Sale', value: '14' },
          { label: 'Profit', value: '4' },
        ],
      },
    },
  ],
  mission: {
    title: 'Now build a company that can explain its choices.',
    invitation:
      'One lucky sale does not make a strategy. Your company will choose cargo, plan routes, respond to changing markets, and tell the story behind its results.',
    image: '/frontier-trading/setup-scenes/company-charter.webp',
    imageAlt: 'A trading company charter waiting for its founders.',
    deliverable: 'Your company. Your strategy.',
    steps: [
      'Plan a load and defend the tradeoff.',
      'Track what you spend, earn, and change.',
      'Present your ledger and strategy to the class.',
    ],
    finishButton: 'Let’s build my trading company',
  },
};
