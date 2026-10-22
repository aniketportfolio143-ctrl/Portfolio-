import React from 'react';

// Original, locally rendered interface mockups for every showcase project.
// All numbers and labels inside the mockups are illustrative placeholders.

const INK = '#0c0f0e', EM = '#059669', EM2 = '#10b981', EMS = '#d1fae5', EMX = '#ecfdf5';
const G1 = '#f4f6f5', G2 = '#e6eae8', G3 = '#cfd6d2', MU = '#87928c', W = '#ffffff', AMB = '#f59e0b', RED = '#ef4444';

const R = ({ x, y, w, h, r = 6, f = G2, s, sw = 1, o }) => <rect x={x} y={y} width={w} height={h} rx={r} fill={f} stroke={s} strokeWidth={s ? sw : undefined} opacity={o} />;
const T = ({ x, y, s = 12, w = 500, f = INK, a = 'start', ls, children }) => <text x={x} y={y} fontSize={s} fontWeight={w} fill={f} textAnchor={a} letterSpacing={ls}>{children}</text>;
const C = ({ cx, cy, r, f = G2, s, sw, o }) => <circle cx={cx} cy={cy} r={r} fill={f} stroke={s} strokeWidth={sw} opacity={o} />;
const Lines = ({ x, y, w, n = 3, gap = 12, h = 6, f = G2, last = 0.6 }) => <g>{Array.from({ length: n }, (_, i) => <R key={i} x={x} y={y + i * gap} w={i === n - 1 ? w * last : w} h={h} r={h / 2} f={f} />)}</g>;
const Bg = ({ f, dots = true, dark }) => <g><rect width="640" height="420" fill={f} />{dots && <g opacity={dark ? 0.12 : 0.5}>{Array.from({ length: 13 }, (_, i) => Array.from({ length: 9 }, (_, j) => <circle key={`${i}-${j}`} cx={24 + i * 50} cy={20 + j * 50} r="1.3" fill={dark ? W : G3} />))}</g>}</g>;

