"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./CelestialDecor.module.css";

// --- Sri Yantra Component (Geometric Harmony) ---
export const SriYantra = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);
  const springRotate = useSpring(rotate, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className={styles.sriYantraWrapper}>
      <motion.svg
        viewBox="0 0 100 100"
        style={{ rotate: springRotate, scale, opacity }}
        className={styles.sriYantra}
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 3" />
        
        <polygon points="50,15 80,75 20,75" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="50,85 80,25 20,25" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="50,25 70,65 30,65" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="50,75 70,35 30,35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        
        <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.2" />
      </motion.svg>
    </div>
  );
};

// --- Moon Phases Component ---
export const MoonPhases = () => {
  const [phase, setPhase] = useState(4); // Start with full moon
  const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  const phaseNames = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];

  return (
    <motion.div 
      className={styles.moonWrapper}
      onClick={() => setPhase((prev) => (prev + 1) % 8)}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div 
        key={phase}
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        className={styles.moonText}
      >
        {phases[phase]}
      </motion.div>
      <div className={styles.moonGlow}></div>
      <span className={styles.phaseName}>{phaseNames[phase]}</span>
      <span className={styles.tapHint}>Tap to Align</span>
    </motion.div>
  );
};

// --- Solar Spirit (Interactive Sun) ---
export const SolarSpirit = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const sunX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]));
  const sunY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]));

  return (
    <div className={styles.solarWrapper}>
      <motion.div 
        className={styles.sunCore}
        style={{ x: sunX, y: sunY }}
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={styles.raysContainer}
        >
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={styles.ray} 
              style={{ transform: `rotate(${i * 30}deg) translateY(-50px)` }}
            />
          ))}
        </motion.div>
        <div className={styles.sunCenter}></div>
      </motion.div>
    </div>
  );
};

// --- Astrology Symbol with "Zen Pop" ---
export const AstrologySymbol = ({ type = "om" }: { type?: "om" | "lotus" | "shakti" }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className={styles.symbolOuter} onClick={handleClick}>
      <motion.div 
        className={styles.symbolContainer}
        animate={isAnimating ? { 
          scale: [1, 1.8, 1],
          rotate: [0, 360, 360],
          filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
        } : { rotate: 0 }}
        transition={{ duration: 0.8 }}
      >
        {type === "om" && <span className={styles.symbolLarge}>ॐ</span>}
        {type === "lotus" && (
          <svg viewBox="0 0 24 24" className={styles.symbolSvg}>
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 3a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 12 3a8 8 0 0 0-8 7.2c0 7.3 8 11.8 8 11.8z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="12" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        )}
      </motion.div>
      {isAnimating && (
        <motion.div 
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          className={styles.ripple}
        />
      )}
    </div>
  );
};
