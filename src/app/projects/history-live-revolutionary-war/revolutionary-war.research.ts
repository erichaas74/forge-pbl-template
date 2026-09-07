import type { HistoryLiveResearchLibrary } from '../../templates/history-live/domain/history-live-research';

/** Factual descriptions and attributed summaries. No suggested claims or source rankings. */
export const revolutionaryWarResearch: HistoryLiveResearchLibrary = {
  version: '1.0',
  witnessSourceIds: ['source-parker'],
  entries: [
    {
      id: 'interview-parker',
      category: 'interviews',
      title: 'John Parker',
      description:
        'Lexington militia captain. A scripted Q&A drawn from his sworn deposition of April 25, 1775.',
      sourceIds: ['source-parker'],
      sections: [
        {
          label: 'What order does Parker describe?',
          text: 'Parker’s deposition states that he ordered the militia to disperse.',
        },
        {
          label: 'What does Parker say about the encounter?',
          text: 'He denies that his men provoked the British attack.',
        },
      ],
    },
    {
      id: 'interview-gage',
      category: 'interviews',
      title: 'Thomas Gage',
      description:
        'British commander. A scripted Q&A drawn from his orders to Francis Smith, April 18, 1775.',
      sourceIds: ['source-gage'],
      sections: [
        {
          label: 'What destination is named in the orders?',
          text: 'The orders name Concord and direct the seizure of military supplies there.',
        },
        {
          label: 'What instruction concerns private property?',
          text: 'Gage directs the soldiers to avoid harming private property.',
        },
      ],
    },
    {
      id: 'interview-washington',
      category: 'interviews',
      title: 'George Washington',
      description:
        'Continental commander. A scripted Q&A drawn from Valley Forge orders and correspondence, December 1777.',
      sourceIds: ['source-valley-forge-orders', 'source-valley-forge-supplies'],
      sections: [
        {
          label: 'What construction is described in the orders?',
          text: 'The December 20 orders concern winter huts and the preservation of timber.',
        },
        {
          label: 'What does the letter to Henry Laurens report?',
          text: 'On December 23, Washington warns of shortages and says the army could starve, dissolve, or disperse without changes in supply.',
        },
      ],
    },
    {
      id: 'interview-adams',
      category: 'interviews',
      title: 'Abigail Adams',
      description:
        'Letter writer. A scripted Q&A drawn from her March 31, 1776 letter to John Adams.',
      sourceIds: ['source-abigail'],
      sections: [
        {
          label: 'Who received the letter?',
          text: 'Abigail Adams addressed the letter to John Adams.',
        },
        {
          label: 'What subject does the letter raise?',
          text: 'The letter asks that women be considered in new laws and political arrangements.',
        },
      ],
    },
    {
      id: 'event-lexington',
      category: 'events',
      title: 'Lexington and Concord',
      description:
        'April 1775, Massachusetts. Dated records of military orders and a militia captain’s account.',
      sourceIds: ['source-gage', 'source-parker'],
      sections: [
        {
          label: 'April 18 · Orders',
          text: 'Gage issues orders to Francis Smith concerning military stores at Concord.',
        },
        {
          label: 'April 25 · Deposition',
          text: 'Parker gives a sworn account of the encounter at Lexington.',
        },
      ],
    },
    {
      id: 'event-declaration',
      category: 'events',
      title: 'The Declaration is issued',
      description: 'July 4, 1776. Congress’s public declaration of separation from Britain.',
      sourceIds: ['source-declaration'],
      sections: [
        {
          label: 'July 4 · Declaration',
          text: 'Congress announces separation from Britain and publishes grievances against the Crown.',
        },
      ],
    },
    {
      id: 'event-valley-forge',
      category: 'events',
      title: 'Winter at Valley Forge',
      description:
        'December 1777. Headquarters records concerning huts, timber, and army supplies.',
      sourceIds: ['source-valley-forge-orders', 'source-valley-forge-supplies'],
      sections: [
        {
          label: 'December 20 · General orders',
          text: 'Orders direct the construction of winter huts and the preservation of timber.',
        },
        {
          label: 'December 23 · Correspondence',
          text: 'Washington sends Henry Laurens a letter concerning army supplies.',
        },
      ],
    },
    {
      id: 'event-saratoga',
      category: 'events',
      title: 'The Saratoga convention',
      description: 'October 16, 1777. Negotiated terms involving Burgoyne’s and Gates’s forces.',
      sourceIds: ['source-saratoga-convention'],
      sections: [
        {
          label: 'Articles of Convention',
          text: 'The terms describe surrender of arms and arrangements for troops, officers, and followers.',
        },
      ],
    },
    {
      id: 'event-yorktown',
      category: 'events',
      title: 'The Yorktown capitulation',
      description:
        'October 19, 1781. An agreement concerning the surrender of the garrisons at Yorktown.',
      sourceIds: ['source-yorktown-articles', 'source-yorktown-map'],
      sections: [
        {
          label: 'October 19 · Articles',
          text: 'The agreement specifies terms for the garrisons, prisoners, and military property.',
        },
      ],
    },
  ],
};
