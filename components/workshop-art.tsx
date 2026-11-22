import { useId, type ReactNode } from 'react';
import type { Body, Zone } from '../content/repairs';
import type { serviceIcons } from '../content/services';

type IconName = typeof serviceIcons[number] | 'phone' | 'pin' | 'clock' | 'shield' | 'key' | 'menu' | 'chevron';

const icons: Record<IconName, ReactNode> = {
  clipboard: <><path d="M9 5H5v16h14V5h-4M9 12h6m-6 4h6"/><rect x="9" y="3" width="6" height="4" rx="1"/></>,
  dent: <><path d="M3 5h18v14H3zM5 13c3 0 3-3 6-3s3 4 8 4m-9-7 1 1m2 7 2 1"/></>,
  bumper: <><path d="m3 14 2-5 4-2h6l4 2 2 5v3H3zM3 14h18m-13 0v3m8-3v3"/></>,
  panel: <><path d="M4 20V9l6-5h10v16zM4 10h16m-9 4h4"/></>,
  'spray-gun': <><path d="M3 9h12v4h-4l-3 7H5l2-7H3zM6 9V4h6v5m5 1 3-2m-3 4 4 1m-4 1 3 3"/></>,
  hail: <><path d="M5 13a4 4 0 1 1 1-8 6 6 0 0 1 10 2h2a3 3 0 1 1 0 6zm2 3-1 2m6-2-1 2m6-2-1 2"/></>,
  jig: <><path d="M3 17h18M5 17v4m14-4v4M4 13l3-5h10l3 5zm4-9h8m-4 0v4"/></>,
  headlight: <><path d="M13 5a7 7 0 0 0 0 14zm3 3 5-2m-5 6h5m-5 4 5 2"/></>,
  phone: <path d="M7 3 4 5c-2 5 8 16 13 15l3-3-4-4-3 2-4-4 2-3z"/>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  shield: <path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6zm-4 9 3 3 5-6"/>,
  key: <path d="M14 3a6 6 0 0 0-5 9L3 18v3h4v-3h3v-3l2-2a6 6 0 1 0 2-10zm1 3h.01"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  chevron: <path d="m9 6 6 6-6 6"/>,
};

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

const lowerBody = 'L605 124Q616 134 615 163L608 184 553 189C551 161 529 143 503 143S455 162 453 190H190C188 162 167 143 140 143S93 162 91 190L40 188Q19 183 20 165L22 140 29 124';
const bodies: Record<Body, { roof: string; glass: string; pillars: string }> = {
  hatch: {
    roof: 'Q33 105 61 102L92 68Q112 47 160 45L279 43Q332 45 368 64L434 103 568 108Q591 111 605 124',
    glass: 'M71 103 107 68Q120 56 163 55L286 54Q330 57 357 73L407 102 242 106Z',
    pillars: 'M177 55 163 104M277 55l12 50',
  },
  sedan: {
    roof: 'L45 107 111 101 173 63Q192 51 242 51H314Q345 52 371 69L427 105 568 109Q591 112 605 124',
    glass: 'M135 103 181 72Q202 60 242 61H310Q343 61 360 74L403 102 241 106Z',
    pillars: 'M204 63l-16 42m111-44 8 43',
  },
  wagon: {
    roof: 'L40 109 56 68Q61 48 86 46L285 45Q335 47 367 69L429 104 565 109Q591 112 605 124',
    glass: 'M52 105 69 65Q72 56 88 56h198q37 1 69 21l43 26-156 4Z',
    pillars: 'M132 57l-9 49m74-49-6 50m91-50 9 49',
  },
  suv: {
    roof: 'Q26 111 45 105l20-53Q71 41 96 39l198-1q42 2 73 24l62 44 136 4q31 2 40 14',
    glass: 'M56 103 77 57q4-9 29-9l183 1q38 2 68 21l42 33-157 4Z',
    pillars: 'M146 50l-8 55m59-55-7 56m91-56 9 56',
  },
  ute: {
    roof: 'L38 105 161 106 181 64Q192 46 212 45L303 45Q336 48 367 69L429 106 567 110Q590 113 605 124',
    glass: 'M177 105 194 67q8-12 23-12h82q32 2 57 22l42 26-154 4Z',
    pillars: 'M243 56l-1 50m58-50 10 49',
  },
  van: {
    roof: 'L37 48Q40 23 67 20l239-1q35 0 59 21l71 60 128 8q26 3 41 16',
    glass: 'M271 101V32l38 1q26 1 48 23l47 44-108 5Z',
    pillars: 'M311 34l12 69',
  },
};

