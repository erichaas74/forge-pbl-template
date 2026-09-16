import {
  touchesCourseActor,
  validCourseActors
} from "./chunk-3ZI5RM4E.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import {
  Injectable,
  InjectionToken,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/programming-automation/core/automation-math.ts
var mathTools = [
  {
    id: "circumference",
    title: "Wheel circumference",
    inputs: ["Wheel diameter (cm)"],
    formula: "Diameter \xD7 3.14",
    unit: "cm"
  },
  {
    id: "rotation-distance",
    title: "Distance from rotations",
    inputs: ["Rotations (decimal or fraction)", "Travel per rotation (cm)"],
    formula: "Rotations \xD7 travel per rotation",
    unit: "cm"
  },
  {
    id: "distance-rotations",
    title: "Rotations for a distance",
    inputs: ["Target distance (cm)", "Travel per rotation (cm)"],
    formula: "Distance \xF7 travel per rotation",
    unit: "rotations"
  },
  {
    id: "fraction-turn",
    title: "Fraction of a turn \u2192 degrees",
    inputs: ["Fraction of a full turn"],
    formula: "Fraction \xD7 360",
    unit: "degrees"
  },
  {
    id: "degrees-fraction",
    title: "Degrees \u2192 fraction of a turn",
    inputs: ["Angle (degrees)"],
    formula: "Degrees \xF7 360",
    unit: "turns"
  },
  {
    id: "turn-time",
    title: "Time for a turn",
    inputs: ["Angle (degrees)", "Turn rate (degrees/second)"],
    formula: "Degrees \xF7 turn rate",
    unit: "seconds"
  },
  {
    id: "movement-time",
    title: "Travel time",
    inputs: ["Distance (cm)", "Speed (cm/second)"],
    formula: "Distance \xF7 speed",
    unit: "seconds"
  },
  {
    id: "grid-distance",
    title: "Grid distance",
    inputs: [
      "Start x (squares)",
      "Start y (squares)",
      "End x (squares)",
      "End y (squares)",
      "Grid scale (cm/square)"
    ],
    formula: "Horizontal change + vertical change, then \xD7 grid scale",
    unit: "cm"
  }
];
function calculate(expression, variables = {}) {
  const normalized = expression.trim().replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, "($1+$2/$3)").replace(/×/g, "*").replace(/÷/g, "/");
  const tokens = normalized.match(/(?:\d+(?:\.\d*)?|\.\d+)|[A-Za-z_][A-Za-z_0-9]*|[()+*/-]/g) ?? [];
  if (!tokens.length || tokens.length > 100 || tokens.join("") !== normalized.replace(/\s+/g, ""))
    throw new Error("Use numbers, fractions, variables and arithmetic only.");
  let index = 0;
  const atom = () => {
    const token = tokens[index++];
    if (token === "-") return -atom();
    if (token === "+") return atom();
    if (token === "(") {
      const n = sum();
      if (tokens[index++] !== ")") throw new Error("Close the parentheses.");
      return n;
    }
    if (token && /^(?:\d|\.)/.test(token)) return Number(token);
    if (token && Object.hasOwn(variables, token)) return variables[token];
    throw new Error(`Unknown value ${token ?? "(blank)"}.`);
  };
  const product = () => {
    let n = atom();
    while (tokens[index] === "*" || tokens[index] === "/") {
      const op = tokens[index++], right = atom();
      n = op === "*" ? n * right : n / right;
    }
    return n;
  };
  const sum = () => {
    let n = product();
    while (tokens[index] === "+" || tokens[index] === "-") {
      const op = tokens[index++], right = product();
      n = op === "+" ? n + right : n - right;
    }
    return n;
  };
  const answer = sum();
  if (index !== tokens.length || !Number.isFinite(answer) || Math.abs(answer) > 1e6)
    throw new Error("Check the calculation and avoid division by zero.");
  return answer;
}
function expectedMath(tool, values) {
  const definition = mathTools.find((item) => item.id === tool);
  if (!definition || values.length !== definition.inputs.length || values.some((value) => !Number.isFinite(value) || value < 0))
    throw new Error("Complete every input with a nonnegative number.");
  const [a, b, c, d, e] = values;
  let result;
  switch (tool) {
    case "circumference":
      result = a * 3.14;
      break;
    case "rotation-distance":
      result = a * b;
      break;
    case "distance-rotations":
    case "turn-time":
    case "movement-time":
      result = a / b;
      break;
    case "fraction-turn":
      result = a * 360;
      break;
    case "degrees-fraction":
      result = a / 360;
      break;
    case "grid-distance":
      result = (Math.abs(c - a) + Math.abs(d - b)) * e;
      break;
  }
  if (!Number.isFinite(result) || result < 0) throw new Error("Use a positive divisor.");
  return result;
}
function evidenceIsCorrect(evidence) {
  try {
    return evidence.status === "correct" && evidence.explanation.trim().length >= 8 && Math.abs(evidence.answer - expectedMath(evidence.tool, evidence.inputs)) <= 0.01 && evidence.unit === mathTools.find((tool) => tool.id === evidence.tool)?.unit;
  } catch {
    return false;
  }
}
function decimalAndFraction(value) {
  for (const denominator of [2, 4, 8, 10, 100]) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < 1e-6 && numerator % denominator) {
      const whole = Math.floor(numerator / denominator), remainder = numerator % denominator;
      return `${value} = ${whole ? whole + " " : ""}${remainder}/${denominator}`;
    }
  }
  return `${Math.round(value * 1e3) / 1e3}`;
}

