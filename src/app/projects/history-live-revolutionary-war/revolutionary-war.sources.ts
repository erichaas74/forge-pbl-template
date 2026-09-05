import type { HistoryLiveSource } from '../../templates/history-live/domain/history-live.models';

export const additionalRevolutionaryWarSources: readonly HistoryLiveSource[] = [
  {
    id: 'source-parker',
    title: 'Captain Parker’s sworn account',
    creator: 'John Parker, reproduced by Minute Man National Historical Park',
    dateLabel: '1775-04-25',
    availableOn: '1775-04-25',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Sworn deposition in a modern annotated page',
    perspective: 'patriot',
    excerpt:
      'Parker describes ordering his militia to disperse and denies provoking the British attack.',
    context:
      'Read the April 25 deposition in the 5:00 am section. Compare a participant’s account with British orders; neither establishes every detail of who fired first.',
    citation:
      'John Parker, reproduced by Minute Man National Historical Park, Captain Parker’s sworn account. See linked archive for the document and editorial notes.',
    url: 'https://www.nps.gov/mima/learn/historyculture/april-19-1775.htm',
    tags: ['lexington', 'testimony'],
  },
  {
    id: 'source-gage',
    title: 'Orders to seize military stores at Concord',
    creator: 'Thomas Gage to Francis Smith, reproduced by Minute Man National Historical Park',
    dateLabel: '1775-04-18',
    availableOn: '1775-04-18',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Military orders in a modern annotated page',
    perspective: 'british',
    excerpt:
      'Gage orders the seizure of military supplies at Concord while directing soldiers to avoid harming private property.',
    context:
      'Read the orders in the 10:00 pm section. Instructions show intended conduct, not proof that soldiers followed them. The surrounding modern narrative is retrospective.',
    citation:
      'Thomas Gage to Francis Smith, reproduced by Minute Man National Historical Park, Orders to seize military stores at Concord. See linked archive for the document and editorial notes.',
    url: 'https://www.nps.gov/mima/learn/historyculture/april-19-1775.htm',
    tags: ['lexington', 'orders'],
  },
  {
    id: 'source-stamp-resolves',
    title: 'Stamp Act Congress declarations',
    creator: 'Delegates to the Stamp Act Congress',
    dateLabel: '1765-10-19',
    availableOn: '1765-10-19',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Congressional resolutions',
    perspective: 'patriot',
    excerpt:
      'Delegates profess allegiance to the Crown while rejecting taxation without colonial consent.',
    context:
      'Compare the claims about representation and economic burdens with Parliament’s stated revenue purpose. Protest in 1765 was not automatically a call for independence.',
    citation:
      'Delegates to the Stamp Act Congress, Stamp Act Congress declarations. See linked archive for the document and editorial notes.',
    url: 'https://avalon.law.yale.edu/18th_century/resolu65.asp',
    tags: ['taxation', 'rights'],
  },
  {
    id: 'source-new-york-defense',
    title: 'Washington weighs the defense of New York',
    creator: 'George Washington to John Hancock',
    dateLabel: '1776-09-08',
    availableOn: '1776-09-08',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Command letter',
    perspective: 'patriot',
    excerpt:
      'Washington discusses the risks of exposing inexperienced troops and the limits of defensive positions.',
    context:
      'An opposing commander’s assessment can inform a Crown report, but explain that this was correspondence to Congress rather than a public British dispatch.',
    citation:
      'George Washington to John Hancock, Washington weighs the defense of New York. See linked archive for the document and editorial notes.',
    url: 'https://founders.archives.gov/documents/Washington/03-06-02-0203',
    tags: ['new-york', 'strategy'],
  },
  {
    id: 'source-saratoga-convention',
    title: 'Saratoga Articles of Convention',
    creator: 'John Burgoyne and Horatio Gates',
    dateLabel: '1777-10-16',
    availableOn: '1777-10-16',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Negotiated convention',
    perspective: 'multiple',
    excerpt:
      'Negotiated terms provide for surrender of arms and describe arrangements for troops, officers, and followers.',
    context:
      'The agreement shows what the commanders negotiated. Compare its promises with evidence about what later happened, identifying later accounts explicitly.',
    citation:
      'John Burgoyne and Horatio Gates, Saratoga Articles of Convention. See linked archive for the document and editorial notes.',
    url: 'https://avalon.law.yale.edu/18th_century/burgoyne_gates.asp',
    tags: ['saratoga', 'military'],
  },
  {
    id: 'source-gates-logistics',
    title: 'Gates reports northern transport difficulties',
    creator: 'Horatio Gates to George Washington',
    dateLabel: '1777-05-24',
    availableOn: '1777-05-24',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Command letter',
    perspective: 'patriot',
    excerpt:
      'Gates reports that persistent rain and poor roads delayed movement of cannon toward the northern forts.',
    context:
      'Use this as evidence of logistical conditions, not a complete explanation of Burgoyne’s later defeat.',
    citation:
      'Horatio Gates to George Washington, Gates reports northern transport difficulties. See linked archive for the document and editorial notes.',
    url: 'https://founders.archives.gov/documents/Washington/03-09-02-0510',
    tags: ['saratoga', 'logistics'],
  },
  {
    id: 'source-abigail',
    title: 'Abigail Adams challenges the limits of new laws',
    creator: 'Abigail Adams to John Adams',
    dateLabel: '1776-03-31',
    availableOn: '1776-03-31',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Private letter',
    perspective: 'multiple',
    excerpt:
      'Adams calls attention to women’s position as new political arrangements are considered.',
    context:
      'A private letter expresses one woman’s argument. It does not represent all women or prove that lawmakers adopted her proposals.',
    citation:
      'Abigail Adams to John Adams, Abigail Adams challenges the limits of new laws. See linked archive for the document and editorial notes.',
    url: 'https://founders.archives.gov/documents/Adams/04-01-02-0241',
    tags: ['women', 'rights'],
  },
  {
    id: 'source-hall',
    title: 'Petition for freedom to the Massachusetts Legislature',
    creator: 'Prince Hall and fellow Black petitioners',
    dateLabel: '1777-01-13',
    availableOn: '1777-01-13',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Petition transcription',
    perspective: 'multiple',
    excerpt: 'Petitioners connect natural rights to the demand for freedom from enslavement.',
    context:
      'Distinguish free petitioners from the enslaved people whose freedom they sought. Compare their argument with the Declaration without treating equality as already achieved.',
    citation:
      'Prince Hall and fellow Black petitioners, Petition for freedom to the Massachusetts Legislature. See linked archive for the document and editorial notes.',
    url: 'https://constitutioncenter.org/the-constitution/historic-document-library/detail/prince-hall-petition-to-the-massachusetts-legislature',
    tags: ['freedom', 'rights', 'black-communities'],
  },
  {
    id: 'source-delaware',
    title: 'Treaty with the Delawares',
    creator: 'Lenape leaders and United States commissioners',
    dateLabel: '1778-09-17',
    availableOn: '1778-09-17',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Treaty transcription',
    perspective: 'multiple',
    excerpt:
      'The treaty concerns peace, passage, assistance, and relations between the Lenape nation and the United States.',
    context:
      'Treat the Lenape as a political nation with its own interests. The written treaty is not evidence that every promise was fulfilled or that all Indigenous nations shared one position.',
    citation:
      'Lenape leaders and United States commissioners, Treaty with the Delawares. See linked archive for the document and editorial notes.',
    url: 'https://americanindian.si.edu/static/nationtonation/pdf/Treaty-with-the-Delawares-1778.pdf',
    tags: ['indigenous-nations', 'diplomacy'],
  },
  {
    id: 'source-yorktown-articles',
    title: 'Yorktown terms of capitulation',
    creator: 'British, American, and French commanders',
    dateLabel: '1781-10-19',
    availableOn: '1781-10-19',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Capitulation articles',
    perspective: 'multiple',
    excerpt:
      'The articles define the surrender of the garrisons and the treatment of prisoners and military property.',
    context:
      'Surrender terms document an agreement. Use separate land and naval evidence to explain why surrender became necessary.',
    citation:
      'British, American, and French commanders, Yorktown terms of capitulation. See linked archive for the document and editorial notes.',
    url: 'https://avalon.law.yale.edu/18th_century/art_of_cap_1781.asp',
    tags: ['yorktown', 'military'],
  },
  {
    id: 'source-paris-loyalists',
    title: 'Treaty of Paris: property and persecution',
    creator: 'British and United States negotiators',
    dateLabel: '1783-09-03',
    availableOn: '1783-09-03',
    primary: true,
    excerptKind: 'summary',
    sourceType: 'Peace treaty',
    perspective: 'multiple',
    excerpt:
      'Articles five and six address confiscated property and further prosecution connected to wartime allegiance.',
    context:
      'Distinguish what Congress promised to recommend from what states actually did. Compare the diplomatic language with an individual Loyalist’s experience.',
    citation:
      'British and United States negotiators, Treaty of Paris: property and persecution. See linked archive for the document and editorial notes.',
    url: 'https://avalon.law.yale.edu/18th_century/paris.asp',
    tags: ['loyalists', 'property'],
  },
];