function Phone({ x, y, w = 160, h = 330, dark, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="4" y="10" width={w} height={h} rx="28" fill={INK} opacity=".12" />
    <rect width={w} height={h} rx="28" fill={INK} />
    <rect x="6" y="6" width={w - 12} height={h - 12} rx="23" fill={dark ? '#141a18' : W} />
    <rect x={w / 2 - 22} y="12" width="44" height="10" rx="5" fill={INK} />
    <g transform="translate(6 28)">{children}</g>
  </g>;
}
function Browser({ x, y, w, h, dark, url = 'example.com', children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="6" y="12" width={w} height={h} rx="12" fill={INK} opacity=".08" />
    <rect width={w} height={h} rx="12" fill={dark ? '#121715' : W} stroke={dark ? '#26302c' : G2} />
    <path d={`M0 12a12 12 0 0 1 12-12h${w - 24}a12 12 0 0 1 12 12v16H0z`} fill={dark ? '#1a211e' : G1} />
    <C cx={16} cy={14} r={4} f="#f87171" /><C cx={29} cy={14} r={4} f="#fbbf24" /><C cx={42} cy={14} r={4} f="#34d399" />
    <R x={w / 2 - 80} y={7} w={160} h={14} r={7} f={dark ? '#252e2a' : W} />
    <T x={w / 2} y={17.5} s={8} f={MU} a="middle">{url}</T>
    <g transform="translate(0 28)">{children}</g>
  </g>;
}
const Ring = ({ cx, cy, r, p, c = EM, sw = 10, track = G2 }) => {
  const L = 2 * Math.PI * r;
  return <g><circle cx={cx} cy={cy} r={r} fill="none" stroke={track} strokeWidth={sw} /><circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${L * p} ${L}`} transform={`rotate(-90 ${cx} ${cy})`} /></g>;
};
const Bars = ({ x, y, w, h, v, c = EM, alt = G2, hi, r = 3, gap = 0.35 }) => {
  const bw = w / v.length;
  return <g>{v.map((n, i) => <rect key={i} x={x + i * bw + bw * gap / 2} y={y + h - h * n} width={bw * (1 - gap)} height={h * n} rx={r} fill={hi === undefined || hi === i ? c : alt} />)}</g>;
};
const pts = (x, y, w, h, v) => v.map((n, i) => `${x + (i * w) / (v.length - 1)},${y + h - h * n}`).join(' ');
const Line = ({ x, y, w, h, v, c = EM, sw = 2.5, fill, dash }) => <g>
  {fill && <polygon points={`${x},${y + h} ${pts(x, y, w, h, v)} ${x + w},${y + h}`} fill={fill} />}
  <polyline points={pts(x, y, w, h, v)} fill="none" stroke={c} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dash} />
</g>;
const Pill = ({ x, y, w, label, f = EMS, t = EM, h = 18, s = 9 }) => <g><R x={x} y={y} w={w} h={h} r={h / 2} f={f} /><T x={x + w / 2} y={y + h / 2 + s / 2.8} s={s} w={600} f={t} a="middle">{label}</T></g>;
const Check = ({ x, y, ok = true, c }) => <g><C cx={x} cy={y} r={7} f={c || (ok ? EM : G2)} />{ok && <path d={`M${x - 3} ${y}l2 2.2 4-4.4`} stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" />}</g>;
const Card = ({ x, y, w, h, r = 10, f = W, children, shadow = true }) => <g>{shadow && <rect x={x + 2} y={y + 6} width={w} height={h} rx={r} fill={INK} opacity=".06" />}<rect x={x} y={y} width={w} height={h} rx={r} fill={f} stroke={G2} />{children}</g>;
const Pin = ({ x, y, c = EM, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 0c-8 -10 -12 -16 -12 -22a12 12 0 0 1 24 0c0 6 -4 12 -12 22z" fill={c} /><circle cx="0" cy="-22" r="4.5" fill={W} /></g>;
const MapBg = ({ x, y, w, h, r = 10 }) => <g>
  <clipPath id={`mc${x}${y}`}><rect x={x} y={y} width={w} height={h} rx={r} /></clipPath>
  <g clipPath={`url(#mc${x}${y})`}>
    <rect x={x} y={y} width={w} height={h} fill="#eef3ef" />
    <path d={`M${x} ${y + h * 0.62}C${x + w * 0.3} ${y + h * 0.5} ${x + w * 0.55} ${y + h * 0.85} ${x + w} ${y + h * 0.7}`} stroke="#cfe6f5" strokeWidth="14" fill="none" />
    <rect x={x + w * 0.62} y={y + h * 0.08} width={w * 0.22} height={h * 0.26} rx="6" fill="#dcefe0" />
    {[0.2, 0.45, 0.72].map(t => <line key={t} x1={x + w * t} y1={y} x2={x + w * t + 30} y2={y + h} stroke={W} strokeWidth="6" />)}
    {[0.25, 0.5].map(t => <line key={t} x1={x} y1={y + h * t} x2={x + w} y2={y + h * t - 18} stroke={W} strokeWidth="5" />)}
  </g>
</g>;

/* ---------- App Development ---------- */
function AppWellness() {
  return <>
    <Bg f="#eaf5ef" />
    <C cx={520} cy={80} r={70} f={EMS} o={.7} />
    <Phone x={150} y={42}>
      <T x={16} y={28} s={9} f={MU}>Good morning</T>
      <T x={16} y={46} s={15} w={700}>Today's goals</T>
      <Ring cx={74} cy={122} r={50} p={.78} sw={11} />
      <Ring cx={74} cy={122} r={36} p={.55} c={INK} sw={11} />
      <Ring cx={74} cy={122} r={22} p={.9} c={EM2} sw={11} track={EMS} />
      {[['Water', '6 / 8', EM2], ['Sleep', '7h 10m', INK], ['Move', '5,200', EM]].map(([a, b, c], i) => <g key={a}>
        <R x={12} y={192 + i * 32} w={124} h={26} r={8} f={G1} /><C cx={24} cy={205 + i * 32} r={4} f={c} />
        <T x={34} y={208 + i * 32} s={9} w={600}>{a}</T><T x={128} y={208 + i * 32} s={9} f={MU} a="end">{b}</T>
      </g>)}
    </Phone>
    <Phone x={335} y={72} w={150} h={310}>
      <T x={14} y={28} s={13} w={700}>This week</T>
      <T x={14} y={44} s={8.5} f={MU}>Water intake · glasses</T>
      <Bars x={10} y={56} w={118} h={100} v={[.5, .7, .62, .9, .8, .45, .75]} hi={3} />
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <T key={i} x={18.5 + i * 16.9} y={170} s={7.5} f={MU} a="middle">{d}</T>)}
      <R x={10} y={184} w={118} h={58} r={12} f={INK} />
      <T x={22} y={204} s={8} f="#9fb3aa">Quick log</T>
      <T x={22} y={224} s={13} w={700} f={W}>+ 1 glass</T>
      <C cx={112} cy={213} r={11} f={EM2} />
    </Phone>
    <Card x={44} y={260} w={124} h={52} r={12}><C cx={66} cy={286} r={11} f={EMS} /><T x={82} y={282} s={8.5} f={MU}>Streak</T><T x={82} y={296} s={12} w={700}>12 days</T></Card>
  </>;
}
function AppProductivity() {
  return <>
    <Bg f="#f1f5f3" />
    <Browser x={40} y={44} w={430} h={300} url="focus.app/dashboard">
      <R x={0} y={0} w={92} h={272} r={0} f={INK} />
      <T x={16} y={28} s={12} w={800} f={W}>Focus</T>
      {['Overview', 'Tasks', 'Calendar', 'Reports'].map((l, i) => <g key={l}><R x={10} y={48 + i * 26} w={72} h={20} r={6} f={i === 0 ? '#1f2a26' : INK} /><T x={20} y={61 + i * 26} s={8.5} f={i === 0 ? EM2 : '#a3b1ab'}>{l}</T></g>)}
      <T x={110} y={30} s={14} w={700}>Good afternoon</T>
      <T x={110} y={46} s={8.5} f={MU}>3 priorities · 2 deadlines this week</T>
      <Card x={110} y={60} w={196} h={118} shadow={false}><T x={124} y={80} s={9} w={600}>Focus time</T><T x={292} y={80} s={8} f={MU} a="end">Hours / day</T><Bars x={122} y={90} w={172} h={76} v={[.4, .65, .5, .85, .7]} hi={3} /></Card>
      <Card x={316} y={60} w={100} h={118} shadow={false}><Ring cx={366} cy={112} r={28} p={.68} sw={8} /><T x={366} y={116} s={12} w={800} a="middle">68%</T><T x={366} y={164} s={8} f={MU} a="middle">Weekly goal</T></Card>
      <Card x={110} y={188} w={306} h={72} shadow={false}>
        <T x={124} y={206} s={9} w={600}>Priorities</T>
        {[0, 1, 2].map(i => <g key={i}><Check x={130} y={222 + i * 13} ok={i === 0} /><R x={144} y={219 + i * 13} w={[150, 120, 170][i]} h={6} r={3} f={G2} /></g>)}
      </Card>
    </Browser>
    <Phone x={440} y={90} w={150} h={300}>
      <T x={69} y={40} s={9} f={MU} a="middle">Deep work</T>
      <Ring cx={69} cy={110} r={48} p={.62} sw={9} />
      <T x={69} y={116} s={20} w={800} a="middle">24:10</T>
      <R x={22} y={180} w={94} h={30} r={15} f={INK} /><T x={69} y={199} s={10} w={700} f={W} a="middle">Pause</T>
      <T x={69} y={236} s={8} f={MU} a="middle">Next: Review draft</T>
    </Phone>
  </>;
}
function AppLearning() {
  return <>
    <Bg f="#eef6f1" />
    <path d="M60 360 L180 300 L300 340 L420 270 L580 320" stroke={EMS} strokeWidth="40" fill="none" strokeLinecap="round" opacity=".7" />
    <Phone x={120} y={40}>
      <T x={14} y={28} s={14} w={700}>Hi, learner 👋</T>
      <R x={10} y={40} w={128} h={86} r={14} f={EM} />
      <T x={22} y={62} s={8} f="#c9f5e2">CONTINUE</T>
      <T x={22} y={80} s={12} w={700} f={W}>Intro to Design</T>
      <T x={22} y={94} s={8} f="#c9f5e2">Lesson 4 · 5 min</T>
      <R x={22} y={106} w={104} h={6} r={3} f="#0a7a57" /><R x={22} y={106} w={64} h={6} r={3} f={W} />
      <T x={14} y={148} s={10} w={700}>Chapters</T>
      {[['Basics', 1], ['Colour', .7], ['Typography', .35], ['Layout', 0]].map(([l, p], i) => <g key={l}>
        <R x={10} y={158 + i * 30} w={128} h={24} r={8} f={G1} />
        <T x={20} y={174 + i * 30} s={8.5} w={600}>{l}</T>
        <R x={80} y={168 + i * 30} w={48} h={5} r={2.5} f={G2} /><R x={80} y={168 + i * 30} w={48 * p} h={5} r={2.5} f={EM} />
      </g>)}
    </Phone>
    <Phone x={330} y={70} w={150} h={310}>
      <T x={14} y={26} s={8} f={MU}>QUIZ · 3 of 5</T>
      <T x={14} y={46} s={11} w={700}>Which colour has</T>
      <T x={14} y={60} s={11} w={700}>the most contrast?</T>
      {['Grey on white', 'Black on white', 'Green on teal'].map((l, i) => <g key={l}>
        <R x={10} y={78 + i * 34} w={118} h={28} r={9} f={i === 1 ? EMX : W} s={i === 1 ? EM : G2} sw={1.5} />
        <T x={22} y={96 + i * 34} s={9}>{l}</T>{i === 1 && <Check x={114} y={92 + i * 34} />}
      </g>)}
      <R x={10} y={196} w={118} h={30} r={15} f={INK} /><T x={69} y={215} s={10} w={700} f={W} a="middle">Continue</T>
      <T x={69} y={250} s={8} f={MU} a="middle">🔥 4-day streak</T>
    </Phone>
  </>;
}
function AppTasks() {
  return <>
    <Bg f="#f0f4f2" />
    <Card x={300} y={56} w={300} h={300} r={16}>
      <T x={318} y={84} s={13} w={700}>Website launch</T><T x={584} y={84} s={8.5} f={MU} a="end">Board</T>
      {[['To do', 3], ['Doing', 2], ['Done', 2]].map(([l, n], c) => <g key={l}>
        <R x={316 + c * 94} y={98} w={86} h={244} r={10} f={G1} />
        <T x={326 + c * 94} y={116} s={8.5} w={700}>{l}</T><T x={392 + c * 94} y={116} s={8} f={MU} a="end">{n}</T>
        {Array.from({ length: n }, (_, i) => <g key={i}><R x={322 + c * 94} y={126 + i * 60} w={74} h={52} r={8} f={W} s={G2} />
          <R x={330 + c * 94} y={136 + i * 60} w={26} h={8} r={4} f={[EMS, '#fde68a', '#e0e7ff'][(c + i) % 3]} />
          <Lines x={330 + c * 94} y={152 + i * 60} w={56} n={2} gap={10} h={5} />
        </g>)}
      </g>)}
    </Card>
    <Phone x={80} y={44}>
      <T x={14} y={28} s={8.5} f={MU}>Tuesday</T>
      <T x={14} y={46} s={15} w={700}>Today</T>
      <Pill x={92} y={34} w={46} label="5 left" />
      {[['Design review', 'High', true], ['Send invoice', 'Med', false], ['Update copy', 'High', false], ['Plan sprint', 'Low', false], ['Reply to client', 'Med', false]].map(([l, p, d], i) => <g key={l}>
        <R x={10} y={60 + i * 40} w={128} h={34} r={10} f={i === 1 ? EMX : G1} />
        <Check x={26} y={77 + i * 40} ok={d} />
        <T x={40} y={75 + i * 40} s={8.5} w={600} f={d ? MU : INK}>{l}</T>
        <T x={40} y={86 + i * 40} s={7} f={p === 'High' ? EM : MU}>{p} priority</T>
      </g>)}
      <C cx={120} cy={278} r={15} f={INK} /><T x={120} y={283} s={16} w={400} f={W} a="middle">+</T>
    </Phone>
  </>;
}
function AppUtility() {
  const tiles = [['Convert', 'm ↔ ft'], ['Tip', '15%'], ['Notes', '3'], ['Timer', '05:00'], ['Split', '÷ 4'], ['Units', 'kg']];
  return <>
    <Bg f="#ecf4f0" />
    <Phone x={140} y={40}>
      <T x={14} y={28} s={15} w={700}>Toolkit</T>
      <T x={14} y={42} s={8} f={MU}>Everyday tools</T>
      {tiles.map(([a, b], i) => <g key={a}>
        <R x={10 + (i % 2) * 66} y={54 + Math.floor(i / 2) * 64} w={60} h={58} r={12} f={i === 0 ? INK : G1} />
        <R x={18 + (i % 2) * 66} y={62 + Math.floor(i / 2) * 64} w={16} h={16} r={5} f={i === 0 ? EM2 : EMS} />
        <T x={18 + (i % 2) * 66} y={94 + Math.floor(i / 2) * 64} s={8.5} w={700} f={i === 0 ? W : INK}>{a}</T>
        <T x={18 + (i % 2) * 66} y={104 + Math.floor(i / 2) * 64} s={7} f={MU}>{b}</T>
      </g>)}
      <T x={14} y={268} s={8} f={MU}>Recent · 2.5 m = 8.2 ft</T>
    </Phone>
    <Phone x={340} y={60} w={150} h={320}>
      <T x={14} y={26} s={8} f={MU}>Convert · Length</T>
      <R x={10} y={36} w={118} h={44} r={10} f={G1} /><T x={20} y={52} s={7.5} f={MU}>Metres</T><T x={118} y={70} s={16} w={800} a="end">2.5</T>
      <R x={10} y={86} w={118} h={44} r={10} f={EMX} s={EM} /><T x={20} y={102} s={7.5} f={EM}>Feet</T><T x={118} y={120} s={16} w={800} f={EM} a="end">8.20</T>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k, i) => <g key={i}>
        <R x={10 + (i % 3) * 40} y={140 + Math.floor(i / 3) * 34} w={36} h={28} r={8} f={G1} />
        <T x={28 + (i % 3) * 40} y={158 + Math.floor(i / 3) * 34} s={10} w={600} a="middle">{k}</T>
      </g>)}
    </Phone>
  </>;
}

