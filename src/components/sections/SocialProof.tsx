import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import CountUp from '../ui/CountUp';

const TESTIMONIAL_KEYS = ['testimonial1', 'testimonial2', 'testimonial3'] as const;

export default function SocialProof() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            {t('socialProof.headline')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            {t('socialProof.subheadline')}
          </p>
        </div>

        <div className="text-center mb-14">
          <CountUp
            target={396000}
            suffix="+"
            className="text-5xl sm:text-6xl font-extrabold text-primary font-display"
          />
          <p className="text-gray-500 mt-2 text-lg">
            {t('socialProof.statDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIAL_KEYS.map((key, index) => (
            <ScrollReveal key={key} delay={index * 0.1}>
              <div className="bg-gray-100 rounded-2xl p-8 flex flex-col h-full">
                <div className="text-primary/30 mb-4">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <blockquote className="text-gray-600 italic flex-1">
                  "{t(`socialProof.${key}.quote`)}"
                </blockquote>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="font-display font-bold text-dark">
                    {t(`socialProof.${key}.name`)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(`socialProof.${key}.role`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
