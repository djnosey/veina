import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, AlertCircle, Send, TrendingDown, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { BENCHMARKS, getCostStatus } from '../../constants/benchmarks';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import ScrollReveal from '../ui/ScrollReveal';

import type { CostStatus } from '../../constants/benchmarks';
import type { CalculatorInputs } from './CalculatorForm';

interface CalculatorResultsProps {
  inputs: CalculatorInputs;
  formspreeId: string;
  onRecalculate: () => void;
}

interface ComparisonRow {
  categoryKey: string;
  translationKey: string;
  userPerUnit: number;
  benchmarkPerUnit: number;
  status: CostStatus;
}

const STATUS_COLORS: Record<CostStatus, { background: string; text: string; border: string }> = {
  good: { background: 'bg-success/15', text: 'text-success', border: 'border-success/30' },
  fair: { background: 'bg-primary/15', text: 'text-primary', border: 'border-primary/30' },
  high: { background: 'bg-warning/15', text: 'text-warning', border: 'border-warning/30' },
  overpaying: { background: 'bg-accent/15', text: 'text-accent', border: 'border-accent/30' },
};

function buildComparisons(inputs: CalculatorInputs): ComparisonRow[] {
  const { units } = inputs;

  const userPerUnit: Record<string, number> = {
    fee: inputs.feePerUnit,
    cleaning: inputs.cleaningTotal / units,
    elevator: inputs.elevatorTotal / units,
    insurance: inputs.insuranceAnnual / 12 / units,
    admin: inputs.adminTotal / units,
  };

  return BENCHMARKS.map((benchmark) => ({
    categoryKey: benchmark.key,
    translationKey: benchmark.translationKey,
    userPerUnit: userPerUnit[benchmark.key],
    benchmarkPerUnit: benchmark.averagePerUnit,
    status: getCostStatus(userPerUnit[benchmark.key], benchmark.averagePerUnit),
  }));
}

