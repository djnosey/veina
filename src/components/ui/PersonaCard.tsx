import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

interface PersonaCardProps {
  icon: ReactNode;
  titleKey: string;
  descriptionKey: string;
  bulletKeys: string[];
  accent: 'primary' | 'success' | 'accent';
}

const accentStyles = {
  primary: {
    iconBg: 'bg-primary/15 text-primary',
    border: 'border-t-primary',
    check: 'text-primary',
  },
  success: {
    iconBg: 'bg-success/15 text-success',
    border: 'border-t-success',
    check: 'text-success',
  },
  accent: {
    iconBg: 'bg-accent/15 text-accent',
    border: 'border-t-accent',
    check: 'text-accent',
  },
} as const;

export default function PersonaCard({
  icon,
  titleKey,
  descriptionKey,
  bulletKeys,
  accent,
}: PersonaCardProps) {
  const { t } = useTranslation();
  const styles = accentStyles[accent];

  return (
    <div className={`bg-white rounded-2xl p-8 border-t-4 h-full flex flex-col ${styles.border}`}>
      <div className={`${styles.iconBg} rounded-xl p-4 w-fit mx-auto`}>{icon}</div>
      <h3 className="font-display font-bold text-xl mt-6 text-center text-dark">{t(titleKey)}</h3>
      <p className="text-gray-500 mt-3 text-center flex-1">{t(descriptionKey)}</p>
      <ul className="mt-6 space-y-3">
        {bulletKeys.map((bulletKey) => (
          <li key={bulletKey} className="flex items-start gap-3">
            <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${styles.check}`} />
            <span className="text-gray-600 text-sm">{t(bulletKey)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
