import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollReveal from '../components/ui/ScrollReveal';
import CalculatorForm from '../components/calculator/CalculatorForm';
import CalculatorResults from '../components/calculator/CalculatorResults';

import type { CalculatorInputs } from '../components/calculator/CalculatorForm';

const WAITLIST_FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_CALCULATOR ?? 'xojnqboa';

export default function CostCalculator() {
  const { t } = useTranslation();
  const [results, setResults] = useState<CalculatorInputs | null>(null);

  const handleSubmit = (inputs: CalculatorInputs) => {
    setResults(inputs);
    // Scroll to top of results smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecalculate = () => {
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-gray-900">
      <Navbar />

      {!results ? (
        <section className="bg-surface pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  {t('calculator.sectionTag')}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-dark tracking-tight">
                  {t('calculator.pageTitle')}
                </h1>
                <p className="text-gray-500 mt-4 text-lg">
                  {t('calculator.pageSubtitle')}
                </p>
              </div>
            </ScrollReveal>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <CalculatorForm onSubmit={handleSubmit} />
            </div>

            <div className="text-center mt-10">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                veina.eu
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <CalculatorResults
          inputs={results}
          formspreeId={WAITLIST_FORMSPREE_ID}
          onRecalculate={handleRecalculate}
        />
      )}

      <Footer />
    </div>
  );
}
