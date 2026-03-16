"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AstrologySymbol } from "./CelestialDecor";
import styles from "./CallToAction.module.css";

export default function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <motion.div 
          className={styles.banner}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.contentCol}>
            <div className={styles.headerArea}>
              <div className={styles.iconWrapper}>
                <AstrologySymbol />
              </div>
            </div>
            <motion.h2 
              className={styles.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              "True harmony begins when your space, energy, and intentions align."
            </motion.h2>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Start Your Consultation Today
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a href="#contact" className={styles.ctaButton} onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Consult Now
              </a>
            </motion.div>
          </div>

          <div className={styles.imageCol}>
            <motion.div 
              className={styles.imageWrapper}
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className={styles.glowBg}></div>
              <Image 
                src="/images/cta-portrait.jpg" 
                alt="Consultant Portrait" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className={styles.portrait}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
