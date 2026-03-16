"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.logo} brand-font`}>
        Healing<span className="text-accent">.</span>
      </div>
      <div className={styles.links}>
        <Link href="#services" className={styles.link}>Services</Link>
        <Link href="#about" className={styles.link}>About</Link>
        <Link href="#testimonials" className={styles.link}>Reviews</Link>
        <Link href="#book" className={styles.link}>The Book</Link>
        <Link href="#contact" className={styles.link}>Contact</Link>
      </div>
      <button className={styles.cta}>
        Book Reading
      </button>
    </nav>
  );
}
