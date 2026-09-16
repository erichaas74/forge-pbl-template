// src/app/templates/journey-replay/demo/journey-demo-class-summary.ts
var DEMO_GENERATED_AT = "2026-09-05T19:30:00.000Z";
var MEMBER_STATES = [
  {
    displayName: "Compass crew",
    status: "approved",
    revision: 2,
    responsePreview: "We kept the southern route because repair supplies made the longer passage defensible.",
    feedback: "Strong comparison of risk, evidence, and resources."
  },
  {
    displayName: "Horizon crew",
    status: "approved",
    revision: 1,
    responsePreview: "Turning west changed our mission, but the wind record made that safer than forcing the Cape.",
    feedback: "Clear cause-and-consequence reasoning."
  },
  {
    displayName: "Voyager crew",
    status: "submitted",
    revision: 1,
    responsePreview: "The open-water route saved time, but our final account had to include who carried the risk."
  },
  {
    displayName: "Star crew",
    status: "submitted",
    revision: 2,
    responsePreview: "Losing the mast did not end the voyage; it changed what we counted as a successful expedition."
  },
  {
    displayName: "Atlas crew",
    status: "revision-requested",
    revision: 2,
    responsePreview: "We mapped the northern crossing, and now we are revising the claim with stronger evidence about uncertainty.",
    feedback: "Name the source detail that supports the weather claim."
  }
];
function createDemoJourneyClassSummary(config, classLabel = "Ms. Rivera \xB7 Period 3") {
  const masteryTags = [...new Set(config.steps.flatMap((step) => step.masteryTags))];
  return {
    classId: "simulated-class-showcase",
    classLabel,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    generatedAt: DEMO_GENERATED_AT,
    revision: 12,
    members: config.classVoyages.map((voyage, index) => {
      const state = MEMBER_STATES[index % MEMBER_STATES.length];
      const studentId = `simulated-crew-${index + 1}`;
      return {
        studentId,
        studentDisplayName: state.displayName,
        voyageId: voyage.voyageId,
        team: voyage.team,
        route: voyage.route,
        outcome: voyage.outcome,
        completedStepCount: config.steps.length,
        totalStepCount: config.steps.length,
        completionStatus: "complete",
        responsePreview: state.responsePreview,
        updatedAt: DEMO_GENERATED_AT,
        submission: {
          id: `simulated-submission-${index + 1}`,
          projectId: config.projectId,
          projectVersion: config.projectVersion,
          classId: "simulated-class-showcase",
          studentId,
          studentDisplayName: state.displayName,
          voyageId: voyage.voyageId,
          status: state.status,
          submittedAt: DEMO_GENERATED_AT,
          reviewedAt: state.status === "submitted" ? void 0 : DEMO_GENERATED_AT,
          reviewerDisplayName: state.status === "submitted" ? void 0 : "Ms. Rivera",
          teacherFeedback: state.feedback,
          mastery: demoMastery(masteryTags, index),
          revision: state.revision
        }
      };
    })
  };
}
function demoMastery(masteryTags, memberIndex) {
  return masteryTags.slice(0, 4).map((masteryTag, index) => ({
    masteryTag,
    level: memberIndex === 4 && index === 0 ? "developing" : (memberIndex + index) % 4 === 0 ? "advanced" : "proficient"
  }));
}

export {
  createDemoJourneyClassSummary
};
//# debugId=45b45921-c55f-5a99-b65d-e72d983ca83d
//# sourceMappingURL=chunk-WXT6AGWE.js.map
