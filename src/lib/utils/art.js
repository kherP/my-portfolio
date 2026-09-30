// @ts-nocheck -- canvas drawing code; TS 4.4's DOM lib predates ctx.roundRect.
// Generated artwork for every image slot. Each kind is seeded, so it renders the same every time.
// Coordinates are in a virtual 1600x1000 (wide) or 800x1000 (tall) space, scaled to the canvas.
const G = '#22F56B', B = '#D6FFE2', D = '#5E9C70', BG = '#03100A', PANEL = '#04160C', L = 'rgba(34,245,107,0.28)';
const KANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
let c, r;
const seedOf = s => [...s].reduce((a, ch) => Math.imul(a ^ ch.charCodeAt(0), 16777619), 2166136261);
const rng = a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const pick = s => s[Math.floor(r() * s.length)];
const box = (x, y, w, h, { fill, stroke, rad = 8, a = 1, lw = 2 } = {}) => {
  c.globalAlpha = a; c.beginPath(); c.roundRect(x, y, w, h, rad);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  c.globalAlpha = 1;
};
const bar = (x, y, w, h = 10, col = D, a = 0.8) => box(x, y, w, h, { fill: col, rad: h / 2, a });
const txt = (s, x, y, size = 20, col = B, weight = 400, align = 'left') => {
  c.font = `${weight} ${size}px "JetBrains Mono", monospace`; c.fillStyle = col; c.textAlign = align; c.fillText(s, x, y); c.textAlign = 'left';
};
const dot = (x, y, rad, col) => { c.beginPath(); c.arc(x, y, rad, 0, Math.PI * 2); c.fillStyle = col; c.fill(); };
const ring = (x, y, rad, col = G, lw = 2) => { c.beginPath(); c.arc(x, y, rad, 0, Math.PI * 2); c.strokeStyle = col; c.lineWidth = lw; c.stroke(); };
const line = (pts, col = G, lw = 2, a = 1) => {
  c.globalAlpha = a; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); c.globalAlpha = 1;
};
const grid = (w, h, s = 40, a = 0.04) => { for (let x = 0; x <= w; x += s) line([[x, 0], [x, h]], G, 1, a); for (let y = 0; y <= h; y += s) line([[0, y], [w, y]], G, 1, a); };
const rain = (w, h, a = 0.14, step = 24) => {
  c.font = `${step * 0.8}px "JetBrains Mono", monospace`;
  for (let x = step / 2; x < w; x += step) {
    if (r() < 0.35) continue;
    const end = r() * h * 1.2, len = 80 + r() * h * 0.5;
    for (let y = end - len; y < end; y += step) { c.fillStyle = `rgba(34,245,107,${a * (1 - (end - y) / len)})`; c.fillText(pick(KANA), x, y); }
    c.fillStyle = `rgba(214,255,226,${Math.min(1, a * 2.5)})`; c.fillText(pick(KANA), x, end);
  }
};
const spark = (x, y, w, h) => {
  let v = 0.4 + r() * 0.2;
  line(Array.from({ length: 21 }, (_, i) => { v = Math.min(0.95, Math.max(0.05, v + (r() - 0.45) * 0.25)); return [x + i * w / 20, y + h - v * h]; }), G, 2.5);
};
const pill = (x, y, label, on = true) => {
  box(x, y - 21, label.length * 10 + 28, 30, { fill: on ? 'rgba(34,245,107,0.18)' : 'rgba(94,156,112,0.16)', rad: 15 });
  txt(label, x + 14, y, 15, on ? G : D, 500);
};
const check = (x, y, on) => {
  box(x - 14, y - 14, 28, 28, on ? { fill: G, rad: 6 } : { stroke: L, rad: 6 });
  if (on) line([[x - 7, y], [x - 2, y + 6], [x + 8, y - 6]], BG, 3.5);
};
// silhouette -> lookup of which points are inside it
const mask = (W, H, drawShape) => {
  const o = document.createElement('canvas'); o.width = W; o.height = H;
  const m = o.getContext('2d'); m.fillStyle = '#fff'; drawShape(m);
  const d = m.getImageData(0, 0, W, H).data;
  return (x, y) => x < 0 || y < 0 || x >= W || y >= H ? 0 : d[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] / 255;
};
// fill a silhouette with ASCII shading, lit from the top left, edges in bright katakana
const glyphs = (W, H, inside, cell = 18) => {
  const RAMP = '.:-=+*#%@';
  c.font = `500 ${cell}px "JetBrains Mono", monospace`; c.textAlign = 'center';
  for (let y = cell / 2; y < H; y += cell) for (let x = cell / 2; x < W; x += cell) {
    if (inside(x, y) < 0.5) continue;
    const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => inside(x + dx * cell * 1.2, y + dy * cell * 1.2) < 0.5);
    const b = Math.max(0.15, Math.min(1, 0.25 + 0.55 * (1 - x / W) + 0.2 * (1 - y / H) + (r() - 0.5) * 0.3));
    c.globalAlpha = edge ? 1 : b; c.fillStyle = edge ? B : G;
    c.fillText(edge ? pick(KANA) : RAMP[Math.min(RAMP.length - 1, Math.floor(b * RAMP.length))], x, y + cell * 0.35);
  }
  c.globalAlpha = 1; c.textAlign = 'left';
};
const app = (name, nav, active) => {
  c.fillStyle = BG; c.fillRect(0, 0, 1600, 1000); grid(1600, 1000);
  box(0, 0, 1600, 72, { fill: '#051A0E', rad: 0 }); line([[0, 72], [1600, 72]], G, 1.5, 0.3);
  box(28, 20, 32, 32, { fill: G, rad: 8 }); txt(name, 76, 45, 20, B, 500);
  box(560, 18, 480, 36, { stroke: L, rad: 18 }); txt('search...', 584, 42, 16, D);
  dot(1548, 36, 18, D);
  box(0, 73, 260, 927, { fill: '#04120A', rad: 0 }); line([[260, 73], [260, 1000]], G, 1.5, 0.3);
  nav.forEach((n, i) => {
    const y = 128 + i * 58, on = i === active;
    if (on) { box(14, y - 30, 232, 46, { fill: 'rgba(34,245,107,0.14)', rad: 8 }); box(14, y - 30, 4, 46, { fill: G, rad: 2 }); }
    box(34, y - 18, 20, 20, { stroke: on ? G : D, rad: 5 }); txt(n, 68, y, 17, on ? B : D);
  });
};
const heading = (t, sub) => { txt(t, 300, 140, 38, B, 500); txt(sub, 300, 176, 17, D); };