/* ---------- Website Development ---------- */
function WebHomepage() {
  return <>
    <Bg f="#f3f4f1" />
    <Browser x={50} y={36} w={540} h={350} url="studio.design">
      <T x={24} y={28} s={11} w={800}>STUDIO.</T>
      {['Work', 'Services', 'About'].map((l, i) => <T key={l} x={330 + i * 54} y={28} s={8.5} f={MU}>{l}</T>)}
      <R x={470} y={16} w={50} h={18} r={9} f={INK} /><T x={495} y={28} s={8} w={700} f={W} a="middle">Contact</T>
      <T x={24} y={88} s={30} w={800}>We design</T>
      <T x={24} y={122} s={30} w={800}>brands that</T>
      <T x={24} y={156} s={30} w={800} f={EM}>move people.</T>
      <Lines x={24} y={172} w={190} n={2} gap={11} />
      <R x={24} y={200} w={86} h={26} r={13} f={INK} /><T x={67} y={217} s={8.5} w={700} f={W} a="middle">See our work</T>
      <R x={290} y={52} w={226} h={176} r={12} f={INK} />
      <C cx={404} cy={140} r={54} f={EM} /><R x={330} y={176} w={60} h={34} r={6} f={W} o={.95} /><R x={418} y={76} w={76} h={46} r={6} f={'#1d2723'} />
      <T x={302} y={70} s={8} f="#8ea69c" ls={1}>FEATURED CASE</T>
      {[0, 1, 2].map(i => <g key={i}><R x={24 + i * 168} y={246} w={156} h={60} r={10} f={G1} /><T x={36 + i * 168} y={266} s={7.5} f={EM} w={700}>0{i + 1}</T><T x={36 + i * 168} y={282} s={9.5} w={700}>{['Branding', 'Web design', 'Strategy'][i]}</T><R x={36 + i * 168} y={290} w={100} h={5} r={2.5} f={G2} /></g>)}
    </Browser>
  </>;
}
function WebBusiness() {
  return <>
    <Bg f="#f6f3ee" />
    <Browser x={36} y={40} w={420} h={320} url="brewandco.cafe">
      <R x={0} y={0} w={420} h={170} r={0} f="#2b211b" />
      <C cx={330} cy={80} r={64} f="#3b2e25" /><C cx={330} cy={80} r={40} f="#5a4436" /><C cx={330} cy={80} r={22} f="#7c5c45" />
      <T x={24} y={28} s={11} w={800} f={W}>Brew & Co.</T>
      <T x={24} y={78} s={22} w={800} f={W}>Fresh coffee,</T>
      <T x={24} y={104} s={22} w={800} f="#fcd9a8">around the corner.</T>
      <R x={24} y={122} w={78} h={24} r={12} f={W} /><T x={63} y={138} s={8.5} w={700} a="middle">View menu</T>
      <R x={110} y={122} w={78} h={24} r={12} f="none" s="#fff" /><T x={149} y={138} s={8.5} w={700} f={W} a="middle">Directions</T>
      {[['Open today', '7am – 8pm'], ['Find us', 'Main Street'], ['Call', 'Tap to call']].map(([a, b], i) => <g key={a}><R x={20 + i * 130} y={186} w={120} h={48} r={10} f={i === 0 ? EMX : G1} /><T x={32 + i * 130} y={204} s={7.5} f={i === 0 ? EM : MU} w={700}>{a.toUpperCase()}</T><T x={32 + i * 130} y={222} s={10} w={700}>{b}</T></g>)}
      <T x={24} y={262} s={11} w={700}>Popular</T>
      {[0, 1, 2, 3].map(i => <R key={i} x={20 + i * 98} y={270} w={90} h={18} r={9} f={G1} />)}
    </Browser>
    <Phone x={450} y={74} w={146} h={300}>
      <R x={0} y={0} w={134} h={100} r={0} f="#2b211b" />
      <T x={12} y={22} s={9} w={800} f={W}>Brew & Co.</T>
      <T x={12} y={58} s={13} w={800} f={W}>Fresh coffee,</T>
      <T x={12} y={74} s={13} w={800} f="#fcd9a8">around the corner.</T>
      <T x={12} y={124} s={10} w={700}>Menu</T>
      {[['Flat white', '₹180'], ['Cold brew', '₹210'], ['Croissant', '₹150'], ['Iced latte', '₹200']].map(([a, b], i) => <g key={a}>
        <R x={8} y={134 + i * 30} w={118} h={24} r={8} f={G1} /><T x={16} y={150 + i * 30} s={8.5} w={600}>{a}</T><T x={118} y={150 + i * 30} s={8.5} f={MU} a="end">{b}</T>
      </g>)}
    </Phone>
  </>;
}
function WebEducation() {
  return <>
    <Bg f="#eff4f6" />
    <Browser x={50} y={36} w={540} h={350} url="brightpath.edu">
      <T x={24} y={28} s={11} w={800}>BrightPath</T>
      {['Courses', 'Admissions', 'Faculty', 'Contact'].map((l, i) => <T key={l} x={290 + i * 62} y={28} s={8.5} f={MU}>{l}</T>)}
      <R x={0} y={44} w={540} h={92} r={0} f={EMX} />
      <T x={24} y={78} s={20} w={800}>Find the right course.</T>
      <R x={24} y={92} w={300} h={28} r={14} f={W} s={G2} /><T x={40} y={110} s={8.5} f={MU}>Search courses, subjects…</T><R x={262} y={96} w={58} h={20} r={10} f={EM} /><T x={291} y={110} s={8} w={700} f={W} a="middle">Search</T>
      <C cx={460} cy={92} r={36} f={EMS} /><R x={438} y={74} w={44} h={34} r={4} f={EM} /><R x={444} y={80} w={32} h={4} r={2} f={W} o={.7} />
      {['All', 'Beginner', 'Science', 'Arts', 'Commerce'].map((l, i) => <Pill key={l} x={24 + i * 66} y={150} w={58} label={l} f={i === 0 ? INK : G1} t={i === 0 ? W : INK} />)}
      {[['Physics Basics', 'Science', '#dbeafe'], ['Creative Writing', 'Arts', '#fde68a'], ['Accounting 101', 'Commerce', EMS], ['Coding for Kids', 'Beginner', '#e9d5ff']].map(([t, c, f], i) => <g key={t}>
        <Card x={24 + i * 126} y={182} w={116} h={130} shadow={false}>
          <R x={30 + i * 126} y={188} w={104} h={52} r={7} f={f} />
          <T x={32 + i * 126} y={256} s={9} w={700}>{t}</T>
          <T x={32 + i * 126} y={270} s={7.5} f={MU}>{c} · 8 weeks</T>
          <T x={32 + i * 126} y={298} s={8} w={700} f={EM}>View course →</T>
        </Card>
      </g>)}
    </Browser>
  </>;
}
function WebPortfolio() {
  const tiles = [[24, 54, 170, 150, INK], [204, 54, 150, 90, '#e8d9c8'], [364, 54, 152, 190, EM], [204, 154, 150, 140, '#cbd5e1'], [24, 214, 170, 80, '#f1e3d3'], [364, 254, 152, 40, G1]];
  return <>
    <Bg f="#f4f3f1" />
    <Browser x={50} y={36} w={540} h={350} url="folio.studio">
      <T x={24} y={30} s={14} w={800}>folio/</T><T x={516} y={30} s={8.5} f={MU} a="end">Index · Info · Contact</T>
      {tiles.map(([x, y, w, h, f], i) => <g key={i}><R x={x} y={y} w={w} h={h} r={8} f={f} />
        {i === 0 && <><C cx={x + 120} cy={y + 60} r={34} f={EM2} /><R x={x + 18} y={y + 104} w={70} h={8} r={4} f={W} /><R x={x + 18} y={y + 118} w={46} h={6} r={3} f="#55625c" /></>}
        {i === 2 && <><C cx={x + 76} cy={y + 80} r={40} f="#34d399" o={.6} /><C cx={x + 76} cy={y + 80} r={20} f={W} o={.9} /></>}
        {i === 3 && <path d={`M${x + 20} ${y + 110}L${x + 60} ${y + 60}L${x + 90} ${y + 90}L${x + 130} ${y + 40}`} stroke={INK} strokeWidth="3" fill="none" />}
      </g>)}
      <T x={24} y={312} s={8} f={MU}>Selected projects · 2024 — present</T>
    </Browser>
  </>;
}
function WebLanding() {
  return <>
    <Bg f="#f0f5f2" />
    <Browser x={50} y={36} w={540} h={350} url="launchpad.app" dark>
      <T x={24} y={28} s={11} w={800} f={W}>◆ Launchpad</T>
      <R x={456} y={16} w={64} h={18} r={9} f={EM2} /><T x={488} y={28} s={8} w={700} f={INK} a="middle">Start free</T>
      <Pill x={210} y={52} w={120} label="NEW · Team workspaces" f="#173a2e" t={EM2} />
      <T x={270} y={98} s={24} w={800} f={W} a="middle">Ship your product,</T>
      <T x={270} y={126} s={24} w={800} f={EM2} a="middle">not your to-do list.</T>
      <R x={186} y={142} w={168} h={6} r={3} f="#2a3531" />
      <R x={110} y={164} w={320} h={60} r={10} f="#1b2420" s="#2a3531" />
      <Line x={126} y={174} w={190} h={40} v={[.2, .35, .3, .55, .5, .75, .9]} c={EM2} fill="rgba(16,185,129,.15)" />
      <R x={334} y={176} w={82} h={14} r={4} f="#2a3531" /><R x={334} y={196} w={60} h={14} r={4} f="#2a3531" />
      {[['Starter', 'Free', false], ['Pro', '₹999', true], ['Team', '₹2,499', false]].map(([n, p, hi], i) => <g key={n}>
        <R x={72 + i * 136} y={238} w={124} h={70} r={10} f={hi ? W : '#1b2420'} s={hi ? undefined : '#2a3531'} />
        <T x={84 + i * 136} y={256} s={8} w={700} f={hi ? EM : '#8ea69c'}>{n.toUpperCase()}</T>
        <T x={84 + i * 136} y={278} s={15} w={800} f={hi ? INK : W}>{p}</T>
        <R x={84 + i * 136} y={288} w={80} h={5} r={2.5} f={hi ? G2 : '#2a3531'} />
      </g>)}
    </Browser>
  </>;
}

