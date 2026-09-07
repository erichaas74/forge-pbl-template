import type {
  NarrativeCoachAdapter,
  NarrativeCoachRequest,
  NarrativeCoachResponse,
} from '../domain/narrative-studio.models';
import { wordCount } from '../core/narrative-studio-state';

/**
 * Safe local preview of the coach contract. A classroom host can replace this
 * adapter with a moderated LLM gateway without giving the model write access.
 */
export class LocalNarrativeCoachAdapter implements NarrativeCoachAdapter {
  async respond(request: NarrativeCoachRequest): Promise<NarrativeCoachResponse> {
    const hero = request.bible.protagonist.trim() || 'your protagonist';
    const object = request.bible.importantObject.trim() || 'the object they carried ashore';
    const history = request.historicalSetting;
    const historicalPressure = history?.survivalPressure ?? request.storm.pressure;
    const sceneWords = wordCount(request.scene.text);
    if (request.stage === 'conversation' && request.tool === 'reply') {
      const answer = (request.message ?? '').trim();
      const remembered = answer.length > 110 ? `${answer.slice(0, 107)}…` : answer;
      return request.nextPlanningQuestion
        ? {
            text: `I saved your idea: “${remembered}” ${request.nextPlanningQuestion.prompt}`,
          }
        : {
            text: 'You made the important story decisions in your own words. Review the optional Story Notes next, or return to the map and write. You can change anything later.',
          };
    }
    switch (request.tool) {
      case 'question':
        return {
          text: `What do you want to change for ${hero} in this scene? Explain the choice they will face and why neither answer feels easy.`,
        };
      case 'possibilities':
        return {
          text: `Describe two different directions you are considering. What would ${hero} gain and lose in each one? I will help you compare the ideas you create.`,
        };
      case 'storm': {
        return {
          text: `You control the pressure. What new problem should interrupt this scene, and why would it matter to ${hero}? The historical setting suggests this kind of danger: ${historicalPressure} Change it freely as long as you protect the known facts.`,
        };
      }
      case 'continuity':
        return {
          text:
            sceneWords === 0
              ? 'Write a few lines first. Then I can check whether the scene agrees with your story bible and earlier choices.'
              : `Continuity check: you have established ${hero}, ${object}, and a ${request.bible.tone} tone. Does this scene agree with the historical boundary—${history?.accuracyBoundary ?? 'keep the established setting consistent'}—and clearly show what ${hero} knows?`,
        };
      case 'sensory':
        return {
          text: `Choose one detail ${hero} notices before anyone else: a sound carried by the wind, a texture underfoot, or a smell that signals danger. What does that detail make the reader predict?`,
        };
      case 'stakes':
        return {
          text: `The danger becomes meaningful when it threatens more than survival. How could this moment also threaten ${hero}'s goal, relationship, or belief about themself?`,
        };
      case 'reader':
        return {
          text:
            request.node.choices.length === 0
              ? `As a reader, I need the ending to show what ${hero}'s choices changed—not only whether they escaped. What earlier decision echoes here?`
              : `As a reader, I should understand what each option might cost without knowing the outcome. Do your choice labels promise two genuinely different risks?`,
        };
      case 'reply':
        return {
          text:
            sceneWords < 20
              ? `I saved your thinking: “${(request.message ?? '').trim()}” What action, line of dialogue, or detail could let the reader notice that idea for themselves?`
              : request.node.choices.length
                ? `Your scene now has ${sceneWords} words. How should the choice at the end grow from the idea you just explained, and what might each option cost?`
                : `Your ending now has ${sceneWords} words. Which earlier choice should the reader feel here, and how has ${hero} changed?`,
        };
    }
  }
}
