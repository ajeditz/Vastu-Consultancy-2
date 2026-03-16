"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./VastuMandala.module.css";

const DIRECTIONS = ["NORTH", "NE", "EAST", "SE", "SOUTH", "SW", "WEST", "NW"];
const SANSKRIT_DIRS = ["UTTARA", "ISHANYA", "PURVA", "AGNEYA", "DAKSHINA", "NAIRUTYA", "PASHCHIMA", "VAYAVYA"];

export default function VastuMandala() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const ring3Ref = useRef<SVGSVGElement>(null);

  const [hoveredDir, setHoveredDir] = useState<number | null>(null);

  const lastTimeRef = useRef<number | null>(null);
  const rotRef = useRef({ r1: 0, r2: 0, r3: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        rotRef.current.r1 += (delta * 360) / 180000;
        rotRef.current.r2 -= (delta * 360) / 120000;
        rotRef.current.r3 += (delta * 360) / 90000;
      }
      lastTimeRef.current = time;
      
      const scrollBoost = scrollYRef.current * 0.05;
      
      if (ring1Ref.current) ring1Ref.current.style.transform = `rotate(${rotRef.current.r1 + scrollBoost}deg)`;
      if (ring2Ref.current) ring2Ref.current.style.transform = `rotate(${rotRef.current.r2 - scrollBoost * 0.5}deg)`;
      if (ring3Ref.current) ring3Ref.current.style.transform = `rotate(${rotRef.current.r3 + scrollBoost * 0.8}deg)`;
      
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let tiltX = 0, tiltY = 0;
    let targetX = 0, targetY = 0;
    let animId: number;

    const tick = () => {
      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `perspective(1200px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 12;
      targetY = -((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 12;
    };
    el.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Canvas for "Sacred Particles"
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1200;
    canvas.height = 1200;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; r: number; color: string };
    let particles: Particle[] = [];

    const colors = ["rgba(211, 84, 0, 0.4)", "rgba(234, 179, 8, 0.3)", "rgba(255, 255, 255, 0.2)"];

    const animate = () => {
      ctx.clearRect(0, 0, 1200, 1200);
      
      if (particles.length < 60) {
        const radius = 200 + Math.random() * 300;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: 600 + Math.cos(angle) * radius,
          y: 600 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0.5 + Math.random() * 0.5,
          r: 1 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.002;
        if (p.life <= 0) particles.splice(i, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.3", (p.life * 0.3).toString());
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div ref={containerRef} className={styles.mandalaContainer}>
      <div className={styles.bgText}>VASTU</div>
      <div ref={wrapperRef} className={styles.mandalaWrapper}>
        <div className={styles.glow} />
        <canvas ref={canvasRef} className={styles.orbitCanvas} />

        {/* Outer Ring: Directions */}
        <svg ref={ring1Ref} className={styles.ring} viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="480" fill="none" stroke="var(--accent-orange)" strokeWidth="0.5" strokeOpacity="0.1" />
          {DIRECTIONS.map((dir, i) => (
            <g key={dir} transform={`rotate(${i * 45}, 500, 500)`}>
              <text 
                x="500" y="60" 
                textAnchor="middle" 
                fill="var(--accent-orange)" 
                fontSize="12" 
                fontWeight="900"
                className={styles.dirText}
                onMouseEnter={() => setHoveredDir(i)}
                onMouseLeave={() => setHoveredDir(null)}
              >
                {dir}
              </text>
              <text x="500" y="80" textAnchor="middle" fill="var(--accent-orange)" fontSize="8" opacity="0.4">{SANSKRIT_DIRS[i]}</text>
            </g>
          ))}
        </svg>

        {/* Middle Ring: Geometry */}
        <svg ref={ring2Ref} className={styles.ring} viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="380" fill="none" stroke="var(--accent-orange)" strokeWidth="1" strokeDasharray="2 10" />
          <path d="M500,120 L830,500 L500,880 L170,500 Z" fill="none" stroke="var(--accent-orange)" strokeWidth="0.5" strokeOpacity="0.3" />
          <g opacity="0.2">
            {[...Array(24)].map((_, i) => (
              <line key={i} x1="500" y1="500" x2="500" y2="150" stroke="var(--accent-orange)" transform={`rotate(${i * 15}, 500, 500)`} />
            ))}
          </g>
        </svg>

        {/* Inner Ring: Sacred Yantra */}
        <svg ref={ring3Ref} className={styles.ring} viewBox="0 0 1000 1000">
          <polygon points="500,250 716,625 284,625" fill="none" stroke="var(--accent-orange)" strokeWidth="1" strokeOpacity="0.6" />
          <polygon points="500,750 716,375 284,375" fill="none" stroke="var(--accent-orange)" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="500" cy="500" r="100" fill="none" stroke="var(--accent-orange)" strokeWidth="0.5" strokeDasharray="5 5" />
          <rect x="425" y="425" width="150" height="150" fill="none" stroke="var(--accent-orange)" strokeWidth="1" transform="rotate(45, 500, 500)" strokeOpacity="0.4" />
        </svg>

        <div className={styles.centerOm}>ॐ</div>
      </div>
    </div>
  );
}
