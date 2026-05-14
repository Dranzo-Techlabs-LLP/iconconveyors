import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * IsometricConveyor — SVG-projected 3D conveyor belt scene.
 * Dimetric projection (cos30°≈0.866, sin30°≈0.5). Mouse-parallax tilts
 * the whole rig. Boxes ride the belt along a curved 3D path. Pulleys spin.
 * Sparks/dust drift. No 3D engine — pure SVG + framer-motion.
 */
export default function IsometricConveyor() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), {
    stiffness: 80,
    damping: 18,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[5/4] md:aspect-[6/5]"
      style={{ perspective: "1600px" }}
    >
      {/* Backdrop glow */}
      <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-brand-500/25 via-accent-400/15 to-transparent blur-3xl" />
      <div className="absolute inset-10 rounded-[36px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(31,78,148,0.15),rgba(245,158,11,0.18),rgba(31,78,148,0.15))] opacity-60 blur-2xl" />

      {/* Stage */}
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <SceneSVG />
      </motion.div>

      {/* HUD chips */}
      <Hud />
    </div>
  );
}

/* ──────────────────────────────────────────── Scene ─── */

function SceneSVG() {
  // viewBox tuned for an isometric stage 800×640
  return (
    <svg
      viewBox="0 0 800 640"
      className="absolute inset-0 w-full h-full"
      style={{ filter: "drop-shadow(0 25px 50px rgba(8,26,56,0.25))" }}
    >
      <defs>
        {/* belt gradient */}
        <linearGradient id="beltTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b2147" />
          <stop offset="50%" stopColor="#163d77" />
          <stop offset="100%" stopColor="#0b2147" />
        </linearGradient>
        <linearGradient id="beltSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#040e22" />
          <stop offset="100%" stopColor="#0b2147" />
        </linearGradient>
        <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#aac1e2" />
          <stop offset="100%" stopColor="#3f6db0" />
        </linearGradient>
        <radialGradient id="pulley" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dbe4f3" />
          <stop offset="55%" stopColor="#7298c9" />
          <stop offset="100%" stopColor="#1f4e94" />
        </radialGradient>
        <linearGradient id="boxFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb547" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="boxTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd58a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="boxRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a26008" />
          <stop offset="100%" stopColor="#7a4a07" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(8,26,56,0.06)" />
          <stop offset="100%" stopColor="rgba(8,26,56,0)" />
        </linearGradient>
        <pattern
          id="beltTread"
          x="0"
          y="0"
          width="38"
          height="60"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-30)"
        >
          <rect width="38" height="60" fill="url(#beltTop)" />
          <rect x="0" y="0" width="6" height="60" fill="#f59e0b" opacity="0.85" />
        </pattern>
      </defs>

      {/* Floor shadow */}
      <ellipse
        cx="420"
        cy="540"
        rx="320"
        ry="34"
        fill="url(#ground)"
        opacity="0.7"
      />

      {/* Back support legs */}
      <Leg x={170} />
      <Leg x={620} />

      {/* Conveyor body — drawn as 3 quads in isometric */}
      {/* dimensions in scene units */}
      <ConveyorBody />

      {/* Pulleys (left + right) */}
      <Pulley cx={150} cy={325} />
      <Pulley cx={650} cy={325} delay={0.25} />

      {/* Moving boxes on belt */}
      <MovingCargo />

      {/* Dust / spark particles */}
      <Particles />

      {/* Foreground decorative gear */}
      <SpinningGear cx={720} cy={120} size={56} />
      <SpinningGear cx={90} cy={210} size={36} reverse />
    </svg>
  );
}

/* ──────────────────────────────────────────── Conveyor Body ─── */