// src/app/templates/programming-automation/core/move-math.ts
var moveMathOperations = {
  add: { symbol: "+", label: "plus", apply: (a, b) => a + b },
  subtract: { symbol: "\u2212", label: "minus", apply: (a, b) => a - b },
  multiply: { symbol: "\xD7", label: "times", apply: (a, b) => a * b },
  divide: { symbol: "\xF7", label: "divided by", apply: (a, b) => a / b }
};
var isMoveCommand = (type) => type === "move-distance" || type === "move-rotations";
function isMoveMathProblem(value) {
  if (!value || typeof value !== "object") return false;
  const problem = value;
  return typeof problem["operation"] === "string" && Object.hasOwn(moveMathOperations, problem["operation"]) && typeof problem["given"] === "number" && Number.isFinite(problem["given"]) && problem["given"] >= 0 && problem["given"] <= 2e3 && (!["multiply", "divide"].includes(problem["operation"]) || problem["given"] > 0);
}
function studentMoveNumber(value) {
  if (!value.trim()) throw new Error("Enter your number in the Move block.");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+|\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+)$/.test(value.trim()))
    throw new Error("Enter one number, decimal, or fraction. The mission supplies the operation.");
  const trimmed = value.trim();
  return (trimmed.startsWith("-") ? -1 : 1) * calculate(trimmed.replace(/^[+-]/, ""));
}
function moveMathValue(problem, studentValue) {
  if (!isMoveMathProblem(problem)) throw new Error("This Move problem is invalid.");
  const operand = studentMoveNumber(studentValue);
  if (problem.operation === "divide" && operand === 0) throw new Error("Choose a number other than zero for division.");
  const result = moveMathOperations[problem.operation].apply(problem.given, operand);
  if (!Number.isFinite(result)) throw new Error("Choose numbers with a finite result.");
  return result;
}
function commandExpression(command) {
  const problem = command.moveMath;
  return problem && isMoveMathProblem(problem) ? `${problem.given} ${moveMathOperations[problem.operation].symbol} (${command.value || "?"})` : command.value;
}
function prepareMoveMathCommands(commands, problems) {
  if (!problems) return commands;
  return commands.map((command) => {
    if (command.commands) return __spreadProps(__spreadValues({}, command), { commands: prepareMoveMathCommands(command.commands, problems) });
    const problem = isMoveCommand(command.type) ? problems[command.type] : void 0;
    if (!problem || command.moveMath || !isMoveMathProblem(problem)) return command;
    if (!command.value.trim()) return __spreadProps(__spreadValues({}, command), { moveMath: __spreadValues({}, problem) });
    try {
      const previous = studentMoveNumber(command.value);
      const operand = problem.operation === "add" ? previous - problem.given : problem.operation === "subtract" ? problem.given - previous : problem.operation === "multiply" ? previous / problem.given : problem.given / previous;
      if (!Number.isFinite(operand) || Math.abs(operand) > 1e12) return command;
      const value = Number(operand.toFixed(12)).toString();
      if (Math.abs(moveMathValue(problem, value) - previous) > 1e-9) return command;
      return __spreadProps(__spreadValues({}, command), { value, moveMath: __spreadValues({}, problem) });
    } catch {
      return command;
    }
  });
}

// src/app/templates/programming-automation/core/automation-compiler.ts
function allCommands(commands, depth = 0) {
  return depth > 4 ? [] : commands.flatMap((command) => [command, ...allCommands(command.commands ?? [], depth + 1)]);
}
function compileProgram(program, robot, challenge, math, requireMath = false) {
  const issues = [], compiled = [], variables = {};
  const issue = (code, message, commandId, severity = "error") => issues.push({ code, message, commandId, severity });
  const ids = /* @__PURE__ */ new Set();
  let usesVariable = false, usesLoop = false;
  for (const variable of program.variables) {
    try {
      if (!/^[A-Z][A-Z0-9_]{0,24}$/.test(variable.name) || Object.hasOwn(variables, variable.name))
        throw new Error("Use a unique variable name such as SIDE.");
      variables[variable.name] = calculate(variable.value, variables);
    } catch (error) {
      issue("VARIABLE_INVALID", error instanceof Error ? error.message : "Invalid variable.");
    }
  }
  const check = (commands, depth) => {
    if (depth > 4) {
      issue("LOOP_DEPTH", "Use at most four nested loops.");
      return;
    }
    for (const command of commands) {
      if (ids.has(command.id))
        issue("COMMAND_ID_DUPLICATE", "Each command needs a unique identifier.", command.id);
      ids.add(command.id);
      if (command.type === "repeat") check(command.commands ?? [], depth + 1);
    }
  };
  check(program.commands, 0);
  if (ids.size > 100) issue("PROGRAM_LIMIT", "Keep your program within 100 blocks.");
  const expand = (commands, depth) => {
    if (depth > 4 || compiled.length > 500) return;
    for (const command of commands) {
      if (command.disabled) continue;
      if (!challenge.allowedCommands.includes(command.type)) {
        issue("COMMAND_NOT_ALLOWED", "This command is not available in this mission.", command.id);
        continue;
      }
      try {
        if (command.moveMath && !isMoveCommand(command.type))
          throw new Error("A movement math problem belongs in a Move block.");
        const value = command.type === "pick-up" || command.type === "drop-off" ? 0 : command.moveMath ? moveMathValue(command.moveMath, command.value) : calculate(command.value, variables);
        if (command.type === "repeat") {
          if (!Number.isInteger(value) || value < 1 || value > 20 || !command.commands?.length)
            throw new Error("A loop needs 1\u201320 repeats and at least one command.");
          const before = compiled.length;
          for (let iteration = 0; iteration < value && compiled.length <= 500; iteration++)
            expand(command.commands, depth + 1);
          if (compiled.length > before) {
            usesLoop ||= value > 1;
            usesVariable ||= (command.value.match(/[A-Z][A-Z0-9_]*/g) ?? []).some(
              (name) => Object.hasOwn(variables, name)
            );
          }
          continue;
        }
        if (value < 0 || value > (command.type.startsWith("turn") ? command.type === "turn-fraction" ? 2 : 720 : command.type === "wait" ? 120 : 2e3))
          throw new Error("Command value is outside this lab\u2019s range.");
        const turn = command.type.startsWith("turn");
        const rate = command.rate?.trim() ? calculate(command.rate, variables) : turn ? robot.turnRate : robot.moveSpeed;
        if (rate <= 0 || rate > (turn ? 180 : 100))
          throw new Error("Use a positive rate up to 100 cm/s or 180 degrees/s.");
        const units = {
          "move-distance": "cm",
          "move-rotations": "rotations",
          "turn-degrees": "degrees",
          "turn-fraction": "turns",
          wait: "seconds"
        };
        const unit = units[command.type];
        if (unit) {
          const evidence = math.find((item) => item.id === command.mathEvidenceId);
          if (!evidence || !evidenceIsCorrect(evidence) || evidence.unit !== unit || Math.abs(evidence.answer - value) > 0.01)
            issue(
              "MATH_EVIDENCE",
              "Link a checked calculation matching this command\u2019s value and unit.",
              command.id,
              requireMath ? "error" : "warning"
            );
        }
        compiled.push({
          id: command.id,
          type: command.type,
          value,
          rate,
          direction: command.direction ?? "right",
          packageId: command.packageId
        });
        usesVariable ||= (command.value.match(/[A-Z][A-Z0-9_]*/g) ?? []).some(
          (name) => Object.hasOwn(variables, name)
        );
        if (compiled.length > 500) {
          issue("EXECUTION_LIMIT", "Expanded program exceeds 500 commands.");
          return;
        }
      } catch (error) {
        issue(
          "COMMAND_INVALID",
          error instanceof Error ? error.message : "Invalid command.",
          command.id
        );
      }
    }
  };
  expand(program.commands, 0);
  if (!compiled.length) issue("PROGRAM_EMPTY", "Add a movement command to start.");
  if (requireMath) {
    for (const tool of challenge.requiredMath)
      if (!math.some((item) => item.tool === tool && evidenceIsCorrect(item)))
        issue("REQUIRED_MATH", `Complete the ${tool.replaceAll("-", " ")} calculation.`);
    if (challenge.requiresVariable && !usesVariable)
      issue("VARIABLE_REQUIRED", "Use a variable in an executed command value.");
    if (challenge.requiresLoop && !usesLoop)
      issue("LOOP_REQUIRED", "Use a repeat block that runs a pattern at least twice.");
  }
  if (challenge.maximumCommands && ids.size > challenge.maximumCommands)
    issue("COMMAND_COUNT", `Use at most ${challenge.maximumCommands} blocks.`);
  return {
    commands: compiled,
    issues: issues.filter(
      (item, index, list) => list.findIndex(
        (other) => other.code === item.code && other.commandId === item.commandId && other.message === item.message
      ) === index
    )
  };
}

