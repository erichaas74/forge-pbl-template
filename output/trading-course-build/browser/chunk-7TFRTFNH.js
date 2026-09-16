import {
  __webpack_exports__AUTO,
  __webpack_exports__Game,
  __webpack_exports__Scale,
  __webpack_exports__Scene
} from "./chunk-DKBEUOCQ.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/heist/gallery/game/gallery-scene.ts
function mountGallery(parent, mission, view, inspect, ready, fail) {
  let disposed = false;
  class GalleryScene extends __webpack_exports__Scene {
    images = [];
    leaves = [];
    seals = [];
    details = [];
    labels = [];
    pawn;
    arm;
    cargo;
    path;
    lastChamber = "";
    lastState = "";
    lastAngle = Number.NaN;
    lastLoad = Number.NaN;
    lastDistance = Number.NaN;
    constructor() {
      super("academic-gallery");
    }
    preload() {
      this.load.image("gallery-room", mission.environment);
      for (const path of new Set(mission.chambers.flatMap((c) => c.paintings.map((p) => p.image)))) this.load.image(path, path);
      this.load.on("loaderror", () => fail("Some gallery artwork could not load. Reload the artwork to continue."));
    }
    create() {
      if (disposed) return;
      if (!this.textures.exists("gallery-room") || mission.chambers.some((c) => c.paintings.some((p) => !this.textures.exists(p.image)))) return;
      this.add.image(768, 512, "gallery-room").setDisplaySize(1536, 1024);
      this.add.rectangle(768, 512, 1536, 1024, 465946, 0.14);
      for (const path of new Set(mission.chambers.flatMap((c) => c.paintings.map((p) => p.image)))) {
        const texture = this.textures.get(path), source = texture.getSourceImage();
        const sizeX = source.width / 3, sizeY = source.height / 3;
        for (let frame = 0; frame < 9; frame++) texture.add(frame, 0, frame % 3 * sizeX, Math.floor(frame / 3) * sizeY, sizeX, sizeY);
      }
      const xs = [350, 769, 1188];
      for (let i = 0; i < 3; i++) {
        const x = xs[i];
        this.images.push(this.add.image(x, 258, mission.chambers[0].paintings[0].image, 0).setDisplaySize(245, 247).setInteractive({ useHandCursor: true }).on("pointerup", () => inspect(this.current().paintings[i].id)));
        this.add.rectangle(x, 340, 242, 80, 1059880, 0.86);
        this.details.push(this.add.text(x, 315, "", { fontFamily: "Georgia", fontSize: "16px", align: "center", color: "#f4e0ad", wordWrap: { width: 220 } }).setOrigin(0.5, 0));
        this.labels.push(this.add.text(x, 394, "", { fontFamily: "Arial", fontSize: "13px", color: "#efdfb5", backgroundColor: "#152c28", padding: { x: 12, y: 8 } }).setOrigin(0.5));
        this.add.rectangle(x, 564, 151, 219, 532253, 0.92);
        const leaf = this.add.rectangle(x - 72, 454, 144, 218, 3687992).setOrigin(0, 0).setStrokeStyle(4, 10388048);
        this.leaves.push(leaf);
        for (let k = 0; k < 3; k++) this.add.rectangle(x, 482 + k * 69, 131, 4, 12624230, 0.5);
        this.seals.push(this.add.text(x, 557, "SEALED", { fontFamily: "Arial", fontSize: "15px", color: "#e3c98e", backgroundColor: "#172e28", padding: { x: 8, y: 7 } }).setOrigin(0.5));
      }
      this.path = this.add.graphics();
      this.arm = this.add.container(770, 848);
      this.add.circle(770, 848, 48, 1519401, 0.95).setStrokeStyle(3, 12887913);
      this.arm.add(this.add.triangle(0, 0, 0, -41, 10, 10, -10, 10, 15979665));
      this.add.circle(770, 848, 7, 15190924);
      this.arm.setDepth(5);
      this.cargo = this.add.container(918, 848, [this.add.rectangle(0, 0, 52, 30, 9269575).setStrokeStyle(2, 14731145), this.add.circle(-17, 22, 6, 1059620), this.add.circle(17, 22, 6, 1059620)]);
      this.pawn = this.add.container(768, 765, [this.add.ellipse(0, 17, 33, 11, 465945, 0.55), this.add.circle(0, 0, 12, 7443849).setStrokeStyle(3, 14796690), this.add.circle(0, -15, 8, 15061928)]).setDepth(8);
      const resize = () => {
        const camera = this.cameras.main;
        camera.setZoom(Math.min(this.scale.width / 1536, this.scale.height / 1024));
        camera.centerOn(768, 512);
      };
      this.scale.on("resize", resize);
      resize();
      ready();
    }
    current() {
      return mission.chambers.find((c) => c.id === view().snapshot.chamberId);
    }
    update() {
      if (!this.pawn || disposed) return;
      const v = view(), s = v.snapshot, chamber = this.current();
      this.input.enabled = v.interactive;
      const duration = v.reducedMotion ? 0 : 550;
      if (this.lastChamber !== s.chamberId) {
        this.lastChamber = s.chamberId;
        chamber.paintings.forEach((p, i) => {
          this.images[i].setTexture(p.image, p.artFrame);
          this.details[i].setText(p.hotspots[0].label);
          this.labels[i].setText(`PASSAGE ${["I", "II", "III"][i]}  \xB7  INSPECT`);
        });
        if (!v.reducedMotion) this.cameras.main.fadeIn(400, 8, 28, 24);
      }
      const state = JSON.stringify([s.chamberId, s.phase, s.paintingId, s.frauds, s.solved]);
      if (state !== this.lastState) {
        this.lastState = state;
        chamber.paintings.forEach((p, i) => {
          const chosen = p.id === s.paintingId, open = chosen && ["unlocked", "extracted"].includes(s.phase), fraud = s.frauds.includes(p.id);
          this.tweens.killTweensOf(this.leaves[i]);
          this.tweens.add({ targets: this.leaves[i], scaleX: open ? 0.06 : chosen && ["fraud", "recovery"].includes(s.phase) ? 0.72 : 1, duration, ease: "Sine.easeInOut" });
          this.seals[i].setText(fraud ? "FRAUD SEALED" : open ? "PASSAGE OPEN" : chosen ? "MECHANISM" : "SEALED").setColor(fraud ? "#f3bda4" : open ? "#b8edc9" : "#e3c98e");
          this.images[i].setTint(fraud ? 8953234 : 16777215);
        });
        const index = chamber.paintings.findIndex((p) => p.id === s.paintingId);
        this.tweens.killTweensOf(this.pawn);
        this.tweens.add({ targets: this.pawn, x: index < 0 ? 768 : [350, 769, 1188][index], y: s.phase === "unlocked" ? 636 : index < 0 ? 765 : 707, duration: duration * 1.5, ease: "Sine.easeInOut" });
      }
      if (v.previewAngle !== this.lastAngle) {
        this.lastAngle = v.previewAngle;
        this.arm.setAngle(v.previewAngle);
      }
      if (v.previewLoad !== this.lastLoad) {
        this.lastLoad = v.previewLoad;
        this.cargo.setScale(1 + Math.min(v.previewLoad, 300) / 650);
        this.cargo.setY(848 + Math.min(v.previewLoad, 300) / 14);
      }
      if (v.previewDistance !== this.lastDistance) {
        this.lastDistance = v.previewDistance;
        this.path.clear().lineStyle(5, 14993030, 0.8);
        this.path.lineBetween(650, 932, 650 + Math.min(v.previewDistance, 60) * 6, 932);
      }
    }
  }
  const game = new __webpack_exports__Game({ type: __webpack_exports__AUTO, parent, width: Math.max(1, parent.clientWidth), height: Math.max(1, parent.clientHeight), backgroundColor: "#102723", scene: new GalleryScene(), banner: false, audio: { noAudio: true }, fps: { target: 30 }, scale: { mode: __webpack_exports__Scale.RESIZE }, render: { antialias: true } });
  const observer = new ResizeObserver(() => {
    if (!disposed && game.isBooted && parent.clientWidth && parent.clientHeight) game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  observer.observe(parent);
  return { destroy() {
    disposed = true;
    observer.disconnect();
    game.destroy(true);
  } };
}
export {
  mountGallery
};
//# debugId=b6d0307b-5b5d-54de-807d-8ffe10afc9bd
//# sourceMappingURL=chunk-7TFRTFNH.js.map
