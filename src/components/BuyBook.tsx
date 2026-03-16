"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AstrologySymbol } from "./CelestialDecor";
import styles from "./BuyBook.module.css";

export default function BuyBook() {
  return (
    <section id="book" className={styles.buyBook}>
      <div className={styles.cosmicParticles}></div>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <div className={styles.line}></div>
            <span className={styles.badgeText}>Featured Book</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Unlock the mystical power of numbers
          </h2>
          <p className={styles.sectionSubtitle}>
            and discover how numerology shapes destiny.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.imageCol}>
            <div className={styles.ambientGlow}></div>
            <motion.div
              className={styles.imageWrapper}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className={styles.book3DContainer}>
                <Image
                  src="/images/book-cover.png"
                  alt="Number's Magic Book Cover"
                  width={400}
                  height={600}
                  className={styles.bookImage}
                />
                <div className={styles.bookSpine}></div>
                <div className={styles.bookPages}></div>
                <div className={styles.bookShadow}></div>
              </div>
            </motion.div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.bookTitle}>
              Number's <span className={styles.italic}>Magic</span>
            </h3>
            <p className={styles.description}>
              Discover the hidden science of numbers and how numerology influences your personality, destiny, and life path. &quot;Number&apos;s Magic&quot; reveals powerful Vedic numerology insights that help you understand your energy, relationships, and success patterns.
            </p>
            <div className={styles.actions}>
              <a
                href="https://notionpress.com/in/read/number-s-magic/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                Buy the Book
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
