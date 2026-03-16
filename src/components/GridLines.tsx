"use client";

import { useEffect, useRef } from "react";
import styles from "./GridLines.module.css";

// Grid config
const COLS = 7;   // vertical lines
const ROWS = 5;   // horizontal lines
const W = 1400;   // viewBox width
const H = 900;    // viewBox height

type LineConfig = {
  x1: number; y1: number;
  x2: number; y2: number;
  len: number;
  delay: string;
  dur: string;
  axis: "x" | "y";
};

function buildLines(): LineConfig[] {
  const lines: LineConfig[] = [];

  // Vertical lines
  for (let i = 0; i <= COLS; i++) {
    const x = (W / COLS) * i;
    const len = H;
    lines.push({
      x1: x, y1: 0, x2: x, y2: H, len,
      delay: `${(i * 0.9).toFixed(1)}s`,
      dur: `${3.5 + i * 0.4}s`,
      axis: "y",
    });
  }

  // Horizontal lines
  for (let j = 0; j <= ROWS; j++) {
    const y = (H / ROWS) * j;
    const len = W;
    lines.push({
      x1: 0, y1: y, x2: W, y2: y, len,
      delay: `${(j * 1.1).toFixed(1)}s`,
      dur: `${4.5 + j * 0.5}s`,
      axis: "x",
    });
  }

  // Diagonal lines (same as original: M0 0 L400 400 style)
  const diagLen = Math.hypot(W, H);
  lines.push({ x1: 0, y1: 0,   x2: W, y2: H,   len: diagLen, delay: "0.5s", dur: "6s", axis: "x" });
  lines.push({ x1: W, y1: 0,   x2: 0, y2: H,   len: diagLen, delay: "1.8s", dur: "6.5s", axis: "x" });

  return lines;
}

const LINES = buildLines();

export default function GridLines() {
  return (
    <svg
      className={styles.grid}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Pulse gradient: bright centre, fades to transparent */}
        <linearGradient id="pulseGradX" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#D35400" stopOpacity="0" />
          <stop offset="40%"  stopColor="#D35400" stopOpacity="0.55" />
          <stop offset="50%"  stopColor="#EAB308" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#D35400" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D35400" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pulseGradY" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#D35400" stopOpacity="0" />
          <stop offset="40%"  stopColor="#D35400" stopOpacity="0.55" />
          <stop offset="50%"  stopColor="#EAB308" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#D35400" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D35400" stopOpacity="0" />
        </linearGradient>
      </defs>

      {LINES.map((line, i) => {
        const dashLen = line.len * 0.12; // pulse length = 12% of the line length
        const gap     = line.len;        // gap = full line (so only 1 pulse visible)
        const gradient = line.axis === "x" ? "url(#pulseGradX)" : "url(#pulseGradY)";

        return (
          <g key={i}>
            {/* Static dim base line */}
            <line
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="#D35400"
              strokeWidth="1"
              strokeOpacity="0.045"
            />
            {/* Travelling light pulse */}
            <line
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke={gradient}
              strokeWidth="1.5"
              strokeOpacity="1"
              strokeDasharray={`${dashLen} ${gap}`}
              strokeDashoffset={line.len + dashLen}
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from={line.len + dashLen}
                to={-(dashLen)}
                dur={line.dur}
                begin={line.delay}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </line>
          </g>
        );
      })}
    </svg>
  );
}
