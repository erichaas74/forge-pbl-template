import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/core/context/project-session-context.ts
function projectSessionRuntimeScope(context, scopeType) {
  return {
    tenantId: context.tenantId,
    projectId: context.projectId,
    projectVersion: context.projectVersion,
    attemptId: context.attemptId,
    classId: context.classId,
    studentId: scopeType === "student" ? context.studentId ?? context.actorId : void 0,
    teamId: scopeType === "team" ? context.teamId : void 0,
    scopeType
  };
}
function createLocalPreviewSession(projectId, projectVersion, overrides = {}) {
  return Object.freeze(__spreadValues({
    tenantId: "local-preview",
    projectId,
    projectVersion,
    actorId: "local-preview-actor",
    actorDisplayName: "Preview learner",
    studentId: "local-preview-actor",
    classId: "local-preview-class",
    role: "student",
    permissions: Object.freeze([]),
    mode: "preview",
    authorityMode: "localDemo"
  }, overrides));
}

export {
  projectSessionRuntimeScope,
  createLocalPreviewSession
};
//# debugId=b2f70a44-4713-5e66-b78d-793ef927fdc7
//# sourceMappingURL=chunk-G626JLCU.js.map