// src/app/templates/programming-automation/core/automation-state.ts
var emptyPrediction = () => ({
  route: "",
  distance: "",
  turns: "",
  seconds: "",
  battery: ""
});
function initialAutomationState(config) {
  return {
    schemaVersion: "1.0",
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    revision: 0,
    selectedChallengeId: config.initialChallengeId,
    drafts: Object.fromEntries(
      config.challenges.map((challenge) => [
        challenge.id,
        {
          program: {
            id: `program-${challenge.id}`,
            version: 0,
            commands: prepareMoveMathCommands(structuredClone(challenge.discovery?.starterCommands ?? []), challenge.moveMath),
            variables: []
          },
          targetIndex: 0,
          prediction: emptyPrediction(),
          diagnosis: "",
          reflection: ""
        }
      ])
    ),
    math: [],
    trials: [],
    versions: [],
    measuredDistancePerRotation: "",
    measuredTurnRate: "",
    measurementExplanation: "",
    defense: "",
    championship: {
      revealed: false,
      practiceOpen: true,
      practiceLimit: 0,
      paused: false,
      showStandings: true,
      finalized: false,
      queue: []
    },
    audit: []
  };
}
function transformCommands(commands, id, transform) {
  return commands.flatMap(
    (command) => command.id === id ? transform(command) : [
      __spreadValues(__spreadValues({}, command), command.commands ? { commands: transformCommands(command.commands, id, transform) } : {})
    ]
  );
}
function validateAutomationConfig(config) {
  if (!config || config.schemaVersion !== "1.0" || !config.template || !config.robot || !config.scoring || !Array.isArray(config.challenges) || !Array.isArray(config.courses)) {
    throw new Error("CONFIG_INVALID: Expected an automation project definition.");
  }
  const unique = (items) => items.length > 0 && new Set(items.map((item) => item.id)).size === items.length;
  if (config.schemaVersion !== "1.0" || config.template.id !== "programming-automation" || !unique(config.challenges) || !unique(config.courses) || !config.challenges.some((item) => item.id === config.initialChallengeId) || !config.challenges.some((item) => item.id === config.championshipChallengeId))
    throw new Error("CONFIG_INVALID: Missing automation challenge or course.");
  if ([
    config.robot.radiusCm,
    config.robot.distancePerRotationCm,
    config.robot.moveSpeed,
    config.robot.turnRate,
    config.robot.batteryCapacity
  ].some((value) => !Number.isFinite(value) || value <= 0))
    throw new Error("CONFIG_INVALID: Robot measurements must be positive.");
  if (Math.abs(Object.values(config.scoring).reduce((a, b) => a + b, 0) - 100) > 1e-3)
    throw new Error("CONFIG_INVALID: Scoring weights must add to 100.");
  if (config.previewWeeks) {
    if (config.previewWeeks.length !== 4 || config.previewWeeks.some((week, index) => week.week !== index + 1 || !week.title?.trim() || !week.setting?.trim() || week.sessions?.length !== 2 || [week.questions, week.evidence, week.adjustments].some((items) => !Array.isArray(items) || !items.length || items.some((item) => !item?.trim())) || week.sessions.some((session) => {
      const challenge = config.challenges.find((item) => item.id === session.challengeId);
      return !challenge || !session.product?.trim() || session.starterCommands !== void 0 && compileProgram({
        id: "preview-starter",
        version: 0,
        commands: session.starterCommands,
        variables: session.starterVariables ?? []
      }, config.robot, challenge, []).issues.some((issue) => issue.severity === "error");
    }))) throw new Error("CONFIG_INVALID: Preview weeks need four ordered weeks, two valid sessions, runnable starters, and tutor planning lists.");
  }
  for (const challenge of config.challenges) {
    if (!config.courses.some((course) => course.id === challenge.courseId))
      throw new Error("CONFIG_INVALID: Unknown course.");
    if (challenge.moveMath !== void 0 && (!challenge.moveMath || typeof challenge.moveMath !== "object" || Array.isArray(challenge.moveMath) || Object.entries(challenge.moveMath).some(([type, problem]) => !isMoveCommand(type) || !challenge.allowedCommands.includes(type) || !isMoveMathProblem(problem))))
      throw new Error("CONFIG_INVALID: Move math needs an allowed movement type, operation, and valid given number.");
    const discovery = challenge.discovery;
    if (discovery && (!Array.isArray(discovery.starterCommands) || !discovery.instructions?.trim() || !discovery.reasoningPrompt?.trim() || !mathTools.some((tool) => tool.id === discovery.mathTool) || !allCommands(discovery.starterCommands).some(
      (command) => command.id === discovery.focusCommandId
    ) || compileProgram(
      {
        id: "starter-validation",
        version: 0,
        commands: discovery.starterCommands,
        variables: []
      },
      config.robot,
      challenge,
      []
    ).issues.some((issue) => issue.severity === "error")))
      throw new Error(
        "CONFIG_INVALID: Discovery needs runnable starter code, a focus command, and reasoning guidance."
      );
  }
  for (const course of config.courses) {
    if (course?.visualTheme !== void 0 && !["workshop", "tabletop"].includes(course.visualTheme)) {
      throw new Error("CONFIG_INVALID: Unsupported course visual theme.");
    }
    if (!course || !course.startPose || !course.battery || ![
      course.targets,
      course.obstacles,
      course.packages,
      course.deliveryZones,
      course.checkpoints
    ].every(Array.isArray))
      throw new Error("CONFIG_INVALID: Course geometry is incomplete.");
    if (course.actors !== void 0 && (!validCourseActors(course.actors, course.widthCm, course.heightCm) || course.actors.length > 0 && course.visualTheme !== "tabletop" || course.actors.some((actor) => touchesCourseActor(course.startPose, config.robot.radiusCm, actor, 0))))
      throw new Error("CONFIG_INVALID: Moving actors need valid bounded routes, a clear start, and the tabletop renderer.");
    if (course.visualTheme === "workshop" && (course.obstacles.length || course.packages.length || course.deliveryZones.length || course.checkpoints.length || course.targets.some((target) => target.xCm !== course.startPose.xCm || target.headingDeg !== course.startPose.headingDeg))) throw new Error("CONFIG_INVALID: Workshop art currently supports straight parking lanes without cargo or obstacles.");
    for (const pose of [course.startPose, ...course.targets])
      if (!Number.isFinite(pose.headingDeg))
        throw new Error("CONFIG_INVALID: Every pose needs a heading in degrees.");
    for (const rect of [...course.obstacles, ...course.deliveryZones])
      if ([rect.xCm, rect.yCm, rect.widthCm, rect.heightCm].some((n) => !Number.isFinite(n)) || rect.widthCm <= 0 || rect.heightCm <= 0 || rect.xCm < 0 || rect.yCm < 0 || rect.xCm + rect.widthCm > course.widthCm || rect.yCm + rect.heightCm > course.heightCm)
        throw new Error("CONFIG_INVALID: A course rectangle is invalid or outside the grid.");
    if (!course.targets.length || [course.widthCm, course.heightCm, course.gridSizeCm, course.toleranceCm].some(
      (value) => !Number.isFinite(value) || value <= 0
    ))
      throw new Error("CONFIG_INVALID: Invalid course dimensions.");
    for (const point of [
      course.startPose,
      ...course.targets,
      ...course.packages,
      ...course.checkpoints
    ])
      if (!Number.isFinite(point.xCm) || !Number.isFinite(point.yCm) || point.xCm < 0 || point.yCm < 0 || point.xCm > course.widthCm || point.yCm > course.heightCm)
        throw new Error("CONFIG_INVALID: A course object lies outside the grid.");
    for (const pkg of course.packages)
      if (!course.deliveryZones.some((zone) => zone.id === pkg.deliveryZoneId))
        throw new Error("CONFIG_INVALID: Unknown delivery zone.");
    if (Object.values(course.battery).some(
      (cost) => typeof cost !== "number" || !Number.isFinite(cost) || cost < 0
    ))
      throw new Error("CONFIG_INVALID: Invalid battery costs.");
  }
}