/* ---------- AI & Machine Learning ---------- */
function AiDashboard() {
  return <>
    <Bg f={INK} dark />
    <C cx={540} cy={70} r={120} f={EM} o={.12} />
    <Browser x={40} y={36} w={560} h={350} dark url="insight.ai/overview">
      {[['Sessions', '12.4k', [.3, .5, .4, .7, .6, .8]], ['Sign-ups', '842', [.6, .5, .7, .6, .8, .9]], ['Churn', '2.1%', [.7, .6, .65, .5, .45, .4]]].map(([a, b, v], i) => <g key={a}>
        <R x={20 + i * 120} y={20} w={110} h={74} r={10} f="#1a211e" s="#26302c" />
        <T x={32 + i * 120} y={40} s={8} f="#8ea69c">{a}</T><T x={32 + i * 120} y={62} s={16} w={800} f={W}>{b}</T>
        <Line x={32 + i * 120} y={70} w={86} h={16} v={v} c={EM2} sw={2} />
      </g>)}
      <R x={20} y={106} w={350} h={190} r={10} f="#1a211e" s="#26302c" />
      <T x={34} y={128} s={9} w={700} f={W}>Weekly activity</T><Pill x={300} y={116} w={56} label="Illustrative" f="#173a2e" t={EM2} h={16} s={7.5} />
      <Line x={34} y={144} w={322} h={130} v={[.3, .42, .38, .55, .5, .68, .62, .8, .74, .9]} c={EM2} fill="rgba(16,185,129,.14)" />
      <Line x={34} y={144} w={322} h={130} v={[.2, .25, .3, .28, .36, .4, .38, .46, .5, .52]} c="#4b5a54" sw={2} dash="4 4" />
      <R x={382} y={20} w={158} h={276} r={10} f="#121715" s="#2a3531" />
      <C cx={398} cy={40} r={7} f={EM2} /><T x={412} y={44} s={9} w={700} f={W}>Assistant</T>
      <R x={394} y={58} w={134} h={40} r={8} f="#1f2a26" /><T x={404} y={74} s={8} f="#cfe3da">Why did sign-ups rise</T><T x={404} y={88} s={8} f="#cfe3da">this week?</T>
      <R x={394} y={106} w={134} h={92} r={8} f="#173a2e" />
      <Lines x={404} y={118} w={112} n={4} gap={11} h={5} f="#2f6b54" />
      <T x={404} y={180} s={7.5} w={700} f={EM2}>Source: Sign-ups table ↗</T>
      {['Compare to last month', 'Show by channel'].map((l, i) => <g key={l}><R x={394} y={208 + i * 26} w={134} h={20} r={10} f="none" s="#2f3b36" /><T x={404} y={221 + i * 26} s={7.5} f="#a3b1ab">{l}</T></g>)}
      <R x={394} y={262} w={134} h={24} r={12} f="#1f2a26" /><T x={406} y={277} s={7.5} f="#6b7a73">Ask a question…</T>
    </Browser>
  </>;
}
function AiDocument() {
  return <>
    <Bg f="#0f1412" dark />
    <Card x={60} y={44} w={240} h={330} r={8}>
      <T x={80} y={76} s={14} w={800}>INVOICE</T><T x={280} y={76} s={8} f={MU} a="end">#INV-0042</T>
      <R x={76} y={92} w={110} h={34} r={4} f="rgba(16,185,129,.12)" s={EM2} sw={1.5} />
      <Lines x={82} y={100} w={96} n={2} gap={11} h={5} f={G3} />
      <R x={196} y={92} w={88} h={22} r={4} f="rgba(16,185,129,.12)" s={EM2} sw={1.5} /><Lines x={202} y={100} w={70} n={1} h={5} f={G3} last={1} />
      {[0, 1, 2, 3, 4].map(i => <g key={i}><R x={80} y={150 + i * 22} w={130} h={6} r={3} f={G2} /><R x={240} y={150 + i * 22} w={40} h={6} r={3} f={G2} /></g>)}
      <line x1="80" y1="268" x2="280" y2="268" stroke={G2} />
      <R x={196} y={278} w={88} h={26} r={4} f="rgba(16,185,129,.12)" s={EM2} sw={1.5} />
      <T x={204} y={295} s={10} w={800}>₹ 24,500</T>
      <rect x="60" y="180" width="240" height="3" fill={EM2} opacity=".8"><animate attributeName="y" values="60;360;60" dur="4s" repeatCount="indefinite" /></rect>
    </Card>
    <path d="M312 210 h28" stroke={EM2} strokeWidth="2" strokeDasharray="4 4" /><path d="M336 204 l8 6 -8 6" stroke={EM2} strokeWidth="2" fill="none" />
    <R x={356} y={44} w={230} h={330} r={14} f="#161d1a" s="#26302c" />
    <T x={374} y={72} s={11} w={700} f={W}>Extracted fields</T>
    <T x={374} y={88} s={8} f="#8ea69c">Review before approving</T>
    {[['Vendor', 'Acme Supplies', .96], ['Invoice no.', 'INV-0042', .99], ['Date', '12 Mar', .93], ['Total', '₹ 24,500', .97], ['Tax ID', 'Needs review', .58]].map(([a, b, c], i) => <g key={a}>
      <R x={370} y={102 + i * 46} w={202} h={38} r={8} f="#1d2622" s={c < .7 ? AMB : '#26302c'} />
      <T x={382} y={117 + i * 46} s={7.5} f="#8ea69c">{a}</T><T x={382} y={131 + i * 46} s={9.5} w={700} f={c < .7 ? AMB : W}>{b}</T>
      <R x={510} y={116 + i * 46} w={50} h={5} r={2.5} f="#2a3531" /><R x={510} y={116 + i * 46} w={50 * c} h={5} r={2.5} f={c < .7 ? AMB : EM2} />
    </g>)}
    <R x={370} y={334} w={96} h={26} r={13} f={EM2} /><T x={418} y={351} s={9} w={700} f={INK} a="middle">Approve</T>
    <R x={474} y={334} w={98} h={26} r={13} f="none" s="#3a4641" /><T x={523} y={351} s={9} w={600} f="#cfe3da" a="middle">Edit fields</T>
  </>;
}
function AiSearch() {
  return <>
    <Bg f="#0d1110" dark />
    <C cx={320} cy={40} r={160} f={EM} o={.08} />
    <T x={320} y={62} s={10} w={700} f={EM2} a="middle" ls={2}>ASKBASE</T>
    <R x={100} y={78} w={440} h={46} r={23} f="#171f1c" s={EM2} sw={1.5} />
    <C cx={126} cy={101} r={8} f="none" s={EM2} sw={2} />
    <T x={144} y={105} s={11} f={W}>How do I reset a customer's password?</T>
    <R x={486} y={86} w={46} h={30} r={15} f={EM2} /><path d="M502 101h14m-5-5 5 5-5 5" stroke={INK} strokeWidth="2" fill="none" />
    <R x={100} y={140} w={440} h={110} r={14} f="#161d1a" s="#26302c" />
    <Pill x={116} y={154} w={78} label="✦ AI ANSWER" f="#173a2e" t={EM2} />
    <Lines x={116} y={184} w={404} n={3} gap={13} h={6} f="#33413b" />
    {['Help centre §2', 'Admin guide p.14'].map((l, i) => <g key={l}><R x={116 + i * 110} y={224} w={100} h={16} r={8} f="#1f2a26" /><T x={126 + i * 110} y={235} s={7.5} f={EM2}>[{i + 1}] {l}</T></g>)}
    {[0, 1].map(i => <g key={i}><R x={100 + i * 226} y={264} w={214} h={74} r={12} f="#141a18" s="#26302c" />
      <T x={116 + i * 226} y={284} s={9} w={700} f={W}>{['Resetting passwords', 'Account recovery'][i]}</T>
      <T x={316 + i * 226 - 12} y={284} s={7.5} f={EM2} a="end">{['94% match', '81% match'][i]}</T>
      <Lines x={116 + i * 226} y={296} w={180} n={3} gap={10} h={5} f="#2a3531" />
    </g>)}
    {['Two-factor login', 'User roles', 'Security settings'].map((l, i) => <g key={l}><R x={150 + i * 116} y={354} w={106} h={22} r={11} f="none" s="#33413b" /><T x={203 + i * 116} y={369} s={8} f="#a3b1ab" a="middle">{l}</T></g>)}
  </>;
}
function AiMl() {
  const pts1 = [[80, 120], [96, 104], [110, 130], [92, 140], [120, 112], [104, 92], [130, 136], [84, 98]];
  const pts2 = [[190, 200], [210, 186], [224, 210], [200, 220], [182, 214], [230, 192], [214, 228]];
  const pts3 = [[150, 240], [130, 258], [160, 262], [118, 236], [142, 270], [170, 248]];
  return <>
    <Bg f="#0c100f" dark />
    <R x={36} y={40} w={250} h={260} r={14} f="#151c19" s="#26302c" />
    <T x={52} y={64} s={10} w={700} f={W}>Clusters</T><T x={270} y={64} s={8} f="#8ea69c" a="end">k = 3</T>
    {[...Array(5)].map((_, i) => <line key={i} x1="52" y1={84 + i * 48} x2="270" y2={84 + i * 48} stroke="#1f2925" />)}
    {pts1.map(([x, y], i) => <C key={'a' + i} cx={x} cy={y} r={5} f={EM2} />)}
    {pts2.map(([x, y], i) => <C key={'b' + i} cx={x} cy={y} r={5} f={W} o={.85} />)}
    {pts3.map(([x, y], i) => <C key={'c' + i} cx={x} cy={y} r={5} f={AMB} o={.9} />)}
    <C cx={104} cy={116} r={36} f="none" s={EM2} sw={1} /><C cx={208} cy={206} r={32} f="none" s="#fff" sw={1} o={.4} />
    <R x={300} y={40} w={304} h={140} r={14} f="#151c19" s="#26302c" />
    <T x={316} y={64} s={10} w={700} f={W}>Training loss</T>
    <Pill x={524} y={52} w={66} label="Epoch 40" f="#173a2e" t={EM2} h={16} s={7.5} />
    <Line x={316} y={76} w={270} h={88} v={[.95, .7, .52, .42, .34, .3, .26, .24, .22, .21, .2]} c={EM2} />
    <Line x={316} y={76} w={270} h={88} v={[.95, .75, .6, .5, .45, .42, .4, .4, .39, .39, .39]} c="#5d6e67" sw={2} dash="4 4" />
    <R x={300} y={194} w={304} h={186} r={14} f="#151c19" s="#26302c" />
    <T x={316} y={218} s={10} w={700} f={W}>Confusion matrix</T>
    {[[.9, .06, .04], [.08, .84, .08], [.03, .1, .87]].map((row, i) => row.map((v, j) => <g key={`${i}${j}`}>
      <rect x={316 + j * 52} y={232 + i * 46} width="48" height="42" rx="6" fill={EM2} opacity={0.12 + v * 0.88} />
      <T x={340 + j * 52} y={258 + i * 46} s={10} w={700} f={v > .5 ? INK : '#cfe3da'} a="middle">{Math.round(v * 100)}</T>
    </g>))}
    <Lines x={490} y={240} w={96} n={5} gap={14} h={5} f="#2a3531" />
    <R x={36} y={314} w={250} h={66} r={14} f="#173a2e" />
    <T x={52} y={340} s={9} w={700} f={EM2}>Plain-language summary</T>
    <Lines x={52} y={352} w={214} n={2} gap={10} h={5} f="#2f6b54" />
  </>;
}

