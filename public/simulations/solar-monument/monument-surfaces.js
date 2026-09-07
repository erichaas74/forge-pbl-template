/* Original, procedural stonework. Surface relief changes shading only: the
   measured floor stays at y=0 and the ray-tested block silhouettes stay exact. */
(() => {
  window.createMonumentSurfaces = (THREE) => {
    let seed = 4907;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const size = 512, pixels = new Uint8Array(size * size * 4);
    const coarse = Array.from({ length: 32 * 32 }, random);
    const smooth = (x, y) => {
      const ix = Math.floor(x), iy = Math.floor(y), u = x - ix, v = y - iy;
      const at = (a, b) => coarse[((b + 32) % 32) * 32 + (a + 32) % 32];
      const sx = u * u * (3 - 2 * u), sy = v * v * (3 - 2 * v);
      return (at(ix, iy) * (1 - sx) + at(ix + 1, iy) * sx) * (1 - sy) + (at(ix, iy + 1) * (1 - sx) + at(ix + 1, iy + 1) * sx) * sy;
    };
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4, grain = random(), cloud = smooth(x / 16, y / 16);
      const pore = grain < .035 ? .18 : .5 + (grain - .5) * .34;
      pixels[i] = Math.round(255 * (.28 + .45 * cloud + .16 * grain));
      pixels[i + 1] = Math.round(255 * pore);
      pixels[i + 2] = Math.round(255 * cloud);
      pixels[i + 3] = 255;
    }
    const grainMap = new THREE.DataTexture(pixels, size, size);
    grainMap.wrapS = grainMap.wrapT = THREE.RepeatWrapping;
    grainMap.magFilter = THREE.LinearFilter;
    grainMap.minFilter = THREE.LinearMipmapLinearFilter;
    grainMap.generateMipmaps = true;
    grainMap.needsUpdate = true;
    let carvingMap, reflectionMap;
    const glassMaterials = new Set();

    function carving() {
      if (carvingMap) return carvingMap;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 2048;
      const c = canvas.getContext('2d'), unit = 256;
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, 2048, 2048);
      c.translate(1024, 1024); c.scale(unit, unit);
      c.strokeStyle = '#838383'; c.fillStyle = '#838383';
      c.lineCap = 'round'; c.lineJoin = 'round';
      const circle = (r, width = .012) => { c.lineWidth = width; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.stroke(); };
      const line = (x, y, x2, y2, width = .009) => { c.lineWidth = width; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); };
      // Open central stone receives the light; ornament is concentrated at its border.
      [1.48, 1.51, 1.66, 1.69, 2.16, 2.19, 2.72, 2.76, 2.94, 2.99, 3.14].forEach(r => circle(r));
      circle(.26, .006); circle(.29, .006);
      for (let i = 0; i < 8; i++) {
        c.save(); c.rotate(i * Math.PI / 4);
        c.beginPath(); c.moveTo(0, -.75); c.lineTo(.095, -.30); c.lineTo(0, -.36); c.lineTo(-.095, -.30); c.closePath(); c.lineWidth = .006; c.stroke();
        c.restore();
      }
      // Chisel ticks and diamond border: decoration, not a location-specific calendar.
      for (let i = 0; i < 120; i++) {
        c.save(); c.rotate(i * Math.PI / 60);
        line(0, -2.78, 0, i % 5 ? -2.85 : -2.91, i % 5 ? .006 : .012);
        c.restore();
      }
      for (let i = 0; i < 48; i++) {
        c.save(); c.rotate(i * Math.PI / 24);
        c.beginPath(); c.moveTo(0, -1.525); c.lineTo(.065, -1.585); c.lineTo(0, -1.65); c.lineTo(-.065, -1.585); c.closePath(); c.lineWidth = .008; c.stroke();
        c.restore();
      }
      for (let i = 0; i < 16; i++) {
        c.save(); c.rotate(i * Math.PI / 8);
        line(0, -1.71, 0, -2.14, .007);
        line(0, -3.0, 0, -3.135, .018);
        c.restore();
      }
      // Four engraved compass medallions and small Sun rosettes.
      ['N', 'E', 'S', 'W'].forEach((letter, i) => {
        c.save(); c.rotate(i * Math.PI / 2); c.translate(0, -2.47);
        circle(.17, .010); circle(.19, .006);
        c.font = 'bold .23px Georgia'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(letter, 0, .008); c.restore();
      });
      for (let i = 0; i < 4; i++) {
        c.save(); c.rotate(Math.PI / 4 + i * Math.PI / 2); c.translate(0, -2.47);
        circle(.07, .008);
        for (let j = 0; j < 12; j++) { c.rotate(Math.PI / 6); line(0, -.10, 0, -.155, .008); }
        c.restore();
      }
      // A few worn fissures, kept out of the central comparison area.
      c.strokeStyle = '#c8c8c8';
      for (let i = 0; i < 22; i++) {
        c.save(); c.rotate(random() * Math.PI * 2); c.translate(0, 1.85 + random() * 1.4);
        c.beginPath(); c.moveTo(0, 0);
        for (let j = 1; j < 7; j++) c.lineTo((random() - .5) * .035, j * .035);
        c.lineWidth = .005; c.stroke(); c.restore();
      }
      carvingMap = new THREE.CanvasTexture(canvas);
      carvingMap.anisotropy = 4;
      return carvingMap;
    }

    const surfaceGLSL = `
      varying vec3 vMonumentNormal;
      uniform sampler2D monumentGrain;
      uniform sampler2D monumentCarving;
      uniform bool monumentFloor;
      uniform float monumentRelief;
      uniform vec3 monumentHalf;
      varying vec3 vMonumentLocal;
      vec4 monumentStone(vec3 p) {
        vec3 w=pow(abs(vMonumentNormal),vec3(8.0)); w/=max(dot(w,vec3(1.0)),.001);
        return texture2D(monumentGrain,p.yz*2.0)*w.x + texture2D(monumentGrain,p.xz*2.0)*w.y + texture2D(monumentGrain,p.xy*2.0)*w.z;
      }
      float monumentEtching(vec3 p) {
        vec2 uv=vec2(p.x,-p.z)/8.0+.5;
        float bounds=step(0.0,uv.x)*step(uv.x,1.0)*step(0.0,uv.y)*step(uv.y,1.0);
        return mix(1.0,texture2D(monumentCarving,uv).r,bounds);
      }
      float monumentJoint(vec3 p) {
        vec2 tile=abs(fract(p.xz+vec2(.0,mod(floor(p.x),2.0)*.5))-.5);
        float edge=max(tile.x,tile.y);
        float aa=max(fwidth(edge),.001);
        return smoothstep(.495-aa,.498+aa,edge)*smoothstep(3.13,3.19,length(p.xz));
      }
      vec3 monumentBump(vec3 p, vec3 n, float h) {
        vec3 dx=dFdx(p),dy=dFdy(p);
        vec3 rx=cross(dy,n),ry=cross(n,dx);
        float determinant=dot(dx,rx);
        vec3 gradient=sign(determinant)*(dFdx(h)*rx+dFdy(h)*ry);
        return normalize(abs(determinant)*n-gradient);
      }
    `;
    function dress(material, { floor = false, relief = .002, half = [0, 0, 0] } = {}) {
      const before = material.onBeforeCompile;
      material.onBeforeCompile = shader => {
        before(shader);
        Object.assign(shader.uniforms, {
          monumentGrain: { value: grainMap }, monumentCarving: { value: floor ? carving() : grainMap },
          monumentFloor: { value: floor }, monumentRelief: { value: relief }, monumentHalf: { value: new THREE.Vector3(...half) },
        });
        shader.vertexShader = 'varying vec3 vMonumentNormal; varying vec3 vMonumentLocal;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvMonumentLocal=position; vMonumentNormal=normalize(mat3(modelMatrix)*objectNormal);');
        shader.fragmentShader = surfaceGLSL + shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
          vec4 stone=monumentStone(vSolarWorld);
          float etching=monumentFloor?monumentEtching(vSolarWorld):1.0;
          float joint=monumentFloor?monumentJoint(vSolarWorld):0.0;
          float variation=.84+stone.r*.28;
          vec3 edgeDistance=abs(monumentHalf-abs(vMonumentLocal));
          float secondEdge=min(max(edgeDistance.x,edgeDistance.y),min(max(edgeDistance.y,edgeDistance.z),max(edgeDistance.x,edgeDistance.z)));
          float wear=monumentHalf.x>0.0?(1.0-smoothstep(.0,.009,secondEdge)):0.0;
          diffuseColor.rgb*=variation*(.25+.75*etching)*(1.0-joint*.22);
          diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*1.13,wear*.6);
        `).replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
          float stoneHeight=(stone.g-.5)*monumentRelief+(stone.b-.5)*monumentRelief*.5;
          stoneHeight+=monumentFloor?(etching-1.0)*.006-joint*.001:-wear*.0007;
          normal=monumentBump(-vViewPosition,normal,stoneHeight);
        `);
      };
      material.customProgramCacheKey = () => 'solar-optics-2.0-stone-1';
      return material;
    }
    function reflections() {
      if (reflectionMap) return reflectionMap;
      // A diffuse sky/ground reflection only; the actual Sun remains the sole direct light.
      const width = 256, height = 128, data = new Uint8Array(width * height * 4);
      const stops = [[0, [121, 114, 99]], [.47, [185, 179, 159]], [.53, [220, 228, 223]], [1, [142, 169, 186]]];
      for (let y = 0; y < height; y++) {
        const t = y / (height - 1), hi = stops.findIndex(s => s[0] >= t), lo = Math.max(0, hi - 1);
        const blend = hi === lo ? 0 : (t - stops[lo][0]) / (stops[hi][0] - stops[lo][0]);
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          for (let c = 0; c < 3; c++) data[offset + c] = Math.round(stops[lo][1][c] * (1 - blend) + stops[hi][1][c] * blend);
          data[offset + 3] = 255;
        }
      }
      reflectionMap = new THREE.DataTexture(data, width, height);
      reflectionMap.mapping = THREE.EquirectangularReflectionMapping;
      reflectionMap.magFilter = reflectionMap.minFilter = THREE.LinearFilter;
      reflectionMap.colorSpace = THREE.SRGBColorSpace; reflectionMap.needsUpdate = true;
      return reflectionMap;
    }
    return {
      dress,
      glass(material) {
        material.envMap = reflections(); material.envMapIntensity = .7;
        glassMaterials.add(material);
        material.addEventListener('dispose', () => glassMaterials.delete(material));
        return material;
      },
      setSun(direction) { for (const material of glassMaterials) material.envMapIntensity = direction.y > 0 ? .7 : .025; },
      dispose() { grainMap.dispose(); carvingMap?.dispose(); reflectionMap?.dispose(); glassMaterials.clear(); },
    };
  };
})();
