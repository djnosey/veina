import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PainCardProps {
  icon: ReactNode;
  titleKey: string;
  descriptionKey: string;
  solutionKey?: string;
}

export default function PainCard({ icon, titleKey, descriptionKey, solutionKey }: PainCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-gray-100 rounded-2xl p-8 hover:bg-gray-50 transition-colors duration-300 cursor-default h-full flex flex-col"
    >
      <div className="bg-warning/15 text-warning rounded-xl p-3 w-fit">
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg mt-4 text-dark">{t(titleKey)}</h3>
      <p className="text-gray-500 text-base mt-2 flex-1">{t(descriptionKey)}</p>
      {solutionKey && (
        <p className="text-primary font-semibold text-sm mt-4 flex items-center gap-1.5">
          <ArrowRight className="w-4 h-4 shrink-0" />
          {t(solutionKey)}
        </p>
      )}
    </motion.div>
  );
}
