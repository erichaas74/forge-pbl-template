import {
  BrowserDebateExchangeAdapter,
  DEBATE_EXCHANGE_EXAMPLE,
  DEBATE_EXCHANGE_PORT,
  DebateExchangeRuntime,
  validateExchangeConfig
} from "./chunk-DBNLA5YS.js";
import {
  BrowserDebateWorkspacePersistenceAdapter,
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  DebateStudioRuntimeService,
  MemoryDebateMediaAdapter,
  MemoryDebateSessionAdapter
} from "./chunk-VCUNTQ4R.js";
import {
  validateInquiry
} from "./chunk-H7BIYLRY.js";
import {
  DEBATE_STUDIO_CONFIG,
  DEBATE_STUDIO_TENANT_ID
} from "./chunk-GNKRFT3D.js";
import "./chunk-3C62DQOL.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/runtime/project-launch/template-launchers/debate-studio.launcher.ts
var debateStudioLauncher = {
  templateId: "debate-studio",
  async load(request) {
    if (request.session.authorityMode !== "localDemo") {
      throw new Error("A server-authoritative Debate Studio gateway must be configured.");
    }
    const definition = requireDebateConfig(request.projectDefinition, request.project.id);
    if (definition.inquiry) validateInquiry(definition.inquiry, definition.evidence.map((e) => e.id));
    const config = __spreadProps(__spreadValues({}, definition), {
      sessionId: request.session.attemptId ?? definition.sessionId,
      viewer: __spreadProps(__spreadValues({}, definition.viewer), {
        studentId: request.session.studentId ?? request.session.actorId,
        studentDisplayName: request.session.actorDisplayName,
        classId: request.session.classId ?? definition.viewer.classId,
        mode: request.session.mode
      })
    });
    if (config.exchange) {
      validateExchangeConfig(config);
      const module2 = await import("./chunk-SZGT5ZSF.js");
      return {
        component: module2.DebateExchangeComponent,
        providers: [
          { provide: DEBATE_STUDIO_CONFIG, useValue: config },
          { provide: DEBATE_EXCHANGE_EXAMPLE, useValue: request.view === "final-demo" },
          { provide: DEBATE_EXCHANGE_PORT, useFactory: () => new BrowserDebateExchangeAdapter(config, {
            tenantId: request.session.tenantId,
            projectId: config.projectId,
            projectVersion: config.projectVersion,
            actorId: config.viewer.studentId,
            classId: config.viewer.classId,
            attemptId: request.session.attemptId
          }) },
          DebateExchangeRuntime
        ]
      };
    }
    const module = await import("./chunk-CFN2X6MP.js");
    return {
      component: module.DebateStudioPageComponent,
      providers: [
        { provide: DEBATE_STUDIO_CONFIG, useValue: config },
        { provide: DEBATE_STUDIO_TENANT_ID, useValue: request.session.tenantId },
        {
          provide: DEBATE_STUDIO_PERSISTENCE,
          useFactory: () => new BrowserDebateWorkspacePersistenceAdapter(void 0, request.session)
        },
        {
          provide: DEBATE_STUDIO_SESSION,
          useFactory: () => new MemoryDebateSessionAdapter()
        },
        {
          provide: DEBATE_STUDIO_MEDIA,
          useFactory: () => new MemoryDebateMediaAdapter()
        },
        DebateStudioRuntimeService
      ]
    };
  }
};
function requireDebateConfig(value, projectId) {
  if (!isRecord(value) || value["projectId"] !== projectId || !Array.isArray(value["rounds"])) {
    throw new Error(`Project "${projectId}" is not a valid debate-studio definition.`);
  }
  return value;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
export {
  debateStudioLauncher
};
//# debugId=ff6b86ec-45e6-5724-87f8-80eaa3ef378c
//# sourceMappingURL=chunk-J3POK7RD.js.map