function Wheel({ x }: { x: number }) {
  return <g transform={`translate(${x} 188)`}>
    <circle r="47" fill="#22292d" stroke="var(--art-ink)" strokeWidth="2"/>
    <circle r="40" fill="none" stroke="#586064" strokeWidth="1.8"/>
    <circle r="31" fill="#a9b0b1" stroke="#11191e" strokeWidth="2.5"/>
    <circle r="25" fill="#414d53"/>
    {[0, 72, 144, 216, 288].map(angle => <path key={angle} transform={`rotate(${angle})`} d="M-4-5-12-23-4-28 4-27 6-11 3-5Z" fill="#d8dcda" stroke="#19242a" strokeWidth="1"/>)}
    <circle r="9" fill="#bdc6c7" stroke="#172027" strokeWidth="2"/>
    <circle r="3" fill="#303d43"/>
  </g>;
}

const damagePositions: Record<Zone, [number, number, number]> = {
  rear: [73, 132, -11], front: [548, 128, 11], side: [280, 141, 2], roof: [274, 64, -5],
};

function DamageMarks({ zone }: { zone: Zone }) {
  const [x, y, angle] = damagePositions[zone];
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path d="M-38 5Q-17-15 3-9T39-7L27 18 1 25-29 17Z" fill="#a59d90" opacity=".8"/>
    <path d="M-33 8Q-18-8-9 2L3 13 36-5M-20 13l19 8 25-9M-24-7l26-5m-17 4 18-2" fill="none" stroke="#51443c" strokeWidth="2"/>
    <path d="M-32 12l23 1m15-13 27-13m-5 30 9-12m-43 12 12 6" stroke="#ede4d2" strokeWidth="1.6"/>
    {[-30, -14, 5, 19, 31].map((dot, index) => <circle key={dot} cx={dot} cy={index % 2 ? -18 : 21} r={index % 2 ? 2.5 : 1.8} fill="var(--guide-coat)"/>)}
    {zone === 'roof' && <path d="M-94-6q8-6 12 0m22 3q7-5 12 0m95 6q8-6 12 0m18 1q8-8 13-2" fill="none" stroke="var(--guide-coat)" strokeWidth="3"/>}
  </g>;
}

