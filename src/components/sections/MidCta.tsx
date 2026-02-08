import { useTranslation } from 'react-i18next';
import EmailForm from '../ui/EmailForm';

interface MidCtaProps {
  formspreeId: string;
}

export default function MidCta({ formspreeId }: MidCtaProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark tracking-tight">
          {t('hero.headline')}
        </h2>
        <p className="text-gray-500 mt-3 text-base">
          {t('finalCta.subheadline')}
        </p>
        <div className="mt-8 flex justify-center">
          <EmailForm formspreeId={formspreeId} />
        </div>
      </div>
    </section>
  );
}
