import { useTranslation } from 'react-i18next';
import { AlertTriangle, EyeOff, Users, Receipt } from 'lucide-react';
import PainCard from '../ui/PainCard';
import ScrollReveal from '../ui/ScrollReveal';

const painPoints = [
  { key: 'arrears', Icon: AlertTriangle },
  { key: 'opacity', Icon: EyeOff },
  { key: 'meetings', Icon: Users },
  { key: 'vendors', Icon: Receipt },
] as const;

export default function Problems() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-warning/15 text-warning text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {t('problems.sectionTag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 text-dark tracking-tight">
            {t('problems.headline')}
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            {t('problems.subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map(({ key, Icon }, index) => (
            <ScrollReveal key={key} delay={index * 0.1}>
              <PainCard
                icon={<Icon className="w-6 h-6" />}
                titleKey={`problems.${key}.title`}
                descriptionKey={`problems.${key}.description`}
                solutionKey={`problems.${key}.solution`}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