/** Shared side-on silhouette. The parent SVG establishes the framing. */
export function CarDrawing({ body, paint, finish = 'gloss', zone, masked, missingDoor, animate = false }: {
  body: Body; paint: string; finish?: 'primer' | 'gloss'; zone?: Zone;
  masked?: boolean; missingDoor?: boolean; animate?: boolean;
}) {
  const id = useId();
  const { roof, glass, pillars } = bodies[body];
  const shape = `M29 124${roof}${lowerBody}Z`;
  const primer = finish === 'primer';
  return <g strokeLinejoin="round" strokeLinecap="round">
    <defs>
      <clipPath id={`${id}-body`}><path d={shape}/></clipPath>
      <linearGradient id={`${id}-gloss`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="var(--reflection)" stopOpacity=".72"/>
        <stop offset=".34" stopColor="var(--reflection)" stopOpacity=".27"/>
        <stop offset="1" stopColor="var(--reflection)" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id={`${id}-sweep`}>
        <stop offset="0" stopColor="var(--reflection)" stopOpacity="0"/>
        <stop offset=".5" stopColor="var(--reflection)" stopOpacity=".48"/>
        <stop offset="1" stopColor="var(--reflection)" stopOpacity="0"/>
      </linearGradient>
      <pattern id={`${id}-grain`} width="13" height="11" patternUnits="userSpaceOnUse">
        <path d="M1 2h.2M7 8h.2m4-4h.2M4 5h.2" stroke="#74736b" strokeWidth="1" opacity=".45"/>
      </pattern>
    </defs>
    <ellipse cx="320" cy="223" rx="295" ry="12" fill="var(--art-ink)" opacity=".16"/>
    <Wheel x={140}/><Wheel x={503}/>
    <path d={shape} fill={primer ? 'var(--body-primer)' : paint} stroke="var(--art-ink)" strokeWidth="2.5"/>
    <g clipPath={`url(#${id}-body)`}>
      <path d="M15 153Q139 165 215 165H450q56-26 167-21v61H15Z" fill="#182025" opacity=".19"/>
      {primer ? <path d={shape} fill={`url(#${id}-grain)`}/> : <>
        <path d="M26 113Q168 112 270 111L435 106q161-2 180 24l5 17q-116-20-205-12-104 15-200 14L20 136Z" fill={`url(#${id}-gloss)`}/>
        {animate && <path className="gloss-sweep" d="m-160 30 79 0-44 162h-79z" fill={`url(#${id}-sweep)`}/>}
      </>}
    </g>
    <path d={glass} fill={masked ? 'var(--masking-paper)' : '#536b75'} stroke="var(--art-ink)" strokeWidth="2.5"/>
    {masked ? <path d="m76 101 47-25 40 8 43-18 45 17 42-16 68 14m-251-7 16-11m38 32 27-9m58 8 33-20" stroke="#7e6848" strokeWidth="1.6" fill="none" opacity=".7"/> :
      <path d="M114 94l62-33h33l-53 41m120-3 49-32 15 6-27 30" fill="#c5dbe1" opacity=".27"/>}
    <path d={pillars} stroke="var(--art-ink)" strokeWidth="6" fill="none"/>
    <path d="M33 128q130-15 218-12l178-6 149 7m-388 58h253m-237-48 6 20m84-41 5 42-6 28m126-65 13 30-12 35" stroke="var(--art-ink)" strokeWidth="2" fill="none" opacity=".8"/>
    <path d="M21 153h49m497 0h48M45 179h33m484 0h47" stroke="var(--art-ink)" strokeWidth="3" fill="none"/>
    <path d="M28 123q16-7 48-9l-9 13-39 7Z" fill="#a65038" stroke="var(--art-ink)" strokeWidth="1.8"/>
    <path d="M560 114q28 0 45 11l2 11-37-7Z" fill="#f1ead0" stroke="var(--art-ink)" strokeWidth="1.8"/>
    <path d="m245 128 23-1m53-1 23-1" stroke="var(--art-ink)" strokeWidth="3.5" fill="none"/>
    <path d="M397 107q-4-16 9-16l20 8-3 8Z" fill={primer ? 'var(--body-primer)' : paint} stroke="var(--art-ink)" strokeWidth="2.5"/>
    {zone && <DamageMarks zone={zone}/>}
    {masked && <path d="m51 115 145-11m-88-47 19-6 152-3m-84 6-9 52" stroke="var(--tape)" strokeWidth="5" fill="none"/>}
    {missingDoor && <><path d="m299 107 109-4 19 36-11 38H292l9-30Z" fill="#28333a" stroke="var(--tape)" strokeWidth="6" strokeDasharray="23 3"/><path d="M310 160h96m-90-5 17-26h37l23 23" fill="none" stroke="#79898d" strokeWidth="3"/></>}
  </g>;
}

export function CarView({ body, paint, zone, missingDoor }: { body: Body; paint: string; zone?: Zone; missingDoor?: boolean }) {
  return <svg viewBox="0 10 640 236" fill="none" aria-hidden="true" className="block w-full">
    <CarDrawing body={body} paint={paint} zone={zone} finish={zone ? 'primer' : 'gloss'} missingDoor={missingDoor}/>
  </svg>;
}

export function BoothArt() {
  const id = useId();
  return <svg viewBox="0 0 820 420" fill="none" role="img" aria-label="A hatchback in the spray booth, with grey primer and masking paper at the rear and glossy Ocean Metallic paint at the front">
    <defs>
      <clipPath id={`${id}-right`}><path d="M484 0H820V420H349Z"/></clipPath>
      <clipPath id={`${id}-left`}><path d="M0 0H484L349 420H0Z"/></clipPath>
      <pattern id={`${id}-grate`} width="10" height="8" patternUnits="userSpaceOnUse"><path d="M2 1v6m5-6v6" stroke="var(--art-ink)" strokeWidth="1.2" opacity=".45"/></pattern>
      <linearGradient id={`${id}-light`} x2="0" y2="1"><stop stopColor="var(--booth-light)"/><stop offset="1" stopColor="var(--booth-light)" stopOpacity="0"/></linearGradient>
    </defs>
    <path d="M0 0H820V313H0z" fill="var(--booth-wall)"/>
    <path d="M0 313H820V420H0z" fill="var(--primer-deep)"/>
    <path d="M0 11 99 55H719L820 7M99 55v257L0 392m719-337v257l101 80M0 313h820M99 312h620M99 115h620m-620 77h620m-620 60h620M216 55v257m130-257v257m130-257v257m130-257v257" stroke="var(--line)" strokeWidth="1.45"/>
    <path d="M61 366h703l10 12H45Z" fill={`url(#${id}-grate)`} stroke="var(--line)"/>
    <path d="M0 396h820m-695-69-72 69m626-69 72 69" stroke="var(--line)" strokeWidth="1.5"/>
    <g className="booth-bars">
      <path d="M149 59h209l39 175H115Zm321 0h209l36 175H433Z" fill={`url(#${id}-light)`} opacity=".74"/>
      <rect x="133" y="50" width="243" height="10" rx="2" fill="var(--light-tube)" stroke="var(--line)"/>
      <rect x="453" y="50" width="243" height="10" rx="2" fill="var(--light-tube)" stroke="var(--line)"/>
    </g>
    <g clipPath={`url(#${id}-left)`}><g transform="translate(40 81) scale(1.16)"><CarDrawing body="hatch" paint="#1C5A78" finish="primer" masked/></g></g>
    <g clipPath={`url(#${id}-right)`}><g transform="translate(40 81) scale(1.16)"><CarDrawing body="hatch" paint="#1C5A78"/></g></g>
    <g className="hero-mist">
      <path d="M478 119C444 137 438 198 402 245 375 279 344 295 315 305" stroke="var(--reflection)" strokeOpacity=".66" strokeWidth="12" strokeLinecap="round"/>
      <path d="M502 115c-40 9-63 57-80 100-23 54-71 84-124 103m189-203c-36 31-44 73-67 111-26 45-65 71-108 90m176-190c-31 43-38 79-65 119-20 30-38 57-73 76" stroke="var(--light-tube)" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" opacity=".84"/>
      <g transform="translate(494 109) rotate(-18)" stroke="var(--art-ink)" strokeWidth="2" strokeLinejoin="round">
        <path d="M0 3h59l8 8-7 9H38l-5 24H20l3-25H0Z" fill="var(--body-primer)"/>
        <path d="m22 3-4-17h27L40 3M61 16l18 17" fill="var(--body-primer)"/>
        <path d="M2 7h-9v10h9" fill="var(--tape)"/>
      </g>
    </g>
    <path d="m517 199 11 24" stroke="var(--art-ink)" strokeWidth="1.6"/>
    <g transform="translate(517 224) rotate(6)">
      <path d="M0 0h65l5 5v23H0Z" fill="#1C5A78" stroke="var(--art-ink)" strokeWidth="1.8"/>
      <circle cx="10" cy="8" r="2.5" fill="var(--tape)"/>
      <text x="15" y="19" fill="white" className="svg-label" fontSize="11">OCN-41</text>
    </g>
    <path d="M25 28V15h13m744 0h13v13M25 392v13h13m744 0h13v-13" stroke="var(--line)" strokeWidth="1.6"/>
  </svg>;
}

export const chipColours = ['#1C5A78', '#A7ADB2', '#EEF0EE', '#B3261E', '#4A5157', '#3E6B4F'];

export function ChipFan() {
  return <svg viewBox="0 0 380 360" aria-hidden="true" className="w-full overflow-visible">
    {chipColours.map((paint, index) => <g key={paint} transform={`rotate(${-51 + index * 18} 177 291)`}>
      <path d="M133 71h88v223l-20 22h-68Z" fill={paint} stroke="var(--art-ink)" strokeWidth="2"/>
      <path d="M140 79h74v76h-74zm0 84h74v20h-74z" fill="white" opacity=".24"/>
      <path d="M133 251h88v43l-20 22h-68Z" fill="#e8d8a4" stroke="var(--art-ink)" strokeWidth="2"/>
      <path d="M146 262h61m-61 7h43" stroke="#5b523d" opacity=".75"/>
      <circle cx="177" cy="291" r="7" fill="#222b30" stroke="#e6dec9" strokeWidth="2"/>
    </g>)}
  </svg>;
}

export function ChipRow() {
  return <span className="chip-row" aria-hidden="true">{chipColours.map(colour => <i key={colour} style={{ background: colour }}/>)}</span>;
}

function Paper({ children }: { children?: ReactNode }) {
  return <g stroke="var(--art-ink)" strokeWidth="2" strokeLinejoin="round">
    <path d="M158 35h164l18 16v183H158Z" fill="var(--drawing-paper)"/>
    <path d="M322 35v17h18M179 72h126m-126 13h103m-103 123h119m-119 10h97" fill="none"/>
    {children}
  </g>;
}

export function ClipboardArt() {
  return <svg viewBox="0 0 400 250" aria-hidden="true" className="w-full">
    <g transform="rotate(9 240 120)">
      <rect x="140" y="19" width="215" height="220" rx="10" fill="var(--masking-paper)" stroke="var(--art-ink)" strokeWidth="2"/>
      <Paper>
        <path d="M184 163l16-43 89-15 28 38-28 31-95 4Z" fill="var(--body-primer)"/>
        <path d="M188 189h120m-120-5v10m120-10v10m-95-64 70-12 17 25-24 18-70 4" fill="none" strokeDasharray="4 3"/>
        <path d="M185 56h61v12h-61z" fill="var(--tape)" stroke="none"/>
      </Paper>
      <path d="M206 19h22l8-11h26l8 11h21v22h-85Z" fill="#aab5b7" stroke="var(--art-ink)" strokeWidth="2"/>
      <circle cx="249" cy="22" r="4" fill="var(--art-ink)"/>
    </g>
    <path d="M39 191h89m-76-10 19-84h24l21 84M69 126h25m-30 24h38m-47 29h58" fill="var(--tape)" stroke="var(--art-ink)" strokeWidth="2" strokeLinejoin="round"/>
  </svg>;
}

export function PhoneArt() {
  return <svg viewBox="0 0 400 250" aria-hidden="true" className="w-full">
    <g transform="rotate(8 232 120)">
      <Paper>
        <path d="M191 107h113m-113 20h113m-113 20h113m-113 20h89" stroke="var(--art-ink)" opacity=".35"/>
        <path d="M169 28h103v23H169Z" fill="var(--tape)" stroke="none" transform="rotate(-5 180 36)"/>
      </Paper>
    </g>
    <g transform="rotate(-14 126 132)" stroke="var(--art-ink)" strokeWidth="2">
      <rect x="70" y="39" width="118" height="181" rx="16" fill="#27383f"/>
      <rect x="79" y="55" width="100" height="144" rx="5" fill="#1C5A78"/>
      <circle cx="129" cy="127" r="32" fill="#d8dfd8"/>
      <path d="m118 106-7 9q-2 10 11 24t20 9l8-8-9-9-7 4-10-12 3-7Z" fill="#1C5A78" strokeLinejoin="round"/>
      <path d="M117 47h23m-26 163h27" stroke="#c4cdcb" strokeLinecap="round"/>
    </g>
    <path d="m329 183 24-104 10 2-22 104-10 14Z" fill="var(--tape)" stroke="var(--art-ink)" strokeWidth="2"/>
  </svg>;
}

export function RoadsideArt() {
  return <svg viewBox="0 0 540 330" aria-hidden="true" className="w-full">
    <path d="M0 78 540 47v222L0 292Z" fill="var(--primer-deep)"/>
    <path d="m0 86 540-30M0 282l540-30M0 187l540-45" stroke="var(--drawing-paper)" strokeWidth="4" strokeDasharray="20 13"/>
    <g transform="translate(63 108) scale(.34)"><CarDrawing body="hatch" paint="#1C5A78"/></g>
    <g transform="translate(474 75) scale(-.33 .33)"><CarDrawing body="sedan" paint="#A7ADB2"/></g>
    <g transform="translate(29 77) rotate(-8 82 63)" stroke="var(--art-ink)" strokeWidth="2">
      <rect x="14" y="20" width="382" height="152" rx="16" fill="none"/>
      <path d="M41 60V40h23m279 0h25v20M41 134v19h23m279 0h25v-19" stroke="var(--drawing-paper)" strokeWidth="4" fill="none"/>
      <circle cx="382" cy="94" r="7" fill="var(--tape)"/>
    </g>
    <g transform="translate(163 154) scale(.65) rotate(12 230 148)"><Paper><path d="M179 108h125m-125 24h108m-108 24h92" opacity=".42"/></Paper></g>
  </svg>;
}

export function StreetSketch() {
  return <svg viewBox="0 0 550 350" role="img" aria-label="Street sketch showing the Gabba oval and the workshop two blocks south on Logan Road" className="w-full">
    <path d="M0 0h550v350H0z" fill="var(--primer)"/>
    <path d="M10 112 550 76M2 266l548-38M207 0l22 350M457 0l21 350" stroke="var(--line)" strokeWidth="23" fill="none"/>
    <path d="M10 112 550 76M2 266l548-38M207 0l22 350M457 0l21 350" stroke="var(--paper)" strokeWidth="19" fill="none"/>
    <path d="M330-20 376 381" stroke="var(--line)" strokeWidth="38" fill="none"/>
    <path d="M330-20 376 381" stroke="var(--paper)" strokeWidth="34" fill="none"/>
    <path d="M333 0 373 350" stroke="var(--line)" strokeWidth="1.7" strokeDasharray="7 6"/>
    <ellipse cx="117" cy="177" rx="71" ry="55" fill="#75937f" stroke="var(--art-ink)" strokeWidth="2"/>
    <ellipse cx="117" cy="177" rx="52" ry="38" fill="#8da18b" stroke="#e6e4d6" strokeWidth="2"/>
    <path d="M117 150v54m-17-27h34" stroke="#e6e4d6" strokeWidth="1"/>
    <path d="M159 209h39v20h-70v-20Z" fill="var(--tape)"/>
    <text x="138" y="223" className="svg-label" fill="#1b2024" fontSize="12">THE GABBA</text>
    <path d="M351 241 366 294l43-12" fill="none" stroke="var(--accent-ink)" strokeWidth="2.7" strokeDasharray="5 4"/>
    <path d="M429 259c0 15-18 32-18 32s-18-17-18-32a18 18 0 1 1 36 0Z" fill="#1C5A78" stroke="var(--art-ink)" strokeWidth="2"/>
    <circle cx="411" cy="258" r="6" fill="#eeeae0"/>
    <text x="392" y="313" className="svg-label" fill="var(--text)" fontSize="12">WORKSHOP</text>
    <text transform="translate(354 118) rotate(83)" className="svg-label" fill="var(--text)" fontSize="12">LOGAN ROAD</text>
    <path d="M35 43v25m-7-17 7-9 7 9" fill="none" stroke="var(--text)" strokeWidth="2"/>
    <text x="30" y="33" className="svg-label" fill="var(--text)" fontSize="11">N</text>
  </svg>;
}

export function TopCar({ paint, body }: { paint: string; body: Body }) {
  const end = body === 'wagon' || body === 'suv' ? 177 : 164;
  return <svg viewBox="0 0 120 195" aria-hidden="true" className="w-full">
    <path d={`M25 21Q60 5 95 21l7 27v${end - 48}q-1 14-17 16H35q-16-2-17-16V48Z`} fill={paint} stroke="var(--art-ink)" strokeWidth="2.5"/>
    <path d="M35 62q25-13 50 0l-5 16H40Zm5 52h40l7 17q-27 12-54 0Z" fill="#546973" stroke="var(--art-ink)" strokeWidth="2"/>
    <path d="M40 80l-5 33m45-33 5 33M23 76l-10 4v10h8m78-14 10 4v10h-8M31 40q29-9 58 0" stroke="var(--art-ink)" strokeWidth="2" fill="none"/>
    <path d="M27 34V24l19-5-4 10Zm66 0V24l-19-5 4 10Z" fill="#e8d8a4" stroke="var(--art-ink)" strokeWidth="1.5"/>
    <path d={`M26 ${end - 9}h16m36 0h16`} stroke="#ad5434" strokeWidth="4"/>
    <path d="M44 82h31l-1 7H45Z" fill="var(--reflection)" opacity=".38"/>
  </svg>;
}
