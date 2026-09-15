/** Crisp, independently movable metalwork. No background crops or remote artwork dependencies. */
export const escapeSvg = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

export function materials(id: string): string {
  return `<defs>
    <linearGradient id="${id}-brass"><stop stop-color="#30200c"/><stop offset=".12" stop-color="#81602b"/><stop offset=".32" stop-color="#c8a258"/><stop offset=".47" stop-color="#fff0b4"/><stop offset=".57" stop-color="#e6c875"/><stop offset=".79" stop-color="#997335"/><stop offset="1" stop-color="#3b2a0c"/></linearGradient>
    <linearGradient id="${id}-steel" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#eff1ef"/><stop offset=".19" stop-color="#9da7ab"/><stop offset=".47" stop-color="#e2e6e9"/><stop offset=".6" stop-color="#79858b"/><stop offset="1" stop-color="#303b43"/></linearGradient>
    <linearGradient id="${id}-plate" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d4d8d7"/><stop offset=".18" stop-color="#98a3a6"/><stop offset=".49" stop-color="#b5bfc0"/><stop offset=".72" stop-color="#58666e"/><stop offset="1" stop-color="#879297"/></linearGradient>
    <linearGradient id="${id}-edge" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f5dfa0"/><stop offset=".22" stop-color="#b99a53"/><stop offset=".64" stop-color="#786036"/><stop offset="1" stop-color="#332618"/></linearGradient>
    <linearGradient id="${id}-well"><stop stop-color="#080e13"/><stop offset=".4" stop-color="#222c32"/><stop offset=".75" stop-color="#101920"/><stop offset="1" stop-color="#020609"/></linearGradient>
    <radialGradient id="${id}-hub" cx="35%" cy="25%"><stop stop-color="#fff0b6"/><stop offset=".45" stop-color="#c9a458"/><stop offset=".84" stop-color="#6c5025"/><stop offset="1" stop-color="#302314"/></radialGradient>
    <pattern id="${id}-brush" width="47" height="4" patternUnits="userSpaceOnUse"><path d="M0 .5H47 M7 2.5H40" stroke="#eff7fb" stroke-opacity=".12" stroke-width=".5"/><path d="M0 3.5H29" stroke="#111b22" stroke-opacity=".14" stroke-width=".5"/></pattern>
    <filter id="${id}-shadow" x="-30%" y="-30%" width="170%" height="175%"><feDropShadow dx="1" dy="4" stdDeviation="3" flood-color="#000" flood-opacity=".5"/></filter>
  </defs>`;
}

export function screw(x: number, y: number, id: string, radius = 5): string {
  return `<g transform="translate(${x} ${y})"><circle r="${radius + 1}" fill="#25313a"/><circle r="${radius}" fill="url(#${id}-steel)" stroke="#e0e3df" stroke-width=".5"/><path d="M${-radius * 0.62} ${radius * 0.35}L${radius * 0.62} ${-radius * 0.35}" stroke="#25313b" stroke-width="1.6"/></g>`;
}

export function scaleGeometry(width: number) {
  const center = width / 2,
    half = Math.min(134, width * 0.26);
  return { width, center, half, left: center - half, right: center + half, beamY: 87, panY: 225 };
}

