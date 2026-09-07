/* Three r160 adapter. Analytic visibility modulates direct light before its BRDF.
   The same ray/solid equations are exercised against SolarOptics by the optics checks. */
(() => {
  const glsl = `
    varying vec3 vSolarWorld;
    uniform sampler2D solarBlocks;
    uniform int solarCount;
    uniform vec3 solarDirection;
    uniform vec4 solarObject;
    uniform vec4 solarObjectShape;
    uniform float solarObjectSin;
    uniform vec4 solarPlanes[8];
    uniform int solarPlaneCount;
    uniform bool solarSkipObject;
    vec3 solarLocal(vec3 p, float c, float s) { return vec3(c*p.x-s*p.z,p.y,s*p.x+c*p.z); }
    bool solarInterval(vec3 p, vec3 d, vec3 h, out float nearT, out float farT) {
      nearT=0.0; farT=1e12;
      for(int j=0;j<3;j++) {
        if(abs(d[j])<1e-10) { if(abs(p[j])>h[j]) return false; }
        else { float a=(-h[j]-p[j])/d[j], b=(h[j]-p[j])/d[j]; nearT=max(nearT,min(a,b)); farT=min(farT,max(a,b)); }
      }
      return farT>max(nearT,1e-6);
    }
    bool solarObjectHit(vec3 origin) {
      if(solarObject.w<0.5 || solarSkipObject) return false;
      vec3 p=solarLocal(origin-solarObject.xyz,solarObjectShape.w,solarObjectSin)/solarObjectShape.xyz;
      vec3 d=solarLocal(solarDirection,solarObjectShape.w,solarObjectSin)/solarObjectShape.xyz;
      if(solarObject.w<1.5) { float a=dot(d,d), b=dot(p,d), disc=b*b-a*(dot(p,p)-1.0); return disc>=0.0 && (-b+sqrt(max(0.0,disc)))/a>1e-5; }
      float nearT=0.0, farT=1e12;
      for(int j=0;j<8;j++) {
        if(j>=solarPlaneCount) break;
        float distance=solarPlanes[j].w-dot(p,solarPlanes[j].xyz), slope=dot(d,solarPlanes[j].xyz);
        if(abs(slope)<1e-10) { if(distance<0.0) return false; }
        else if(slope>0.0) farT=min(farT,distance/slope); else nearT=max(nearT,distance/slope);
      }
      return farT>max(nearT,1e-5);
    }
    vec3 solarTransmission() {
      if(solarDirection.y<=0.0) return vec3(0.0);
      vec3 origin=vSolarWorld+solarDirection*1e-5, light=vec3(1.0);
      for(int i=0;i<100;i++) {
        if(i>=solarCount) break;
        float row=(float(i)+0.5)/100.0;
        vec4 b=texture2D(solarBlocks,vec2(.125,row)), h=texture2D(solarBlocks,vec2(.375,row));
        vec3 p=solarLocal(origin-b.xyz,b.w,h.w), d=solarLocal(solarDirection,b.w,h.w);
        float nearT, farT;
        if(!solarInterval(p,d,h.xyz,nearT,farT)) continue;
        vec4 a=texture2D(solarBlocks,vec2(.625,row)), tint=texture2D(solarBlocks,vec2(.875,row));
        if(a.x<.5) return vec3(0.0);
        vec3 entry=p+d*nearT, leave=p+d*farT;
        if(a.x<1.5) { entry.x=0.0; leave.x=0.0; }
        else if(a.x<2.5) { entry.y=0.0; leave.y=0.0; }
        else { entry.z=0.0; leave.z=0.0; }
        if(max(dot(entry,entry),dot(leave,leave))>a.y*a.y+1e-12) return vec3(0.0);
        light*=tint.rgb;
      }
      return solarObjectHit(origin)?vec3(0.0):light;
    }
  `;
  window.createSolarOpticsRenderer = (THREE) => {
    const data = new Float32Array(4 * 100 * 4);
    const texture = new THREE.DataTexture(data, 4, 100, THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;
    const uniforms = {
      solarBlocks: { value: texture }, solarCount: { value: 0 }, solarDirection: { value: new THREE.Vector3(0, 1, 0) },
      solarObject: { value: new THREE.Vector4() }, solarObjectShape: { value: new THREE.Vector4(1, 1, 1, 1) },
      solarObjectSin: { value: 0 }, solarPlanes: { value: Array.from({ length: 8 }, () => new THREE.Vector4()) }, solarPlaneCount: { value: 0 },
    };
    function material(options, skipObject = false) {
      const m = new THREE.MeshStandardMaterial(options);
      m.onBeforeCompile = shader => {
        Object.assign(shader.uniforms, uniforms, { solarSkipObject: { value: skipObject } });
        shader.vertexShader = 'varying vec3 vSolarWorld;\n' + shader.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvSolarWorld=(modelMatrix*vec4(transformed,1.0)).xyz;');
        shader.fragmentShader = glsl + shader.fragmentShader.replace('#include <lights_fragment_begin>', THREE.ShaderChunk.lights_fragment_begin.replace('getDirectionalLightInfo( directionalLight, directLight );', 'getDirectionalLightInfo( directionalLight, directLight );\ndirectLight.color *= solarTransmission();'));
      };
      m.customProgramCacheKey = () => 'solar-optics-2.0';
      return m;
    }
    function setDesign(design) {
      data.fill(0);
      design.blocks.forEach((b, i) => {
        const r = b.rotation * Math.PI / 180, a = b.aperture;
        const tint = a && a.insert !== 'open' ? window.SolarOptics.colors[a.color] : [1, 1, 1];
        data.set([b.x, b.y + b.height / 2, b.z, Math.cos(r), b.width / 2, b.height / 2, b.depth / 2, Math.sin(r), a ? ['x', 'y', 'z'].indexOf(a.axis) + 1 : 0, a ? a.diameter / 2 : 0, 0, 0, ...tint, 1], i * 16);
      });
      texture.needsUpdate = true;
      uniforms.solarCount.value = design.blocks.length;
      const o = design.displayObject;
      uniforms.solarObject.value.set(o?.x || 0, o ? o.y + o.height / 2 : 0, o?.z || 0, o ? (o.model === 'sphere' ? 1 : 2) : 0);
      if (o) {
        uniforms.solarObjectShape.value.set(o.width / 2, o.height / 2, o.width / 2, Math.cos(o.rotation * Math.PI / 180));
        uniforms.solarObjectSin.value = Math.sin(o.rotation * Math.PI / 180);
        const planes = window.SolarOptics.planes(o.model);
        uniforms.solarPlaneCount.value = planes.length;
        planes.forEach((p, i) => uniforms.solarPlanes.value[i].fromArray(p));
      }
    }
    function orient(geometry, axis) {
      if (axis === 'x') geometry.rotateY(Math.PI / 2);
      if (axis === 'y') geometry.rotateX(-Math.PI / 2);
      return geometry;
    }
    function blockGeometry(b) {
      const a = b.aperture;
      if (!a) return new THREE.BoxGeometry(b.width, b.height, b.depth);
      const [width, height, depth] = a.axis === 'x' ? [b.depth, b.height, b.width] : a.axis === 'y' ? [b.width, b.depth, b.height] : [b.width, b.height, b.depth];
      const shape = new THREE.Shape();
      shape.moveTo(-width / 2, -height / 2); shape.lineTo(width / 2, -height / 2); shape.lineTo(width / 2, height / 2); shape.lineTo(-width / 2, height / 2); shape.closePath();
      const hole = new THREE.Path(); hole.absarc(0, 0, a.diameter / 2, 0, Math.PI * 2, true); shape.holes.push(hole);
      const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 48, steps: 1 });
      g.translate(0, 0, -depth / 2);
      return orient(g, a.axis);
    }
    function insertMesh(b) {
      const a = b.aperture;
      if (!a || a.insert === 'open') return null;
      // A visible flat insert at the bore centre; facets describe its finish, not a refracting volume.
      const geometry = orient(new THREE.CircleGeometry(a.diameter / 2, 96), a.axis);
      const tint = window.SolarOptics.colors[a.color];
      const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: new THREE.Color(...tint), roughness: a.insert === 'jewel' ? .13 : .25, metalness: .08, transparent: true, opacity: .58, side: THREE.DoubleSide, depthWrite: false }));
      mesh.name = 'colored-insert';
      if (a.insert === 'jewel') {
        const facets = orient(new THREE.CircleGeometry(a.diameter / 2, 12), a.axis);
        mesh.add(new THREE.LineSegments(new THREE.WireframeGeometry(facets), new THREE.LineBasicMaterial({ color: 0xffefc4, transparent: true, opacity: .45 })));
        facets.dispose();
      }
      return mesh;
    }
    function objectMesh(o) {
      let g;
      if (o.model === 'sphere') g = new THREE.SphereGeometry(1, 64, 48);
      else if (o.model === 'crystal') g = new THREE.OctahedronGeometry(1);
      else {
        // Square frustum, aligned with the analytic six-plane solid.
        g = new THREE.CylinderGeometry(.45 * Math.SQRT2, Math.SQRT2, 2, 4, 1);
        g.rotateY(Math.PI / 4);
      }
      g.scale(o.width / 2, o.height / 2, o.width / 2);
      const finishes = { limestone: { color: 0xe4d8bc, roughness: .86, metalness: 0 }, porcelain: { color: 0xf3f0e8, roughness: .24, metalness: 0 }, bronze: { color: 0xb58348, roughness: .32, metalness: .72 } };
      const mesh = new THREE.Mesh(g, material({ ...finishes[o.material], flatShading: o.model !== 'sphere' }, true));
      mesh.name = 'central-display-object';
      mesh.position.set(o.x, o.y + o.height / 2, o.z);
      mesh.rotation.y = o.rotation * Math.PI / 180;
      return mesh;
    }
    return { material, setDesign, blockGeometry, insertMesh, objectMesh, uniforms, setSun: d => uniforms.solarDirection.value.set(d.x, d.y, d.z), dispose: () => texture.dispose() };
  };
})();
