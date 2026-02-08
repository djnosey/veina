import { useTranslation } from 'react-i18next';
import { Eye, Vote, BadgePercent } from 'lucide-react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface Pillar {
  key: string;
  Icon: LucideIcon;
}

const pillars: Pillar[] = [
  { key: 'transparency', Icon: Eye },
  { key: 'decisions', Icon: Vote },
  { key: 'vendors', Icon: BadgePercent },
];

export default function Solution() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/buildings-facade.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/90" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {t('solution.sectionTag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 text-white tracking-tight">
            {t('solution.headline')}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            {t('solution.subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map(({ key, Icon }, index) => (
            <ScrollReveal key={key} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-dark-light border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="bg-primary/15 text-primary rounded-xl p-3 w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mt-5 text-white">
                  {t(`solution.${key}.title`)}
                </h3>
                <p className="text-gray-400 text-base mt-2">
                  {t(`solution.${key}.description`)}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
