"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const SYMBOLS = ["✧", "ॐ", "✦", "✡", "❂", "✺"];

export default function SacredClickEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      };
      setParticles((prev) => [...prev, newParticle]);
      
      // Auto-remove after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: p.x, y: p.y - 10 }}
            animate={{ opacity: 0, scale: 2, y: p.y - 100, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'absolute',
              color: '#D35400',
              fontSize: '1.5rem',
              left: -15,
              top: -15,
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