/* ---------- Content Creation ---------- */
function ContentVideo() {
  return <>
    <Bg f="#141414" dark />
    <R x={30} y={30} w={580} h={360} r={14} f="#1c1c1c" s="#2b2b2b" />
    <R x={46} y={46} w={110} h={200} r={8} f="#242424" />
    <T x={56} y={66} s={8.5} w={700} f="#d4d4d4">Media</T>
    {[0, 1, 2, 3].map(i => <R key={i} x={56 + (i % 2) * 48} y={78 + Math.floor(i / 2) * 50} w={42} h={42} r={5} f={['#3b3b3b', '#2f4a3f', '#4a3b2f', '#3b3f4a'][i]} />)}
    <R x={170} y={46} w={300} h={200} r={8} f="#000" />
    <C cx={320} cy={130} r={48} f={EM} o={.35} /><R x={252} y={190} w={136} h={20} r={4} f={W} o={.95} /><T x={320} y={204} s={9} w={800} a="middle">3 editing tips</T>
    <path d="M312 118 l20 12 -20 12z" fill={W} />
    <R x={484} y={46} w={110} h={200} r={8} f="#242424" />
    <T x={494} y={66} s={8.5} w={700} f="#d4d4d4">Export</T>
    {[['9:16', true], ['16:9', false], ['1:1', false]].map(([l, a], i) => <g key={l}><R x={494} y={78 + i * 34} w={90} h={26} r={6} f={a ? EM : '#2e2e2e'} /><T x={504} y={95 + i * 34} s={8.5} w={700} f={W}>{l}</T></g>)}
    <R x={494} y={186} w={90} h={46} r={6} f="#2e2e2e" /><T x={504} y={204} s={7.5} f="#a3a3a3">Captions</T><R x={504} y={212} w={40} h={10} r={5} f={EM2} />
    <R x={46} y={260} w={548} h={116} r={8} f="#202020" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <T key={i} x={110 + i * 46} y={276} s={7} f="#6b6b6b">0:{String(i * 3).padStart(2, '0')}</T>)}
    {[['V1', [[110, 140, '#3f6b5a'], [256, 120, '#3f6b5a'], [382, 200, '#3f6b5a']]], ['T', [[130, 90, AMB], [240, 100, AMB], [370, 120, AMB], [500, 70, AMB]]], ['A1', [[110, 472, '#2f4f7a']]]].map(([l, cl], r) => <g key={l}>
      <T x={62} y={302 + r * 28} s={8} w={700} f="#a3a3a3">{l}</T>
      {cl.map(([x, w, f], i) => <R key={i} x={x} y={288 + r * 28} w={w} h={20} r={4} f={f} />)}
    </g>)}
    <rect x="298" y="282" width="2" height="90" fill={EM2} /><C cx={299} cy={282} r={5} f={EM2} />
  </>;
}
function ContentCalendar() {
  const posts = { 2: ['#10b981', 'Reel'], 4: ['#0c0f0e', 'Post'], 6: ['#f59e0b', 'Video'], 9: ['#10b981', 'Reel'], 11: ['#6366f1', 'Story'], 13: ['#0c0f0e', 'Post'], 16: ['#f59e0b', 'Video'], 17: ['#10b981', 'Reel'], 20: ['#6366f1', 'Story'], 23: ['#10b981', 'Reel'], 25: ['#0c0f0e', 'Post'], 27: ['#f59e0b', 'Video'], 30: ['#10b981', 'Reel'] };
  return <>
    <Bg f="#f7f2ea" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Content calendar</T><T x={62} y={82} s={8.5} f={MU}>Monthly plan · illustrative</T>
      {[['Reel', EM2], ['Post', INK], ['Video', AMB], ['Story', '#6366f1']].map(([l, c], i) => <g key={l}><C cx={370 + i * 58} cy={70} r={4} f={c} /><T x={378 + i * 58} y={73} s={8} f={MU}>{l}</T></g>)}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => <T key={d} x={62 + i * 76} y={106} s={8} w={700} f={MU}>{d}</T>)}
      {Array.from({ length: 35 }, (_, k) => { const day = k - 1; const x = 58 + (k % 7) * 76, y = 114 + Math.floor(k / 7) * 52; const p = posts[day]; return <g key={k}>
        <R x={x} y={y} w={70} h={46} r={7} f={day < 1 || day > 30 ? 'transparent' : day === 12 ? EMX : G1} s={day === 12 ? EM : undefined} />
        {day >= 1 && day <= 30 && <T x={x + 8} y={y + 14} s={8} w={600} f={MU}>{day}</T>}
        {p && <g><R x={x + 6} y={y + 22} w={58} h={16} r={4} f={p[0]} /><T x={x + 12} y={y + 33} s={7.5} w={700} f={W}>{p[1]}</T></g>}
      </g>; })}
    </Card>
  </>;
}
function ContentThumbnails() {
  const thumbs = [
    [INK, EM2, 'BUILD A', 'WEBSITE', '#1f2a26'], ['#f59e0b', INK, '5 EDITING', 'MISTAKES', '#fbbf24'],
    [EM, W, 'AI TOOLS', 'EXPLAINED', '#047857'], ['#e5e7eb', INK, 'SEO IN', '10 MINUTES', '#d1d5db'],
  ];
  return <>
    <Bg f="#f5f1eb" />
    {thumbs.map(([bg, fg, a, b, sh], i) => { const x = 46 + (i % 2) * 284, y = 34 + Math.floor(i / 2) * 182; return <g key={i}>
      <rect x={x + 4} y={y + 8} width="264" height="150" rx="12" fill={INK} opacity=".1" />
      <R x={x} y={y} w={264} h={150} r={12} f={bg} />
      <C cx={x + 200} cy={y + 86} r={50} f={sh} />
      <C cx={x + 200} cy={y + 70} r={20} f={fg === W ? '#e7fdf3' : fg} o={.9} /><R x={x + 172} y={y + 94} w={56} h={56} r={26} f={fg === W ? '#e7fdf3' : fg} o={.9} />
      <T x={x + 18} y={y + 56} s={21} w={900} f={fg}>{a}</T>
      <T x={x + 18} y={y + 82} s={21} w={900} f={fg === INK && bg !== '#e5e7eb' ? W : fg === W ? INK : EM}>{b}</T>
      <R x={x + 18} y={y + 100} w={58} h={18} r={4} f={fg} /><T x={x + 47} y={y + 113} s={8} w={800} f={bg} a="middle">EP. 0{i + 1}</T>
      <R x={x + 222} y={y + 126} w={34} h={16} r={4} f={INK} o={.85} /><T x={x + 239} y={y + 137} s={8} w={700} f={W} a="middle">8:2{i}</T>
    </g>; })}
  </>;
}
function ContentCreator() {
  return <>
    <Bg f="#f6f2ec" />
    <Browser x={50} y={36} w={540} h={350} url="creator.page">
      <R x={0} y={0} w={540} h={86} r={0} f={INK} />
      <path d="M0 86 Q 140 30 300 70 T 540 40 V86 Z" fill="#14201b" />
      <C cx={70} cy={92} r={34} f={EM} s={W} sw={4} /><T x={70} y={99} s={16} w={800} f={W} a="middle">AS</T>
      <T x={116} y={112} s={15} w={800}>Creator Studio</T>
      <T x={116} y={128} s={8.5} f={MU}>Tech tips · Tutorials · Shorts</T>
      <R x={430} y={100} w={88} h={26} r={13} f={INK} /><T x={474} y={117} s={8.5} w={700} f={W} a="middle">Collaborate</T>
      {['Tutorials', 'Shorts', 'Reviews', 'Podcast'].map((l, i) => <Pill key={l} x={24 + i * 74} y={146} w={66} label={l} f={i === 0 ? EMS : G1} t={i === 0 ? EM : INK} />)}
      {[INK, '#f59e0b', EM, '#cbd5e1', '#1f2937', '#a7f3d0'].map((f, i) => { const x = 24 + (i % 3) * 168, y = 176 + Math.floor(i / 3) * 76; return <g key={i}>
        <R x={x} y={y} w={156} h={68} r={8} f={f} />
        <C cx={x + 78} cy={y + 34} r={12} f={W} o={.9} /><path d={`M${x + 74} ${y + 28}l10 6-10 6z`} fill={f} />
      </g>; })}
    </Browser>
  </>;
}

