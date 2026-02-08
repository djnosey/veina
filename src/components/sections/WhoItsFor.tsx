import { useTranslation } from 'react-i18next';
import { Shield, Home } from 'lucide-react';
import PersonaCard from '../ui/PersonaCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function WhoItsFor() {
  const { t } = useTranslation();

  return (
    <section className="bg-dark hero-grid py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {t('whoItsFor.sectionTag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 text-white tracking-tight">
            {t('whoItsFor.headline')}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            {t('whoItsFor.subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal delay={0}>
            <PersonaCard
              icon={<Shield className="w-10 h-10" />}
              titleKey="whoItsFor.president.title"
              descriptionKey="whoItsFor.president.description"
              bulletKeys={[
                'whoItsFor.president.bullet1',
                'whoItsFor.president.bullet2',
                'whoItsFor.president.bullet3',
              ]}
              accent="primary"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <PersonaCard
              icon={<Home className="w-10 h-10" />}
              titleKey="whoItsFor.owner.title"
              descriptionKey="whoItsFor.owner.description"
              bulletKeys={[
                'whoItsFor.owner.bullet1',
                'whoItsFor.owner.bullet2',
                'whoItsFor.owner.bullet3',
              ]}
              accent="accent"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
