import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_HALL_SESSION_CONTEXT,
  MuseumBoardRenderer,
  parseMetaStepsEmbed,
  parsePresentationVideo
} from "./chunk-NP2TX5O3.js";
import {
  isExhibitObjectModel
} from "./chunk-MNKXLJET.js";
import {
  projectSessionRuntimeScope
} from "./chunk-G626JLCU.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  emptyMuseumRoom,
  isMuseumRoomData,
  museumRoomLayout,
  placeMuseumObject,
  validateMuseumRoom
} from "./chunk-SUG7Z2TW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/exhibit-hall/core/artifact-validator.ts
var ArtifactValidator = class {
  validate(template, data, readField) {
    const errors = [];
    const warnings = [];
    for (const requirement of template.requirements) {
      const value = readField(data, requirement.fieldId);
      const itemCount = Array.isArray(value) ? value.length : void 0;
      const text = typeof value === "string" ? value.trim() : "";
      const missing = value === void 0 || value === null || typeof value === "string" && text.length === 0 || itemCount !== void 0 && itemCount === 0;
      if (requirement.required && missing) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} is required.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`
        });
        continue;
      }
      if (itemCount !== void 0 && requirement.minItems !== void 0 && itemCount < requirement.minItems) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} needs at least ${requirement.minItems} items.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`
        });
      }
      if (itemCount !== void 0 && requirement.maxItems !== void 0 && itemCount > requirement.maxItems) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} allows no more than ${requirement.maxItems} items.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`
        });
      }
      if (text.length > 0 && requirement.maxWords !== void 0) {
        const words = wordCount(text);
        if (words > requirement.maxWords) {
          errors.push({
            fieldId: requirement.fieldId,
            message: `${humanize(requirement.fieldId)} is ${words} words; the limit is ${requirement.maxWords}.`,
            focusTarget: `[data-field-id="${requirement.fieldId}"]`
          });
        }
      }
    }
    const sourceCount = template.requirements.find((item) => item.fieldId === "source-list");
    if (sourceCount !== void 0 && Array.isArray(readField(data, "source-list"))) {
      const sources = readField(data, "source-list");
      if (sources.length === sourceCount.minItems) {
        warnings.push({
          fieldId: "source-list",
          message: "Your board meets the source minimum. Add another source if a claim needs more context."
        });
      }
    }
    return { valid: errors.length === 0, errors, warnings };
  }
};
function wordCount(value) {
  return value.trim().length === 0 ? 0 : value.trim().split(/\s+/u).length;
}
function humanize(value) {
  const phrase = value.replaceAll("-", " ");
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

// src/app/templates/exhibit-hall/core/exhibit-access-policy.ts
var ExhibitAccessPolicy = class {
  belongsToHall(actor, state) {
    return actor.role === "family" || actor.courseSectionIds.includes(state.hall.courseSectionId);
  }
  canReadHanging(actor, state, _hanging) {
    if (!this.belongsToHall(actor, state)) return false;
    if (actor.role !== "family") return state.hallPhase !== "dark";
    return state.hall.controls.familyViewEnabled && state.hallPhase === "closed_readable";
  }
  canPublishArtifact(actor, state, artifact) {
    if (!this.belongsToHall(actor, state) || state.hall.controls.submissionLocked) return false;
    return actor.role === "teacher" || actor.teamIds.includes(artifact.ownerId);
  }
  canRespond(actor, state, hanging) {
    if (actor.role !== "student" || !this.belongsToHall(actor, state) || !state.hall.controls.peerResponsesEnabled || !state.openingSession.peerResponsesEnabled) {
      return false;
    }
    const artifact = state.artifacts.find((item) => item.id === hanging.artifactId);
    return artifact !== void 0 && !actor.teamIds.includes(artifact.ownerId);
  }
  canSubmitDefense(actor, state) {
    return actor.role === "student" && this.belongsToHall(actor, state);
  }
  canControlHall(actor, state) {
    return actor.role === "teacher" && this.belongsToHall(actor, state);
  }
  canModerateResponses(actor, state) {
    return this.canControlHall(actor, state);
  }
  canReadPrivateNotebook(actor, state, teamId) {
    return this.belongsToHall(actor, state) && (actor.role === "teacher" || actor.role === "student" && actor.teamIds.includes(teamId));
  }
};

// src/app/templates/exhibit-hall/core/gallery-collection-service.ts
var GalleryCollectionService = class {
  constructor(policy = new ExhibitAccessPolicy()) {
    this.policy = policy;
  }
  policy;
  build(state, teams, actor) {
    const teamByLocation = new Map(teams.map((team) => [team.locationId, team]));
    return state.hall.locationOrder.flatMap((locationId, position) => {
      const team = teamByLocation.get(locationId);
      if (team === void 0) return [];
      const hanging = state.hangings.find((item) => item.locationId === locationId);
      if (hanging === void 0) {
        return actor.role === "family" ? [] : [{ locationId, position, team }];
      }
      if (!this.policy.canReadHanging(actor, state, hanging)) return [];
      const snapshot = state.snapshots.find((item) => item.id === hanging.currentSnapshotId);
      return [{ locationId, position, team, hanging, snapshot }];
    });
  }
};

// src/app/templates/exhibit-hall/core/exhibit-state.ts
function cloneHallState(state) {
  return structuredClone(state);
}
function withRevision(state) {
  return __spreadProps(__spreadValues({}, state), { revision: state.revision + 1 });
}
function entityId(state, prefix) {
  return `${prefix}-${state.sequence + 1}`;
}

// src/app/templates/exhibit-hall/core/snapshot-service.ts
var SnapshotService = class {
  constructor(policy = new ExhibitAccessPolicy()) {
    this.policy = policy;
  }
  policy;
  publish(state, template, request) {
    const completedEntityId = state.completedOperations[request.operationKey];
    if (completedEntityId !== void 0) {
      return { ok: true, state, entityId: completedEntityId, duplicate: true };
    }
    const artifact = state.artifacts.find((item) => item.id === request.artifactId);
    if (artifact === void 0) {
      return failure(state, "That artifact is no longer available.");
    }
    if (!this.policy.canPublishArtifact(request.actor, state, artifact)) {
      return failure(state, "You do not have permission to publish this artifact right now.");
    }
    if (!request.validation.valid) {
      return failure(state, request.validation.errors[0]?.message ?? "The artifact is not ready.");
    }
    const currentHanging = state.hangings.find((item) => item.artifactId === artifact.id);
    const snapshotCount = state.snapshots.filter((item) => item.artifactId === artifact.id).length;
    const rehangCount = Math.max(0, snapshotCount - 1);
    if (currentHanging !== void 0 && rehangCount >= template.publication.rehangLimit) {
      return failure(
        state,
        `This ${template.vocabulary.artifactSingular} has reached its rehang limit.`
      );
    }
    if (currentHanging !== void 0 && template.publication.preventRehangAfterResponse && state.peerResponses.some(
      (response) => response.hangingId === currentHanging.id && response.status === "posted"
    )) {
      return failure(
        state,
        `This ${template.vocabulary.artifactSingular} cannot be rehung after responses are posted.`
      );
    }
    const next = cloneHallState(state);
    const snapshotId = entityId(next, "snapshot");
    const snapshot = {
      id: snapshotId,
      artifactId: artifact.id,
      version: snapshotCount + 1,
      rendererType: artifact.rendererType,
      rendererVersion: request.rendererVersion,
      visitorSafeData: structuredClone(request.visitorSafeData),
      accessibleData: structuredClone(request.accessibleData),
      corridorPreview: request.corridorPreview === void 0 ? void 0 : structuredClone(request.corridorPreview),
      createdBy: request.actor.id,
      createdAt: request.now
    };
    const artifacts = next.artifacts.map(
      (item) => item.id === artifact.id ? __spreadProps(__spreadValues({}, item), {
        status: "published",
        currentSnapshotId: snapshotId,
        updatedAt: request.now
      }) : item
    );
    const hangingId = currentHanging?.id ?? entityId(__spreadProps(__spreadValues({}, next), { sequence: next.sequence + 1 }), "hanging");
    const hanging = {
      id: hangingId,
      hallId: state.hall.id,
      locationId: request.locationId,
      artifactId: artifact.id,
      currentSnapshotId: snapshotId,
      publishedBy: request.actor.id,
      publishedAt: request.now,
      lockedAt: currentHanging?.lockedAt
    };
    const hangings = currentHanging === void 0 ? [...next.hangings, hanging] : next.hangings.map((item) => item.id === currentHanging.id ? hanging : item);
    const changed = withRevision(__spreadProps(__spreadValues({}, next), {
      sequence: next.sequence + (currentHanging === void 0 ? 2 : 1),
      artifacts,
      snapshots: [...next.snapshots, snapshot],
      hangings,
      completedOperations: __spreadProps(__spreadValues({}, next.completedOperations), {
        [request.operationKey]: snapshotId
      })
    }));
    return { ok: true, state: changed, entityId: snapshotId };
  }
};
function failure(state, error) {
  return { ok: false, state, error };
}

// src/app/templates/exhibit-hall/defense/defense-service.ts
var DefenseService = class {
  constructor(policy = new ExhibitAccessPolicy()) {
    this.policy = policy;
  }
  policy;
  saveDraft(state, actor, hangingId, answers, completionMode) {
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === void 0 || !this.policy.canSubmitDefense(actor, state)) {
      return failure2(state, "The defense form is not available.");
    }
    const next = cloneHallState(state);
    const existing = next.defenses.find(
      (item) => item.hangingId === hangingId && item.studentId === actor.id
    );
    const id = existing?.id ?? entityId(next, "defense");
    const defense = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      studentId: actor.id,
      completionMode,
      answers: structuredClone(answers),
      status: "draft"
    };
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        sequence: next.sequence + (existing === void 0 ? 1 : 0),
        defenses: existing === void 0 ? [...next.defenses, defense] : next.defenses.map((item) => item.id === existing.id ? defense : item)
      })),
      entityId: id
    };
  }
  submit(state, template, actor, hangingId, answers, completionMode, operationKey, now) {
    const prior = state.completedOperations[operationKey];
    if (prior !== void 0) return { ok: true, state, entityId: prior, duplicate: true };
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === void 0 || !this.policy.canSubmitDefense(actor, state)) {
      return failure2(state, "The defense form is not available.");
    }
    const requiredPromptIds = template.defense.prompts.map((prompt) => prompt.id);
    const missing = requiredPromptIds.filter((id2) => (answers[id2] ?? "").trim().length < 8);
    if (missing.length > 0) {
      return failure2(state, "Complete every defense response with a specific explanation.");
    }
    const next = cloneHallState(state);
    const existing = next.defenses.find(
      (item) => item.hangingId === hangingId && item.studentId === actor.id
    );
    const id = existing?.id ?? entityId(next, "defense");
    const defense = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      studentId: actor.id,
      completionMode,
      answers: structuredClone(answers),
      status: "submitted",
      submittedAt: now
    };
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        sequence: next.sequence + (existing === void 0 ? 1 : 0),
        defenses: existing === void 0 ? [...next.defenses, defense] : next.defenses.map((item) => item.id === existing.id ? defense : item),
        completedOperations: __spreadProps(__spreadValues({}, next.completedOperations), { [operationKey]: id })
      })),
      entityId: id
    };
  }
};
function failure2(state, error) {
  return { ok: false, state, error };
}

// src/app/templates/exhibit-hall/lms/exhibit-lms-bridge.ts
var ExhibitLmsBridge = class {
  record(state, input) {
    const existing = state.lmsEvents.find((event) => event.idempotencyKey === input.idempotencyKey);
    if (existing !== void 0) {
      return { ok: true, state, entityId: existing.id, duplicate: true };
    }
    const next = cloneHallState(state);
    const id = entityId(next, "lms");
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        sequence: next.sequence + 1,
        lmsEvents: [...next.lmsEvents, __spreadValues({ id }, input)]
      })),
      entityId: id
    };
  }
};

// src/app/templates/exhibit-hall/live/live-focus-service.ts
var LiveFocusService = class {
  constructor(policy = new ExhibitAccessPolicy()) {
    this.policy = policy;
  }
  policy;
  setPhase(state, actor, hallPhase, now) {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    const sessionPhase = hallPhase === "closed_readable" ? "closed" : hallPhase === "live_opening" ? "standing" : "walk";
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, cloneHallState(state)), {
        hallPhase,
        openingSession: __spreadProps(__spreadValues({}, state.openingSession), {
          phase: sessionPhase,
          revision: state.openingSession.revision + 1,
          openedAt: state.openingSession.openedAt || now,
          closedAt: hallPhase === "closed_readable" ? now : void 0
        })
      })),
      announcement: hallPhase === "live_opening" ? "The live opening has started." : hallPhase === "closed_readable" ? "The opening is closed. Exhibits remain readable." : "The class is released for an independent gallery walk."
    };
  }
  point(state, actor, hangingId, expectedRevision) {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    if (expectedRevision !== void 0 && expectedRevision !== state.openingSession.revision) {
      return { ok: false, state, error: "The live session changed. Reload the newest focus." };
    }
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === void 0) return { ok: false, state, error: "That exhibit is not published." };
    const snapshot = state.snapshots.find((item) => item.id === hanging.currentSnapshotId);
    const title = snapshot?.accessibleData.title ?? "the selected exhibit";
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, cloneHallState(state)), {
        hallPhase: "live_opening",
        openingSession: __spreadProps(__spreadValues({}, state.openingSession), {
          phase: "standing",
          currentHangingId: hangingId,
          revision: state.openingSession.revision + 1
        })
      })),
      entityId: hangingId,
      announcement: `The class is now standing at ${title}.`
    };
  }
  setNavigationMode(state, actor, navigationMode) {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, cloneHallState(state)), {
        hall: __spreadProps(__spreadValues({}, state.hall), {
          controls: __spreadProps(__spreadValues({}, state.hall.controls), { navigationMode })
        }),
        openingSession: __spreadProps(__spreadValues({}, state.openingSession), {
          navigationMode,
          revision: state.openingSession.revision + 1
        })
      })),
      announcement: navigationMode === "teacher_follow" ? "Teacher-follow mode is on." : "Independent gallery navigation is on."
    };
  }
  toggleControl(state, actor, control) {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    if (control === "familyViewEnabled" && state.hallPhase !== "closed_readable") {
      return { ok: false, state, error: "Close the opening before enabling family view." };
    }
    const value = !state.hall.controls[control];
    const next = cloneHallState(state);
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        hall: __spreadProps(__spreadValues({}, next.hall), { controls: __spreadProps(__spreadValues({}, next.hall.controls), { [control]: value }) }),
        openingSession: control === "peerResponsesEnabled" ? __spreadProps(__spreadValues({}, next.openingSession), {
          peerResponsesEnabled: value,
          revision: next.openingSession.revision + 1
        }) : next.openingSession
      })),
      announcement: `${controlLabel(control)} ${value ? "enabled" : "disabled"}.`
    };
  }
};
function teacherOnly(state) {
  return { ok: false, state, error: "Only the teacher can change hall controls." };
}
function controlLabel(control) {
  if (control === "submissionLocked") return "Submission lock";
  if (control === "familyViewEnabled") return "Family view";
  return "Question cards";
}

// src/app/templates/exhibit-hall/peer-response/peer-response-service.ts
var PeerResponseService = class {
  constructor(policy = new ExhibitAccessPolicy()) {
    this.policy = policy;
  }
  policy;
  saveDraft(state, actor, authorDisplayName, hangingId, body, now) {
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === void 0 || !this.policy.canRespond(actor, state, hanging)) {
      return failure3(state, "Question cards are not available for this exhibit.");
    }
    const next = cloneHallState(state);
    const existing = next.peerResponses.find(
      (item) => item.hangingId === hangingId && item.authorId === actor.id && item.status === "draft"
    );
    if (existing !== void 0) {
      return {
        ok: true,
        state: withRevision(__spreadProps(__spreadValues({}, next), {
          peerResponses: next.peerResponses.map(
            (item) => item.id === existing.id ? __spreadProps(__spreadValues({}, item), { body, snapshotId: hanging.currentSnapshotId, updatedAt: now }) : item
          )
        })),
        entityId: existing.id
      };
    }
    const id = entityId(next, "response");
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        sequence: next.sequence + 1,
        peerResponses: [
          ...next.peerResponses,
          {
            id,
            hangingId,
            snapshotId: hanging.currentSnapshotId,
            authorId: actor.id,
            authorDisplayName,
            body,
            status: "draft",
            createdAt: now,
            updatedAt: now
          }
        ]
      })),
      entityId: id
    };
  }
  post(state, template, actor, authorDisplayName, hangingId, body, operationKey, now) {
    const prior = state.completedOperations[operationKey];
    if (prior !== void 0) return { ok: true, state, entityId: prior, duplicate: true };
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === void 0 || !this.policy.canRespond(actor, state, hanging)) {
      return failure3(state, "Question cards are closed or unavailable for this exhibit.");
    }
    const trimmed = body.trim();
    if (trimmed.length === 0) return failure3(state, "Write a question before posting.");
    if (wordCount(trimmed) > template.peerResponse.maxWords) {
      return failure3(
        state,
        `Question cards are limited to ${template.peerResponse.maxWords} words.`
      );
    }
    const existingPosted = state.peerResponses.filter(
      (item) => item.hangingId === hangingId && item.authorId === actor.id && (item.status === "posted" || item.status === "hidden")
    );
    if (existingPosted.length >= template.peerResponse.maxPerArtifact) {
      return failure3(state, "You have already posted a question card at this exhibit.");
    }
    const next = cloneHallState(state);
    const draft = next.peerResponses.find(
      (item) => item.hangingId === hangingId && item.authorId === actor.id && item.status === "draft"
    );
    const id = draft?.id ?? entityId(next, "response");
    const posted = {
      id,
      hangingId,
      snapshotId: hanging.currentSnapshotId,
      authorId: actor.id,
      authorDisplayName,
      body: trimmed,
      status: "posted",
      createdAt: draft?.createdAt ?? now,
      updatedAt: now
    };
    const responses = draft === void 0 ? [...next.peerResponses, posted] : next.peerResponses.map((item) => item.id === draft.id ? posted : item);
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, next), {
        sequence: next.sequence + (draft === void 0 ? 1 : 0),
        peerResponses: responses,
        completedOperations: __spreadProps(__spreadValues({}, next.completedOperations), { [operationKey]: id })
      })),
      entityId: id
    };
  }
  moderate(state, actor, responseId, action, now) {
    if (!this.policy.canModerateResponses(actor, state)) {
      return failure3(state, "Only the teacher can moderate question cards.");
    }
    const response = state.peerResponses.find((item) => item.id === responseId);
    if (response === void 0) return failure3(state, "That question card was not found.");
    const status = action === "hide" ? "hidden" : "posted";
    return {
      ok: true,
      state: withRevision(__spreadProps(__spreadValues({}, cloneHallState(state)), {
        peerResponses: state.peerResponses.map(
          (item) => item.id === responseId ? __spreadProps(__spreadValues({}, item), { status, updatedAt: now }) : item
        )
      })),
      entityId: responseId
    };
  }
};
function failure3(state, error) {
  return { ok: false, state, error };
}

// src/app/templates/exhibit-hall/core/exhibit-template-registry.ts
var ExhibitTemplateRegistry = class {
  templates = /* @__PURE__ */ new Map();
  register(template) {
    const key = `${template.templateId}@${template.version}`;
    if (this.templates.has(key)) {
      return {
        ok: false,
        code: "DUPLICATE_TEMPLATE_REGISTRATION",
        message: `Exhibit template ${key} is already registered.`
      };
    }
    const stored = Object.freeze(structuredClone(template));
    this.templates.set(key, stored);
    return { ok: true, value: stored };
  }
  resolve(templateId, version) {
    const value = this.templates.get(`${templateId}@${version}`);
    return value === void 0 ? {
      ok: false,
      code: "CAPABILITY_NOT_INSTALLED",
      message: `Exhibit template ${templateId}@${version} is not registered.`
    } : { ok: true, value };
  }
  list() {
    return [...this.templates.values()];
  }
};
var ExhibitRendererRegistry = class {
  renderers = /* @__PURE__ */ new Map();
  register(renderer) {
    if (this.renderers.has(renderer.type)) {
      return {
        ok: false,
        code: "DUPLICATE_RENDERER_REGISTRATION",
        message: `Exhibit renderer ${renderer.type} is already registered.`
      };
    }
    this.renderers.set(renderer.type, renderer);
    return { ok: true, value: renderer };
  }
  resolve(type) {
    const value = this.renderers.get(type);
    return value === void 0 ? {
      ok: false,
      code: "CAPABILITY_NOT_INSTALLED",
      message: `Exhibit renderer ${type} is not registered.`
    } : { ok: true, value };
  }
};

// src/app/templates/exhibit-hall/renderers/museum-board/museum-board-adapter.ts
function museumBoardFieldValue(data, fieldId) {
  switch (fieldId) {
    case "exhibit-title":
      return data.title;
    case "central-claim":
      return data.centralClaim;
    case "selected-objects":
      return data.objects;
    case "object-captions":
      return data.objects.map((object) => object.description);
    case "source-list":
      return data.sources;
    case "team-credit":
      return data.teamCredit.displayName;
    case "immersive-gallery":
      return data.immersiveGallery?.embedUrl;
    case "museum-room":
      return data.museumRoom?.roomId;
    case "video-presentation":
      return data.videoPresentation?.prototype ? "prototype-video-preview" : data.videoPresentation?.videoUrl;
    default:
      return void 0;
  }
}
function validateMuseumBoard(template, data, validator = new ArtifactValidator()) {
  const base = validator.validate(template, data, museumBoardFieldValue);
  const errors = [...base.errors];
  if (data.museumRoom !== void 0) errors.push(...validateMuseumRoom(data));
  for (const object of data.objects) {
    if (object.model !== void 0 && !isExhibitObjectModel(object.model)) {
      errors.push({
        fieldId: "selected-objects",
        message: `The 3D model for ${object.title} needs a GLB URL, description, source, and credit.`,
        focusTarget: '[data-field-id="selected-objects"]'
      });
    }
  }
  const galleryValue = data.immersiveGallery?.embedUrl.trim() ?? "";
  const parsedGallery = parseMetaStepsEmbed(galleryValue);
  if (galleryValue.length > 0 && !parsedGallery.valid) {
    errors.push({
      fieldId: "immersive-gallery",
      message: parsedGallery.message ?? "The MetaSteps gallery embed is invalid.",
      focusTarget: '[data-field-id="immersive-gallery"]'
    });
  }
  const videoValue = data.videoPresentation?.videoUrl?.trim() ?? "";
  const parsedVideo = parsePresentationVideo(videoValue);
  if (!data.videoPresentation?.prototype && videoValue.length > 0 && !parsedVideo.valid) {
    errors.push({
      fieldId: "video-presentation",
      message: parsedVideo.message ?? "The presentation video link is invalid.",
      focusTarget: '[data-field-id="video-presentation"]'
    });
  }
  return __spreadProps(__spreadValues({}, base), {
    valid: errors.length === 0,
    errors
  });
}

// src/app/templates/exhibit-hall/renderers/science-poster/science-poster-renderer.ts
var SciencePosterRenderer = class {
  type = "science-poster-demo";
  version = 1;
  renderPreview(data) {
    return this.result(this.read(data));
  }
  renderWalkUp(data) {
    return this.result(this.read(data));
  }
  renderThumbnail(data) {
    return this.result(this.read(data));
  }
  renderAccessible(data) {
    const poster = this.read(data);
    return {
      title: poster.title,
      summary: poster.finding,
      sections: [
        { heading: "Research question", body: poster.question },
        { heading: "Method", body: poster.method },
        { heading: "Finding", body: poster.finding },
        { heading: "Limitation", body: poster.limitation }
      ]
    };
  }
  result(poster) {
    return {
      title: poster.title,
      summary: poster.finding,
      itemCount: 4,
      readingTimeMinutes: 1
    };
  }
  read(data) {
    if (typeof data !== "object" || data === null || !("title" in data) || !("question" in data) || !("method" in data) || !("finding" in data) || !("limitation" in data) || typeof data.title !== "string" || typeof data.question !== "string" || typeof data.method !== "string" || typeof data.finding !== "string" || typeof data.limitation !== "string") {
      throw new Error("Science poster renderer received an incompatible snapshot.");
    }
    return data;
  }
};

// src/app/templates/exhibit-hall/runtime/exhibit-hall-runtime.service.ts
var ExhibitHallRuntimeService = class _ExhibitHallRuntimeService {
  config = inject(EXHIBIT_HALL_CONFIG);
  session = inject(EXHIBIT_HALL_SESSION_CONTEXT, { optional: true });
  runtimeScope = this.session === null ? void 0 : projectSessionRuntimeScope(this.session, this.session.teamId === void 0 ? "student" : "team");
  persistence = inject(EXHIBIT_HALL_PERSISTENCE);
  accessPolicy = new ExhibitAccessPolicy();
  validator = new ArtifactValidator();
  snapshots = new SnapshotService(this.accessPolicy);
  gallery = new GalleryCollectionService(this.accessPolicy);
  peerResponses = new PeerResponseService(this.accessPolicy);
  liveFocus = new LiveFocusService(this.accessPolicy);
  defenses = new DefenseService(this.accessPolicy);
  lms = new ExhibitLmsBridge();
  templateRegistry = new ExhibitTemplateRegistry();
  rendererRegistry = new ExhibitRendererRegistry();
  persistTimer;
  role = signal(
    "student",
    ...ngDevMode ? [{ debugName: "role" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewMode = signal(
    "corridor",
    ...ngDevMode ? [{ debugName: "viewMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkUpOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "walkUpOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  composerOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "composerOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherDeskOpen = signal(
    true,
    ...ngDevMode ? [{ debugName: "teacherDeskOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  defenseOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "defenseOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedHangingId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedHangingId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  liveAnnouncement = signal(
    "The Class Exhibit Hall is ready.",
    ...ngDevMode ? [{ debugName: "liveAnnouncement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notification = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "notification" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visitedHangingIds = signal(
    /* @__PURE__ */ new Set(),
    ...ngDevMode ? [{ debugName: "visitedHangingIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  connectedCount = signal(
    18,
    ...ngDevMode ? [{ debugName: "connectedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = signal(
    this.loadOrCreateState(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  composerDraft = signal(
    this.initialComposerDraft(),
    ...ngDevMode ? [{ debugName: "composerDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftVersion = signal(
    0,
    ...ngDevMode ? [{ debugName: "draftVersion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roomPublishingLock = signal(
    false,
    ...ngDevMode ? [{ debugName: "roomPublishingLock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sharedRoomSubmitted = signal(
    false,
    ...ngDevMode ? [{ debugName: "sharedRoomSubmitted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  usingStarter = computed(
    () => !this.config.museum && !this.state().composerDraft && this.draftVersion() === 0,
    ...ngDevMode ? [{ debugName: "usingStarter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assignedRoom = computed(
    () => {
      const team = this.config.teams.find((item) => item.id === this.config.viewer.teamId);
      return this.config.museum?.rooms.find((room) => room.roomId === team?.locationId);
    },
    ...ngDevMode ? [{ debugName: "assignedRoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roomSubmitted = computed(
    () => this.session?.authorityMode === "serverAuthoritative" ? this.sharedRoomSubmitted() : this.state().artifacts.some((artifact) => artifact.ownerId === this.config.viewer.teamId && artifact.currentSnapshotId !== void 0),
    ...ngDevMode ? [{ debugName: "roomSubmitted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canEditRoom = computed(
    () => !!this.assignedRoom() && !this.roomSubmitted() && !this.roomPublishingLock() && !this.state().hall.controls.submissionLocked && this.actor().role === "student",
    ...ngDevMode ? [{ debugName: "canEditRoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roomValidation = computed(
    () => {
      const base = this.composerValidation();
      const assignment = this.assignedRoom();
      const errors = [
        ...base.errors,
        ...assignment ? validateMuseumRoom(this.composerDraft(), assignment) : [{ fieldId: "museum-room", message: "Your teacher has not assigned a room yet." }]
      ];
      return __spreadProps(__spreadValues({}, base), {
        valid: errors.length === 0,
        errors: errors.filter((error, index, all) => all.findIndex((item) => item.message === error.message) === index)
      });
    },
    ...ngDevMode ? [{ debugName: "roomValidation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placeRoomObject(slotId, objectId) {
    if (!this.canEditRoom())
      return;
    const assignment = this.assignedRoom(), catalog = this.config.museum?.catalog;
    if (!assignment || !catalog)
      return;
    const next = placeMuseumObject(this.composerDraft(), assignment, catalog, slotId, objectId);
    if (!next) {
      this.error.set("Choose an available artifact and a display spot in your assigned room.");
      return;
    }
    if (next !== this.composerDraft())
      this.updateComposer(next);
  }
  saveRoomDraft() {
    this.persist(this.state());
  }
  /** Called only after the publication adapter returns a validated server receipt. */
  acceptSharedMuseumRoom(board) {
    const assignment = this.assignedRoom();
    if (!assignment || validateMuseumRoom(board, assignment).length)
      return;
    clearTimeout(this.persistTimer);
    this.composerDraft.set(structuredClone(board));
    this.sharedRoomSubmitted.set(true);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { composerDraft: structuredClone(board) }));
    this.persist(this.state());
  }
  /** Local prototype publication is committed to storage before announcing success. */
  submitMuseumRoom() {
    if (this.session?.authorityMode === "serverAuthoritative") {
      this.error.set("Room submission needs the school\u2019s publishing connection. Your draft is still available.");
      return false;
    }
    if (!this.canEditRoom())
      return false;
    const assignment = this.assignedRoom();
    if (!assignment)
      return false;
    const data = structuredClone(this.composerDraft());
    const result = this.snapshots.publish(this.state(), this.config.template, {
      actor: this.actor(),
      artifactId: `artifact-${this.config.viewer.teamId}`,
      locationId: assignment.roomId,
      rendererVersion: 1,
      visitorSafeData: data,
      accessibleData: new MuseumBoardRenderer().renderAccessible(data),
      validation: this.roomValidation(),
      operationKey: `room-submit:${assignment.roomId}:${this.state().revision}:${this.draftVersion()}`,
      now: this.now()
    });
    if (!result.ok || !result.entityId) {
      this.error.set(result.error ?? "The room could not be submitted.");
      return false;
    }
    const recorded = this.lms.record(result.state, {
      type: "team_artifact_submitted",
      idempotencyKey: `lms:publish:${result.entityId}`,
      projectInstanceId: this.config.projectInstanceId,
      teamId: this.config.viewer.teamId,
      snapshotId: result.entityId,
      occurredAt: this.now()
    });
    if (!recorded.ok) {
      this.error.set(recorded.error ?? "The submission could not be recorded.");
      return false;
    }
    try {
      this.persistence.save(this.config.projectId, this.config.projectVersion, recorded.state);
    } catch {
      this.saveState.set("save_failed");
      this.error.set("This device could not save your submission. Your room is still a draft. Please try again.");
      return false;
    }
    clearTimeout(this.persistTimer);
    this.state.set(recorded.state);
    this.saveState.set("saved");
    this.error.set(void 0);
    this.notification.set("Your room is submitted to this preview museum.");
    return true;
  }
  startOwnDraft() {
    if (!this.usingStarter())
      return;
    const starter = this.composerDraft();
    this.updateComposer(__spreadProps(__spreadValues({}, starter), {
      title: "",
      centralClaim: "",
      objects: starter.objects.map((object) => __spreadProps(__spreadValues({}, object), {
        description: "",
        evidenceConnection: ""
      })),
      sources: starter.sources.map((source) => __spreadProps(__spreadValues({}, source), { citation: "" })),
      immersiveGallery: starter.immersiveGallery ? __spreadProps(__spreadValues({}, starter.immersiveGallery), { title: "", embedUrl: "" }) : void 0,
      videoPresentation: starter.videoPresentation ? __spreadProps(__spreadValues({}, starter.videoPresentation), { title: "", videoUrl: "", prototype: false }) : void 0
    }));
    this.openComposer();
  }
  actor = computed(
    () => {
      if (this.role() === "teacher") {
        return {
          id: this.config.viewer.teacherId,
          role: "teacher",
          courseSectionIds: [this.config.courseSectionId],
          teamIds: []
        };
      }
      if (this.role() === "family") {
        return { id: "family-visitor", role: "family", courseSectionIds: [], teamIds: [] };
      }
      return {
        id: this.config.viewer.studentId,
        role: "student",
        courseSectionIds: [this.config.courseSectionId],
        teamIds: [this.config.viewer.teamId]
      };
    },
    ...ngDevMode ? [{ debugName: "actor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locations = computed(
    () => this.gallery.build(this.state(), this.config.teams, this.actor()),
    ...ngDevMode ? [{ debugName: "locations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publishedCount = computed(
    () => this.state().hangings.length,
    ...ngDevMode ? [{ debugName: "publishedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unpublishedTeams = computed(
    () => this.config.teams.filter((team) => !this.state().hangings.some((hanging) => hanging.locationId === team.locationId)),
    ...ngDevMode ? [{ debugName: "unpublishedTeams" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLocation = computed(
    () => this.locations().find((location) => location.hanging?.id === this.selectedHangingId()),
    ...ngDevMode ? [{ debugName: "selectedLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedHangingId = computed(
    () => this.state().openingSession.currentHangingId,
    ...ngDevMode ? [{ debugName: "focusedHangingId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedResponses = computed(
    () => {
      const hangingId = this.selectedHangingId();
      if (hangingId === void 0 || this.role() === "family")
        return [];
      return this.state().peerResponses.filter((response) => {
        if (response.hangingId !== hangingId || response.status === "draft" || response.status === "deleted") {
          return false;
        }
        return this.role() === "teacher" || response.status === "posted";
      });
    },
    ...ngDevMode ? [{ debugName: "selectedResponses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDraft = computed(
    () => {
      const hangingId = this.selectedHangingId();
      if (hangingId === void 0)
        return "";
      return this.state().peerResponses.find((response) => response.hangingId === hangingId && response.authorId === this.actor().id && response.status === "draft")?.body ?? "";
    },
    ...ngDevMode ? [{ debugName: "selectedDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentDefense = computed(
    () => {
      const hangingId = this.selectedHangingId();
      if (hangingId === void 0)
        return void 0;
      return this.state().defenses.find((defense) => defense.hangingId === hangingId && defense.studentId === this.actor().id);
    },
    ...ngDevMode ? [{ debugName: "currentDefense" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canRespondAtSelected = computed(
    () => {
      const hanging = this.selectedLocation()?.hanging;
      return hanging !== void 0 && this.accessPolicy.canRespond(this.actor(), this.state(), hanging);
    },
    ...ngDevMode ? [{ debugName: "canRespondAtSelected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableWalkUpCount = computed(
    () => this.locations().filter((location) => location.hanging !== void 0 && location.snapshot !== void 0 && location.snapshot.corridorPreview?.walkUpAvailable !== false).length,
    ...ngDevMode ? [{ debugName: "availableWalkUpCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  comingSoonCount = computed(
    () => this.locations().length - this.availableWalkUpCount(),
    ...ngDevMode ? [{ debugName: "comingSoonCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseWords = computed(
    () => wordCount(this.selectedDraft()),
    ...ngDevMode ? [{ debugName: "responseWords" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visitProgress = computed(
    () => ({
      current: this.visitedHangingIds().size,
      target: Math.max(1, this.availableWalkUpCount())
    }),
    ...ngDevMode ? [{ debugName: "visitProgress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseProgress = computed(
    () => ({
      current: this.state().peerResponses.filter((response) => response.authorId === this.actor().id && response.status === "posted").length,
      target: this.config.template.peerResponse.minimumResponses
    }),
    ...ngDevMode ? [{ debugName: "responseProgress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  composerValidation = computed(
    () => validateMuseumBoard(this.config.template, this.composerDraft(), this.validator),
    ...ngDevMode ? [{ debugName: "composerValidation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rehangsRemaining = computed(
    () => {
      const artifactId = `artifact-${this.config.viewer.teamId}`;
      const count = this.state().snapshots.filter((snapshot) => snapshot.artifactId === artifactId).length;
      return Math.max(0, this.config.template.publication.rehangLimit - Math.max(0, count - 1));
    },
    ...ngDevMode ? [{ debugName: "rehangsRemaining" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    const templateResult = this.templateRegistry.register(this.config.template);
    const museumResult = this.rendererRegistry.register(new MuseumBoardRenderer());
    const scienceResult = this.rendererRegistry.register(new SciencePosterRenderer());
    const problem = [templateResult, museumResult, scienceResult].find((result) => !result.ok);
    if (problem !== void 0 && !problem.ok)
      this.error.set(problem.message);
  }
  ngOnDestroy() {
    if (this.persistTimer)
      this.persist(this.state());
    clearTimeout(this.persistTimer);
  }
  setRole(role) {
    this.role.set(role);
    this.walkUpOpen.set(false);
    this.defenseOpen.set(false);
    this.error.set(void 0);
    this.notification.set(role === "teacher" ? `Viewing teacher controls as ${this.config.viewer.teacherDisplayName}.` : role === "family" ? "Family view shows only approved snapshots." : `Viewing the hall as ${this.config.viewer.studentDisplayName}.`);
  }
  setViewMode(mode) {
    this.viewMode.set(mode);
    this.liveAnnouncement.set(mode === "list" ? "Accessible gallery list opened." : "Immersive corridor opened.");
  }
  openHanging(hangingId) {
    const location = this.locations().find((item) => item.hanging?.id === hangingId);
    if (location?.hanging === void 0) {
      this.error.set("That exhibit is not available in this view.");
      return;
    }
    if (location.snapshot?.corridorPreview?.walkUpAvailable === false) {
      this.notification.set("Walk-up coming soon. This exhibit preview is not open yet.");
      this.liveAnnouncement.set("Walk-up coming soon.");
      return;
    }
    this.selectedHangingId.set(hangingId);
    this.visitedHangingIds.update((visited) => /* @__PURE__ */ new Set([...visited, hangingId]));
    this.walkUpOpen.set(true);
    this.defenseOpen.set(false);
    this.error.set(void 0);
    this.liveAnnouncement.set(`${location.snapshot?.accessibleData.title ?? "Exhibit"} opened.`);
  }
  closeWalkUp() {
    this.walkUpOpen.set(false);
    this.defenseOpen.set(false);
    this.liveAnnouncement.set("Returned to the exhibit corridor.");
  }
  openComposer() {
    this.composerOpen.set(true);
    this.error.set(void 0);
  }
  closeComposer() {
    this.composerOpen.set(false);
  }
  updateBoardTitle(title) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), { title }));
  }
  updateBoardClaim(centralClaim) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), { centralClaim }));
  }
  updateObject(objectId, field, value) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      objects: this.composerDraft().objects.map((object) => object.id === objectId ? __spreadProps(__spreadValues({}, object), { [field]: value }) : object)
    }));
  }
  updateSource(sourceId, citation) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      sources: this.composerDraft().sources.map((source) => source.id === sourceId ? __spreadProps(__spreadValues({}, source), { citation }) : source)
    }));
  }
  updateGalleryTitle(title) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      immersiveGallery: {
        provider: "metasteps",
        title,
        embedUrl: this.composerDraft().immersiveGallery?.embedUrl ?? ""
      }
    }));
  }
  updateGalleryEmbed(embedUrl) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      immersiveGallery: {
        provider: "metasteps",
        title: this.composerDraft().immersiveGallery?.title ?? "Immersive gallery",
        embedUrl
      }
    }));
  }
  updateVideoTitle(title) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      videoPresentation: {
        title,
        videoUrl: this.composerDraft().videoPresentation?.videoUrl ?? "",
        prototype: this.composerDraft().videoPresentation?.prototype,
        presenterLabel: this.composerDraft().videoPresentation?.presenterLabel
      }
    }));
  }
  updateVideoUrl(videoUrl) {
    this.updateComposer(__spreadProps(__spreadValues({}, this.composerDraft()), {
      videoPresentation: {
        title: this.composerDraft().videoPresentation?.title ?? "Curator video presentation",
        videoUrl,
        prototype: false
      }
    }));
  }
  publishBoard() {
    if (this.config.museum)
      return this.submitMuseumRoom();
    const renderer = this.rendererRegistry.resolve(this.config.template.rendererType);
    if (!renderer.ok) {
      this.error.set(renderer.message);
      return false;
    }
    const artifactId = `artifact-${this.config.viewer.teamId}`;
    const team = this.config.teams.find((item) => item.id === this.config.viewer.teamId);
    if (team === void 0) {
      this.error.set("Your team does not have an assigned hall location.");
      return false;
    }
    const now = this.now();
    const validation = this.composerValidation();
    const gallery = this.composerDraft().immersiveGallery;
    const parsedGallery = parseMetaStepsEmbed(gallery?.embedUrl ?? "");
    const video = this.composerDraft().videoPresentation;
    const parsedVideo = parsePresentationVideo(video?.videoUrl ?? "");
    const galleryData = gallery !== void 0 && parsedGallery.normalizedUrl !== void 0 ? __spreadProps(__spreadValues({}, this.composerDraft()), {
      immersiveGallery: __spreadProps(__spreadValues({}, gallery), { embedUrl: parsedGallery.normalizedUrl })
    }) : this.composerDraft();
    const publicationData = video !== void 0 && !video.prototype && parsedVideo.normalizedUrl !== void 0 ? __spreadProps(__spreadValues({}, galleryData), {
      videoPresentation: __spreadProps(__spreadValues({}, video), { videoUrl: parsedVideo.normalizedUrl })
    }) : galleryData;
    const result = this.snapshots.publish(this.state(), this.config.template, {
      actor: this.actor(),
      artifactId,
      locationId: team.locationId,
      rendererVersion: renderer.value.version,
      visitorSafeData: publicationData,
      accessibleData: renderer.value.renderAccessible(publicationData),
      corridorPreview: this.state().snapshots.find((snapshot) => snapshot.id === this.state().artifacts.find((item) => item.id === artifactId)?.currentSnapshotId)?.corridorPreview ?? this.config.seedBoards.find((seed) => seed.teamId === team.id)?.corridorPreview,
      validation,
      operationKey: `publish:${artifactId}:${this.draftVersion()}`,
      now
    });
    if (!this.applyResult(result, true))
      return false;
    const snapshotId = result.entityId;
    if (snapshotId !== void 0) {
      const lmsResult = this.lms.record(this.state(), {
        type: "team_artifact_submitted",
        idempotencyKey: `lms:publish:${snapshotId}`,
        projectInstanceId: this.config.projectInstanceId,
        teamId: this.config.viewer.teamId,
        snapshotId,
        occurredAt: now
      });
      this.applyResult(lmsResult, true, false);
    }
    this.composerOpen.set(false);
    this.notification.set(result.duplicate ? "This exhibit was already showcased. No duplicate was created." : `Exhibit showcased as snapshot ${this.snapshotVersion(snapshotId)}. Studio changes will not alter it.`);
    return true;
  }
  updatePeerDraft(body) {
    const hangingId = this.selectedHangingId();
    if (hangingId === void 0)
      return;
    const result = this.peerResponses.saveDraft(this.state(), this.actor(), this.config.viewer.studentDisplayName, hangingId, body, this.now());
    this.applyResult(result, false, false);
    this.schedulePersist();
  }
  savePeerDraft() {
    this.persist(this.state());
  }
  postPeerResponse(body) {
    const hangingId = this.selectedHangingId();
    if (hangingId === void 0)
      return false;
    const now = this.now();
    const result = this.peerResponses.post(this.state(), this.config.template, this.actor(), this.config.viewer.studentDisplayName, hangingId, body, `response:${this.actor().id}:${hangingId}`, now);
    if (!this.applyResult(result, true))
      return false;
    const hanging = this.state().hangings.find((item) => item.id === hangingId);
    if (hanging !== void 0) {
      this.applyResult(this.lms.record(this.state(), {
        type: "peer_response_completed",
        idempotencyKey: `lms:response:${result.entityId}`,
        projectInstanceId: this.config.projectInstanceId,
        studentId: this.actor().id,
        snapshotId: hanging.currentSnapshotId,
        occurredAt: now
      }), true, false);
    }
    this.notification.set("Question card posted. You can continue the gallery walk.");
    return true;
  }
  moderateResponse(responseId, action) {
    const result = this.peerResponses.moderate(this.state(), this.actor(), responseId, action, this.now());
    if (this.applyResult(result, true)) {
      this.notification.set(action === "hide" ? "Question card hidden." : "Question card restored.");
    }
  }
  setHallPhase(phase) {
    const result = this.liveFocus.setPhase(this.state(), this.actor(), phase, this.now());
    this.applyResult(result, true);
  }
  setNavigationMode(mode) {
    this.applyResult(this.liveFocus.setNavigationMode(this.state(), this.actor(), mode), true);
  }
  toggleControl(control) {
    this.applyResult(this.liveFocus.toggleControl(this.state(), this.actor(), control), true);
  }
  pointTo(hangingId) {
    const result = this.liveFocus.point(this.state(), this.actor(), hangingId, this.state().openingSession.revision);
    if (this.applyResult(result, true))
      this.openHanging(hangingId);
  }
  selectDocents(teamId) {
    const team = this.config.teams.find((item) => item.id === teamId);
    if (team === void 0 || !this.accessPolicy.canControlHall(this.actor(), this.state())) {
      this.error.set("Only the teacher can select a presenting team.");
      return;
    }
    const next = structuredClone(this.state());
    this.state.set(__spreadProps(__spreadValues({}, next), {
      revision: next.revision + 1,
      openingSession: __spreadProps(__spreadValues({}, next.openingSession), {
        docentStudentIds: [...team.memberIds],
        revision: next.openingSession.revision + 1
      })
    }));
    this.persist(this.state());
    this.liveAnnouncement.set(`${team.displayName} is now presenting.`);
  }
  openDefense() {
    if (this.role() !== "student")
      return;
    this.defenseOpen.set(true);
  }
  saveDefenseDraft(answers, mode) {
    const hangingId = this.selectedHangingId();
    if (hangingId === void 0)
      return;
    const result = this.defenses.saveDraft(this.state(), this.actor(), hangingId, answers, mode);
    this.applyResult(result, false, false);
    this.schedulePersist();
  }
  submitDefense(answers, mode) {
    const hangingId = this.selectedHangingId();
    if (hangingId === void 0)
      return false;
    const now = this.now();
    const result = this.defenses.submit(this.state(), this.config.template, this.actor(), hangingId, answers, mode, `defense:${this.actor().id}:${hangingId}`, now);
    if (!this.applyResult(result, true))
      return false;
    const hanging = this.state().hangings.find((item) => item.id === hangingId);
    if (hanging !== void 0) {
      this.applyResult(this.lms.record(this.state(), {
        type: "defense_completed",
        idempotencyKey: `lms:defense:${result.entityId}`,
        projectInstanceId: this.config.projectInstanceId,
        studentId: this.actor().id,
        snapshotId: hanging.currentSnapshotId,
        occurredAt: now
      }), true, false);
    }
    this.defenseOpen.set(false);
    this.notification.set("Defense submitted as your individual evidence.");
    return true;
  }
  printSelected() {
    if (typeof window !== "undefined")
      window.print();
  }
  clearNotification() {
    this.notification.set(void 0);
  }
  clearError() {
    this.error.set(void 0);
  }
  resetDemo() {
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    const state = createInitialHallState(this.studentRoomConfig(), new MuseumBoardRenderer());
    this.state.set(state);
    this.composerDraft.set(this.initialComposerDraft());
    this.draftVersion.set(0);
    this.visitedHangingIds.set(/* @__PURE__ */ new Set());
    this.walkUpOpen.set(false);
    this.composerOpen.set(false);
    this.persist(state);
    this.notification.set("The exhibit hall demo has been reset.");
  }
  updateComposer(value) {
    if (this.config.museum && !this.canEditRoom())
      return;
    this.composerDraft.set(value);
    this.draftVersion.update((version) => version + 1);
    this.state.update((state) => __spreadProps(__spreadValues({}, state), { composerDraft: value }));
    this.schedulePersist();
  }
  applyResult(result, persist, announce = true) {
    if (!result.ok) {
      this.error.set(result.error ?? "The request could not be completed.");
      return false;
    }
    this.state.set(result.state);
    this.error.set(void 0);
    if (result.announcement !== void 0 && announce) {
      this.liveAnnouncement.set(result.announcement);
      this.notification.set(result.announcement);
    }
    if (persist)
      this.persist(result.state);
    return true;
  }
  schedulePersist() {
    clearTimeout(this.persistTimer);
    this.saveState.set("saving");
    this.persistTimer = setTimeout(() => this.persist(this.state()), 450);
  }
  persist(state) {
    clearTimeout(this.persistTimer);
    this.saveState.set(typeof navigator !== "undefined" && !navigator.onLine ? "offline_local" : "saving");
    try {
      this.persistence.save(this.config.projectId, this.config.projectVersion, state);
      this.saveState.set(typeof navigator !== "undefined" && !navigator.onLine ? "offline_local" : "saved");
    } catch {
      this.saveState.set("save_failed");
      this.error.set("This device could not save the latest hall change.");
    }
  }
  loadOrCreateState() {
    const saved = this.persistence.load(this.config.projectId, this.config.projectVersion);
    return saved === void 0 ? createInitialHallState(this.studentRoomConfig(), new MuseumBoardRenderer(), this.runtimeScope) : __spreadProps(__spreadValues({}, saved), { runtimeScope: this.runtimeScope ?? saved.runtimeScope });
  }
  initialComposerDraft() {
    const savedDraft = this.state().composerDraft;
    if (this.config.museum) {
      const team = this.config.teams.find((item) => item.id === this.config.viewer.teamId);
      const room = this.config.museum.rooms.find((item) => item.roomId === team?.locationId);
      if (room && savedDraft?.museumRoom?.roomId === room.roomId && savedDraft.museumRoom.layoutId === room.layoutId)
        return structuredClone(savedDraft);
      if (room && team)
        return emptyMuseumRoom(room, {
          displayName: team.displayName,
          memberDisplayNames: team.memberDisplayNames
        });
      return {
        title: "",
        centralClaim: "",
        objects: [],
        sources: [],
        teamCredit: { displayName: "Unassigned curator" }
      };
    }
    if (savedDraft)
      return structuredClone(savedDraft);
    const board = this.config.seedBoards.find((item) => item.teamId === this.config.viewer.teamId);
    if (board === void 0) {
      return {
        title: "",
        centralClaim: "",
        objects: [],
        sources: [],
        teamCredit: { displayName: "My team" }
      };
    }
    return structuredClone(board.data);
  }
  snapshotVersion(snapshotId) {
    return String(this.state().snapshots.find((snapshot) => snapshot.id === snapshotId)?.version ?? 1);
  }
  studentRoomConfig() {
    return this.config.museum ? __spreadProps(__spreadValues({}, this.config), {
      seedBoards: this.config.seedBoards.map((seed) => seed.teamId === this.config.viewer.teamId ? __spreadProps(__spreadValues({}, seed), { published: false }) : seed)
    }) : this.config;
  }
  now() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  static \u0275fac = function ExhibitHallRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExhibitHallRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExhibitHallRuntimeService, factory: _ExhibitHallRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExhibitHallRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();
function createInitialHallState(config, renderer, runtimeScope) {
  const createdAt = "2026-09-03T18:00:00.000Z";
  const artifacts = config.teams.map((team) => {
    const seed = config.seedBoards.find((item) => item.teamId === team.id);
    return {
      id: `artifact-${team.id}`,
      projectInstanceId: config.projectInstanceId,
      ownerType: "team",
      ownerId: team.id,
      templateId: config.template.templateId,
      rendererType: config.template.rendererType,
      sourceAdapterType: config.template.sourceAdapter.type,
      status: seed?.published ? "published" : "ready",
      currentSnapshotId: seed?.published ? `snapshot-${team.id}-v1` : void 0,
      createdAt,
      updatedAt: createdAt
    };
  });
  const snapshots = config.seedBoards.flatMap((seed) => seed.published ? [
    {
      id: `snapshot-${seed.teamId}-v1`,
      artifactId: `artifact-${seed.teamId}`,
      version: 1,
      rendererType: config.template.rendererType,
      rendererVersion: renderer.version,
      visitorSafeData: structuredClone(seed.data),
      accessibleData: renderer.renderAccessible(seed.data),
      corridorPreview: seed.corridorPreview === void 0 ? void 0 : structuredClone(seed.corridorPreview),
      createdBy: seed.teamId,
      createdAt
    }
  ] : []);
  const hangings = config.teams.flatMap((team) => {
    const seed = config.seedBoards.find((item) => item.teamId === team.id);
    return seed?.published ? [
      {
        id: `hanging-${team.id}`,
        hallId: "hall-period-3",
        locationId: team.locationId,
        artifactId: `artifact-${team.id}`,
        currentSnapshotId: `snapshot-${team.id}-v1`,
        publishedBy: team.id,
        publishedAt: createdAt
      }
    ] : [];
  });
  const marigold = hangings.find((item) => item.artifactId === "artifact-team-marigold");
  const northstar = hangings.find((item) => item.artifactId === "artifact-team-northstar");
  return {
    schemaVersion: "1.0",
    revision: 1,
    sequence: 100,
    runtimeScope,
    hall: {
      id: "hall-period-3",
      courseSectionId: config.courseSectionId,
      projectInstanceId: config.projectInstanceId,
      templateId: config.template.templateId,
      templateVersion: config.template.version,
      openingStartsAt: "2026-09-03T18:00:00.000Z",
      submissionLocksAt: "2026-09-04T02:00:00.000Z",
      peerResponsesCloseAt: "2026-09-05T02:00:00.000Z",
      familyViewExpiresAt: "2026-09-12T02:00:00.000Z",
      controls: {
        submissionLocked: false,
        peerResponsesEnabled: true,
        navigationMode: "independent",
        familyViewEnabled: true
      },
      locationOrder: config.teams.map((team) => team.locationId)
    },
    hallPhase: "closed_readable",
    artifacts,
    snapshots,
    hangings,
    peerResponses: [
      ...marigold === void 0 ? [] : [
        {
          id: "response-seed-1",
          hangingId: marigold.id,
          snapshotId: marigold.currentSnapshotId,
          authorId: "student-emery",
          authorDisplayName: "Emery",
          body: "How did scribes learn to use the palette, and who was allowed to become one?",
          status: "posted",
          createdAt,
          updatedAt: createdAt
        }
      ],
      ...northstar === void 0 ? [] : [
        {
          id: "response-seed-2",
          hangingId: northstar.id,
          snapshotId: northstar.currentSnapshotId,
          authorId: "student-lina",
          authorDisplayName: "Lina",
          body: "How does the burial location change what researchers can conclude about these objects?",
          status: "posted",
          createdAt,
          updatedAt: createdAt
        }
      ]
    ],
    defenses: [],
    openingSession: {
      id: "opening-period-3",
      hallId: "hall-period-3",
      phase: "closed",
      revision: 1,
      navigationMode: "independent",
      peerResponsesEnabled: true,
      docentStudentIds: [],
      openedAt: createdAt,
      closedAt: "2026-09-04T02:00:00.000Z"
    },
    lmsEvents: [],
    completedOperations: {}
  };
}

// src/app/templates/exhibit-hall/persistence/exhibit-draft-validation.ts
function record(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function optionalText(value) {
  return value === void 0 || typeof value === "string";
}
function isExhibitDraft(value) {
  if (!record(value) || typeof value["title"] !== "string" || typeof value["centralClaim"] !== "string")
    return false;
  if (!record(value["teamCredit"]) || typeof value["teamCredit"]["displayName"] !== "string")
    return false;
  if (!Array.isArray(value["objects"]) || !value["objects"].every(
    (item) => record(item) && ["id", "title", "description", "evidenceConnection"].every(
      (key) => typeof item[key] === "string"
    ) && Array.isArray(item["sourceIds"]) && item["sourceIds"].every((id) => typeof id === "string") && optionalText(item["imageAssetId"]) && optionalText(item["imageAlt"]) && (item["model"] === void 0 || isExhibitObjectModel(item["model"]))
  ))
    return false;
  if (!Array.isArray(value["sources"]) || !value["sources"].every(
    (item) => record(item) && typeof item["id"] === "string" && typeof item["citation"] === "string" && optionalText(item["url"])
  ))
    return false;
  const gallery = value["immersiveGallery"];
  const room = value["museumRoom"];
  const objects = value["objects"];
  if (room !== void 0 && (!isMuseumRoomData(room) || room.placements.length !== value["objects"].length || room.placements.some(
    (placement) => !objects.some((object) => object["id"] === placement.objectId)
  )))
    return false;
  if (gallery !== void 0 && (!record(gallery) || gallery["provider"] !== "metasteps" || typeof gallery["title"] !== "string" || typeof gallery["embedUrl"] !== "string"))
    return false;
  const video = value["videoPresentation"];
  return video === void 0 || record(video) && typeof video["title"] === "string" && optionalText(video["videoUrl"]) && (video["prototype"] === void 0 || typeof video["prototype"] === "boolean");
}

// src/app/templates/exhibit-hall/rooms/museum-publication.ts
var MuseumPublicationError = class extends Error {
  constructor(code, status = 0) {
    super(code);
    this.code = code;
    this.status = status;
  }
  code;
  status;
};
function museumScopeKey(scope) {
  return JSON.stringify([
    scope.tenantId,
    scope.classId,
    scope.projectId,
    scope.projectVersion,
    scope.museumId
  ]);
}
function museumRoomContent(board) {
  return {
    roomId: board.museumRoom?.roomId ?? "",
    layoutId: board.museumRoom?.layoutId ?? "",
    title: board.title,
    introduction: board.centralClaim,
    displays: (board.museumRoom?.placements ?? []).map((placement) => {
      const object = board.objects.find((item) => item.id === placement.objectId);
      return __spreadProps(__spreadValues({}, placement), {
        title: object?.title ?? "",
        label: object?.description ?? "",
        connection: object?.evidenceConnection ?? ""
      });
    })
  };
}
function isMuseumAssignment(value) {
  return isRecord(value) && boundedText(value["roomId"], 120) && boundedText(value["label"], 160) && typeof value["layoutId"] === "string" && !!museumRoomLayout(value["layoutId"]);
}
function isPublishedMuseumRoom(value) {
  return isRecord(value) && boundedText(value["id"], 180) && isMuseumAssignment(value["room"]) && boundedText(value["teamId"], 120) && boundedText(value["submittedAt"], 40) && Number.isFinite(Date.parse(value["submittedAt"])) && Number.isInteger(value["position"]) && value["position"] >= 0 && value["position"] < 500 && isExhibitDraft(value["board"]) && validateMuseumRoom(value["board"], value["room"]).length === 0 && value["board"].objects.length > 0 && value["board"].objects.length <= 3 && boundedText(value["board"].title, 160) && boundedText(value["board"].centralClaim, 700);
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function boundedText(value, length) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= length;
}

export {
  isExhibitDraft,
  MuseumPublicationError,
  museumScopeKey,
  museumRoomContent,
  isMuseumAssignment,
  isPublishedMuseumRoom,
  isRecord,
  boundedText,
  wordCount,
  ExhibitHallRuntimeService
};
//# debugId=371924d5-b6c4-5cf7-8182-edad9e733978
//# sourceMappingURL=chunk-RPQYDRPF.js.map