function ConveyorBody() {
  // Top surface (parallelogram) corners:
  //  TL (150,300) → TR (650,300) → BR (650,360) → BL (150,360)
  // shifted slightly to give dimetric feel
  const TL = "150,300";
  const TR = "650,300";
  const BR = "700,360";
  const BL = "200,360";

  // Front side
  const FL = "200,360";
  const FR = "700,360";
  const FBR = "700,395";
  const FBL = "200,395";

  return (
    <g>
      {/* shadow under */}
      <polygon points="190,398 710,398 690,420 210,420" fill="rgba(0,0,0,0.18)" />

      {/* belt top surface (with running tread) */}
      <g>
        <polygon
          points={`${TL} ${TR} ${BR} ${BL}`}
          fill="url(#beltTop)"
          stroke="#040e22"
          strokeWidth="1"
        />
        {/* animated tread overlay */}
        <motion.g
          initial={{ x: 0 }}
          animate={{ x: [0, 60, 0] }}
          transition={{
            duration: 0,
            repeat: 0,
          }}
        >
          <foreignObject x="150" y="298" width="552" height="64">
            <div
              style={{
                width: "552px",
                height: "64px",
                transform: "skewX(-6deg)",
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(245,158,11,0.85) 0 6px, rgba(255,255,255,0) 6px 38px)",
                animation: "beltMove 1.6s linear infinite",
              }}
            />
          </foreignObject>
        </motion.g>
      </g>

      {/* Front side panel */}
      <polygon
        points={`${FL} ${FR} ${FBR} ${FBL}`}
        fill="url(#beltSide)"
        stroke="#040e22"
        strokeWidth="1"
      />

      {/* Side rail (top edge highlight) */}
      <polygon
        points={`${TL} ${TR} 648,303 152,303`}
        fill="url(#frame)"
        opacity="0.9"
      />
      {/* far rail back */}
      <polygon
        points={`${TR} ${BR} 698,358 648,303`}
        fill="#3f6db0"
        opacity="0.7"
      />

      {/* End caps with bolts */}
      <g>
        <rect x="138" y="298" width="14" height="62" rx="2" fill="#1f4e94" />
        <rect x="648" y="298" width="14" height="62" rx="2" fill="#1f4e94" />
        {[306, 326, 346].map((y) => (
          <g key={y}>
            <circle cx="145" cy={y} r="2" fill="#aac1e2" />
            <circle cx="655" cy={y} r="2" fill="#aac1e2" />
          </g>
        ))}
      </g>
    </g>
  );
}

/* ──────────────────────────────────────────── Pulley ─── */

function Pulley({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) {
  return (
    <g>
      {/* axle shadow */}
      <ellipse cx={cx} cy={cy + 36} rx="32" ry="6" fill="rgba(0,0,0,0.18)" />
      {/* outer face */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
      >
        <circle cx={cx} cy={cy} r="34" fill="url(#pulley)" stroke="#0b2147" strokeWidth="1.5" />
        {/* spokes */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x={cx - 2}
            y={cy - 30}
            width="4"
            height="60"
            rx="1.5"
            fill="#1f4e94"
            transform={`rotate(${deg} ${cx} ${cy})`}
            opacity="0.55"
          />
        ))}
        <circle cx={cx} cy={cy} r="8" fill="#0b2147" />
        <circle cx={cx} cy={cy} r="3" fill="#aac1e2" />
      </motion.g>
      {/* belt wrap arc */}
      <path
        d={`M ${cx} ${cy - 30} A 30 30 0 0 ${cx > 400 ? 0 : 1} ${cx} ${cy + 30}`}
        fill="none"
        stroke="#040e22"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ──────────────────────────────────────────── Cargo ─── */

function MovingCargo() {
  // 4 boxes evenly spaced, each loops left→right
  const boxes = [0, 1, 2, 3];
  return (
    <g>
      {boxes.map((i) => (
        <motion.g
          key={i}
          initial={{ x: -120 }}
          animate={{ x: 700 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: -i * 1.5,
          }}
        >
          <CargoBox baseX={200} baseY={300} hue={i % 2 === 0 ? "amber" : "blue"} />
        </motion.g>
      ))}
    </g>
  );
}

function CargoBox({
  baseX,
  baseY,
  hue,
}: {
  baseX: number;
  baseY: number;
  hue: "amber" | "blue";
}) {
  const size = 38;
  // isometric cube — front, top, right faces
  const top = `${baseX},${baseY - size} ${baseX + size},${baseY - size} ${baseX + size + 14},${baseY - size + 14} ${baseX + 14},${baseY - size + 14}`;
  const front = `${baseX},${baseY - size} ${baseX + size},${baseY - size} ${baseX + size},${baseY} ${baseX},${baseY}`;
  const right = `${baseX + size},${baseY - size} ${baseX + size + 14},${baseY - size + 14} ${baseX + size + 14},${baseY + 14} ${baseX + size},${baseY}`;

  const frontFill = hue === "amber" ? "url(#boxFace)" : "#1f4e94";
  const topFill = hue === "amber" ? "url(#boxTop)" : "#3f6db0";
  const rightFill = hue === "amber" ? "url(#boxRight)" : "#0b2147";

  return (
    <motion.g
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <polygon points={top} fill={topFill} />
      <polygon points={front} fill={frontFill} />
      <polygon points={right} fill={rightFill} />
      {/* label band */}
      <rect
        x={baseX + 4}
        y={baseY - 18}
        width={size - 8}
        height="4"
        fill="rgba(255,255,255,0.55)"
      />
      <rect
        x={baseX + 4}
        y={baseY - 10}
        width={size - 14}
        height="2"
        fill="rgba(255,255,255,0.35)"
      />
    </motion.g>
  );
}

/* ──────────────────────────────────────────── Leg / supports ─── */

function Leg({ x }: { x: number }) {
  return (
    <g>
      <polygon
        points={`${x},395 ${x + 14},395 ${x + 14 + 6},540 ${x + 6},540`}
        fill="#3f6db0"
      />
      <polygon
        points={`${x + 14},395 ${x + 14 + 6},540 ${x + 14 + 6 + 8},532 ${x + 14 + 8},387`}
        fill="#1f4e94"
      />
      {/* base plate */}
      <polygon
        points={`${x - 4},540 ${x + 28},540 ${x + 36},548 ${x + 4},548`}
        fill="#0b2147"
      />
    </g>
  );
}

/* ──────────────────────────────────────────── Particles ─── */

function Particles() {
  const dots = [
    { x: 170, y: 280, d: 0 },
    { x: 220, y: 270, d: 0.4 },
    { x: 540, y: 280, d: 0.9 },
    { x: 620, y: 260, d: 1.5 },
    { x: 660, y: 285, d: 0.2 },
  ];
  return (
    <g>
      {dots.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2.2"
          fill="rgba(245,158,11,0.75)"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-2, -22, -34], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: p.d,
          }}
        />
      ))}
    </g>
  );
}

