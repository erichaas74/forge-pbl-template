import {
  AUTOMATION_CONFIG,
  AUTOMATION_PERSISTENCE,
  AUTOMATION_SESSION,
  AutomationRuntimeService,
  BrowserAutomationPersistence,
  validateAutomationConfig
} from "./chunk-IORUS3HC.js";
import "./chunk-3ZI5RM4E.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/runtime/project-launch/template-launchers/programming-automation.launcher.ts
var programmingAutomationLauncher = {
  templateId: "programming-automation",
  async load(request) {
    if (request.session.authorityMode !== "localDemo")
      throw new Error(
        "CAPABILITY_NOT_INSTALLED: Programming & Automation currently supports local classroom rehearsals. A classroom persistence and competition authority adapter is required for shared sessions."
      );
    const config = request.projectDefinition;
    validateAutomationConfig(config);
    if (config.projectId !== request.project.id)
      throw new Error("Project definition identity does not match this project.");
    const { AutomationLabComponent } = await import("./chunk-TP3J2RDM.js");
    return {
      component: AutomationLabComponent,
      providers: [
        { provide: AUTOMATION_CONFIG, useValue: config },
        { provide: AUTOMATION_SESSION, useValue: request.session },
        {
          provide: AUTOMATION_PERSISTENCE,
          useFactory: () => new BrowserAutomationPersistence(request.session)
        },
        AutomationRuntimeService
      ]
    };
  }
};
export {
  programmingAutomationLauncher
};
//# debugId=387bb01b-33f7-5475-8d6a-3e76a0899e8f
//# sourceMappingURL=chunk-GSMXOJE4.js.map
