"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./RashiWheel.module.css";

const ZODIAC_NAMES = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const ZODIAC_SYMBOLS = [
  "M485 85 Q500 65 515 85 M500 75 V95",
  "M485 80 A15 15 0 1 0 515 80 M485 75 Q500 60 515 75",
  "M485 70 H515 M485 95 H515 M493 70 V95 M507 70 V95",
  "M515 75 A10 10 0 1 0 495 75 M485 90 A10 10 0 1 0 505 90",
  "M490 90 A10 10 0 1 1 500 80 Q515 80 515 95",
  "M485 75 Q495 65 500 85 Q505 65 515 90",
  "M485 95 H515 M485 85 Q500 70 515 85",
  "M485 75 V95 M495 75 V95 M505 75 V100 L515 85",
  "M485 95 L515 65 M505 65 H515 V75 M490 85 L500 95",
  "M485 75 V95 Q500 105 515 75",
  "M485 80 Q500 70 515 80 M485 95 Q500 85 515 95",
  "M485 75 Q500 85 515 75 M485 95 Q500 85 515 95 M500 70 V100",
];

const CONSTELLATIONS = [
  { dots: [[680,170],[710,150],[740,175],[725,210],[760,195],[755,230]], lines: [[680,170,710,150],[710,150,740,175],[740,175,725,210],[725,210,760,195],[760,195,755,230]] },
  { dots: [[820,350],[850,330],[870,360],[840,380],[860,400]], lines: [[820,350,850,330],[850,330,870,360],[870,360,840,380],[840,380,860,400]] },
  { dots: [[750,700],[780,720],[770,755],[800,740],[810,770]], lines: [[750,700,780,720],[780,720,770,755],[780,720,800,740],[800,740,810,770]] },
  { dots: [[230,750],[260,770],[250,800],[280,790],[220,790]], lines: [[230,750,260,770],[260,770,250,800],[260,770,280,790],[230,750,220,790]] },
  { dots: [[220,230],[250,210],[240,250],[270,235],[200,260]], lines: [[220,230,250,210],[250,210,270,235],[220,230,240,250],[240,250,200,260]] },
  { dots: [[150,430],[170,410],[190,440],[160,460]], lines: [[150,430,170,410],[170,410,190,440],[190,440,160,460],[160,460,150,430]] },
  { dots: [[420,130],[440,110],[465,125],[450,150]], lines: [[420,130,440,110],[440,110,465,125],[465,125,450,150]] },
  { dots: [[480,850],[510,870],[540,855],[520,830]], lines: [[480,850,510,870],[510,870,540,855],[540,855,520,830]] },
];

const STAR_POINTS = [
  [600,120],[880,480],[850,600],[130,350],[350,880],[620,870],[160,600],
  [310,140],[890,280],[120,800],[680,170],[710,150],[740,175],[725,210],
  [820,350],[850,330],[750,700],[780,720],[230,750],[260,770],[220,230],
  [250,210],[150,430],[170,410],[420,130],[480,850],[510,870],[760,195],
];

