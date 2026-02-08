import { useTranslation } from 'react-i18next';
import { Building2, UserPlus, Smartphone } from 'lucide-react';
import StepCard from '../ui/StepCard';
import ScrollReveal from '../ui/ScrollReveal';

const steps = [
  { key: 'register', Icon: Building2 },
  { key: 'invite', Icon: UserPlus },
  { key: 'manage', Icon: Smartphone },
] as const;

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {t('howItWorks.sectionTag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 text-dark tracking-tight">
            {t('howItWorks.headline')}
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            {t('howItWorks.subheadline')}
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="hidden md:block absolute top-5 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] border-t-2 border-dashed border-gray-200"
            aria-hidden="true"
          />

          {steps.map(({ key, Icon }, index) => (
            <ScrollReveal key={key} delay={index * 0.15} className="relative z-10">
              <StepCard
                stepNumber={index + 1}
                icon={<Icon className="w-8 h-8" />}
                titleKey={`howItWorks.${key}.title`}
                descriptionKey={`howItWorks.${key}.description`}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
