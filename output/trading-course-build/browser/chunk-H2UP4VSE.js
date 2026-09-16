import {
  IndexedDbAssetStorageAdapter
} from "./chunk-UMZJFDZE.js";
import {
  BrowserHistoryLivePersistenceAdapter,
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_MEDIA,
  HISTORY_LIVE_PERSISTENCE,
  HistoryLiveRuntimeService,
  validateHistoryLiveContent,
  validateHistoryLiveVisualConfig
} from "./chunk-OU3KDHT5.js";
import {
  validateInquiry
} from "./chunk-H7BIYLRY.js";
import "./chunk-2WXJ5NX3.js";
import {
  inject
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/history-live/core/field-studio.validation.ts
function validateFieldStudio(config) {
  if (!config.inquiry && !config.fieldStudio) return;
  const inquiry = config.inquiry, studio = config.fieldStudio;
  const fail = () => {
    throw new Error(
      "FIELD_STUDIO_INVALID: Inquiry, gates, network, and credited visuals must be configured together."
    );
  };
  if (!inquiry || !studio) return fail();
  validateInquiry(
    inquiry,
    config.sources.map((s) => s.id)
  );
  if (validateHistoryLiveContent(config).length || validateHistoryLiveVisualConfig(config).length)
    fail();
  if (studio.capabilityId !== "history-live.field-studio" || studio.version !== "1.0" || !inquiry.gates.some((g) => g.id === studio.recordingGateId) || !inquiry.gates.some((g) => g.id === studio.finalGateId) || studio.finalGateId !== inquiry.hearingGateId || !config.networks.some((n) => n.side === studio.networkSide) || !studio.visualSourceIds.length || studio.visualSourceIds.some((id) => !config.sources.some((s) => s.id === id)))
    fail();
}

// src/app/runtime/project-launch/template-launchers/history-live.launcher.ts
var historyLiveLauncher = {
  templateId: "history-live-broadcast",
  async load(request) {
    const config = requireHistoryConfig(request.projectDefinition, request.project.id);
    validateFieldStudio(config);
    if (request.view === "final-demo") {
      const finalLesson = config.inquiry?.lessons.at(-1)?.number;
      const example = config.inquiry?.examples?.find((item) => item.lesson === finalLesson);
      if (!example)
        throw new Error("CAPABILITY_NOT_INSTALLED: This project has no final model video.");
      const { InquiryExamplePageComponent, INQUIRY_EXAMPLE_PRESENTATION } = await import("./chunk-S32AJKBT.js");
      return {
        component: InquiryExamplePageComponent,
        providers: [
          {
            provide: INQUIRY_EXAMPLE_PRESENTATION,
            useValue: {
              projectTitle: config.title,
              example,
              sources: config.sources.map((source) => __spreadProps(__spreadValues({}, source), { sourceUrl: source.url }))
            }
          }
        ]
      };
    }
    if (config.inquiry && request.session.authorityMode !== "localDemo")
      throw new Error(
        "A server-authoritative inquiry gateway must be configured for classroom use."
      );
    const enrollment = previewEnrollment(request);
    const module = await import("./chunk-BFUYFWMQ.js");
    return {
      component: module.HistoryLivePageComponent,
      providers: [
        { provide: HISTORY_LIVE_CONFIG, useValue: config },
        { provide: HISTORY_LIVE_ENROLLMENT, useValue: enrollment },
        {
          provide: HISTORY_LIVE_PERSISTENCE,
          useFactory: () => new BrowserHistoryLivePersistenceAdapter(inject(HISTORY_LIVE_ENROLLMENT))
        },
        {
          provide: HISTORY_LIVE_MEDIA,
          useFactory: () => {
            const context = inject(HISTORY_LIVE_ENROLLMENT);
            return new IndexedDbAssetStorageAdapter(
              JSON.stringify([
                context.tenantId,
                context.classId,
                context.studentId,
                config.projectId,
                config.projectVersion
              ])
            );
          }
        },
        HistoryLiveRuntimeService
      ]
    };
  }
};
function previewEnrollment(request) {
  return {
    tenantId: request.session.tenantId,
    classId: request.session.classId ?? "local-preview-class",
    studentId: request.session.studentId ?? request.session.actorId,
    studentDisplayName: request.session.actorDisplayName,
    teacherDisplayName: "Preview producer",
    classLabel: "Local demonstration",
    mode: "demo",
    role: request.session.mode === "teacher" ? "producer" : "student",
    permissions: request.session.permissions
  };
}
function requireHistoryConfig(value, projectId) {
  if (!isRecord(value) || value["projectId"] !== projectId || !Array.isArray(value["sources"])) {
    throw new Error(`Project "${projectId}" is not a valid history-live definition.`);
  }
  return value;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
export {
  historyLiveLauncher
};
//# debugId=65051a22-f2fb-513f-8eda-0236fd7ce8f1
//# sourceMappingURL=chunk-H2UP4VSE.js.map