/* ---------- SEO ---------- */
function SeoAudit() {
  return <>
    <Bg f="#eef3f1" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Site health report</T><T x={62} y={82} s={8.5} f={MU}>example.com · illustrative audit</T>
      <R x={500} y={52} w={80} h={24} r={12} f={INK} /><T x={540} y={68} s={8.5} w={700} f={W} a="middle">Export PDF</T>
      <R x={60} y={100} w={170} h={268} r={12} f={G1} />
      <Ring cx={145} cy={176} r={48} p={.74} sw={12} />
      <T x={145} y={178} s={24} w={800} a="middle">74</T><T x={145} y={194} s={8} f={MU} a="middle">Health score</T>
      {[['Critical', 3, RED], ['Warnings', 12, AMB], ['Notices', 28, '#94a3b8']].map(([l, n, c], i) => <g key={l}><C cx={82} cy={256 + i * 32} r={5} f={c} /><T x={94} y={260 + i * 32} s={9} w={600}>{l}</T><T x={210} y={260 + i * 32} s={11} w={800} a="end">{n}</T></g>)}
      {[['Missing meta descriptions', RED, 'Add unique descriptions to key pages'], ['Broken internal links', RED, 'Update or redirect broken URLs'], ['Large images', AMB, 'Compress and resize hero images'], ['Missing alt text', AMB, 'Describe images for accessibility'], ['Long title tags', '#94a3b8', 'Keep titles under ~60 characters']].map(([t, c, d], i) => <g key={t}>
        <R x={246} y={100 + i * 54} w={334} h={46} r={10} f={W} s={G2} />
        <R x={246} y={100 + i * 54} w={4} h={46} r={2} f={c} />
        <T x={262} y={120 + i * 54} s={9.5} w={700}>{t}</T><T x={262} y={135 + i * 54} s={8} f={MU}>{d}</T>
        <T x={566} y={127 + i * 54} s={8} w={700} f={EM} a="end">Fix →</T>
      </g>)}
    </Card>
  </>;
}
function SeoKeywords() {
  const rows = [['web design services', 'Commercial', .8, .62], ['how to build a website', 'Informational', .95, .45], ['website cost for small business', 'Commercial', .55, .38], ['portfolio website examples', 'Informational', .7, .3], ['hire web developer', 'Transactional', .42, .55], ['landing page tips', 'Informational', .5, .25]];
  const ic = { Commercial: ['#dbeafe', '#1d4ed8'], Informational: [EMS, EM], Transactional: ['#fef3c7', '#b45309'] };
  return <>
    <Bg f="#eff4f1" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Keyword research</T><T x={62} y={82} s={8.5} f={MU}>Topic: Web design · relative values</T>
      <R x={380} y={52} w={200} h={26} r={13} f={G1} /><T x={396} y={69} s={8.5} f={MU}>Search keywords…</T>
      {['Keyword', 'Intent', 'Rel. volume', 'Difficulty'].map((h, i) => <T key={h} x={[62, 280, 392, 496][i]} y={110} s={8} w={700} f={MU}>{h.toUpperCase()}</T>)}
      <line x1="60" y1="118" x2="580" y2="118" stroke={G2} />
      {rows.map(([k, it, v, d], i) => <g key={k}>
        <R x={56} y={126 + i * 40} w={528} h={34} r={8} f={i === 0 ? EMX : 'transparent'} />
        <Check x={70} y={143 + i * 40} ok={i === 0 || i === 4} />
        <T x={84} y={147 + i * 40} s={9.5} w={600}>{k}</T>
        <Pill x={280} y={134 + i * 40} w={84} label={it} f={ic[it][0]} t={ic[it][1]} />
        <R x={392} y={140 + i * 40} w={84} h={7} r={3.5} f={G2} /><R x={392} y={140 + i * 40} w={84 * v} h={7} r={3.5} f={EM} />
        <R x={496} y={140 + i * 40} w={70} h={7} r={3.5} f={G2} /><R x={496} y={140 + i * 40} w={70 * d} h={7} r={3.5} f={d > .5 ? AMB : INK} />
      </g>)}
    </Card>
  </>;
}
function SeoChecklist() {
  const groups = [['Indexing', [['XML sitemap submitted', 1], ['Robots.txt reviewed', 1], ['Canonical tags set', 2]]], ['Speed', [['Images compressed', 2], ['Unused scripts removed', 0], ['Caching enabled', 1]]], ['Mobile', [['Viewport configured', 1], ['Tap targets sized', 1], ['No horizontal scroll', 2]]], ['Structured data', [['Organisation schema', 0], ['Breadcrumbs', 0], ['FAQ markup', 2]]]];
  const st = [['To check', G2, MU], ['Pass', EMS, EM], ['Needs work', '#fef3c7', '#b45309']];
  return <>
    <Bg f="#f0f4f2" />
    <Card x={40} y={30} w={560} h={360} r={16}>
      <T x={62} y={62} s={15} w={800}>Technical SEO checklist</T>
      <R x={62} y={74} w={300} h={8} r={4} f={G2} /><R x={62} y={74} w={150} h={8} r={4} f={EM} /><T x={372} y={82} s={8.5} w={700} f={EM}>6 of 12 passing</T>
      {groups.map(([g, items], gi) => { const x = 58 + (gi % 2) * 272, y = 100 + Math.floor(gi / 2) * 140; return <g key={g}>
        <R x={x} y={y} w={256} h={128} r={12} f={G1} />
        <T x={x + 14} y={y + 22} s={10} w={800}>{g}</T>
        {items.map(([t, s], i) => <g key={t}>
          <R x={x + 10} y={y + 32 + i * 30} w={236} h={26} r={7} f={W} />
          <Check x={x + 24} y={y + 45 + i * 30} ok={s === 1} c={s === 2 ? AMB : undefined} />
          <T x={x + 38} y={y + 48 + i * 30} s={8.5} w={600}>{t}</T>
          <Pill x={x + 176} y={y + 37 + i * 30} w={62} h={16} s={7.5} label={st[s][0]} f={st[s][1]} t={st[s][2]} />
        </g>)}
      </g>; })}
    </Card>
  </>;
}
function SeoAnalytics() {
  return <>
    <Bg f="#eef3f1" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Organic search report</T><T x={62} y={82} s={8.5} f={MU}>Layout preview · placeholder data</T>
      {['30d', '90d', '12m'].map((l, i) => <Pill key={l} x={470 + i * 38} y={54} w={34} label={l} f={i === 1 ? INK : G1} t={i === 1 ? W : INK} />)}
      <R x={60} y={98} w={340} h={180} r={12} f={G1} />
      {[0, 1, 2, 3].map(i => <line key={i} x1="76" y1={120 + i * 38} x2="384" y2={120 + i * 38} stroke={G2} />)}
      <Line x={76} y={118} w={308} h={140} v={[.2, .26, .24, .32, .36, .34, .46, .52, .5, .62, .66, .72]} fill="rgba(5,150,105,.1)" />
      <line x1="216" y1="112" x2="216" y2="262" stroke={INK} strokeDasharray="3 3" /><R x={176} y={104} w={80} h={16} r={8} f={INK} /><T x={216} y={115} s={7.5} w={700} f={W} a="middle">New pages live</T>
      <R x={412} y={98} w={168} h={180} r={12} f={G1} />
      <T x={426} y={120} s={9} w={700}>Sources</T>
      <Ring cx={496} cy={182} r={40} p={.58} sw={14} /><Ring cx={496} cy={182} r={40} p={.0001} sw={14} track="transparent" />
      {[['Organic', EM], ['Direct', INK], ['Referral', G3]].map(([l, c], i) => <g key={l}><C cx={430 + i * 50} cy={252} r={4} f={c} /><T x={437 + i * 50} y={255} s={7.5} f={MU}>{l}</T></g>)}
      <T x={62} y={302} s={9} w={700}>Top pages</T>
      {['/services', '/blog/website-tips', '/contact'].map((p, i) => <g key={p}><R x={60} y={310 + i * 22} w={520} h={18} r={5} f={i % 2 ? W : G1} /><T x={70} y={322 + i * 22} s={8} w={600}>{p}</T><R x={440} y={316 + i * 22} w={130 * [.9, .6, .4][i]} h={6} r={3} f={EM} /></g>)}
    </Card>
  </>;
}

