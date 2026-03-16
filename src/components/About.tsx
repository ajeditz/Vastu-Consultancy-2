import Image from "next/image";
import { SolarSpirit } from "./CelestialDecor";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <SolarSpirit />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/about-portrait.jpg" 
                alt="Vastu Expert" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className={styles.image}
              />
              <div className={styles.experienceBadge}>
                <span className={styles.years}>15+</span>
                <span className={styles.expText}>Years of Experience</span>
              </div>
            </div>
            <div className={styles.imageBg}></div>
          </div>

          <div className={styles.contentSide}>
            <div className={styles.badge}>
              <div className={styles.line}></div>
              <span className={styles.badgeText}>Our Legacy</span>
            </div>
            <h2 className={styles.title}>
              The Wisdom of <span className={styles.italic}>Centuries</span>, Crafted for Today
            </h2>
            <p className={styles.description}>
              At Healing Consultancy, we believe that your environment is a mirror of your inner state. For over 15 years, we have been bridging the gap between ancient Vastu Shastra and contemporary architectural needs.
            </p>
            <p className={styles.description}>
              Our approach is not just about placing furniture or choosing colors; it's about aligning the fundamental energies of the five elements to create a resonant frequency that supports your specific life goals and spiritual growth.
            </p>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Global Awards</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Client Satisfaction</span>
              </div>
            </div>

            <button className={styles.cta}>Read Our Story</button>
          </div>
        </div>
      </div>
    </section>
  );
}