export function scaleArtwork(width: number, id: string): string {
  const a = scaleGeometry(width),
    radius = Math.min(64, width * 0.155);
  return `${materials(id)}
    <ellipse cx="${a.center}" cy="277" rx="${width * 0.38}" ry="20" fill="#000" opacity=".26"/>
    <path d="M${a.center - 24} 273L${a.center - 12} 89Q${a.center} 66 ${a.center + 12} 89L${a.center + 24} 273Z" fill="url(#${id}-brass)" stroke="#8d7546"/>
    <path d="M${a.center - 5} 122V256H${a.center + 5}V122" fill="#19313a" opacity=".8"/>
    <rect x="${a.center - 62}" y="269" width="124" height="15" rx="5" fill="url(#${id}-edge)" stroke="#d0ae69"/>
    <g data-beam><path d="M${a.left - 6} 78L${a.right + 6} 78L${a.right} 96L${a.left} 96Z" fill="url(#${id}-edge)" stroke="#ceb477"/>
    <path d="M${a.left} 82H${a.right}" stroke="#f5dfa7" stroke-width="2"/>
    ${Array.from({ length: 7 }, (_, i) => screw(a.left + (a.half * 2 * i) / 6, 87, id, 2)).join('')}</g>
    <g data-chain="1" fill="none"><path stroke="#4d3d29" stroke-width="3.5"/><path stroke="#dbc38c" stroke-width="1.2" stroke-dasharray="2 3"/></g>
    <g data-chain="2" fill="none"><path stroke="#4d3d29" stroke-width="3.5"/><path stroke="#dbc38c" stroke-width="1.2" stroke-dasharray="2 3"/></g>
    ${([1, 2] as const)
      .map(
        (
          side,
        ) => `<g data-pan="${side}"><ellipse cx="0" cy="5" rx="${radius}" ry="12" fill="url(#${id}-edge)" stroke="#9f7e43"/><ellipse cx="0" cy="0" rx="${radius}" ry="9" fill="#3d372d" stroke="#f0d391" stroke-width="1.5"/><ellipse cx="0" cy="-1" rx="${radius - 8}" ry="5" fill="#837048"/>
    <ellipse data-drop="${side}" cx="0" cy="-12" rx="${radius + 7}" ry="53" fill="transparent" stroke="transparent" stroke-width="2"/></g>`,
      )
      .join('')}
    <circle cx="${a.center}" cy="87" r="20" fill="url(#${id}-hub)" stroke="#ecce8e" filter="url(#${id}-shadow)"/>
    <circle cx="${a.center}" cy="87" r="10" fill="none" stroke="#7d602f" stroke-width="2"/>
    ${screw(a.center, 87, id, 4)}
    <text x="${a.left}" y="35" text-anchor="middle" fill="#b1c4c3" font-size="11" letter-spacing="1.4">LEFT PAN</text>
    <text x="${a.right}" y="35" text-anchor="middle" fill="#b1c4c3" font-size="11" letter-spacing="1.4">RIGHT PAN</text>
    <text data-total="1" x="${a.left}" y="57" text-anchor="middle" fill="#f2daaa" font-size="18" font-family="Georgia"/>
    <text data-total="2" x="${a.right}" y="57" text-anchor="middle" fill="#f2daaa" font-size="18" font-family="Georgia"/>
    <rect x="12" y="302" width="${width - 24}" height="126" rx="9" fill="#0a1920" stroke="#66736c" stroke-opacity=".55"/>
    <path d="M21 306H${width - 21}" stroke="#d4b579" opacity=".28"/>
    <text x="${a.center}" y="322" text-anchor="middle" fill="#bac4b8" font-size="10" letter-spacing="1.8">WEIGHT TRAY</text>
    <g data-pieces></g>`;
}

export function weightArtwork(label: string, id: string, fixed: boolean, width = 55): string {
  const x = -width / 2;
  return `<ellipse cx="3" cy="23" rx="${width / 2 + 4}" ry="6" fill="#000" opacity=".33"/>
    <path d="M${x} -15L${x + 7} -23H${x + width + 5}V15L${x + width} 23H${x}Z" fill="#6b512a" stroke="#b49c60" stroke-width=".5"/>
    <rect x="${x}" y="-15" width="${width}" height="38" rx="3" fill="url(#${id}-brass)"/>
    <path d="M${x} -15L${x + 7} -23H${x + width + 5}L${x + width} -15Z" fill="#d4b56f"/>
    <rect x="${x + 3}" y="-12" width="${width - 6}" height="31" rx="2" fill="#544024" fill-opacity=".42" stroke="#ebcf8c" stroke-opacity=".55"/>
    <text y="8" text-anchor="middle" font-family="Georgia" font-size="${label.length > 5 ? 13 : 17}" font-weight="bold" fill="#fff2c9" stroke="#42321e" stroke-width=".6" paint-order="stroke">${escapeSvg(label)}</text>
    ${fixed ? '<text y="-28" text-anchor="middle" font-size="9" letter-spacing="1" fill="#bad7cf">FIXED</text>' : ''}`;
}

export function lockGeometry(width: number, count: number) {
  const cell = (width - 65) / count;
  return { cell, axis: 284, pins: Array.from({ length: count }, (_, i) => 28 + cell * (i + 0.5)) };
}