/* ---------- Google Maps SEO ---------- */
function MapsProfile() {
  return <>
    <Bg f="#eaf3ee" />
    <Card x={40} y={40} w={300} h={340} r={16}>
      <MapBg x={52} y={52} w={276} h={120} />
      <Pin x={190} y={130} s={1.2} />
      <T x={56} y={198} s={14} w={800}>Green Leaf Clinic</T>
      <T x={56} y={214} s={8.5} f={MU}>Physiotherapy clinic · Open now</T>
      {['Call', 'Directions', 'Website', 'Save'].map((l, i) => <g key={l}><C cx={78 + i * 64} cy={246} r={14} f={i === 1 ? EM : EMX} /><T x={78 + i * 64} y={274} s={7.5} f={MU} a="middle">{l}</T></g>)}
      <R x={56} y={290} w={268} h={1} f={G2} />
      <Lines x={56} y={304} w={250} n={3} gap={14} h={6} />
      <R x={56} y={348} w={60} h={20} r={5} f={G1} /><R x={122} y={348} w={60} h={20} r={5} f={G1} /><R x={188} y={348} w={60} h={20} r={5} f={G1} />
    </Card>
    <Card x={356} y={40} w={244} h={340} r={16}>
      <T x={374} y={70} s={12} w={800}>Profile completeness</T>
      <R x={374} y={84} w={208} h={8} r={4} f={G2} /><R x={374} y={84} w={146} h={8} r={4} f={EM} />
      <T x={374} y={108} s={8.5} f={MU}>7 of 10 recommended items</T>
      {[['Business name', 1], ['Primary category', 1], ['Opening hours', 1], ['Phone & website', 1], ['Service list', 0], ['Photos (10+)', 0], ['Business description', 1], ['Weekly post', 0]].map(([t, ok], i) => <g key={t}>
        <Check x={382} y={130 + i * 30} ok={!!ok} c={ok ? undefined : '#fde68a'} />
        <T x={396} y={134 + i * 30} s={9} w={600} f={ok ? INK : '#92400e'}>{t}</T>
        {!ok && <T x={582} y={134 + i * 30} s={8} w={700} f={EM} a="end">Add</T>}
      </g>)}
    </Card>
  </>;
}
function MapsReport() {
  const g = [[1, 1, 2, 2, 3], [1, 1, 1, 2, 3], [2, 1, 0, 1, 2], [2, 1, 1, 2, 3], [3, 2, 2, 3, 3]];
  const cl = [EM, EM2, '#fbbf24', '#f87171'];
  return <>
    <Bg f="#ecf3ef" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Local visibility grid</T><T x={62} y={82} s={8.5} f={MU}>Keyword: "physiotherapist" · illustrative</T>
      <MapBg x={60} y={98} w={300} h={270} />
      {g.map((row, i) => row.map((v, j) => <g key={`${i}${j}`}><C cx={96 + j * 57} cy={128 + i * 52} r={15} f={cl[v]} s={W} sw={2} /><T x={96 + j * 57} y={132 + i * 52} s={9} w={800} f={W} a="middle">{[2, 4, 8, 14][v] + ((i + j) % 2)}</T></g>))}
      <T x={378} y={112} s={10} w={800}>Legend</T>
      {['Strong', 'Good', 'Fair', 'Weak'].map((l, i) => <g key={l}><C cx={386} cy={132 + i * 22} r={6} f={cl[i]} /><T x={398} y={135 + i * 22} s={8.5}>{l}</T></g>)}
      <R x={378} y={226} w={202} h={64} r={10} f={G1} /><T x={390} y={246} s={9} w={700}>Citations</T><T x={390} y={262} s={8} f={MU}>Name, address and phone</T><T x={390} y={276} s={8} f={MU}>consistency check</T><Check x={562} y={242} />
      <R x={378} y={298} w={202} h={70} r={10} f={EMX} /><T x={390} y={318} s={9} w={700} f={EM}>Next steps</T><Lines x={390} y={328} w={176} n={3} gap={11} h={5} f={EMS} />
    </Card>
  </>;
}
function MapsKeywords() {
  const grp = [['Physiotherapy', ['physio near me', 'physiotherapist in [area]', 'back pain clinic [city]']], ['Sports injury', ['sports injury clinic near me', 'knee rehab [area]']], ['Home visits', ['home physio [city]', 'physio home visit near me']]];
  return <>
    <Bg f="#eaf2ed" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Local keyword map</T><T x={62} y={82} s={8.5} f={MU}>Grouped by service and area</T>
      <Pin x={560} y={82} s={.9} />
      {grp.map(([g, ks], gi) => { const y = 100 + [0, 108, 192][gi]; return <g key={g}>
        <T x={62} y={y + 14} s={9} w={800} f={EM} ls={.5}>{g.toUpperCase()}</T>
        {ks.map((k, i) => <g key={k}>
          <R x={58} y={y + 22 + i * 28} w={524} h={24} r={7} f={G1} />
          <T x={70} y={y + 38 + i * 28} s={9} w={600}>{k}</T>
          <Pill x={360} y={y + 25 + i * 28} w={70} h={18} label={k.includes('near me') ? 'Near me' : 'Area'} f={k.includes('near me') ? EMS : '#e0e7ff'} t={k.includes('near me') ? EM : '#4338ca'} />
          <T x={570} y={y + 38 + i * 28} s={8} w={700} f={MU} a="end">{['Profile + page', 'Service page', 'Posts'][(gi + i) % 3]}</T>
        </g>)}
      </g>; })}
    </Card>
  </>;
}
function MapsDashboard() {
  return <>
    <Bg f="#ebf3ee" />
    <Card x={40} y={34} w={560} h={352} r={16}>
      <T x={62} y={66} s={15} w={800}>Profile insights</T><T x={62} y={82} s={8.5} f={MU}>Layout preview · placeholder data</T>
      {[['Profile views', [.3, .4, .5, .45, .6, .7]], ['Calls', [.2, .3, .25, .4, .38, .5]], ['Directions', [.4, .35, .5, .55, .6, .58]], ['Website clicks', [.25, .3, .35, .3, .45, .5]]].map(([l, v], i) => <g key={l}>
        <R x={60 + i * 132} y={98} w={122} h={80} r={10} f={i === 0 ? INK : G1} />
        <T x={72 + i * 132} y={118} s={8} w={600} f={i === 0 ? '#9fb3aa' : MU}>{l}</T>
        <Bars x={70 + i * 132} y={128} w={102} h={40} v={v} c={i === 0 ? EM2 : EM} alt={i === 0 ? '#2a3531' : G2} hi={5} />
      </g>)}
      <R x={60} y={192} w={300} h={176} r={12} f={G1} />
      <T x={74} y={214} s={9} w={700}>Customer actions · 6 months</T>
      <Line x={74} y={226} w={272} h={126} v={[.3, .38, .36, .5, .56, .64]} />
      <Line x={74} y={226} w={272} h={126} v={[.2, .24, .3, .28, .36, .42]} c={INK} sw={2} dash="4 4" />
      <MapBg x={374} y={192} w={206} h={176} />
      {[[420, 250], [470, 230], [500, 290], [440, 320], [530, 260], [460, 280]].map(([x, y], i) => <C key={i} cx={x} cy={y} r={8 + (i % 3) * 3} f={EM} o={.35} />)}
      <Pin x={476} y={290} />
      <R x={386} y={204} w={110} h={18} r={9} f={W} /><T x={396} y={216} s={7.5} w={700}>Direction requests</T>
    </Card>
  </>;
}

