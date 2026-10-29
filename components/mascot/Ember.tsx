import * as React from "react";

/**
 * Ember, the Aethon Lab mascot, drawn inline so poses, the flame and the
 * walk cycle can animate. Geometry matches the SVGs in /public/mascot.
 */
export type EmberPose =
  | "idle"
  | "happy"
  | "thinking"
  | "waving"
  | "building"
  | "surprised"
  | "oops";

const ORANGE = "#FF3C00";
const FLAME = "#FF8A4C";
const CORE = "#FFC9A8";
const SHADE = "#C42E00";
const INK = "#06070b";
const WHITE = "#F5F5F2";
const BLUE = "#68A7FF";

const FLAME_SCALE: Record<EmberPose, number> = {
  idle: 1,
  happy: 1.08,
  thinking: 1,
  waving: 1,
  building: 1,
  surprised: 1.18,
  oops: 0.72,
};

const TILT: Record<EmberPose, number> = {
  idle: -6,
  happy: -4,
  thinking: 4,
  waving: -6,
  building: -3,
  surprised: 0,
  oops: -8,
};

function Pill({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <>
      <rect x={x} y={y} width="11" height={h} rx="5.5" fill={INK} />
      <rect x={x + 2} y={y + 2} width="4" height="7" rx="2" fill={WHITE} />
    </>
  );
}

function Line({ d, w = 4 }: { d: string; w?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={INK}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Spark({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const k = r * 0.12;
  return (
    <path
      d={`M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r} Z`}
      fill={BLUE}
    />
  );
}

function Face({ pose }: { pose: EmberPose }) {
  switch (pose) {
    case "happy":
      return (
        <>
          <Line d="M78 140 Q84.5 128 91 140" w={5} />
          <Line d="M108 140 Q114.5 128 121 140" w={5} />
          <path d="M86 155 Q100 158 114 155 Q112 174 100 174 Q88 174 86 155 Z" fill={INK} />
          <circle cx="71" cy="154" r="6" fill={FLAME} />
          <circle cx="129" cy="154" r="6" fill={FLAME} />
        </>
      );
    case "thinking":
      return (
        <>
          <Pill x={83} y={118} h={18} />
          <Pill x={113} y={118} h={18} />
          <Line d="M94 166 Q102 163 110 166" w={3.5} />
        </>
      );
    case "waving":
      return (
        <>
          <Pill x={79} y={124} h={24} />
          <Line d="M106 136 Q114.5 126 123 136" w={5} />
          <path d="M88 158 Q100 160 112 158 Q110 172 100 172 Q90 172 88 158 Z" fill={INK} />
        </>
      );
    case "building":
      return (
        <>
          <Pill x={80} y={128} h={15} />
          <Pill x={110} y={128} h={15} />
        </>
      );
    case "surprised":
      return (
        <>
          <circle cx="85" cy="135" r="8" fill={INK} />
          <circle cx="115" cy="135" r="8" fill={INK} />
          <circle cx="82.5" cy="132" r="2.5" fill={WHITE} />
          <circle cx="112.5" cy="132" r="2.5" fill={WHITE} />
          <ellipse cx="100" cy="166" rx="6" ry="7" fill={INK} />
        </>
      );
    case "oops":
      return (
        <>
          <Line d="M77 122 L91 117" w={3.5} />
          <Line d="M123 122 L109 117" w={3.5} />
          <Pill x={79} y={128} h={20} />
          <Pill x={109} y={128} h={20} />
          <Line d="M90 168 Q100 160 110 168" w={3.5} />
        </>
      );
    default:
      return (
        <>
          <Pill x={79} y={124} h={24} />
          <Pill x={109} y={124} h={24} />
          <Line d="M90 162 Q100 170 110 162" w={3.5} />
        </>
      );
  }
}

export function Ember({
  pose = "idle",
  walking = false,
  boosting = false,
  className,
}: {
  pose?: EmberPose;
  walking?: boolean;
  /** Flame flares up, for take-off and flight. */
  boosting?: boolean;
  className?: string;
}) {
  const flameScale = boosting ? 1.5 : FLAME_SCALE[pose];

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={`ember-svg ${walking ? "ember-walking" : ""} ${className ?? ""}`}
    >
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "100px 100px",
          transform: `scale(${flameScale})`,
          transition: "transform calc(220ms / var(--ember-speed, 1)) cubic-bezier(.3,1.5,.5,1)",
        }}
      >
        <g className="ember-flicker">
          <path
            d="M62 100 C64 80 72 72 76 60 C80 74 86 78 92 68 C96 56 100 48 102 36 C108 52 116 62 116 76 C122 70 126 66 130 58 C136 74 140 86 138 100 Z"
            fill={FLAME}
          />
          <path
            d="M78 100 C80 88 86 82 90 74 C94 84 98 86 102 76 C106 84 112 90 114 100 Z"
            fill={CORE}
          />
        </g>
      </g>

      {pose === "waving" && (
        <>
          <rect x="43" y="138" width="12" height="26" rx="6" fill={ORANGE} transform="rotate(14 49 138)" />
          <rect x="146" y="98" width="12" height="32" rx="6" fill={ORANGE} transform="rotate(28 152 130)" className="ember-wave-arm" />
        </>
      )}

      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "100px 141px",
          transform: `rotate(${TILT[pose]}deg)`,
          transition: "transform calc(260ms / var(--ember-speed, 1)) ease",
        }}
      >
        <rect x="55" y="96" width="90" height="90" rx="18" fill={ORANGE} />
        <path d="M55 168 Q55 186 73 186 H127 Q145 186 145 168 Z" fill={SHADE} opacity="0.35" />
        <Face pose={pose} />
      </g>

      {pose === "thinking" && (
        <>
          <circle cx="150" cy="94" r="3.5" fill={BLUE} />
          <circle cx="159" cy="80" r="5" fill={BLUE} />
          <Spark cx={174} cy={58} r={16} />
        </>
      )}
      {pose === "waving" && (
        <>
          <path d="M170 84 Q180 94 176 108" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
          <path d="M180 74 Q194 90 188 112" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </>
      )}
      {pose === "building" && (
        <>
          <rect x="62" y="148" width="76" height="46" rx="8" fill={INK} stroke={FLAME} strokeWidth="2" />
          <polyline points="86,161 77,171 86,181" fill="none" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="114,161 123,171 114,181" fill="none" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="104" y1="159" x2="96" y2="183" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
          <circle cx="61" cy="168" r="7" fill={ORANGE} />
          <circle cx="139" cy="168" r="7" fill={ORANGE} />
        </>
      )}
      {pose === "surprised" && (
        <>
          <Spark cx={40} cy={92} r={9} />
          <Spark cx={162} cy={70} r={7} />
        </>
      )}
      {pose === "oops" && (
        <path d="M150 98 Q158 110 150 116 Q142 110 150 98 Z" fill={BLUE} />
      )}

      <rect x="75" y="185" width="16" height="12" rx="5" fill={ORANGE} className="ember-foot-l" />
      <rect x="111" y="183" width="16" height="12" rx="5" fill={ORANGE} className="ember-foot-r" />
    </svg>
  );
}