// src/app/templates/programming-automation/runtime/automation.tokens.ts
var AUTOMATION_CONFIG = new InjectionToken("AUTOMATION_CONFIG");
var AUTOMATION_SESSION = new InjectionToken("AUTOMATION_SESSION");
var AUTOMATION_SAMPLE = new InjectionToken("AUTOMATION_SAMPLE");

// src/app/templates/programming-automation/persistence/automation.persistence.ts
var AUTOMATION_PERSISTENCE = new InjectionToken(
  "AUTOMATION_PERSISTENCE"
);
function isAutomationState(value) {
  if (!value || typeof value !== "object") return false;
  const item = value;
  if (!(item["schemaVersion"] === "1.0" && typeof item["projectId"] === "string" && typeof item["projectVersion"] === "string" && typeof item["selectedChallengeId"] === "string" && Number.isInteger(item["revision"]) && !!item["drafts"] && typeof item["drafts"] === "object" && ["math", "trials", "versions", "audit"].every((key) => Array.isArray(item[key])) && !!item["championship"] && typeof item["championship"] === "object"))
    return false;
  const record = (v) => !!v && typeof v === "object" && !Array.isArray(v);
  const strings = (v, keys) => keys.every((key) => typeof v[key] === "string");
  const commands = (v, depth = 0) => depth <= 4 && Array.isArray(v) && v.length <= 100 && v.every(
    (c) => record(c) && strings(c, ["id", "type", "value"]) && [
      "move-distance",
      "move-rotations",
      "turn-degrees",
      "turn-fraction",
      "wait",
      "pick-up",
      "drop-off",
      "repeat"
    ].includes(c["type"]) && (c["moveMath"] === void 0 || ["move-distance", "move-rotations"].includes(c["type"]) && isMoveMathProblem(c["moveMath"])) && (c["commands"] === void 0 || commands(c["commands"], depth + 1))
  );
  const program = (v) => record(v) && typeof v["id"] === "string" && Number.isInteger(v["version"]) && commands(v["commands"]) && Array.isArray(v["variables"]) && v["variables"].every(
    (variable) => record(variable) && strings(variable, ["id", "name", "value", "unit"])
  );
  const prediction = (v) => record(v) && strings(v, ["route", "distance", "turns", "seconds", "battery"]);
  const math = (v) => Array.isArray(v) && v.every(
    (e) => record(e) && strings(e, ["id", "studentId", "tool", "unit", "explanation", "status", "timestamp"]) && Number.isFinite(e["answer"]) && Number.isFinite(e["expected"]) && Array.isArray(e["inputs"]) && e["inputs"].every(Number.isFinite)
  );
  const version = (v) => record(v) && strings(v, ["id", "ownerId", "ownerName", "challengeId", "createdAt"]) && Number.isInteger(v["targetIndex"]) && program(v["program"]) && prediction(v["prediction"]) && math(v["math"]) && record(v["course"]) && (v["course"]["actors"] === void 0 || validCourseActors(v["course"]["actors"], Number(v["course"]["widthCm"]), Number(v["course"]["heightCm"])) && (!v["course"]["actors"].length || v["course"]["visualTheme"] === "tabletop")) && Array.isArray(v["course"]["targets"]) && Array.isArray(v["course"]["packages"]) && Array.isArray(v["course"]["obstacles"]) && record(v["robot"]);
  const championship = item["championship"];
  return strings(item, [
    "measuredDistancePerRotation",
    "measuredTurnRate",
    "measurementExplanation",
    "defense"
  ]) && record(item["drafts"]) && Object.hasOwn(item["drafts"], item["selectedChallengeId"]) && Object.values(item["drafts"]).every(
    (d) => record(d) && program(d["program"]) && prediction(d["prediction"]) && strings(d, ["diagnosis", "reflection"]) && (d["observedTrialId"] === void 0 || typeof d["observedTrialId"] === "string") && (d["reasoningOpened"] === void 0 || typeof d["reasoningOpened"] === "boolean") && Number.isInteger(d["targetIndex"])
  ) && math(item["math"]) && item["versions"].every(version) && item["trials"].every(
    (t) => record(t) && strings(t, ["id", "challengeId", "createdAt", "mode", "stoppedReason"]) && version(t["version"]) && typeof t["completedMission"] === "boolean" && [
      "elapsedSeconds",
      "distanceCm",
      "totalTurnDegrees",
      "collisions",
      "deliveriesCompleted",
      "batteryUsed",
      "stoppingErrorCm",
      "commandCount",
      "score"
    ].every((k) => Number.isFinite(t[k])) && Array.isArray(t["events"]) && t["events"].every(
      (e) => record(e) && strings(e, ["commandId", "message"]) && Number.isFinite(e["timeMs"])
    ) && Array.isArray(t["pathSamples"]) && t["pathSamples"].every(
      (p) => record(p) && ["timeMs", "xCm", "yCm", "headingDeg", "batteryUsed"].every(
        (k) => Number.isFinite(p[k])
      ) && typeof p["activeCommandId"] === "string" && Array.isArray(p["carryingPackageIds"]) && Array.isArray(p["deliveredPackageIds"])
    )
  ) && ["revealed", "practiceOpen", "paused", "showStandings", "finalized"].every(
    (k) => typeof championship[k] === "boolean"
  ) && Number.isInteger(championship["practiceLimit"]) && Array.isArray(championship["queue"]) && championship["queue"].every((id) => typeof id === "string") && item["audit"].every(
    (e) => record(e) && strings(e, ["id", "action", "reason", "timestamp"])
  );
}
var BrowserAutomationPersistence = class {
  constructor(session, storage = safeBrowserStorage()) {
    this.session = session;
    this.storage = storage;
    this.store = new ScopedBrowserStore(
      "programming-automation",
      this.storage,
      isAutomationState
    );
  }
  session;
  storage;
  store;
  savedRevision;
  load() {
    const state = this.store.load(this.session);
    this.savedRevision = state?.revision;
    return state;
  }
  save(state) {
    if (!this.storage) throw new Error("Browser storage unavailable.");
    if (this.store.load(this.session)?.revision !== this.savedRevision)
      throw new Error("This draft changed in another tab. Export your work before reloading.");
    this.store.save(this.session, state);
    this.savedRevision = state.revision;
  }
};

