import "./chunk-GOMI4DH3.js";

// src/app/templates/time-repair/invention/knowledge/distribution.scene.ts
async function mountKnowledgeTown(host, config, initial, act) {
  const Phaser = (await import("./chunk-ZHGWQKIX.js")).default;
  let current = initial;
  const motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  class Town extends Phaser.Scene {
    art;
    courier;
    cargo;
    objects = [];
    lastPlace = "";
    ready = false;
    create() {
      this.ready = true;
      this.paint();
    }
    refresh() {
      if (this.ready) this.paint();
    }
    text(x, y, value, size = 18, color = "#f0dfb5") {
      this.objects.push(
        this.add.text(x, y, value, { fontFamily: "Georgia", fontSize: size, color }).setOrigin(0.5)
      );
    }
    click(x, y, w, h, action) {
      const zone = this.add.zone(x, y, w, h).setInteractive({ useHandCursor: true });
      const ring = this.add.rectangle(x, y, w, h, 13888199, 0).setStrokeStyle(3, 16179103, 0);
      zone.on("pointerover", () => ring.setStrokeStyle(3, 16179103, 0.9));
      zone.on("pointerout", () => ring.setStrokeStyle(3, 16179103, 0));
      zone.on("pointerdown", () => act(action));
      this.objects.push(zone, ring);
    }
    book(g, x, y, scale = 1) {
      g.fillStyle(4078125).fillRect(x + 2, y + 4, 28 * scale, 34 * scale);
      g.fillStyle(15259048).fillRect(x, y, 28 * scale, 34 * scale);
      g.lineStyle(2, 5465680).lineBetween(x + 6, y + 10, x + 22 * scale, y + 10).lineBetween(x + 6, y + 17, x + 22 * scale, y + 17).lineBetween(x + 6, y + 24, x + 18 * scale, y + 24);
    }
    person(g, x, y, color, small = 1) {
      g.fillStyle(1519152, 0.3).fillEllipse(x, y + 30 * small, 44 * small, 11 * small);
      g.lineStyle(8 * small, 4998968).lineBetween(x - 8 * small, y + 10 * small, x - 9 * small, y + 26 * small).lineBetween(x + 8 * small, y + 10 * small, x + 9 * small, y + 26 * small);
      g.fillStyle(color).fillRoundedRect(
        x - 18 * small,
        y - 15 * small,
        36 * small,
        35 * small,
        7 * small
      );
      g.fillStyle(13805949).fillCircle(x, y - 29 * small, 13 * small);
      g.fillStyle(6181184).fillEllipse(x, y - 40 * small, 29 * small, 12 * small);
    }
    paint() {
      this.art?.destroy();
      this.objects.forEach((o) => o.destroy());
      this.objects = [];
      const g = this.add.graphics().setDepth(-1);
      this.art = g;
      g.fillStyle(2574399).fillRect(0, 0, 1e3, 660);
      g.fillStyle(3955527).fillPoints(
        [
          { x: 0, y: 0 },
          { x: 580, y: 0 },
          { x: 470, y: 660 },
          { x: 0, y: 660 }
        ].map((p) => new Phaser.Math.Vector2(p.x, p.y)),
        true
      );
      g.fillStyle(2576214).fillPoints(
        [
          { x: 570, y: 0 },
          { x: 650, y: 0 },
          { x: 610, y: 230 },
          { x: 556, y: 433 },
          { x: 565, y: 660 },
          { x: 439, y: 660 },
          { x: 462, y: 410 },
          { x: 532, y: 200 }
        ].map((p) => new Phaser.Math.Vector2(p.x, p.y)),
        true
      );
      for (let i = 0; i < 30; i++) {
        const y = i * 24;
        g.lineStyle(2, 9153692, 0.23).lineBetween(
          540 - Math.sin(i / 7) * 40,
          y,
          577 - Math.sin(i / 7) * 40,
          y - 3
        );
      }
      for (let i = 0; i < 35; i++) {
        const x = (i * 233 + 25) % 1e3, y = (i * 173 + 75) % 660;
        g.fillStyle(1060656, 0.13).fillEllipse(x, y, 35, 14);
      }
      for (const p of config.places)
        for (const link of p.links) {
          const q = config.places.find((v) => v.id === link);
          if (p.id > q.id) continue;
          g.lineStyle(33, 2112052, 0.5).lineBetween(p.x, p.y + 30, q.x, q.y + 30);
          g.lineStyle(24, 12034681).lineBetween(p.x, p.y + 25, q.x, q.y + 25);
          g.lineStyle(2, 14074779, 0.55).lineBetween(p.x - 4, p.y + 20, q.x - 4, q.y + 20);
        }
      g.fillStyle(9072975).fillRect(447, 395, 116, 68);
      for (let x = 449; x < 560; x += 13) g.lineStyle(2, 5984316).lineBetween(x, 397, x, 462);
      g.lineStyle(6, 13086070).lineBetween(446, 395, 563, 395).lineBetween(446, 461, 563, 461);
      for (const p of config.places) {
        if (p.id !== "bridge") {
          const x = p.x - 82, y = p.y - 114;
          g.fillStyle(1322539, 0.45).fillEllipse(p.x + 20, p.y + 31, 225, 55);
          g.fillStyle(12037507).fillRect(x, y + 26, 158, 116);
          g.fillStyle(7760977).fillPoints(
            [
              { x: x + 158, y: y + 26 },
              { x: x + 188, y: y + 48 },
              { x: x + 188, y: y + 142 },
              { x: x + 158, y: y + 142 }
            ].map((p2) => new Phaser.Math.Vector2(p2.x, p2.y)),
            true
          );
          g.fillStyle(8806730).fillTriangle(x - 12, y + 28, x + 80, y - 39, x + 170, y + 28);
          g.fillStyle(10517332).fillTriangle(x + 80, y - 39, x + 170, y + 28, x + 200, y + 49);
          g.lineStyle(6, 6050107).strokeRect(x, y + 26, 158, 116).lineBetween(x + 78, y + 28, x + 78, y + 137).lineBetween(x, y + 81, x + 158, y + 81);
          g.fillStyle(1915448).fillRect(x + 12, y + 43, 132, 78);
          g.fillStyle(11241816).fillRect(x + 6, y + 115, 146, 12);
          const supplied = (current.values["delivered-" + p.id] ?? 0) > 0;
          if (p.id === "workshop") {
            g.lineStyle(7, 12952686).strokeRect(x + 36, y + 48, 62, 60).lineBetween(x + 66, y + 43, x + 66, y + 98).lineBetween(x + 42, y + 98, x + 92, y + 98);
          } else {
            this.person(g, x + 111, y + 86, supplied ? 8563603 : 7635306, 0.7);
            if (supplied) {
              this.book(g, x + 24, y + 82, 0.8);
              if (p.id === "school")
                g.lineStyle(4, 14534542).strokeTriangle(
                  x + 48,
                  y + 78,
                  x + 68,
                  y + 42,
                  x + 86,
                  y + 78
                );
              else if (p.id === "bookseller")
                for (let b = 0; b < 3; b++) this.book(g, x + 18 + b * 24, y + 54, 0.55);
              else {
                g.lineStyle(3, 14271374).lineBetween(x + 20, y + 59, x + 64, y + 59).lineBetween(x + 20, y + 71, x + 64, y + 71);
                this.book(g, x + 22, y + 38, 0.7);
              }
              g.fillStyle(15259301, 0.13).fillEllipse(p.x, p.y - 27, 166, 115);
            } else {
              g.lineStyle(2, 12758144, 0.5).strokeRect(x + 24, y + 78, 31, 33);
            }
          }
          this.text(p.x, p.y - 126, p.name, 18);
        }
        const here = p.id === current.selected;
        g.lineStyle(here ? 4 : 2, here ? 10806467 : 15059346, here ? 1 : 0.6).strokeEllipse(
          p.x,
          p.y + 44,
          62,
          30
        );
        this.click(p.x, p.y + 20, 158, 94, { type: "move", target: p.id });
      }
      const workshop = config.places[0];
      for (let i = 0; i < current.values["stock"]; i++)
        this.book(g, workshop.x - 122 + i * 9, workshop.y + 78 - i * 4, 0.85);
      this.text(workshop.x - 88, workshop.y + 135, "Load", 18);
      this.click(workshop.x - 88, workshop.y + 98, 105, 89, { type: "load" });
      const place = config.places.find((p) => p.id === current.selected);
      if (!this.courier) {
        this.courier = this.add.container(place.x, place.y + 54).setDepth(4);
        const figure = this.add.graphics();
        this.person(figure, 0, 0, 12816993, 0.85);
        this.courier.add(figure);
        this.cargo = this.add.graphics();
        this.courier.add(this.cargo);
      }
      if (this.lastPlace !== place.id) {
        this.tweens.killTweensOf(this.courier);
        if (this.lastPlace && motion)
          this.tweens.add({
            targets: this.courier,
            x: place.x,
            y: place.y + 54,
            duration: 650,
            ease: "Sine.easeInOut"
          });
        else this.courier.setPosition(place.x, place.y + 54);
        this.lastPlace = place.id;
      }
      this.cargo.clear();
      for (let i = 0; i < current.values["bag"]; i++) this.book(this.cargo, 23 + i * 10, 3, 0.6);
      this.text(place.x, place.y + 126, "Hand over", 16);
      this.click(place.x, place.y + 116, 126, 43, { type: "deliver" });
      g.fillStyle(1522740).fillEllipse(57, 589, 220, 92).fillEllipse(892, 605, 312, 137);
      for (let i = 0; i < 12; i++) {
        const x = 15 + i * 84;
        g.fillStyle(6584652).fillEllipse(x, 637, 67, 55);
        g.fillStyle(2112816, 0.5).fillEllipse(x + 5, 650, 60, 21);
      }
    }
  }
  const scene = new Town("knowledge-town");
  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent: host,
    width: 1e3,
    height: 660,
    backgroundColor: "#27483f",
    scene: [scene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true },
    audio: { noAudio: true },
    banner: false
  });
  return {
    refresh(state) {
      current = state;
      scene.refresh();
    },
    destroy() {
      game.destroy(true);
    }
  };
}
export {
  mountKnowledgeTown
};
//# debugId=c517b20b-185e-5b77-a022-3536e21b14b6
//# sourceMappingURL=chunk-C4LTVRAI.js.map
