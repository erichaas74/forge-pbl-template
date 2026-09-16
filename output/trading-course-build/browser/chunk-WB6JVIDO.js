import {
  BalanceMetalwork,
  RoomEnvironment
} from "./chunk-KI3SHDPD.js";
import {
  ACESFilmicToneMapping,
  DirectionalLight,
  HemisphereLight,
  OrthographicCamera,
  PCFSoftShadowMap,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  Vector3,
  WebGLRenderer
} from "./chunk-E3MFW572.js";

// src/app/templates/heist/escape/locks/diorama-viewer.ts
var DioramaViewer = class {
  constructor(root, name, focuses, onLost) {
    this.root = root;
    this.name = name;
    this.focuses = focuses;
    this.viewport = root.querySelector("[data-viewport]");
    this.renderer = new WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
    this.renderer.setClearColor(1912891);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute("role", "img");
    this.viewport.append(this.canvas);
    const room = new RoomEnvironment(), pmrem = new PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(room, 0.025);
    room.dispose();
    pmrem.dispose();
    this.scene.environment = this.environment.texture;
    this.scene.environmentIntensity = 0.55;
    this.scene.add(new HemisphereLight(13953518, 4934713, 1.65));
    this.sun.position.set(-7, 13, 11);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, {
      left: -16,
      right: 16,
      top: 15,
      bottom: -11,
      near: 0.1,
      far: 45
    });
    this.sun.shadow.bias = -3e-4;
    this.sun.shadow.normalBias = 0.025;
    this.scene.add(this.sun);
    const rim = new DirectionalLight(9354954, 1.7);
    rim.position.set(8, 10, -4);
    this.scene.add(rim);
    this.focus = this.viewport.clientWidth < 650 ? "drive" : "all";
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.viewport);
    document.addEventListener("keydown", this.key);
    this.contextLost = (event) => {
      event.preventDefault();
      onLost();
    };
    this.canvas.addEventListener("webglcontextlost", this.contextLost);
    this.setFocus(this.focus);
    this.resize();
  }
  root;
  name;
  focuses;
  art = new BalanceMetalwork();
  scene = new Scene();
  camera = new OrthographicCamera(-12, 12, 6, -6, 0.1, 90);
  renderer;
  canvas;
  viewport;
  focus;
  expanded = false;
  observer;
  environment;
  sun = new DirectionalLight(16768940, 3.1);
  center = new Vector3(0, 4.5, 1.2);
  width = 25;
  gone = false;
  oldOverflow = "";
  oldFocus = null;
  contextLost;
  setFocus(value) {
    if (!this.focuses[value]) return;
    this.focus = value;
    this.root.querySelectorAll("[data-focus]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["focus"] === value)));
  }
  expand(value) {
    this.expanded = value;
    if (value) {
      this.oldOverflow = document.body.style.overflow;
      this.oldFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = "hidden";
      this.root.setAttribute("role", "dialog");
      this.root.setAttribute("aria-modal", "true");
      this.root.setAttribute("aria-label", `Expanded ${this.name} workshop`);
    } else {
      document.body.style.overflow = this.oldOverflow;
      this.root.removeAttribute("role");
      this.root.removeAttribute("aria-modal");
      this.root.removeAttribute("aria-label");
    }
    this.root.classList.toggle("diorama-expanded", value);
    const button = this.root.querySelector("[data-action=expand]");
    button.textContent = value ? "Close" : "Expand";
    button.setAttribute(
      "aria-label",
      `${value ? "Close expanded" : "Expand"} ${this.name} workshop`
    );
    this.resize();
    if (value) button.focus();
    else this.oldFocus?.focus({ preventScroll: true });
  }
  key = (event) => {
    if (!this.expanded && !this.root.contains(document.activeElement)) return;
    if (event.key === "Escape") {
      if (this.expanded) this.expand(false);
    }
    if (this.expanded && event.key === "Tab") {
      const list = Array.from(
        this.root.querySelectorAll(
          "button:not(:disabled),input,select:not(:disabled),a"
        )
      ).filter((e) => e.getClientRects().length);
      if (!this.root.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? list.at(-1) : list[0])?.focus();
      } else if (event.shiftKey && document.activeElement === list[0]) {
        event.preventDefault();
        list.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === list.at(-1)) {
        event.preventDefault();
        list[0]?.focus();
      }
    }
  };
  resize() {
    if (this.gone || !this.viewport.clientWidth || !this.viewport.clientHeight) return;
    this.renderer.setSize(this.viewport.clientWidth, this.viewport.clientHeight, false);
    this.cameraPose(1);
  }
  cameraPose(blend) {
    const target = this.focuses[this.focus], aspect = Math.max(0.3, this.viewport.clientWidth / Math.max(1, this.viewport.clientHeight));
    this.center.lerp(new Vector3(...target.center), blend);
    this.width += (target.width - this.width) * blend;
    const height = Math.max(target.height, this.width / aspect);
    this.camera.left = -height * aspect / 2;
    this.camera.right = height * aspect / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.position.copy(this.center).add(new Vector3(0.8, 6.7, 27));
    this.camera.lookAt(this.center);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }
  render(dt, reduced) {
    this.cameraPose(reduced ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 4));
    this.renderer.render(this.scene, this.camera);
  }
  label(element, point) {
    point.project(this.camera);
    const w = this.viewport.clientWidth, h = this.viewport.clientHeight, x = (point.x + 1) * w / 2, y = (1 - point.y) * h / 2;
    element.hidden = x < 25 || x > w - 25 || y < 60 || y > h - 58;
    element.style.left = `${Math.max(65, Math.min(w - 65, x))}px`;
    element.style.top = `${y}px`;
  }
  destroy() {
    if (this.gone) return;
    if (this.expanded) this.expand(false);
    this.gone = true;
    this.observer.disconnect();
    document.removeEventListener("keydown", this.key);
    this.canvas.removeEventListener("webglcontextlost", this.contextLost);
    this.environment.dispose();
    this.sun.shadow.dispose();
    this.art.dispose();
    this.renderer.dispose();
  }
};

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.sound.ts
var TimingCageSound = class {
  context;
  enabled = true;
  gone = false;
  nodes = /* @__PURE__ */ new Set();
  unlock() {
    if (!this.enabled || this.gone) return;
    try {
      this.context ??= new AudioContext();
      void this.context.resume().catch(() => {
      });
    } catch {
    }
  }
  play(kind) {
    const ctx = this.context;
    if (!ctx || ctx.state !== "running" || !this.enabled || this.gone) return;
    const frequencies = { tick: 850, latch: 260, door: 95, step: 150, free: 660 };
    const seconds = kind === "free" ? 0.35 : kind === "door" ? 0.3 : 0.075;
    const tone = ctx.createOscillator(), gain = ctx.createGain();
    tone.type = kind === "free" ? "sine" : "triangle";
    tone.frequency.setValueAtTime(frequencies[kind], ctx.currentTime);
    tone.frequency.exponentialRampToValueAtTime(frequencies[kind] * 0.5, ctx.currentTime + seconds);
    gain.gain.setValueAtTime(kind === "step" ? 0.018 : 0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + seconds);
    tone.connect(gain);
    gain.connect(ctx.destination);
    this.nodes.add(tone);
    tone.onended = () => {
      tone.disconnect();
      gain.disconnect();
      this.nodes.delete(tone);
    };
    tone.start();
    tone.stop(ctx.currentTime + seconds);
  }
  suspend() {
    if (this.context?.state === "running") void this.context.suspend().catch(() => {
    });
  }
  resume() {
    if (this.context?.state === "suspended" && this.enabled)
      void this.context.resume().catch(() => {
      });
  }
  destroy() {
    this.gone = true;
    this.nodes.forEach((node) => {
      try {
        node.stop();
      } catch {
      }
    });
    this.nodes.clear();
    if (this.context) void this.context.close().catch(() => {
    });
  }
};

export {
  DioramaViewer,
  TimingCageSound
};
//# debugId=206dff52-084c-5140-ad80-cf829ce0d582
//# sourceMappingURL=chunk-WB6JVIDO.js.map