// src/app/templates/programming-automation/core/robot-execution.ts
var normalizeHeading = (value) => (value % 360 + 360) % 360;
var round = (value) => Math.round(value * 1e4) / 1e4;
var distance = (a, b) => Math.hypot(a.xCm - b.xCm, a.yCm - b.yCm);
var inside = (pose, rect) => pose.xCm >= rect.xCm && pose.xCm <= rect.xCm + rect.widthCm && pose.yCm >= rect.yCm && pose.yCm <= rect.yCm + rect.heightCm;
function collides(pose, course, radius) {
  return pose.xCm < radius || pose.yCm < radius || pose.xCm > course.widthCm - radius || pose.yCm > course.heightCm - radius || course.obstacles.some((rect) => {
    const x = Math.max(rect.xCm, Math.min(pose.xCm, rect.xCm + rect.widthCm));
    const y = Math.max(rect.yCm, Math.min(pose.yCm, rect.yCm + rect.heightCm));
    return Math.hypot(pose.xCm - x, pose.yCm - y) <= radius;
  });
}
function executeRobot(commands, course, robot, challenge, targetIndex, prediction, scoring) {
  let pose = __spreadValues({}, course.startPose), seconds = 0, traveled = 0, degrees = 0, battery = 0, collisions = 0, stoppedReason = "Program finished", halted = false;
  const capacity = challenge.batteryCapacity ?? robot.batteryCapacity;
  const carrying = /* @__PURE__ */ new Set(), delivered = /* @__PURE__ */ new Set(), checkpoints = /* @__PURE__ */ new Set();
  const samples = [], events = [];
  let active = "";
  const sample = (force = false) => {
    if (!force && samples.length && seconds * 1e3 - samples.at(-1).timeMs < 99.99) return;
    samples.push(__spreadProps(__spreadValues({}, pose), {
      timeMs: round(seconds * 1e3),
      activeCommandId: active,
      carryingPackageIds: [...carrying],
      deliveredPackageIds: [...delivered],
      batteryUsed: round(battery)
    }));
  };
  const event = (message) => {
    events.push({ commandId: active, message, timeMs: round(seconds * 1e3) });
  };
  const consume = (time, cost, destination = pose) => {
    let fraction = Math.min(
      1,
      cost > 0 ? Math.max(0, capacity - battery) / cost : 1,
      time > 0 ? Math.max(0, 600 - seconds) / time : 1
    );
    let hit;
    if (time > 0 && course.actors?.length) {
      const speed = Math.max(...course.actors.map((actor) => actor.speedCmPerSecond));
      const steps = Math.max(1, Math.ceil(time * fraction / Math.min(0.025, 0.5 / speed)));
      for (let i = 0; i <= steps; i++) {
        const f = fraction * i / steps;
        const candidate = {
          xCm: pose.xCm + (destination.xCm - pose.xCm) * f,
          yCm: pose.yCm + (destination.yCm - pose.yCm) * f
        };
        const actor = course.actors.find((actor2) => touchesCourseActor(candidate, robot.radiusCm, actor2, (seconds + time * f) * 1e3));
        if (actor) {
          hit = actor.label;
          fraction = f;
          break;
        }
      }
    }
    seconds += time * fraction;
    battery += cost * fraction;
    if (hit) {
      collisions++;
      battery = Math.min(capacity, battery + course.battery.collision);
      halted = true;
      stoppedReason = `Collision with ${hit}`;
      event(`${stoppedReason}. Adjust your route or WAIT timing.`);
    } else if (fraction < 1 || battery >= capacity || seconds >= 600) {
      halted = true;
      stoppedReason = battery >= capacity ? "Battery empty" : "600-second run limit reached";
    }
    return fraction;
  };
  const checkPoints = () => {
    for (const point of course.checkpoints)
      if (distance(pose, point) <= point.radiusCm) checkpoints.add(point.id);
  };
  sample(true);
  checkPoints();
  for (const command of commands) {
    if (halted) break;
    active = command.id;
    sample(true);
    if (command.type === "move-distance" || command.type === "move-rotations") {
      const rotationTravel = carrying.size ? robot.loadedDistancePerRotationCm ?? robot.distancePerRotationCm : robot.distancePerRotationCm;
      const amount = command.type === "move-rotations" ? command.value * rotationTravel : command.value;
      const speed = carrying.size ? Math.min(command.rate, robot.loadedSpeed ?? command.rate) : command.rate;
      const steps = Math.max(1, Math.ceil(amount));
      for (let i = 0; i < steps && !halted; i++) {
        const step = amount / steps, radians = pose.headingDeg * Math.PI / 180;
        const next = __spreadProps(__spreadValues({}, pose), {
          xCm: pose.xCm + Math.sin(radians) * step,
          yCm: pose.yCm + Math.cos(radians) * step
        });
        if (collides(next, course, robot.radiusCm)) {
          collisions++;
          consume(0, course.battery.collision);
          event(`Collision at (${round(pose.xCm)}, ${round(pose.yCm)}) cm.`);
          stoppedReason = "Collision stopped movement";
          if (course.stopOnCollision) halted = true;
          break;
        }
        const fraction = consume(step / speed, step * course.battery.move, next);
        pose = __spreadProps(__spreadValues({}, pose), {
          xCm: pose.xCm + (next.xCm - pose.xCm) * fraction,
          yCm: pose.yCm + (next.yCm - pose.yCm) * fraction
        });
        traveled += step * fraction;
        checkPoints();
        sample();
      }
    } else if (command.type === "turn-degrees" || command.type === "turn-fraction") {
      const amount = command.value * (command.type === "turn-fraction" ? 360 : 1), steps = Math.max(1, Math.ceil(amount / 4));
      for (let i = 0; i < steps && !halted; i++) {
        const step = amount / steps, fraction = consume(step / command.rate, step * course.battery.turn);
        pose.headingDeg = normalizeHeading(
          pose.headingDeg + step * fraction * (command.direction === "left" ? -1 : 1)
        );
        degrees += step * fraction;
        sample();
      }
    } else if (command.type === "wait") {
      const steps = Math.max(1, Math.ceil(command.value * 10));
      for (let i = 0; i < steps && !halted; i++) {
        consume(command.value / steps, command.value / steps * course.battery.wait);
        sample();
      }
    } else if (command.type === "pick-up") {
      const item = course.packages.find((pkg) => pkg.id === command.packageId);
      if (!item || distance(pose, item) > 18 || carrying.size >= robot.cargoLimit || carrying.has(item.id) || delivered.has(item.id))
        event("Pickup failed: check the package, distance and cargo capacity.");
      else {
        const fraction = consume(1, course.battery.pickup);
        if (fraction === 1 && !halted) {
          carrying.add(item.id);
          event(`Picked up ${item.label}.`);
        }
      }
    } else if (command.type === "drop-off") {
      const item = course.packages.find((pkg) => pkg.id === command.packageId), zone = course.deliveryZones.find((zone2) => zone2.id === item?.deliveryZoneId);
      if (!item || !carrying.has(item.id) || !zone || !inside(pose, zone))
        event("Delivery failed: carry the right package into its matching zone.");
      else {
        const fraction = consume(1, course.battery.dropoff);
        if (fraction === 1 && !halted) {
          carrying.delete(item.id);
          delivered.add(item.id);
          event(`Delivered ${item.label}.`);
        }
      }
    }
    event(
      `${command.type.replaceAll("-", " ")} complete \xB7 (${round(pose.xCm)}, ${round(pose.yCm)}) cm \xB7 heading ${round(pose.headingDeg)}\xB0`
    );
    sample(true);
  }
  const target = course.targets[targetIndex] ?? course.targets[0];
  const error = distance(pose, target), angleError = Math.min(
    normalizeHeading(pose.headingDeg - target.headingDeg),
    normalizeHeading(target.headingDeg - pose.headingDeg)
  );
  const completedMission = !halted && error <= course.toleranceCm && (!course.headingToleranceDeg || angleError <= course.headingToleranceDeg) && delivered.size === course.packages.length && checkpoints.size === course.checkpoints.length && traveled + 1e-3 >= (challenge.minimumDistance ?? 0);
  if (!completedMission && !halted)
    stoppedReason = delivered.size < course.packages.length ? "Some packages were not delivered" : checkpoints.size < course.checkpoints.length ? "A checkpoint was missed" : traveled < (challenge.minimumDistance ?? 0) ? "The required route is not complete" : course.headingToleranceDeg && angleError > course.headingToleranceDeg ? `Final heading is ${round(angleError)}\xB0 from the required direction` : `Stopped ${round(error)} cm from the target`;
  if (completedMission) stoppedReason = "Mission complete";
  const accuracy = [
    [prediction.distance, traveled],
    [prediction.turns, degrees],
    [prediction.seconds, seconds],
    [prediction.battery, battery]
  ].reduce((sum, [value, actual]) => {
    const predicted = Number(value);
    return sum + (value.trim() && Number.isFinite(predicted) && predicted >= 0 ? Math.max(0, 1 - Math.abs(predicted - actual) / Math.max(actual, 1)) : 0);
  }, 0) / 4;
  const scoreParts = {
    delivery: course.packages.length ? delivered.size / course.packages.length : completedMission ? 1 : 0,
    navigation: Math.max(0, 1 - error / Math.max(25, course.toleranceCm * 10)),
    efficiency: completedMission ? Math.max(0, 1 - battery / capacity) : 0,
    reliability: Math.max(0, 1 - collisions * 0.25),
    prediction: accuracy
  };
  const score = Object.entries(scoring).reduce(
    (sum, [key, weight]) => sum + scoreParts[key] * weight,
    0
  );
  return {
    completedMission,
    stoppedReason,
    elapsedSeconds: round(seconds),
    distanceCm: round(traveled),
    totalTurnDegrees: round(degrees),
    collisions,
    deliveriesCompleted: delivered.size,
    checkpointsReached: [...checkpoints],
    batteryUsed: round(battery),
    stoppingErrorCm: round(error),
    commandCount: commands.length,
    score: round(score),
    scoreParts,
    pathSamples: samples,
    events
  };
}

