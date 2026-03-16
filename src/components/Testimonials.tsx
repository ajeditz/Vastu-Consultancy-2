"use client";

import { motion } from "framer-motion";
import { MoonPhases } from "./CelestialDecor";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Sakshi A.",
    initials: "SA",
    content: "Thankyou for your guidance mam ❤️ You gave me clarity on many things.",
    stars: 5,
  },
  {
    name: "Dhanashree R.",
    initials: "DR",
    content: "She told me everything that I wanted. You can call her whenever you want.",
    stars: 4,
  },
  {
    name: "Pushkal U.",
    initials: "PU",
    content: "Beautiful conversation with mam and she replied to each and every question with justification. Thank u so much Mam.",
    stars: 5,
  },
  {
    name: "Potpottya C.",
    initials: "PC",
    content: "Mam bohut acchi hai (Mam is very good). Thanks for all the support.",
    stars: 5,
  },
  {
    name: "Chaitali W.",
    initials: "CW",
    content: "Tq for giving me the ans. Deep insights and wonderful remedies provided.",
    stars: 4,
  },
  {
    name: "Raj G.",
    initials: "RG",
    content: "Nice experience! Everything explained was accurate and to the point. Highly recommend.",
    stars: 5,
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MoonPhases />
          <div className={styles.badge} style={{ marginTop: '2rem' }}>
            <div className={styles.line}></div>
            <span className={styles.badgeText}>Client Voices</span>
          </div>
          <h2 className={styles.title}>
            Whispers of <span className={styles.italic}>Transformation</span>
          </h2>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={itemVariants} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.authorInfo}>
                  <div className={styles.avatarGlow}>
                    <div className={styles.avatar}>{t.initials}</div>
                  </div>
                  <h4 className={styles.name}>{t.name}</h4>
                </div>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} width="16" height="16" viewBox="0 0 24 24" fill={index < t.stars ? "#c59b27" : "#e5e7eb"} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
              </div>
              <p className={styles.content}>"{t.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