export const VISUALS = {
  'app-wellness': AppWellness, 'app-productivity': AppProductivity, 'app-learning': AppLearning, 'app-tasks': AppTasks, 'app-utility': AppUtility,
  'web-homepage': WebHomepage, 'web-business': WebBusiness, 'web-education': WebEducation, 'web-portfolio': WebPortfolio, 'web-landing': WebLanding,
  'ai-dashboard': AiDashboard, 'ai-document': AiDocument, 'ai-search': AiSearch, 'ai-ml': AiMl,
  'content-video': ContentVideo, 'content-calendar': ContentCalendar, 'content-thumbnails': ContentThumbnails, 'content-creator': ContentCreator,
  'seo-audit': SeoAudit, 'seo-keywords': SeoKeywords, 'seo-checklist': SeoChecklist, 'seo-analytics': SeoAnalytics,
  'maps-profile': MapsProfile, 'maps-report': MapsReport, 'maps-keywords': MapsKeywords, 'maps-dashboard': MapsDashboard,
};

const BY_CATEGORY = {
  'App Development': ['app-wellness', 'app-productivity', 'app-learning', 'app-tasks', 'app-utility'],
  'Website Development': ['web-homepage', 'web-business', 'web-education', 'web-portfolio', 'web-landing'],
  'AI & Machine Learning': ['ai-dashboard', 'ai-document', 'ai-search', 'ai-ml'],
  'Content Creation': ['content-video', 'content-calendar', 'content-thumbnails', 'content-creator'],
  'SEO': ['seo-audit', 'seo-keywords', 'seo-checklist', 'seo-analytics'],
  'Google Maps SEO': ['maps-profile', 'maps-report', 'maps-keywords', 'maps-dashboard'],
};
export const visualsFor = (category) => BY_CATEGORY[category] || BY_CATEGORY['Website Development'];

// Picks a stable mockup for projects that come from the database without a known visual key.
export function visualKey(project) {
  if (project.visual && VISUALS[project.visual]) return project.visual;
  const list = visualsFor(project.category);
  const s = String(project.id || project.title || '');
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}

export function Mockup({ project, visual, label, className = '' }) {
  const [failed, setFailed] = React.useState(false);
  if (project?.image_url && !failed) {
    return <div className={`mock mock-photo ${className}`}><img src={project.image_url} alt={label || project.title} loading="lazy" onError={() => setFailed(true)} /></div>;
  }
  const V = VISUALS[visual || visualKey(project || {})];
  return <div className={`mock ${className}`}><svg viewBox="0 0 640 420" role="img" aria-label={label || `${project?.title || 'Project'} interface preview`} preserveAspectRatio="xMidYMid slice">{V ? <V /> : null}</svg></div>;
}