const draw = {
  portrait(W, H) {
    c.fillStyle = BG; c.fillRect(0, 0, W, H); rain(W, H, 0.12);
    c.setLineDash([4, 10]);
    for (let k = 0; k < 3; k++) { c.globalAlpha = 0.2 - k * 0.05; ring(400, 380, 240 + k * 50); }
    c.setLineDash([]); c.globalAlpha = 1;
    const inside = mask(W, H, m => {
      m.beginPath(); m.ellipse(400, 330, 172, 168, 0, Math.PI, 0); m.fill();
      m.fillRect(228, 330, 344, 140);
      m.beginPath(); m.ellipse(400, 390, 148, 180, 0, 0, Math.PI * 2); m.fill();
      m.fillRect(348, 540, 104, 160);
      m.beginPath(); m.moveTo(60, 1000); m.bezierCurveTo(80, 770, 220, 700, 400, 690); m.bezierCurveTo(580, 700, 720, 770, 740, 1000); m.closePath(); m.fill();
    });
    glyphs(W, H, inside, 16);
    box(40, 900, 720, 60, { fill: 'rgba(3,16,10,0.88)', stroke: L, rad: 8 });
    txt('subject: kher_phay', 64, 938, 20, B, 500); txt('● online', 736, 938, 18, G, 500, 'right');
  },
  occupational() {
    app('pension / admin', ['Overview', 'Employees', 'Insurance plans', 'Changes', 'Reports', 'Settings'], 1);
    heading('Employees', 'Your organisation · 4,012 insured');
    box(1330, 106, 230, 52, { fill: G, rad: 10 }); txt('+ Add employee', 1445, 139, 17, BG, 700, 'center');
    [['Active', '4,012'], ['Pending', '38'], ['Changes this week', '12']].forEach(([k, v], i) => {
      const x = 300 + i * 425;
      box(x, 206, 400, 124, { stroke: L, fill: PANEL, rad: 12 });
      txt(k, x + 24, 246, 16, D); txt(v, x + 24, 302, 40, B, 500); spark(x + 210, 250, 160, 56);
    });
    box(300, 358, 1260, 610, { stroke: L, fill: '#04140B', rad: 12 });
    [['Name', 330], ['Employee ID', 720], ['Plan', 960], ['Status', 1220]].forEach(([t, x]) => txt(t, x, 400, 15, D, 500));
    line([[300, 420], [1560, 420]], G, 1, 0.3);
    for (let i = 0; i < 9; i++) {
      const y = 462 + i * 56;
      dot(348, y - 6, 14, 'rgba(94,156,112,0.5)'); bar(376, y - 12, 110 + r() * 130, 12, B, 0.75);
      txt('#' + (10000 + Math.floor(r() * 89999)), 720, y, 16, D);
      bar(960, y - 11, 80 + r() * 110, 10, D, 0.6);
      const s = pick(['Active', 'Active', 'Active', 'Pending', 'Changed']); pill(1220, y, s, s === 'Active');
      if (i < 8) line([[320, y + 24], [1520, y + 24]], G, 1, 0.12);
    }
    box(1536, 440, 6, 510, { fill: 'rgba(34,245,107,0.1)', rad: 3 }); box(1536, 452, 6, 110, { fill: D, rad: 3 });
  },
  private() {
    app('my pension', ['Overview', 'Payouts', 'Accounts', 'Documents', 'Messages'], 1);
    heading('Your payouts', 'Next payout · 25 October');
    box(300, 206, 780, 424, { stroke: L, fill: PANEL, rad: 12 });
    txt('Monthly payout', 330, 248, 16, D); txt('12 400', 330, 306, 50, B, 500); txt('per month', 540, 306, 17, D);
    [...'JFMAMJJASOND'].forEach((mo, i) => {
      const h = 90 + r() * 150, x = 342 + i * 60;
      box(x, 586 - h, 34, h, { fill: i === 9 ? G : 'rgba(34,245,107,0.25)', rad: 6 }); txt(mo, x + 17, 614, 14, D, 400, 'center');
    });
    box(300, 658, 780, 310, { stroke: L, fill: '#04140B', rad: 12 }); txt('Upcoming', 330, 700, 16, D);
    ['25 Oct', '25 Nov', '25 Dec', '25 Jan'].forEach((d, i) => {
      const y = 752 + i * 56;
      dot(342, y - 6, 7, i ? D : G); txt(d, 366, y, 17, B);
      bar(520, y - 11, 200 + r() * 120, 10, D, 0.5); txt('12 400', 1050, y, 17, i ? D : G, 500, 'right');
    });
    box(1110, 206, 450, 762, { stroke: L, fill: PANEL, rad: 12 }); txt('Change payout', 1140, 254, 24, B, 500);
    txt('Payout duration', 1140, 318, 16, D);
    bar(1140, 340, 390, 8, 'rgba(94,156,112,0.4)', 1); bar(1140, 340, 250, 8, G, 1); dot(1390, 344, 14, B);
    ['5y', '10y', '15y', '20y'].forEach((t, i) => txt(t, 1140 + i * 124, 384, 14, D));
    txt('Payment account', 1140, 452, 16, D); box(1140, 470, 390, 56, { stroke: L, rad: 10 }); txt('•••• •••• 4821', 1162, 506, 18, B);
    txt('Postpone next payout', 1140, 600, 16, B); box(1460, 578, 70, 36, { fill: G, rad: 18 }); dot(1512, 596, 13, BG);
    bar(1140, 646, 360, 9, D, 0.45); bar(1140, 670, 300, 9, D, 0.45); bar(1140, 694, 200, 9, D, 0.45);
    box(1140, 872, 390, 64, { fill: G, rad: 12 }); txt('Save changes', 1335, 912, 19, BG, 700, 'center');
  },
  roles() {
    app('roles / admin', ['Users', 'Roles', 'Permissions', 'Audit log'], 1);
    heading('Roles & permissions', 'Occupational pension portal');
    box(300, 206, 1260, 762, { stroke: L, fill: '#04140B', rad: 12 });
    const perms = ['View', 'Edit', 'Approve', 'Export', 'Admin'];
    perms.forEach((p, j) => txt(p, 860 + j * 150, 256, 16, D, 500, 'center'));
    line([[300, 280], [1560, 280]], G, 1, 0.3);
    ['Administrator', 'HR manager', 'Payroll', 'Team lead', 'Viewer', 'Auditor', 'Support', 'Guest'].forEach((role, i) => {
      const y = 334 + i * 78;
      txt(role, 336, y, 19, B, 500); txt(`${1 + Math.floor(r() * 40)} users`, 336, y + 26, 14, D);
      perms.forEach((_, j) => check(860 + j * 150, y, j <= 4 - Math.floor(i * 0.6) ? r() > 0.15 : r() > 0.85));
      if (i < 7) line([[320, y + 44], [1540, y + 44]], G, 1, 0.12);
    });
  },
  service() {
    app('service desk', ['Inbox', 'My cases', 'Customers', 'Knowledge base'], 0);
    box(290, 90, 460, 890, { fill: '#04140B', stroke: L, rad: 12 });
    txt('Inbox', 318, 136, 26, B, 500); pill(640, 134, '24 new');
    for (let i = 0; i < 8; i++) {
      const y = 176 + i * 98;
      if (i === 1) box(300, y, 440, 90, { fill: 'rgba(34,245,107,0.12)', rad: 10 });
      if (i < 3) dot(322, y + 30, 6, G);
      bar(342, y + 22, 130 + r() * 90, 12, B, 0.8); txt(`09:${10 + i * 6}`, 720, y + 34, 14, D, 400, 'right');
      bar(342, y + 50, 260 + r() * 100, 9, D, 0.5); bar(342, y + 68, 150 + r() * 120, 9, D, 0.35);
    }
    box(780, 90, 780, 890, { fill: PANEL, stroke: L, rad: 12 });
    txt('Case #48213', 812, 144, 30, B, 500); pill(1380, 140, 'In progress');
    bar(812, 172, 260, 10, D, 0.6);
    line([[836, 250], [836, 722]], G, 2, 0.35);
    ['Payout account changed', 'Beneficiary updated', 'Customer called', 'Documents requested', 'Case opened'].forEach((ev, i) => {
      const y = 250 + i * 118;
      dot(836, y, 11, i ? PANEL : G); ring(836, y, 11);
      txt(ev, 870, y + 7, 19, i ? D : B, 500); txt(`${12 - i * 2} Oct · 1${i}:0${i}`, 1530, y + 7, 14, D, 400, 'right');
      bar(870, y + 30, 360 + r() * 200, 9, D, 0.4);
    });
    box(812, 828, 716, 120, { stroke: L, rad: 12 }); bar(836, 858, 300, 10, D, 0.4);
    box(1404, 884, 108, 46, { fill: G, rad: 10 }); txt('Send', 1458, 914, 17, BG, 700, 'center');
  },
  library() {
    app('ui-kit / docs', ['Button', 'Toggle', 'Input', 'Checkbox', 'Tabs', 'Card', 'Badge', 'Colors'], 0);
    heading('Button', 'Brand components · v2.4');
    const panel = (x, y, w, h, t) => { box(x, y, w, h, { stroke: L, fill: '#04140B', rad: 12 }); txt(t, x + 22, y + 34, 14, D, 500); };
    panel(300, 206, 620, 230, 'variants');
    box(324, 272, 170, 58, { fill: G, rad: 10 }); txt('Primary', 409, 308, 17, BG, 700, 'center');
    box(510, 272, 180, 58, { stroke: G, rad: 10 }); txt('Secondary', 600, 308, 17, G, 500, 'center');
    txt('Ghost', 760, 308, 17, B, 500, 'center');
    box(324, 352, 170, 58, { fill: 'rgba(94,156,112,0.25)', rad: 10 }); txt('Disabled', 409, 388, 17, D, 500, 'center');
    box(510, 352, 58, 58, { fill: G, rad: 29 }); txt('+', 539, 391, 26, BG, 700, 'center');
    panel(940, 206, 620, 230, 'toggles & checks');
    box(966, 276, 78, 40, { fill: G, rad: 20 }); dot(1024, 296, 15, BG);
    box(1066, 276, 78, 40, { fill: 'rgba(94,156,112,0.35)', rad: 20 }); dot(1086, 296, 15, D);
    check(1186, 296, true); check(1236, 296, false);
    ring(1300, 296, 14); dot(1300, 296, 7, G); ring(1350, 296, 14, D);
    bar(966, 360, 260, 10, D, 0.5); bar(966, 386, 200, 10, D, 0.35);
    panel(300, 460, 620, 250, 'input');
    txt('Payment account', 324, 540, 15, D); box(324, 556, 572, 58, { stroke: G, rad: 10, lw: 2.5 });
    txt('SE45 5000 0000 0583', 346, 592, 18, B); box(560, 572, 2, 26, { fill: G, rad: 1 });
    txt('Shown on your payout slip', 324, 650, 14, D);
    panel(940, 460, 620, 250, 'tabs & badges');
    ['Overview', 'Payouts', 'Documents'].forEach((t, i) => txt(t, 966 + i * 170, 540, 17, i ? D : B, 500));
    box(966, 554, 100, 4, { fill: G, rad: 2 }); line([[966, 560], [1530, 560]], G, 1, 0.25);
    pill(966, 630, 'Active'); pill(1086, 630, 'Draft', false); pill(1190, 630, 'New');
    panel(300, 734, 1260, 234, 'usage');
    let cx = 324;
    [['<', D], ['Button', G], [' variant', B], ['=', D], ['"primary"', G], [' size', B], ['=', D], ['"lg"', G], ['>', D], ['Save changes', B], ['</', D], ['Button', G], ['>', D]]
      .forEach(([s, col]) => { txt(s, cx, 812, 20, col); cx += c.measureText(s).width; });
    ['#22F56B', '#1BC456', '#149341', '#0D622B', '#D6FFE2', '#5E9C70'].forEach((hex, i) => {
      box(324 + i * 200, 842, 180, 60, { fill: hex, rad: 8 }); txt(hex, 324 + i * 200, 934, 14, D);
    });
  },
  classes() {
    app('studio / classes', ['Schedule', 'My classes', 'Members', 'Instructors'], 0);
    heading('This week', 'Oct 13 – Oct 19');
    box(1360, 106, 200, 52, { fill: G, rad: 10 }); txt('Check in', 1460, 139, 17, BG, 700, 'center');
    const x0 = 370, cw = 170, y0 = 250, rh = 90;
    box(300, 200, 1260, 768, { stroke: L, fill: '#04140B', rad: 12 });
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((d, i) => { txt(d, x0 + i * cw + 12, 234, 16, i === 2 ? G : D, 500); line([[x0 + i * cw, 206], [x0 + i * cw, 962]], G, 1, 0.1); });
    ['07', '09', '11', '13', '15', '17', '19', '21'].forEach((t, i) => { txt(t + ':00', 312, y0 + i * rh + 16, 13, D); line([[x0, y0 + i * rh], [1554, y0 + i * rh]], G, 1, 0.08); });
    const names = ['Yoga', 'HIIT', 'Spin', 'Pilates', 'Boxing', 'Strength', 'Zumba'];
    for (let d = 0; d < 7; d++) {
      const used = new Set(), n = 2 + Math.floor(r() * 2);
      for (let k = 0; k < n; k++) {
        const slot = Math.floor(r() * 7);
        if (used.has(slot)) continue; used.add(slot);
        const x = x0 + d * cw + 6, y = y0 + slot * rh + 6, mine = d === 2 && k === 0;
        box(x, y, cw - 12, rh - 12, { fill: mine ? G : 'rgba(34,245,107,0.13)', rad: 8 });
        if (!mine) box(x, y, 4, rh - 12, { fill: G, rad: 2 });
        txt(pick(names), x + 14, y + 30, 16, mine ? BG : B, 700);
        txt(mine ? 'checked in ✓' : `${8 + Math.floor(r() * 12)}/20`, x + 14, y + 56, 13, mine ? BG : D);
      }
    }
  },
  draft() {
    app('drafts / new', ['Recordings', 'Drafts', 'Templates', 'Audit log'], 0);
    heading('New note', 'Transcribed offline · draft ready for review');
    ['Record', 'Transcribe', 'Draft', 'Review'].forEach((t, i) => {
      const x = 900 + i * 165, done = i < 3;
      if (done) line([[x + 22, 140], [x + 143, 140]], G, 2, i < 2 ? 0.8 : 0.35);
      dot(x, 140, 16, done ? G : PANEL); ring(x, 140, 16);
      txt(done ? '✓' : '4', x, 146, 16, done ? BG : G, 700, 'center');
      txt(t, x, 184, 14, done ? B : D, 500, 'center');
    });
    box(300, 214, 1260, 150, { stroke: L, fill: PANEL, rad: 12 });
    dot(346, 289, 22, G); box(338, 281, 16, 16, { fill: BG, rad: 3 });
    for (let i = 0; i < 140; i++) {
      const h = 8 + Math.abs(Math.sin(i * 0.35) * 40 + (r() - 0.5) * 50);
      box(392 + i * 6.8, 289 - h / 2, 3.5, h, { fill: i < 100 ? G : D, rad: 2, a: i < 100 ? 0.85 : 0.35 });
    }
    pill(1380, 262, 'offline'); txt('04:12', 1530, 326, 18, B, 500, 'right');
    box(300, 390, 600, 578, { stroke: L, fill: '#04140B', rad: 12 }); txt('Transcript', 330, 432, 18, B, 500);
    for (let i = 0; i < 9; i++) {
      const y = 480 + i * 54, t = i * 27;
      txt(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`, 330, y + 10, 14, G);
      bar(410, y, 300 + r() * 160, 10, D, 0.55); bar(410, y + 20, 150 + r() * 200, 10, D, 0.4);
    }
    line([[910, 680], [948, 680]], G, 2.5); line([[938, 670], [948, 680], [938, 690]], G, 2.5); txt('AI', 929, 660, 13, G, 700, 'center');
    box(960, 390, 600, 578, { stroke: G, fill: PANEL, rad: 12, lw: 1.5 }); txt('Draft note', 990, 432, 18, B, 500); pill(1470, 430, 'AI');
    const linked = [1, 2, 5, 6], stamps = ['00:27', '00:54', '02:15', '02:42'];
    for (let i = 0; i < 10; i++) {
      const y = 470 + i * 38, k = linked.indexOf(i);
      if (k >= 0) box(980, y - 8, 560, 28, { fill: 'rgba(34,245,107,0.1)', rad: 6 });
      bar(996, y, 340 + r() * 120, 11, k >= 0 ? G : D, k >= 0 ? 0.7 : 0.45);
      if (k >= 0) txt('↳ ' + stamps[k], 1530, y + 10, 12, G, 500, 'right');
    }
    box(990, 880, 250, 56, { fill: G, rad: 10 }); txt('Approve', 1115, 915, 18, BG, 700, 'center');
    box(1260, 880, 270, 56, { stroke: G, rad: 10 }); txt('Edit draft', 1395, 915, 17, G, 500, 'center');
  },
  calc() {
    const AMBER = '#FFC83D', INK = '#0A2615';
    app('calcs / editor', ['Calculations', 'Templates', 'Reviews', 'Settings'], 0);
    heading('Steel beam check', 'Rev B · checked by AI against template');
    box(300, 206, 760, 56, { stroke: L, fill: PANEL, rad: 10 });
    ['B', 'I', 'H1', 'Σ', 'fx', 'x²', '{ }'].forEach((t, i) => {
      if (i === 4) box(310 + i * 64, 216, 52, 36, { fill: 'rgba(34,245,107,0.18)', rad: 8 });
      txt(t, 336 + i * 64, 242, 18, i === 4 ? G : B, 700, 'center');
    });
    box(900, 216, 144, 36, { fill: G, rad: 8 }); txt('Print', 972, 241, 16, BG, 700, 'center');
    box(300, 280, 760, 688, { stroke: L, fill: '#04140B', rad: 12 });
    const row = (y, lhs, expr, val, ok = true) => {
      txt(lhs, 356, y, 19, G, 500); txt(expr, 440, y, 19, D); txt(val, 800, y, 19, B, 500);
      box(944, y - 21, 92, 30, { fill: ok ? 'rgba(34,245,107,0.16)' : 'rgba(255,200,61,0.14)', rad: 15 });
      txt(ok ? '✓ AI' : '! AI', 962, y, 14, ok ? G : AMBER, 700);
    };
    txt('1  Loads', 332, 330, 22, B, 500);
    row(380, 'L', '= span', '6.0 m'); row(428, 'w', '= g + q', '12.5 kN/m');
    txt('2  Bending', 332, 500, 22, B, 500);
    row(550, 'M', '= wL²/8', '56.3 kNm'); row(598, 'Z', '= section', '410 cm³', false); row(646, 'σ', '= M / Z', '137 MPa');
    box(322, 676, 716, 44, { fill: 'rgba(34,245,107,0.08)', rad: 6 });
    txt('u', 356, 706, 19, G, 500); txt('= σ / fy', 440, 706, 19, D); txt('0.50', 800, 706, 19, B, 500); box(848, 688, 3, 24, { fill: G, rad: 1 });
    box(440, 726, 300, 150, { fill: '#061C10', stroke: G, rad: 10, lw: 1.5 });
    ['fy  yield strength', 'fu  ultimate strength', 'E   elastic modulus'].forEach((t, i) => {
      if (!i) box(448, 736, 284, 40, { fill: 'rgba(34,245,107,0.16)', rad: 6 });
      txt(t, 462, 762 + i * 44, 16, i ? D : B);
    });
    txt('3  Deflection', 332, 924, 22, B, 500);
    // print preview: a page on the desk
    txt('Print preview', 1100, 240, 16, D, 500);
    c.save(); c.translate(1325, 590); c.rotate(0.025);
    c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 30; box(-205, -320, 410, 580, { fill: '#DDF5E4', rad: 4 }); c.shadowBlur = 0;
    box(-180, -296, 360, 70, { stroke: INK, rad: 2, lw: 1.5 });
    txt('STEEL BEAM CHECK', -165, -268, 14, INK, 700); txt('Calc 014 · Rev B', -165, -243, 12, INK); txt('Page 1 of 3', 165, -243, 12, INK, 400, 'right');
    txt('1  Loads', -180, -192, 13, INK, 700);
    for (let i = 0; i < 3; i++) bar(-160, -178 + i * 20, 200 + r() * 100, 7, INK, 0.35);
    txt('2  Bending', -180, -100, 13, INK, 700);
    box(-180, -86, 360, 120, { stroke: INK, rad: 2, lw: 1 });
    for (let i = 1; i < 4; i++) line([[-180, -86 + i * 30], [180, -86 + i * 30]], INK, 1, 0.5);
    line([[-40, -86], [-40, 34]], INK, 1, 0.5); line([[80, -86], [80, 34]], INK, 1, 0.5);
    [['M', '56.3 kNm'], ['Z', '410 cm³'], ['σ', '137 MPa'], ['u', '0.50']].forEach(([a, b], i) => {
      txt(a, -165, -65 + i * 30, 12, INK, 700); txt(b, -25, -65 + i * 30, 12, INK); txt('OK', 95, -65 + i * 30, 12, INK, 700);
    });
    txt('3  Deflection', -180, 72, 13, INK, 700);
    for (let x = -120; x <= 120; x += 40) line([[x, 94], [x, 120], [x - 5, 113], [x, 120], [x + 5, 113]], INK, 1.5);
    line([[-150, 128], [150, 128]], INK, 3, 0.85);
    [-150, 150].forEach(x => line([[x, 128], [x - 12, 150], [x + 12, 150], [x, 128]], INK, 1.5));
    c.setLineDash([5, 5]); c.beginPath(); c.moveTo(-150, 128); c.quadraticCurveTo(0, 172, 150, 128); c.strokeStyle = INK; c.lineWidth = 1.5; c.stroke(); c.setLineDash([]);
    txt('δ = 12.6 mm', 0, 196, 12, INK, 700, 'center');
    line([[-180, 222], [180, 222]], INK, 1, 0.4); txt('Checked against template', -180, 240, 10, INK);
    c.restore();
    box(1110, 900, 430, 52, { stroke: G, rad: 10 }); txt('Export PDF', 1325, 933, 16, G, 500, 'center');
  },
  me(W, H) {
    c.fillStyle = BG; c.fillRect(0, 0, W, H); grid(W, H, 40, 0.05); rain(W, H, 0.1);
    const inside = mask(W, H, m => { m.font = '400 560px VT323, monospace'; m.textAlign = 'center'; m.fillText('KP', 400, 640); m.strokeStyle = '#fff'; m.lineWidth = 26; m.lineJoin = 'round'; m.strokeText('KP', 400, 640); });
    glyphs(W, H, inside, 16);
    txt('> hello, world', 400, 860, 30, B, 500, 'center');
  },
  sing(W, H) {
    c.fillStyle = BG; c.fillRect(0, 0, W, H); rain(W, H, 0.08);
    for (let k = 1; k <= 4; k++) {
      c.globalAlpha = 0.55 - k * 0.1; c.strokeStyle = G; c.lineWidth = 3;
      c.beginPath(); c.arc(400, 330, 130 + k * 55, -0.55, 0.55); c.stroke();
      c.beginPath(); c.arc(400, 330, 130 + k * 55, Math.PI - 0.55, Math.PI + 0.55); c.stroke();
    }
    c.globalAlpha = 1;
    const inside = mask(W, H, m => {
      m.beginPath(); m.roundRect(305, 150, 190, 320, 95); m.fill();
      m.fillRect(300, 468, 200, 26);
      m.beginPath(); m.moveTo(335, 490); m.lineTo(465, 490); m.lineTo(430, 800); m.lineTo(370, 800); m.closePath(); m.fill();
    });
    glyphs(W, H, inside, 14);
    c.save(); c.beginPath(); c.roundRect(305, 150, 190, 320, 95); c.clip();
    for (let y = 186; y < 460; y += 34) line([[300, y], [500, y]], B, 1.5, 0.3);
    c.restore();
    [['♪', 150, 200, 60], ['♫', 640, 170, 70], ['♪', 660, 560, 48], ['♫', 120, 560, 54]].forEach(([s, x, y, sz]) => txt(s, x, y, sz, B, 400, 'center'));
    for (let i = 0; i < 26; i++) { const h = 20 + r() * 110; box(40 + i * 28.5, 960 - h, 18, h, { fill: G, rad: 3, a: 0.35 + r() * 0.5 }); }
  },
  desk(W, H) {
    c.fillStyle = BG; c.fillRect(0, 0, W, H); grid(W, H, 40, 0.04);
    box(90, 60, 300, 220, { stroke: L, rad: 6 });
    c.save(); c.beginPath(); c.rect(90, 60, 300, 220); c.clip(); rain(W, H, 0.35, 18); c.restore();
    line([[240, 60], [240, 280]], G, 2, 0.3); line([[90, 170], [390, 170]], G, 2, 0.3);
    box(150, 330, 500, 310, { stroke: B, rad: 16, lw: 3 }); box(170, 350, 460, 270, { fill: '#04160C', rad: 8 });
    for (let i = 0; i < 9; i++) bar(190 + (i % 3) * 24, 372 + i * 26, 80 + r() * 240, 9, i % 4 ? D : G, 0.8);
    line([[380, 640], [360, 720]], B, 3); line([[420, 640], [440, 720]], B, 3); box(300, 718, 200, 14, { stroke: B, rad: 7, lw: 3 });
    line([[30, 736], [770, 736]], B, 3);
    box(170, 770, 380, 110, { stroke: B, rad: 12, lw: 3 });
    for (let row = 0; row < 4; row++) for (let k = 0; k < 13; k++) box(186 + k * 27.5, 786 + row * 23, 22, 17, { stroke: D, rad: 3, lw: 1.5 });
    box(590, 790, 56, 86, { stroke: B, rad: 28, lw: 3 }); line([[618, 800], [618, 822]], B, 2);
    box(668, 640, 84, 96, { stroke: B, rad: 10, lw: 3 });
    c.beginPath(); c.arc(752, 688, 22, -Math.PI / 2, Math.PI / 2); c.strokeStyle = B; c.lineWidth = 3; c.stroke();
    [692, 726].forEach(x => line([[x, 622], [x - 10, 602], [x + 6, 582], [x - 6, 558]], G, 2.5, 0.7));
    txt('kopi', 710, 700, 18, G, 500, 'center');
    line([[56, 736], [48, 660], [122, 660], [114, 736]], B, 3);
    [[-1, 560], [0, 530], [1, 570]].forEach(([d, top]) => line([[85, 660], [85 + d * 18, 610], [85 + d * 40, top]], G, 3));
    c.save(); c.translate(600, 330); c.rotate(0.12); box(-20, -30, 70, 64, { fill: G, rad: 3 }); txt('ship', 15, 8, 16, BG, 700, 'center'); c.restore();
  },
  kl(W, H) {
    const sky = c.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#010503'); sky.addColorStop(1, '#062313');
    c.fillStyle = sky; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 70; i++) dot(r() * W, r() * H * 0.55, r() * 1.8 + 0.4, `rgba(214,255,226,${0.3 + r() * 0.6})`);
    c.shadowColor = G; c.shadowBlur = 40; dot(610, 150, 46, 'rgba(214,255,226,0.9)'); c.shadowBlur = 0;
    const tower = (m, x) => {
      m.fillRect(x, 400, 96, 600); m.fillRect(x + 8, 320, 80, 90); m.fillRect(x + 18, 250, 60, 80); m.fillRect(x + 28, 200, 40, 60);
      m.beginPath(); m.moveTo(x + 40, 205); m.lineTo(x + 48, 90); m.lineTo(x + 56, 205); m.fill();
    };
    const inside = mask(W, H, m => {
      tower(m, 230); tower(m, 420);
      m.fillRect(326, 520, 94, 16);
      m.beginPath(); m.moveTo(326, 536); m.lineTo(373, 600); m.lineTo(420, 536); m.lineTo(410, 536); m.lineTo(373, 586); m.lineTo(336, 536); m.fill();
      m.fillRect(655, 440, 22, 560); m.beginPath(); m.ellipse(666, 420, 48, 30, 0, 0, Math.PI * 2); m.fill();
      m.fillRect(660, 330, 12, 70); m.fillRect(664, 230, 4, 100);
      let x = 0; while (x < W) { const w = 50 + r() * 70, h = 130 + r() * 230; m.fillRect(x, H - h, w - 6, h); x += w; }
    });
    glyphs(W, H, inside, 13);
    line([[278, 205], [278, 90]], B, 2, 0.8); line([[468, 205], [468, 90]], B, 2, 0.8); line([[666, 330], [666, 230]], B, 2, 0.8);
    line([[0, H - 2], [W, H - 2]], G, 3, 0.6);
  },
};

const WIDE = new Set(['draft', 'calc', 'occupational', 'private', 'roles', 'service', 'library', 'classes']);
/**
 * Paint generated artwork into a canvas sized by CSS.
 * @param {HTMLCanvasElement} cv
 * @param {string} kind one of the keys of `draw`
 */
export const paintArt = (cv, kind) => {
  const [VW, VH] = WIDE.has(kind) ? [1600, 1000] : [800, 1000];
  const w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  c = cv.getContext('2d'); r = rng(seedOf(kind));
  c.setTransform(cv.width / VW, 0, 0, cv.height / VH, 0, 0);
  draw[kind]?.(VW, VH);
};
