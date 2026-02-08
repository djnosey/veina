import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';

export default function Hero() {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <img
        src="/images/hero-aerial.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/80 hero-grid" />
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      >
        <h1 className="max-w-5xl text-3xl font-display font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-accent">{t('hero.headlineHighlight')}</span>
          {t('hero.headlineRest')}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
          {t('hero.subheadline')}
        </p>
      </motion.div>
    </section>
  );
}
