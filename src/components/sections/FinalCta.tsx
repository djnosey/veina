import { useTranslation } from 'react-i18next';
import LeadForm from '../ui/LeadForm';
import ScrollReveal from '../ui/ScrollReveal';

interface FinalCtaProps {
  formspreeId: string;
}

export default function FinalCta({ formspreeId }: FinalCtaProps) {
  const { t } = useTranslation();

  return (
    <section
      id="final-cta"
      className="bg-dark hero-grid py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {t('finalCta.urgency')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t('finalCta.headline')}
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              {t('finalCta.subheadline')}
            </p>
          </div>
        </ScrollReveal>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-gray-900">
          <LeadForm formspreeId={formspreeId} />
        </div>
      </div>
    </section>
  );
}
