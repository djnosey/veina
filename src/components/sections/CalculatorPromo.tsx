import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { motion } from 'motion/react';

import ScrollReveal from '../ui/ScrollReveal';

export default function CalculatorPromo() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="inline-block bg-accent/15 text-accent-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {t('calculatorPromo.sectionTag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-dark tracking-tight">
            {t('calculatorPromo.headline')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            {t('calculatorPromo.subheadline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Link
                to="/calculadora"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                <Calculator className="w-5 h-5" />
                {t('calculatorPromo.cta')}
              </Link>
            </motion.div>
            <p className="text-gray-400 text-sm mt-4">
              {t('calculatorPromo.trust')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