// src/app/templates/programming-automation/runtime/automation-runtime.service.ts
var AutomationRuntimeService = class _AutomationRuntimeService {
  config = inject(AUTOMATION_CONFIG);
  session = inject(AUTOMATION_SESSION);
  sample = inject(AUTOMATION_SAMPLE, { optional: true }) ?? false;
  testingWorkspace = !this.sample && this.session.mode === "preview" && !!this.config.previewWeeks;
  persistence = inject(AUTOMATION_PERSISTENCE);
  timer;
  state = signal(
    this.load(),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCommandId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedCommandId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveStatus = signal(
    "Saved locally",
    ...ngDevMode ? [{ debugName: "saveStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  challenge = computed(
    () => this.config.challenges.find((item) => item.id === this.state().selectedChallengeId),
    ...ngDevMode ? [{ debugName: "challenge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  course = computed(
    () => this.config.courses.find((item) => item.id === this.challenge().courseId),
    ...ngDevMode ? [{ debugName: "course" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = computed(
    () => this.state().drafts[this.challenge().id],
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCommand = computed(
    () => allCommands(this.draft().program.commands).find((item) => item.id === this.selectedCommandId()),
    ...ngDevMode ? [{ debugName: "selectedCommand" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isChampionship = computed(
    () => this.challenge().id === this.config.championshipChallengeId,
    ...ngDevMode ? [{ debugName: "isChampionship" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canControl = computed(
    () => !this.sample && (this.session.mode === "preview" || this.session.permissions.includes("automation.championship.manage")),
    ...ngDevMode ? [{ debugName: "canControl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canEdit = computed(
    () => !this.sample && (this.testingWorkspace || !this.draft().lockedVersionId && !(this.isChampionship() && this.state().championship.finalized)),
    ...ngDevMode ? [{ debugName: "canEdit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compiled = computed(
    () => compileProgram(this.draft().program, this.config.robot, this.challenge(), this.state().math),
    ...ngDevMode ? [{ debugName: "compiled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentTrials = computed(
    () => this.state().trials.filter((trial) => trial.challengeId === this.challenge().id),
    ...ngDevMode ? [{ debugName: "currentTrials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observedTrial = computed(
    () => this.currentTrials().find((trial) => trial.id === this.draft().observedTrialId && trial.mode === "practice"),
    ...ngDevMode ? [{ debugName: "observedTrial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoningOpened = computed(
    () => this.sample || !!this.draft().reasoningOpened || !!this.draft().completedAt || !!this.draft().lockedVersionId,
    ...ngDevMode ? [{ debugName: "reasoningOpened" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observeTrial(id) {
    if (this.sample || this.observedTrial() || !this.currentTrials().some((trial) => trial.id === id && trial.mode === "practice"))
      return;
    this.updateDraft({ observedTrialId: id });
    this.flush();
  }
  openReasoning() {
    if (!this.observedTrial() || this.reasoningOpened())
      return;
    this.updateDraft({ reasoningOpened: true });
    this.flush();
  }
  standings = computed(
    () => this.state().trials.filter((trial) => trial.mode === "championship" && !trial.technicalInvalidReason && this.state().championship.queue.includes(trial.version.id)).sort((a, b) => b.score - a.score || a.elapsedSeconds - b.elapsedSeconds),
    ...ngDevMode ? [{ debugName: "standings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mastery = computed(
    () => mathTools.map((tool) => ({
      title: tool.title,
      achieved: this.state().math.some((item) => item.studentId === this.session.actorId && item.tool === tool.id && evidenceIsCorrect(item))
    })),
    ...ngDevMode ? [{ debugName: "mastery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readiness = computed(
    () => {
      const problems = compileProgram(this.draft().program, this.config.robot, this.challenge(), this.state().math, true).issues.filter((issue) => issue.severity === "error").map((issue) => issue.message);
      if (!this.currentTrials().some((trial) => trial.mode === "practice" && trial.completedMission && trial.version.program.version === this.draft().program.version && trial.version.targetIndex === this.draft().targetIndex))
        problems.push("Complete a successful practice run with this version.");
      if (this.draft().reflection.trim().length < 20)
        problems.push("Explain your testing or debugging evidence in at least 20 characters.");
      if (this.isChampionship()) {
        const prediction = this.draft().prediction;
        if (prediction.route.trim().length < 15)
          problems.push("Describe your planned route.");
        if ([prediction.distance, prediction.turns, prediction.seconds, prediction.battery].some((value) => !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0))
          problems.push("Enter all four numerical predictions.");
      }
      return [...new Set(problems)];
    },
    ...ngDevMode ? [{ debugName: "readiness" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    validateAutomationConfig(this.config);
  }
  ngOnDestroy() {
    this.flush();
  }
  selectChallenge(id) {
    const next = this.config.challenges.find((item) => item.id === id);
    if (!next)
      return;
    if (!this.testingWorkspace && id === this.config.championshipChallengeId && !this.state().championship.revealed) {
      this.message.set("Reveal the championship course using the rehearsal controls.");
      return;
    }
    this.flush();
    this.patch({ selectedChallengeId: id });
    this.selectedCommandId.set("");
    this.message.set("");
    this.flush();
  }
  setTarget(index) {
    if (!this.canEdit() || !this.course().targets[index])
      return;
    this.updateDraft({ targetIndex: index, completedAt: void 0 });
  }
  selectCommand(id) {
    this.selectedCommandId.set(id);
  }
  setCommands(commands) {
    if (!this.canEdit())
      return;
    this.updateProgram({ commands });
  }
  addCommand(type, parentId) {
    if (!this.canEdit() || !this.challenge().allowedCommands.includes(type))
      return;
    const command = __spreadValues(__spreadValues(__spreadProps(__spreadValues({
      id: crypto.randomUUID(),
      type,
      value: type === "repeat" ? "2" : ""
    }, isMoveCommand(type) && this.challenge().moveMath?.[type] ? { moveMath: __spreadValues({}, this.challenge().moveMath[type]) } : {}), {
      direction: "right"
    }), type === "repeat" ? { commands: [] } : {}), type === "pick-up" || type === "drop-off" ? { packageId: this.course().packages[0]?.id } : {});
    const commands = parentId ? transformCommands(this.draft().program.commands, parentId, (parent) => [
      __spreadProps(__spreadValues({}, parent), { commands: [...parent.commands ?? [], command] })
    ]) : [...this.draft().program.commands, command];
    this.setCommands(commands);
    this.selectedCommandId.set(command.id);
  }
  editCommand(id, patch) {
    this.setCommands(transformCommands(this.draft().program.commands, id, (command) => [__spreadValues(__spreadValues({}, command), patch)]));
  }
  updateVariables(variables) {
    if (this.canEdit())
      this.updateProgram({ variables });
  }
  linkEvidence(evidenceId) {
    const command = this.selectedCommand();
    if (command)
      this.editCommand(command.id, { mathEvidenceId: evidenceId });
  }
  saveEvidence(evidence) {
    if (this.sample)
      return;
    this.patch({ math: [...this.state().math, evidence] });
    this.flush();
  }
  updateDraft(patch) {
    if (!this.canEdit())
      return;
    const id = this.challenge().id;
    this.patch({ drafts: __spreadProps(__spreadValues({}, this.state().drafts), { [id]: __spreadValues(__spreadValues({}, this.draft()), patch) }) });
  }
  updatePrediction(key, value) {
    this.updateDraft({ prediction: __spreadProps(__spreadValues({}, this.draft().prediction), { [key]: value }) });
  }
  updateCalibration(key, value) {
    if (!this.sample)
      this.patch({ [key]: value });
  }
  runPractice() {
    if (this.sample)
      return;
    if (!this.testingWorkspace && this.isChampionship() && (this.state().championship.finalized || !this.state().championship.practiceOpen || this.state().championship.practiceLimit > 0 && this.currentTrials().filter((trial) => trial.mode === "practice").length >= this.state().championship.practiceLimit)) {
      this.message.set("The championship practice window is closed or the attempt limit is reached.");
      return;
    }
    if (this.compiled().issues.some((issue) => issue.severity === "error")) {
      this.message.set("Fix the command errors before running.");
      return;
    }
    return this.runVersion(this.captureVersion(), "practice");
  }
  completeChallenge() {
    if (this.readiness().length || !this.canEdit())
      return;
    this.updateDraft({ completedAt: (/* @__PURE__ */ new Date()).toISOString() });
    this.message.set("Mission evidence saved. Choose the next challenge when you are ready.");
    this.flush();
  }
  lockProgram() {
    if (this.sample || !this.isChampionship() || this.readiness().length || this.draft().lockedVersionId || this.state().championship.finalized)
      return false;
    const version = this.captureVersion();
    this.patch({
      versions: [...this.state().versions, version],
      drafts: __spreadProps(__spreadValues({}, this.state().drafts), {
        [this.challenge().id]: __spreadProps(__spreadValues({}, this.draft()), { lockedVersionId: version.id })
      }),
      championship: __spreadProps(__spreadValues({}, this.state().championship), {
        queue: [...this.state().championship.queue, version.id]
      })
    });
    this.audit("program.locked", "Student confirmed the championship version.");
    this.flush();
    return true;
  }
  launchNext() {
    if (!this.canControl() || this.state().championship.paused || this.state().championship.finalized)
      return;
    const id = this.state().championship.queue.find((id2) => !this.state().trials.some((trial) => trial.version.id === id2 && trial.mode === "championship" && !trial.technicalInvalidReason));
    const version = this.state().versions.find((item) => item.id === id);
    if (!version) {
      this.message.set("No locked program is waiting in the queue.");
      return;
    }
    return this.runVersion(version, "championship");
  }
  control(patch) {
    if (!this.canControl() || this.state().championship.finalized)
      return;
    const _a = patch, { queue: ignored } = _a, settings = __objRest(_a, ["queue"]);
    void ignored;
    if (settings.practiceLimit !== void 0 && (!Number.isInteger(settings.practiceLimit) || settings.practiceLimit < 0 || settings.practiceLimit > 100))
      return;
    this.patch({ championship: __spreadValues(__spreadValues({}, this.state().championship), settings) });
    this.audit("championship.settings", "Rehearsal settings updated.");
    this.flush();
  }
  unlock(versionId, reason) {
    if (!this.canControl() || reason.trim().length < 8 || this.state().championship.finalized)
      return;
    const version = this.state().versions.find((item) => item.id === versionId);
    if (!version)
      return;
    this.patch({
      drafts: __spreadProps(__spreadValues({}, this.state().drafts), {
        [version.challengeId]: __spreadProps(__spreadValues({}, this.state().drafts[version.challengeId]), {
          lockedVersionId: void 0
        })
      }),
      championship: __spreadProps(__spreadValues({}, this.state().championship), {
        queue: this.state().championship.queue.filter((id) => id !== versionId)
      })
    });
    this.audit("program.unlocked", reason);
    this.flush();
  }
  technicalRerun(trialId, reason) {
    if (!this.canControl() || reason.trim().length < 8 || this.state().championship.finalized)
      return;
    this.patch({
      trials: this.state().trials.map((trial) => trial.id === trialId && trial.mode === "championship" ? __spreadProps(__spreadValues({}, trial), { technicalInvalidReason: reason }) : trial)
    });
    this.audit("run.technical-invalid", reason);
    this.flush();
  }
  flush() {
    if (this.timer)
      clearTimeout(this.timer);
    if (this.sample)
      return;
    try {
      this.persistence.save(this.state());
      this.saveStatus.set("Saved locally");
    } catch (error) {
      this.saveStatus.set("Save failed \u2014 keep this page open");
      this.message.set(error instanceof Error ? error.message : "Export your portfolio before leaving this page.");
    }
  }
  updateProgram(patch) {
    this.updateDraft({
      completedAt: void 0,
      program: __spreadProps(__spreadValues(__spreadValues({}, this.draft().program), patch), { version: this.draft().program.version + 1 })
    });
  }
  captureVersion() {
    return structuredClone({
      id: crypto.randomUUID(),
      ownerId: this.session.actorId,
      ownerName: this.session.actorDisplayName,
      challengeId: this.challenge().id,
      targetIndex: this.draft().targetIndex,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      program: this.draft().program,
      math: this.state().math,
      prediction: this.draft().prediction,
      robot: this.config.robot,
      course: this.course()
    });
  }
  runVersion(version, mode) {
    const challenge = this.config.challenges.find((item) => item.id === version.challengeId);
    const compiled = compileProgram(version.program, version.robot, challenge, version.math, mode === "championship");
    if (compiled.issues.some((issue) => issue.severity === "error")) {
      this.message.set("This program version did not pass validation.");
      return;
    }
    const result = executeRobot(compiled.commands, version.course, version.robot, challenge, version.targetIndex, version.prediction, this.config.scoring);
    const trial = __spreadProps(__spreadValues({}, result), {
      id: crypto.randomUUID(),
      challengeId: version.challengeId,
      version,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      mode
    });
    this.patch({ trials: [...this.state().trials, trial] });
    this.message.set("Run recorded. Watch the robot, then review what happened.");
    this.flush();
    return trial;
  }
  audit(action, reason) {
    this.patch({
      audit: [
        ...this.state().audit,
        { id: crypto.randomUUID(), action, reason, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      ]
    });
  }
  patch(patch) {
    this.state.update((state) => __spreadProps(__spreadValues(__spreadValues({}, state), patch), { revision: state.revision + 1 }));
    if (this.sample)
      return;
    this.saveStatus.set("Saving\u2026");
    if (this.timer)
      clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 600);
  }
  load() {
    try {
      const saved = this.persistence.load();
      if (isAutomationState(saved) && saved.projectId === this.config.projectId && saved.projectVersion === this.config.projectVersion && this.config.challenges.some((c) => c.id === saved.selectedChallengeId) && this.config.challenges.every((challenge) => {
        const draft = saved.drafts[challenge.id];
        return !draft || this.config.courses.find((c) => c.id === challenge.courseId)?.targets[draft.targetIndex];
      }))
        return __spreadProps(__spreadValues({}, saved), {
          drafts: Object.fromEntries(Object.entries(__spreadValues(__spreadValues({}, initialAutomationState(this.config).drafts), saved.drafts)).map(([id, draft]) => {
            const starter = this.config.challenges.find((c) => c.id === id)?.discovery?.starterCommands;
            const untouched = draft.program.version === 0 && !draft.program.commands.length && !draft.program.variables.length && !draft.completedAt && !draft.lockedVersionId && !draft.reflection && !draft.diagnosis && !Object.values(draft.prediction).some(Boolean) && !saved.trials.some((trial) => trial.challengeId === id);
            const commands = starter && untouched ? structuredClone(starter) : draft.program.commands;
            const prepared = this.sample || draft.completedAt || draft.lockedVersionId ? commands : prepareMoveMathCommands(commands, this.config.challenges.find((c) => c.id === id)?.moveMath);
            return [id, __spreadProps(__spreadValues({}, draft), { program: __spreadProps(__spreadValues({}, draft.program), { commands: prepared }) })];
          }))
        });
    } catch {
    }
    return initialAutomationState(this.config);
  }
  static \u0275fac = function AutomationRuntimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutomationRuntimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AutomationRuntimeService, factory: _AutomationRuntimeService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutomationRuntimeService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  mathTools,
  calculate,
  expectedMath,
  evidenceIsCorrect,
  decimalAndFraction,
  moveMathOperations,
  commandExpression,
  prepareMoveMathCommands,
  allCommands,
  compileProgram,
  initialAutomationState,
  transformCommands,
  validateAutomationConfig,
  AUTOMATION_CONFIG,
  AUTOMATION_SESSION,
  AUTOMATION_SAMPLE,
  AUTOMATION_PERSISTENCE,
  BrowserAutomationPersistence,
  executeRobot,
  AutomationRuntimeService
};
//# debugId=e3185481-d347-5ab3-843f-da0f312b8bbd
//# sourceMappingURL=chunk-IORUS3HC.js.map
