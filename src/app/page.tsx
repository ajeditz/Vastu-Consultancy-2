import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BuyBook from "@/components/BuyBook";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import GridLines from "@/components/GridLines";

export default function Home() {
  return (
    <>
      <GridLines />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <BuyBook />
      <CallToAction />
      <Contact />
      <WhatsAppButton />
      
      <footer style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--background)', borderTop: '1px solid #eee' }}>
        <p className="brand-font" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Healing<span className="text-accent">.</span></p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>© 2026 Healing Consultancy. All rights reserved.</p>
      </footer>
    </>
  );
}
