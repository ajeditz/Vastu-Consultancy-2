"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SriYantra } from "./CelestialDecor";
import styles from "./Services.module.css";

const services = [
  {
    title: "Vedic Numerology",
    description: "Decode the numerical patterns of your destiny to unlock alignment and true success.",
    image: "/images/service-num.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="3" y1="15" x2="21" y2="15"></line>
      </svg>
    ),
  },
  {
    title: "Name Correction",
    description: "Harmonize the vibrational frequency of your name with your celestial blueprint.",
    image: "/images/service-name.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
  },
  {
    title: "Watch Analysis",
    description: "Analyze the timepieces you wear to understand and realign your personal timelines and energy.",
    image: "/images/service-watch.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7"></circle>
        <polyline points="12 9 12 12 13.5 13.5"></polyline>
        <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
      </svg>
    ),
  },
  {
    title: "Business Numerology",
    description: "Align your brand name, launch dates, and corporate identity with prosperous numeric vibrations.",
    image: "/images/service-business.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path>
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
      </svg>
    ),
  },
  {
    title: "Vaastu Correction",
    description: "Rectify spatial flaws and optimize the flow of Prana without structural demolition.",
    image: "/images/service-vaastu.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    title: "Astrology",
    description: "Deep insights into your life path, relationships, and potentials based on celestial transits.",
    image: "/images/service-astrology.png",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="services" className={styles.services}>
      <div className={styles.cosmicParticles}></div>
      <SriYantra />
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <div className={styles.line}></div>
            <span className={styles.badgeText}>Our Expertise</span>
          </div>
          <h2 className={styles.title}>
            Our Spiritual <span className={styles.italic}>Services</span>
          </h2>
          <p className={styles.subtitle}>
            Ancient sciences and modern insights to balance your life, energy, destiny, and success.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className={styles.card}>
              <div className={styles.imageOverlay}>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  className={styles.cardImage}
                />
                <div className={styles.gradient}></div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
              <div className={styles.hoverLine}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
