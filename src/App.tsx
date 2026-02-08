import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Problems from './components/sections/Problems';
import Solution from './components/sections/Solution';
import MidCta from './components/sections/MidCta';
import HowItWorks from './components/sections/HowItWorks';
import WhoItsFor from './components/sections/WhoItsFor';
import SocialProof from './components/sections/SocialProof';
import FinalCta from './components/sections/FinalCta';
import Footer from './components/layout/Footer';

const HERO_FORMSPREE_ID = 'xojnqboa';
const CTA_FORMSPREE_ID = 'mgoleqje';
const base = import.meta.env.BASE_URL;

function ParallaxImage({ src, alt, height }: { src: string; alt: string; height: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15px', '15px']);

  return (
    <div ref={ref} className={`${height} relative overflow-hidden`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900">
      <Navbar />
      <Hero />
      <Problems />

      <ParallaxImage
        src={`${base}images/city-aerial.jpg`}
        alt="Barcelona skyline at sunset"
        height="h-64 md:h-80 lg:h-96"
      />

      <Solution />
      <MidCta formspreeId={HERO_FORMSPREE_ID} />

      <ParallaxImage
        src={`${base}images/street-sunset.jpg`}
        alt="Barcelona street at golden hour"
        height="h-48 md:h-64 lg:h-80"
      />

      <HowItWorks />
      <WhoItsFor />
      <SocialProof />

      <ParallaxImage
        src={`${base}images/balcony-detail.jpg`}
        alt="Elegant European building facade with balconies"
        height="h-48 md:h-64 lg:h-80"
      />

      <FinalCta formspreeId={CTA_FORMSPREE_ID} />
      <Footer />
    </div>
  );
}

export default App;
