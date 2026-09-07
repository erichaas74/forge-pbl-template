import type { StoryReportingConfig } from '../../templates/history-live/reporting/story-reporting.models';

/** Starter assignments. Interviews and scene dispatches are explicit reconstructions of this packet. */
export const revolutionaryWarReporting: StoryReportingConfig = {
  version: '1.0',
  allowedFormats: ['broadcast', 'reaction', 'social', 'animation'],
  stories: [
    {
      id: 'lexington', leadId: 'lead-patriot-lexington', title: 'Who fired first?',
      location: 'Lexington & Concord', date: '1775-04-30', scene: 'roads',
      hook: 'One morning. Conflicting accounts.', sourceIds: ['source-parker', 'source-gage'],
      interviews: [
        { id: 'parker', name: 'John Parker', role: 'Militia captain', initials: 'JP', sourceIds: ['source-parker'], questions: [
          { id: 'account', question: 'What did you order your men to do?', answer: 'Parker’s sworn account says he ordered the militia to disperse. He denies that his men provoked the British attack.' },
          { id: 'evidence', question: 'How can I check your account?', answer: 'His deposition was sworn on April 25. Read it alongside evidence from the British side; a participant’s account is a perspective, not a complete view of the morning.' },
          { id: 'limit', question: 'Does this settle who fired first?', answer: 'No. This account tells you what Parker claimed. It cannot establish everything that every person saw or did.' },
        ] },
        { id: 'orders-clerk', name: 'The orders clerk', role: 'Composite British headquarters voice', initials: 'OC', sourceIds: ['source-gage'], questions: [
          { id: 'mission', question: 'Why were the soldiers sent to Concord?', answer: 'Gage’s orders direct the soldiers to seize military stores at Concord.' },
          { id: 'property', question: 'What did the orders say about property?', answer: 'The orders direct soldiers to avoid harming private property. That is an instruction; it does not establish what happened on the road.' },
          { id: 'challenge', question: 'Do orders prove how soldiers behaved?', answer: 'No. You need testimony or other records of what soldiers actually did. Keep intended conduct separate from observed conduct.' },
        ] },
        { id: 'lexington-printer', name: 'The local printer', role: 'Composite community voice', initials: 'LP', sourceIds: ['source-parker', 'source-gage'], questions: [
          { id: 'headline', question: 'Which headline could mislead readers?', answer: 'A headline that says the first shooter is proven would go beyond these two documents. One is an account after the event; the other is an order from before it.' },
          { id: 'missing', question: 'Whose account is missing here?', answer: 'This small packet does not give you every soldier’s or resident’s account. Make that gap visible when you report.' },
        ] },
      ],
      dispatches: [
        { time: 'Before the march', caption: 'Orders point toward military stores at Concord.', sourceIds: ['source-gage'] },
        { time: 'At Lexington', caption: 'Parker later reports ordering the militia to disperse.', sourceIds: ['source-parker'] },
        { time: 'After the encounter', caption: 'An order and a sworn account leave the first shot unresolved.', sourceIds: ['source-parker', 'source-gage'] },
      ],
    },
    {
      id: 'declaration', leadId: 'lead-patriot-declaration', title: 'Independence—for whom?',
      location: 'Philadelphia', date: '1776-07-31', scene: 'press',
      hook: 'A new promise. Unequal voices.', sourceIds: ['source-declaration', 'source-king-proclamation', 'source-abigail'],
      interviews: [
        { id: 'congress-printer', name: 'The Congress printer', role: 'Composite Philadelphia voice', initials: 'CP', sourceIds: ['source-declaration'], questions: [
          { id: 'news', question: 'What has Congress announced?', answer: 'The Declaration announces separation from Britain and makes a public case against the Crown.' },
          { id: 'audience', question: 'Who is this document trying to persuade?', answer: 'It presents grievances to domestic and international audiences. Read those grievances as an argument, not a neutral report.' },
          { id: 'proof', question: 'Does announcing equality make it real?', answer: 'A declaration states principles and claims. You need other evidence to establish how people were treated.' },
        ] },
        { id: 'crown-messenger', name: 'The Crown messenger', role: 'Composite royal office voice', initials: 'CM', sourceIds: ['source-king-proclamation'], questions: [
          { id: 'view', question: 'How does the Crown describe the conflict?', answer: 'The royal proclamation calls armed colonial resistance rebellion and calls for order to be restored.' },
          { id: 'language', question: 'Why does that word matter?', answer: '“Rebellion” frames resistance as a challenge to lawful authority. Compare that framing with the Declaration’s argument for separation.' },
          { id: 'timing', question: 'Was this written in reply to the Declaration?', answer: 'No. The proclamation is dated August 23, 1775. The Declaration is dated July 4, 1776. Do not reverse their order.' },
        ] },
        { id: 'abigail', name: 'Abigail Adams', role: 'Letter writer', initials: 'AA', sourceIds: ['source-abigail'], questions: [
          { id: 'rights', question: 'What concern did you raise?', answer: 'Adams’s correspondence asks that women be considered in the new laws. Her letter gives you a specific voice questioning how political change might affect women.' },
          { id: 'voice', question: 'Can I use this as every woman’s view?', answer: 'No. Attribute this perspective to Adams. One letter cannot stand for all women’s experiences or wishes.' },
          { id: 'followup', question: 'What would you investigate next?', answer: 'Compare the political promise with evidence of who could exercise rights. A request for change does not prove that the change happened.' },
        ] },
      ],
      dispatches: [
        { time: 'From the Crown', caption: 'An earlier proclamation calls the resistance rebellion.', sourceIds: ['source-king-proclamation'] },
        { time: 'At the printing desk', caption: 'Congress announces separation and publishes its grievances.', sourceIds: ['source-declaration'] },
        { time: 'Beyond Congress', caption: 'Adams’s letter raises the question of women’s place in new laws.', sourceIds: ['source-abigail'] },
      ],
    },
    {
      id: 'valley-forge', leadId: 'lead-patriot-valley-forge', title: 'Can the army get through winter?',
      location: 'Valley Forge', date: '1777-12-31', scene: 'camp',
      hook: 'Shelter, supplies, and an urgent warning.', sourceIds: ['source-valley-forge-orders', 'source-valley-forge-supplies'],
      interviews: [
        { id: 'washington', name: 'George Washington', role: 'Continental commander', initials: 'GW', sourceIds: ['source-valley-forge-supplies'], questions: [
          { id: 'crisis', question: 'What did you tell Congress?', answer: 'Washington warned that the army could starve, dissolve, or disperse without major changes in supply.' },
          { id: 'purpose', question: 'Why send such an urgent letter?', answer: 'A commander may emphasize urgency to prompt action. Identify the letter’s audience and purpose when using it as evidence.' },
          { id: 'check', question: 'How can I check the scale of the crisis?', answer: 'Look for supply inventories and soldiers’ accounts as well as headquarters letters. This packet cannot measure every soldier’s experience.' },
        ] },
        { id: 'camp-clerk', name: 'The camp clerk', role: 'Composite headquarters voice', initials: 'CC', sourceIds: ['source-valley-forge-orders'], questions: [
          { id: 'shelter', question: 'What work do the orders describe?', answer: 'The December 20 orders direct soldiers to preserve timber while building defensible winter huts.' },
          { id: 'meaning', question: 'What does that tell us about the camp?', answer: 'Establishing shelter required practical work and planning. The orders show what was directed, not a count of finished huts.' },
          { id: 'limits', question: 'Do these orders prove everyone had shelter?', answer: 'No. You would need evidence about completion and living conditions to support that claim.' },
        ] },
        { id: 'supply-reader', name: 'The supply correspondent', role: 'Composite reporting voice', initials: 'SC', sourceIds: ['source-valley-forge-orders', 'source-valley-forge-supplies'], questions: [
          { id: 'views', question: 'Are these two independent voices?', answer: 'Both documents come from Washington’s headquarters. Different documents are not automatically independent witnesses.' },
          { id: 'missing', question: 'Who else should this story hear from?', answer: 'Rank-and-file soldiers and people responsible for supplies could offer other perspectives. Their direct accounts are missing from this starter packet.' },
        ] },
      ],
      dispatches: [
        { time: 'Shelter orders', caption: 'Winter huts are to be built while conserving timber.', sourceIds: ['source-valley-forge-orders'] },
        { time: 'Supply warning', caption: 'A letter to Congress warns of a severe supply crisis.', sourceIds: ['source-valley-forge-supplies'] },
        { time: 'Still to verify', caption: 'Headquarters documents do not show every soldier’s experience.', sourceIds: ['source-valley-forge-orders', 'source-valley-forge-supplies'] },
      ],
    },
    {
      id: 'yorktown', leadId: 'lead-british-yorktown', title: 'Surrender. Is the war over?',
      location: 'Yorktown, Virginia', date: '1781-12-31', scene: 'siege',
      hook: 'Read the map. Test the headline.', sourceIds: ['source-yorktown-map', 'source-yorktown-articles'],
      interviews: [
        { id: 'terms-clerk', name: 'The negotiations clerk', role: 'Composite British office voice', initials: 'NC', sourceIds: ['source-yorktown-articles'], questions: [
          { id: 'terms', question: 'What exactly do the articles agree to?', answer: 'The articles define surrender of the garrisons and treatment of prisoners and military property.' },
          { id: 'war', question: 'Can I headline this “The war is over”?', answer: 'These are terms of capitulation at Yorktown. The document alone does not establish a peace settlement for the whole war.' },
          { id: 'cause', question: 'Do the terms explain why surrender happened?', answer: 'They document an agreement. To explain why it became necessary, compare land and naval evidence.' },
        ] },
        { id: 'map-reader', name: 'The map reader', role: 'Composite cartographic voice', initials: 'MR', sourceIds: ['source-yorktown-map'], questions: [
          { id: 'see', question: 'What does this plan show?', answer: 'The unfinished manuscript plan records siege works around Yorktown. Notice which positions are drawn and which details are incomplete.' },
          { id: 'date', question: 'When was this map available?', answer: 'The map is dated 1781, but its exact completion date is unknown. This assignment’s reporting date is the end of that year; do not claim soldiers had this exact plan during the siege.' },
          { id: 'trust', question: 'Is a map a complete picture?', answer: 'No. Maps select terrain and features. Check purpose, date, scale, and legend before making a claim.' },
        ] },
        { id: 'allied-clerk', name: 'The allied dispatch clerk', role: 'Composite American and French office voice', initials: 'AC', sourceIds: ['source-yorktown-articles', 'source-yorktown-map'], questions: [
          { id: 'angle', question: 'What would you emphasize?', answer: 'The negotiated surrender is central to this dispatch. A report should also describe what the terms meant for the people surrendering.' },
          { id: 'next', question: 'What should our audience still ask?', answer: 'What happens to the prisoners, and what remains unresolved beyond Yorktown? The map and agreement do not answer every consequence.' },
        ] },
      ],
      dispatches: [
        { time: 'Around Yorktown', caption: 'An unfinished plan marks the siege works.', sourceIds: ['source-yorktown-map'] },
        { time: 'At the negotiations', caption: 'Commanders agree terms for the garrisons’ surrender.', sourceIds: ['source-yorktown-articles'] },
        { time: 'Before the headline', caption: 'A local surrender agreement is not a treaty ending the whole war.', sourceIds: ['source-yorktown-articles'] },
      ],
    },
  ],
};
