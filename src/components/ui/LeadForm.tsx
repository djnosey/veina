import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useFormSubmit } from '../../hooks/useFormSubmit';

interface LeadFormProps {
  formspreeId: string;
}

const SIZE_OPTIONS = ['1-10', '11-30', '31-50', '50+'] as const;

export default function LeadForm({ formspreeId }: LeadFormProps) {
  const { t } = useTranslation();
  const { submit, status, error } = useFormSubmit();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [size, setSize] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [pain, setPain] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submit(formspreeId, {
      name,
      email,
      role,
      size,
      neighborhood,
      pain,
    });
  };

  if (status === 'success') {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      t('finalCta.shareText'),
    )}`;

    return (
      <div className="text-center py-10">
        <div className="bg-primary/15 text-primary rounded-full p-4 w-fit mx-auto mb-6">
          <Send className="w-8 h-8" />
        </div>
        <p className="text-xl font-semibold text-dark mb-4">
          {t('finalCta.successMessage')}
        </p>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-success text-white font-semibold px-6 py-3 rounded-full hover:bg-success-light transition-colors duration-200"
        >
          <Share2 className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    );
  }

  const inputBase =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors duration-150';
  const labelBase = 'block text-sm font-medium text-gray-600 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-name" className={labelBase}>
            {t('finalCta.nameLabel')}
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('finalCta.namePlaceholder')}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className={labelBase}>
            {t('finalCta.emailLabel')}
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('finalCta.emailPlaceholder')}
            className={inputBase}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-role" className={labelBase}>
            {t('finalCta.roleLabel')}
          </label>
          <select
            id="lead-role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputBase}
          >
            <option value="" disabled>
              --
            </option>
            <option value="president">{t('finalCta.rolePresident')}</option>
            <option value="owner">{t('finalCta.roleOwner')}</option>
            <option value="admin">{t('finalCta.roleAdmin')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="lead-size" className={labelBase}>
            {t('finalCta.sizeLabel')}
          </label>
          <select
            id="lead-size"
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={inputBase}
          >
            <option value="" disabled>
              --
            </option>
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lead-neighborhood" className={labelBase}>
          {t('finalCta.neighborhoodLabel')}
        </label>
        <input
          id="lead-neighborhood"
          type="text"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder={t('finalCta.neighborhoodPlaceholder')}
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="lead-pain" className={labelBase}>
          {t('finalCta.painLabel')}
        </label>
        <textarea
          id="lead-pain"
          rows={3}
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          placeholder={t('finalCta.painPlaceholder')}
          className={inputBase}
        />
      </div>

      {status === 'error' && (
        <p className="text-accent-dark text-sm font-medium" role="alert">
          {error}
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold rounded-full px-6 py-3.5 text-lg hover:bg-accent-light glow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 min-h-[44px]"
      >
        <Send className="w-5 h-5" />
        {status === 'submitting'
          ? t('finalCta.submitting')
          : t('finalCta.submitButton')}
      </motion.button>
    </form>
  );
}