function ComparisonCard({ row, index }: { row: ComparisonRow; index: number }) {
  const { t } = useTranslation();
  const colors = STATUS_COLORS[row.status];
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`rounded-2xl border ${colors.border} bg-white p-5`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-dark">
          {t(row.translationKey)}
        </h3>
        <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${colors.background} ${colors.text}`}>
          {t(`calculator.results.status.${row.status}`)}
        </span>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{t('calculator.results.youPay')}</p>
          <p className="font-display font-extrabold text-2xl text-dark">
            {row.userPerUnit.toFixed(0)}&nbsp;&euro; <span className="text-base font-bold text-gray-500">{t('calculator.results.perUnit')}</span>
          </p>
        </div>

        <div className="flex-1 text-right">
          <p className="text-sm text-gray-500 mb-1">{t('calculator.results.average')}</p>
          <p className="font-display font-bold text-lg text-gray-500">
            {row.benchmarkPerUnit.toFixed(0)}&nbsp;&euro; <span className="text-sm">{t('calculator.results.perUnit')}</span>
          </p>
        </div>
      </div>

      {/* Visual bar comparison */}
      <div className="mt-3 space-y-1.5">
        <BarIndicator value={row.userPerUnit} maxValue={Math.max(row.userPerUnit, row.benchmarkPerUnit) * 1.2} color="bg-dark" />
        <BarIndicator value={row.benchmarkPerUnit} maxValue={Math.max(row.userPerUnit, row.benchmarkPerUnit) * 1.2} color="bg-gray-300" />
      </div>
    </motion.div>
  );
}

function BarIndicator({ value, maxValue, color }: { value: number; maxValue: number; color: string }) {
  const widthPercent = Math.max(5, (value / maxValue) * 100);
  const prefersReduced = useReducedMotion();

  return (
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <motion.div
        initial={prefersReduced ? { width: `${widthPercent}%` } : { width: '0%' }}
        animate={{ width: `${widthPercent}%` }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

function SummaryCard({ comparisons, inputs }: { comparisons: ComparisonRow[]; inputs: CalculatorInputs }) {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  // User total annual spend (all tracked categories)
  const userAnnual = (
    inputs.feePerUnit * inputs.units * 12
  );

  // Benchmark annual for same number of units
  const feeAverage = BENCHMARKS.find((benchmark) => benchmark.key === 'fee')?.averagePerUnit ?? 105;
  const benchmarkAnnual = feeAverage * inputs.units * 12;

  const difference = userAnnual - benchmarkAnnual;
  const isOverpaying = difference > 0;
  const hasOverpayingCategories = comparisons.some(
    (row) => row.status === 'high' || row.status === 'overpaying'
  );

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl bg-dark p-6 md:p-8 text-white"
    >
      <h3 className="font-display font-bold text-xl mb-4">
        {t('calculator.results.summary.headline')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm text-gray-400 mb-1">{t('calculator.results.summary.yourTotal')}</p>
          <p className="font-display font-extrabold text-2xl">
            {userAnnual.toLocaleString()}&nbsp;&euro; <span className="text-sm font-bold text-gray-400">{t('calculator.results.summary.perYear')}</span>
          </p>
        </div>
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm text-gray-400 mb-1">{t('calculator.results.summary.averageTotal')}</p>
          <p className="font-display font-bold text-2xl text-gray-300">
            {benchmarkAnnual.toLocaleString()}&nbsp;&euro; <span className="text-sm font-bold text-gray-400">{t('calculator.results.summary.perYear')}</span>
          </p>
        </div>
      </div>

      {isOverpaying && (
        <div className="flex items-center gap-3 rounded-xl bg-accent/15 border border-accent/30 p-4 mb-4">
          <TrendingDown className="w-6 h-6 text-accent shrink-0" />
          <p className="text-accent-light font-semibold">
            {t('calculator.results.summary.saving')} <span className="font-extrabold">{Math.abs(difference).toLocaleString()}&nbsp;&euro;</span>{t('calculator.results.summary.perYear')}
          </p>
        </div>
      )}

      <div className="flex items-start gap-3">
        {hasOverpayingCategories ? (
          <>
            <TrendingUp className="w-5 h-5 text-warning mt-0.5 shrink-0" />
            <p className="text-gray-300">{t('calculator.results.summary.overpaying')}</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
            <p className="text-gray-300">{t('calculator.results.summary.onTrack')}</p>
          </>
        )}
      </div>
    </motion.div>
  );
}

function LeadCaptureForm({ formspreeId }: { formspreeId: string }) {
  const { t } = useTranslation();
  const { submit, status, error } = useFormSubmit();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    await submit(formspreeId, {
      email,
      source: 'cost-calculator',
    });
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-2 text-center py-4">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle className="h-6 w-6" />
          <p className="text-lg font-semibold">{t('calculator.results.cta.successMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t('calculator.results.cta.emailPlaceholder')}
          disabled={status === 'submitting'}
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-dark placeholder:text-gray-400 transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white transition-all duration-200 hover:bg-accent-light glow-accent disabled:opacity-50 min-h-[44px]"
        >
          {status === 'submitting' ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === 'submitting'
            ? t('calculator.results.cta.submitting')
            : t('calculator.results.cta.submitButton')}
        </motion.button>
      </div>

      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 text-warning-light">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm">{error ?? t('calculator.results.cta.errorMessage')}</p>
        </div>
      )}
    </form>
  );
}

export default function CalculatorResults({ inputs, formspreeId, onRecalculate }: CalculatorResultsProps) {
  const { t } = useTranslation();
  const comparisons = buildComparisons(inputs);

  const shareText = encodeURIComponent(
    t('calculator.results.share.text') + ' https://veina.eu/calculadora'
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight text-center">
          {t('calculator.results.headline')}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((row, index) => (
          <ComparisonCard key={row.categoryKey} row={row} index={index} />
        ))}
      </div>

      <SummaryCard comparisons={comparisons} inputs={inputs} />

      {/* Lead capture */}
      <ScrollReveal delay={0.6}>
        <div className="rounded-2xl bg-surface border border-gray-200 p-6 md:p-8 text-center">
          <h3 className="font-display font-bold text-xl text-dark mb-2">
            {t('calculator.results.cta.headline')}
          </h3>
          <p className="text-gray-500 mb-6">
            {t('calculator.results.cta.subheadline')}
          </p>
          <div className="max-w-lg mx-auto">
            <LeadCaptureForm formspreeId={formspreeId} />
          </div>
        </div>
      </ScrollReveal>

      {/* Actions: share + recalculate */}
      <ScrollReveal delay={0.7}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-white font-semibold transition-colors duration-200 hover:bg-success-light min-h-[44px]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('calculator.results.share.button')}
          </a>

          <button
            type="button"
            onClick={onRecalculate}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-dark font-semibold transition-colors duration-200 hover:bg-gray-100 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('calculator.results.recalculate')}
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
