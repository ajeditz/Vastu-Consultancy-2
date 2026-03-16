"use client";

import { motion } from "framer-motion";
import { AstrologySymbol } from "./CelestialDecor";
import VastuMandala from "./VastuMandala";
import styles from "./Contact.module.css";

import { FormEvent } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    const text = `Hello, I want to book a consultation.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message || "N/A"}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919582252374?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Background World */}
      <VastuMandala />
      
      <div className={styles.sideDecoration}>
        <div className={styles.decorativeLine}></div>
        <span className={styles.decorativeText}>EST. 2008</span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <motion.div 
          className={styles.header}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className={styles.badge} variants={fadeInUp}>
            <div className={styles.dot}></div>
            <span className={styles.badgeText}>Final Alignment</span>
          </motion.div>
          
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Ready to <span className={styles.italic}>Transform</span><br />
            Your Living <span className={styles.outline}>Dimensions?</span>
          </motion.h2>
          
          <motion.p className={styles.subtitle} variants={fadeInUp}>
            Step into the sanctuary of balanced architecture. Our consultants are ready to harmonize your spatial reality.
          </motion.p>
        </motion.div>

        <div className={styles.mainContent}>
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.glassCard}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label>INITIATE AS</label>
                    <input type="text" name="name" placeholder="Full Name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>REACHABLE AT</label>
                    <input type="email" name="email" placeholder="Email Address" required />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>PHONE NUMBER</label>
                  <input type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
                </div>
                
                <div className={styles.formGroup}>
                  <label>SERVICE PATH</label>
                  <select name="service" required>
                    <option>Vastu Architecture</option>
                    <option>Astro-Mapping</option>
                    <option>Energy Balancing</option>
                    <option>Corporate Vastu</option>
                    <option>Others</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>MESSAGE</label>
                  <textarea name="message" rows={3} placeholder="Tell us about your space and goals..."></textarea>
                </div>
                
                <button type="submit" className={styles.primaryBtn}>
                  Submit
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            className={styles.infoContainer}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div className={styles.infoBlock} variants={fadeInUp}>
              <span className={styles.blockNum}>01</span>
              <div className={styles.blockContent}>
                <h4>Studio Address</h4>
                <p>Eternal Harmony Plaza, Suite 108<br />Spiritual District, New Delhi</p>
              </div>
            </motion.div>

            <motion.div className={styles.infoBlock} variants={fadeInUp}>
              <span className={styles.blockNum}>02</span>
              <div className={styles.blockContent}>
                <h4>Direct Link</h4>
                <a href="https://wa.me/919582252374" target="_blank" rel="noopener noreferrer" className={styles.phoneLink}>
                  +91 95822 52374
                </a>
                <p>hello@vastu.spirit</p>
              </div>
            </motion.div>

            <motion.div className={styles.socialGrid} variants={fadeInUp}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>INSTAGRAM</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LINKEDIN</span>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.3" cy="8.1" r="3.1"></circle><path d="M7 13.5v3.1c0 .4-.4.8-.8.8H2.8c-.4 0-.8-.4-.8-.8v-3.1"></path><path d="M2 13.5h10.6"></path><path d="M13.5 12h7"></path><path d="M17 12V4"></path></svg>
                <span>BEHANCE</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Absolute Bottom Decoration */}
      <div className={styles.bottomBar}>
        <div className={styles.barLine}></div>
        <div className={styles.copyright}>© 2026 HEALING CONSULTANCY. ALL RIGHTS RESERVED.</div>
      </div>
    </section>
  );
}
