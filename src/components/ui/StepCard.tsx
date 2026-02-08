import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface StepCardProps {
  stepNumber: number;
  icon: ReactNode;
  titleKey: string;
  descriptionKey: string;
}

export default function StepCard({ stepNumber, icon, titleKey, descriptionKey }: StepCardProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center p-8">
      <div className="bg-primary text-white w-11 h-11 rounded-full flex items-center justify-center font-bold mx-auto">
        {stepNumber}
      </div>
      <div className="text-dark mt-4 flex justify-center">{icon}</div>
      <h3 className="font-display font-bold text-lg mt-4 text-dark">{t(titleKey)}</h3>
      <p className="text-gray-500 text-base mt-2">{t(descriptionKey)}</p>
    </div>
  );
}
