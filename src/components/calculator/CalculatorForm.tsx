import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';
import { motion } from 'motion/react';

import ScrollReveal from '../ui/ScrollReveal';

export interface CalculatorInputs {
  units: number;
  feePerUnit: number;
  cleaningTotal: number;
  elevatorTotal: number;
  insuranceAnnual: number;
  adminTotal: number;
  neighborhood: string;
}

interface CalculatorFormProps {
  onSubmit: (inputs: CalculatorInputs) => void;
}

interface FieldError {
  units?: boolean;
  feePerUnit?: boolean;
  cleaningTotal?: boolean;
  elevatorTotal?: boolean;
  insuranceAnnual?: boolean;
  adminTotal?: boolean;
}

export default function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const { t } = useTranslation();

  const [units, setUnits] = useState('');
  const [feePerUnit, setFeePerUnit] = useState('');
  const [cleaningTotal, setCleaningTotal] = useState('');
  const [elevatorTotal, setElevatorTotal] = useState('');
  const [insuranceAnnual, setInsuranceAnnual] = useState('');
  const [adminTotal, setAdminTotal] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [errors, setErrors] = useState<FieldError>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newErrors: FieldError = {};
    if (!units || Number(units) <= 0) newErrors.units = true;
    if (!feePerUnit || Number(feePerUnit) <= 0) newErrors.feePerUnit = true;
    if (!cleaningTotal || Number(cleaningTotal) < 0) newErrors.cleaningTotal = true;
    if (!elevatorTotal || Number(elevatorTotal) < 0) newErrors.elevatorTotal = true;
    if (!insuranceAnnual || Number(insuranceAnnual) < 0) newErrors.insuranceAnnual = true;
    if (!adminTotal || Number(adminTotal) < 0) newErrors.adminTotal = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      units: Number(units),
      feePerUnit: Number(feePerUnit),
      cleaningTotal: Number(cleaningTotal),
      elevatorTotal: Number(elevatorTotal),
      insuranceAnnual: Number(insuranceAnnual),
      adminTotal: Number(adminTotal),
      neighborhood,
    });
  };

  const inputBase =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors duration-150';
  const inputError = 'border-accent-dark';
  const labelBase = 'block text-sm font-medium text-gray-600 mb-1.5';

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="calc-units" className={labelBase}>
              {t('calculator.form.unitsLabel')}
            </label>
            <input
              id="calc-units"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={units}
              onChange={(event) => setUnits(event.target.value)}
              placeholder={t('calculator.form.unitsPlaceholder')}
              className={`${inputBase} ${errors.units ? inputError : ''}`}
            />
            {errors.units && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="calc-fee" className={labelBase}>
              {t('calculator.form.feeLabel')}
            </label>
            <input
              id="calc-fee"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={feePerUnit}
              onChange={(event) => setFeePerUnit(event.target.value)}
              placeholder={t('calculator.form.feePlaceholder')}
              className={`${inputBase} ${errors.feePerUnit ? inputError : ''}`}
            />
            {errors.feePerUnit && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="calc-cleaning" className={labelBase}>
              {t('calculator.form.cleaningLabel')}
            </label>
            <input
              id="calc-cleaning"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={cleaningTotal}
              onChange={(event) => setCleaningTotal(event.target.value)}
              placeholder={t('calculator.form.cleaningPlaceholder')}
              className={`${inputBase} ${errors.cleaningTotal ? inputError : ''}`}
            />
            {errors.cleaningTotal && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="calc-elevator" className={labelBase}>
              {t('calculator.form.elevatorLabel')}
            </label>
            <input
              id="calc-elevator"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={elevatorTotal}
              onChange={(event) => setElevatorTotal(event.target.value)}
              placeholder={t('calculator.form.elevatorPlaceholder')}
              className={`${inputBase} ${errors.elevatorTotal ? inputError : ''}`}
            />
            {errors.elevatorTotal && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="calc-insurance" className={labelBase}>
              {t('calculator.form.insuranceLabel')}
            </label>
            <input
              id="calc-insurance"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={insuranceAnnual}
              onChange={(event) => setInsuranceAnnual(event.target.value)}
              placeholder={t('calculator.form.insurancePlaceholder')}
              className={`${inputBase} ${errors.insuranceAnnual ? inputError : ''}`}
            />
            {errors.insuranceAnnual && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="calc-admin" className={labelBase}>
              {t('calculator.form.adminLabel')}
            </label>
            <input
              id="calc-admin"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={adminTotal}
              onChange={(event) => setAdminTotal(event.target.value)}
              placeholder={t('calculator.form.adminPlaceholder')}
              className={`${inputBase} ${errors.adminTotal ? inputError : ''}`}
            />
            {errors.adminTotal && (
              <p className="text-accent-dark text-sm font-medium mt-1" role="alert">
                {t('calculator.form.requiredError')}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="calc-neighborhood" className={labelBase}>
            {t('calculator.form.neighborhoodLabel')}
          </label>
          <input
            id="calc-neighborhood"
            type="text"
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
            placeholder={t('calculator.form.neighborhoodPlaceholder')}
            className={inputBase}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-full px-6 py-3.5 text-lg hover:bg-primary-light glow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 min-h-[44px]"
        >
          <Calculator className="w-5 h-5" />
          {t('calculator.form.submitButton')}
        </motion.button>
      </form>
    </ScrollReveal>
  );
}