export function lockArtwork(width: number, count: number, id: string): string {
  const a = lockGeometry(width, count),
    pinWidth = Math.min(48, a.cell * 0.58);
  return `${materials(id)}<defs><clipPath id="${id}-bounds"><rect x="8" y="136" width="${width - 16}" height="288" rx="12"/></clipPath></defs>
    ${a.pins
      .map(
        (x, i) => `<g data-overview="${i}" data-focus="${i}" style="cursor:pointer">
      <text x="${x - 17}" y="22" text-anchor="middle" fill="#b8c9c6" font-size="11" letter-spacing="1">${i + 1}</text>
      <path d="M${x - 21} 55V105H${x - 34}H${x - 8}" fill="none" stroke="#7d8e8a" stroke-width="3"/>
      <g data-mini-beam="${i}"><path d="M${x - 44} 52H${x + 6}V59H${x - 44}Z" fill="url(#${id}-edge)" stroke="#b9a271" stroke-width=".7"/></g>
      <path data-mini-ropes="${i}" fill="none" stroke="#c6b186" stroke-width="1"/>
      <ellipse data-mini-left="${i}" cx="${x - 40}" cy="84" rx="13" ry="3.5" fill="url(#${id}-brass)"/>
      <ellipse data-mini-right="${i}" cx="${x + 2}" cy="84" rx="13" ry="3.5" fill="url(#${id}-brass)"/>
      <circle cx="${x - 19}" cy="55" r="5" fill="url(#${id}-hub)"/>
      <path data-upper-rope="${i}" fill="none" stroke="#514331" stroke-width="4"/><path data-upper-rope-light="${i}" fill="none" stroke="#d6bd8e" stroke-width="1.5" stroke-dasharray="2 3"/>
      <rect x="${x - 45}" y="8" width="${a.cell - 2}" height="118" fill="transparent"/>
    </g>`,
      )
      .join('')}
    <rect x="9" y="142" width="${width - 18}" height="286" rx="14" fill="#000" opacity=".6"/>
    <rect x="8" y="136" width="${width - 16}" height="286" rx="12" fill="url(#${id}-plate)" stroke="#35434b" stroke-width="5"/>
    <rect x="12" y="140" width="${width - 24}" height="278" rx="9" fill="url(#${id}-brush)" stroke="#f0f1e8" stroke-opacity=".4"/>
    ${[
      [23, 151],
      [width - 23, 151],
      [23, 407],
      [width - 23, 407],
    ]
      .map(([x, y]) => screw(x, y, id, 5))
      .join('')}
    <g clip-path="url(#${id}-bounds)">
      ${a.pins
        .map(
          (
            x,
            i,
          ) => `<rect data-track="${i}" x="${x - pinWidth / 2 - 8}" y="157" width="${pinWidth + 16}" height="248" rx="${pinWidth / 2}" fill="url(#${id}-well)" stroke="#3b474e" stroke-width="2"/>
        <path data-rope="${i}" fill="none" stroke="#514331" stroke-width="4"/><path data-rope-light="${i}" fill="none" stroke="#d6bd8e" stroke-width="1.5" stroke-dasharray="2 3"/>
        <g data-pin="${i}" data-focus="${i}" style="cursor:pointer" filter="url(#${id}-shadow)">
          <ellipse cx="${x}" cy="-100" rx="7" ry="6" fill="none" stroke="#ab8950" stroke-width="3"/>
          <path d="M${x - pinWidth / 2} -77Q${x - pinWidth / 2} -95 ${x} -95Q${x + pinWidth / 2} -95 ${x + pinWidth / 2} -77V-14H${x - pinWidth / 2}Z" fill="url(#${id}-brass)"/>
          <path d="M${x - pinWidth / 2} 14H${x + pinWidth / 2}V77Q${x + pinWidth / 2} 95 ${x} 95Q${x - pinWidth / 2} 95 ${x - pinWidth / 2} 77Z" fill="url(#${id}-brass)"/>
          <rect x="${x - pinWidth / 2}" y="-14" width="${pinWidth}" height="28" fill="#060a0c"/>
          <rect x="${x - pinWidth / 2 + 5}" y="-10" width="${pinWidth - 10}" height="20" fill="#253034" opacity=".55"/>
          <path d="M${x - pinWidth / 2} -14H${x + pinWidth / 2}" stroke="#f3d78f" stroke-width="2"/>
          <path d="M${x - pinWidth / 2} 14H${x + pinWidth / 2}" stroke="#3e2a0d" stroke-width="3"/>
          <path d="M${x - pinWidth * 0.15} -78V-21M${x - pinWidth * 0.15} 21V79" stroke="#fff0bb" stroke-opacity=".35" stroke-width="1"/>
        </g>`,
        )
        .join('')}
      <path data-axis d="M12 ${a.axis}H${width - 14}" stroke="#f5a891" stroke-dasharray="4 3" stroke-opacity=".75"/>
      <rect x="${width - 45}" y="${a.axis - 42}" width="43" height="84" rx="5" fill="#38464e" stroke="#89989d"/>
      <rect x="${width - 45}" y="${a.axis - 15}" width="12" height="30" rx="2" fill="#071015"/>
      <g data-bolt filter="url(#${id}-shadow)"><rect x="-42" y="${a.axis - 9}" width="${width + 12}" height="18" rx="3" fill="url(#${id}-steel)" stroke="#dce3e4" stroke-width=".6"/>
        <path d="M0 ${a.axis - 5}H${width - 34}" stroke="#f1f5f2" stroke-opacity=".6"/><rect x="16" y="${a.axis - 6}" width="5" height="12" rx="2" fill="#32414a"/></g>
    </g>
    <text data-lock-state x="${width / 2}" y="450" text-anchor="middle" fill="#d6c9aa" font-size="12" letter-spacing="1.5">MASTER BOLT LOCKED</text>`;
}