export default function RashiWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outerRingRef = useRef<SVGSVGElement>(null);

  const [hoveredSign, setHoveredSign] = useState<number | null>(null);

  const outerRotRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);

  // mirror hoveredSign into ref so rAF can read it without re-attaching
  useEffect(() => { hoveredRef.current = hoveredSign; }, [hoveredSign]);

  // --- Outer ring: JS-driven rotation (auto-spin + scroll) ---
  useEffect(() => {
    let rafId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        if (hoveredRef.current === null) {
          outerRotRef.current += (delta * 360) / 150000; // 150s per revolution
        }
      }
      lastTimeRef.current = time;
      const scrollBoost = scrollYRef.current * 0.06;
      if (outerRingRef.current) {
        outerRingRef.current.style.transform =
          `rotate(${outerRotRef.current + scrollBoost}deg)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // --- Scroll tracking ---
  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Mouse parallax (smooth lerp) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let tiltX = 0, tiltY = 0;
    let targetX = 0, targetY = 0;
    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      tiltX = lerp(tiltX, targetX, 0.07);
      tiltY = lerp(tiltY, targetY, 0.07);
      if (wrapperRef.current) {
        wrapperRef.current.style.transform =
          `perspective(900px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = ((e.clientX - cx) / (rect.width / 2)) * 8;
      targetY = -((e.clientY - cy) / (rect.height / 2)) * 8;
    };
    const onMouseLeave = () => { targetX = 0; targetY = 0; };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // --- Constellation canvas: faint lines + floating particles ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1000;
    canvas.height = 1000;

    type Line = { x1: number; y1: number; x2: number; y2: number; opacity: number; phase: "in" | "out" };
    type Particle = { x: number; y: number; vx: number; vy: number; opacity: number; r: number };

    let lines: Line[] = [];
    let frameCount = 0;
    let animId: number;

    // Floating particles orbiting the wheel area
    const particles: Particle[] = Array.from({ length: 28 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 340;
      const speed = 0.12 + Math.random() * 0.22;
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: 500 + dist * Math.cos(angle),
        y: 500 + dist * Math.sin(angle),
        vx: -Math.sin(angle) * speed * dir + (Math.random() - 0.5) * 0.08,
        vy:  Math.cos(angle) * speed * dir + (Math.random() - 0.5) * 0.08,
        opacity: 0.15 + Math.random() * 0.45,
        r: 0.7 + Math.random() * 1.6,
      };
    });

    const tryAddLine = () => {
      for (let attempt = 0; attempt < 12; attempt++) {
        const i = Math.floor(Math.random() * STAR_POINTS.length);
        const j = Math.floor(Math.random() * STAR_POINTS.length);
        if (i === j) continue;
        const [x1, y1] = STAR_POINTS[i];
        const [x2, y2] = STAR_POINTS[j];
        const dist = Math.hypot(x2 - x1, y2 - y1);
        if (dist >= 100 && dist <= 380) {
          lines.push({ x1, y1, x2, y2, opacity: 0, phase: "in" });
          break;
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, 1000, 1000);
      frameCount++;
      if (frameCount % 90 === 0) tryAddLine();

      // Draw constellation lines
      lines = lines.filter(l => !(l.phase === "out" && l.opacity <= 0));
      for (const line of lines) {
        if (line.phase === "in") {
          line.opacity = Math.min(line.opacity + 0.012, 0.28);
          if (line.opacity >= 0.28) line.phase = "out";
        } else {
          line.opacity = Math.max(line.opacity - 0.005, 0);
        }
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(234, 179, 8, ${line.opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Draw & update floating particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Soft boundary: steer back toward orbit range
        const dist = Math.hypot(p.x - 500, p.y - 500);
        if (dist < 90 || dist > 490) {
          const angle = Math.atan2(500 - p.y, 500 - p.x);
          p.vx += Math.cos(angle) * 0.05;
          p.vy += Math.sin(angle) * 0.05;
        }
        // Gentle opacity flicker
        p.opacity += (Math.random() - 0.5) * 0.018;
        p.opacity = Math.max(0.08, Math.min(0.65, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Gradient glow per particle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(234, 179, 8, ${p.opacity})`);
        grad.addColorStop(1, `rgba(234, 179, 8, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className={styles.wheelContainer}>
      <div ref={wrapperRef} className={styles.wheelWrapper}>

        {/* Ambient glow orb behind everything */}
        <div className={styles.glowOrb} />

        {/* Constellation canvas layer */}
        <canvas ref={canvasRef} className={styles.constellationCanvas} />

        {/* ── OUTER RING: Zodiac + outer circles (JS-driven, slowest) ── */}
        <svg ref={outerRingRef} className={styles.outerRing} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outermost ring */}
          <circle cx="500" cy="500" r="490" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.15" />
          {/* Dashed ornamental ring */}
          <circle cx="500" cy="500" r="475" fill="none" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="3 12" strokeLinecap="round" />
          {/* Solid zodiac ring */}
          <circle cx="500" cy="500" r="450" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.6" />

          {/* Zodiac symbols with hover interactions */}
          {ZODIAC_SYMBOLS.map((path, i) => (
            <g key={`zodiac-${i}`} transform={`rotate(${i * 30}, 500, 500)`}>
              {/* Pulse ring on hover */}
              {hoveredSign === i && (
                <>
                  <circle cx="500" cy="80" r="28" fill="none" stroke="#EAB308" strokeWidth="1.5" className={styles.pulseRingA} />
                  <circle cx="500" cy="80" r="26" fill="rgba(234,179,8,0.08)" stroke="none" className={styles.pulseRingB} />
                </>
              )}
              <path
                d={path}
                fill="none"
                stroke="#EAB308"
                strokeWidth={hoveredSign === i ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={hoveredSign === i ? "url(#strongGlow)" : "url(#glow)"}
                style={{ cursor: "pointer", pointerEvents: "all", transition: "stroke-width 0.2s" }}
                onMouseEnter={() => setHoveredSign(i)}
                onMouseLeave={() => setHoveredSign(null)}
                onClick={() => {
                  // The global click effect will handle the visual part
                  console.log(`Aligned with ${ZODIAC_NAMES[i]}`);
                }}
              />
            </g>
          ))}
        </svg>

        {/* ── MIDDLE RING: Geometry + segments (CSS counter-clockwise) ── */}
        <svg className={styles.middleRing} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {/* 12 segment dividers */}
          <g stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.35">
            {[...Array(12)].map((_, i) => (
              <line
                key={`seg-${i}`}
                x1="500" y1="10"
                x2="500" y2="500"
                transform={`rotate(${i * 30}, 500, 500)`}
              />
            ))}
          </g>
          {/* Inner decorative rings */}
          <circle cx="500" cy="500" r="340" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="500" cy="500" r="330" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeDasharray="2 6" strokeOpacity="0.3" />
          <circle cx="500" cy="500" r="200" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeDasharray="1 8" strokeOpacity="0.2" />
        </svg>

        {/* ── INNER RING: Stars + constellations (CSS clockwise, fastest) ── */}
        <svg className={styles.innerRing} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowInner">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Perfect 8-Pointed Central Star — outer r=150 inner r=62 */}
          <g filter="url(#glowInner)">
            <path
              d="M500,350 L523.8,442.7 L606.1,393.9 L557.3,476.2 L650,500 L557.3,523.8 L606.1,606.1 L523.8,557.3 L500,650 L476.2,557.3 L393.9,606.1 L442.7,523.8 L350,500 L442.7,476.2 L393.9,393.9 L476.2,442.7 Z"
              fill="rgba(234,179,8,0.04)" stroke="#EAB308" strokeWidth="1.5" strokeLinejoin="round"
            />
          </g>
          {/* Perfect 8-Pointed Inner Star — outer r=100 inner r=41 */}
          <g filter="url(#softGlow)">
            <path
              d="M500,400 L515.7,461.8 L570.7,429.3 L538.2,484.3 L600,500 L538.2,515.7 L570.7,570.7 L515.7,538.2 L500,600 L484.3,538.2 L429.3,570.7 L461.8,515.7 L400,500 L461.8,484.3 L429.3,429.3 L484.3,461.8 Z"
              fill="rgba(234,179,8,0.03)" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.6" strokeLinejoin="round"
            />
          </g>

          {/* Shatkona — sacred hexagram (Vastu geometry): two interlocked triangles */}
          <g filter="url(#softGlow)" opacity="0.55">
            {/* Upward triangle (r=70) */}
            <polygon
              points="500,430 560.6,535 439.4,535"
              fill="rgba(234,179,8,0.06)" stroke="#EAB308" strokeWidth="0.8" strokeOpacity="0.75"
            />
            {/* Downward triangle (r=70) */}
            <polygon
              points="500,570 560.6,465 439.4,465"
              fill="rgba(234,179,8,0.06)" stroke="#EAB308" strokeWidth="0.8" strokeOpacity="0.75"
            />
          </g>

          {/* Constellation patterns */}
          {CONSTELLATIONS.map((constellation, ci) => (
            <g key={`const-${ci}`}>
              {constellation.lines.map((line, li) => (
                <line key={`cline-${ci}-${li}`} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
                  stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.25" />
              ))}
              {constellation.dots.map((dot, di) => (
                <circle key={`cdot-${ci}-${di}`} cx={dot[0]} cy={dot[1]}
                  r={di === 0 ? 2.5 : 1.5} fill="#EAB308"
                  opacity={di === 0 ? 0.7 : 0.4}
                  filter={di === 0 ? "url(#softGlow)" : undefined} />
              ))}
            </g>
          ))}

          {/* Scattered individual stars */}
          <g fill="#EAB308">
            <circle cx="600" cy="120" r="1" opacity="0.3" />
            <circle cx="880" cy="480" r="1.5" opacity="0.25" />
            <circle cx="850" cy="600" r="1" opacity="0.2" />
            <circle cx="130" cy="350" r="1.5" opacity="0.2" />
            <circle cx="350" cy="880" r="1" opacity="0.25" />
            <circle cx="620" cy="870" r="1" opacity="0.2" />
            <circle cx="160" cy="600" r="1" opacity="0.15" />
            <circle cx="310" cy="140" r="1.5" opacity="0.2" />
            <circle cx="890" cy="280" r="1" opacity="0.15" />
            <circle cx="120" cy="800" r="1.5" opacity="0.2" />
          </g>
        </svg>

        {/* Static Om symbol — breathing wrapper */}
        <div className={styles.omWrapper}>
          <svg className={styles.omContainer} width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="omGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
              fill="#EAB308" fontSize="60" fontFamily="serif" filter="url(#omGlow)">
              ॐ
            </text>
          </svg>
        </div>

        {/* Zodiac name tooltip on hover */}
        {hoveredSign !== null && (
          <div className={styles.zodiacLabel}>
            <span className={styles.zodiacLabelText}>{ZODIAC_NAMES[hoveredSign]}</span>
          </div>
        )}

      </div>
    </div>
  );
}