/* ──────────────────────────────────────────── Spinning Gear ─── */

function SpinningGear({
  cx,
  cy,
  size,
  reverse,
}: {
  cx: number;
  cy: number;
  size: number;
  reverse?: boolean;
}) {
  const teeth = 10;
  const r = size;
  const tooth = size * 0.18;
  const path: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + tooth);
    const y1 = cy + Math.sin(a) * (r + tooth);
    const x2 = cx + Math.cos(a2) * r;
    const y2 = cy + Math.sin(a2) * r;
    path.push(`${i === 0 ? "M" : "L"} ${x1} ${y1} L ${x2} ${y2}`);
  }
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      opacity="0.18"
    >
      <path d={path.join(" ") + " Z"} fill="#1f4e94" />
      <circle cx={cx} cy={cy} r={size * 0.4} fill="white" />
      <circle cx={cx} cy={cy} r={size * 0.15} fill="#1f4e94" />
    </motion.g>
  );
}

/* ──────────────────────────────────────────── HUD ─── */

function Hud() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-3 right-2 md:right-6 glass rounded-2xl px-4 py-3 shadow-soft"
      >
        <div className="text-[10px] uppercase tracking-widest text-brand-500/80 font-semibold">
          Belt Speed
        </div>
        <div className="font-display text-xl font-bold text-brand-900 tabular-nums">
          1.6 m/s
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-brand-700/70">Running</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-2 md:left-6 glass rounded-2xl px-4 py-3 shadow-soft"
      >
        <div className="text-[10px] uppercase tracking-widest text-brand-500/80 font-semibold">
          Throughput
        </div>
        <div className="font-display text-xl font-bold text-brand-900 tabular-nums">
          120 T/hr
        </div>
        <div className="text-[10px] text-brand-700/70 mt-1">
          Sustained operating load
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: -8, scale: 1.05 }}
        className="absolute top-1/2 -right-3 md:-right-5 -translate-y-1/2 size-20 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-[0_15px_30px_-10px_rgba(245,158,11,0.6)] border-4 border-white"
      >
        <div className="text-center text-brand-950 leading-tight">
          <div className="text-[10px] font-extrabold uppercase tracking-wider">
            ISO
          </div>
          <div className="text-sm font-display font-bold">9001</div>
          <div className="text-[8px] font-bold opacity-80">CERTIFIED</div>
        </div>
      </motion.div>
    </>
  );
}
