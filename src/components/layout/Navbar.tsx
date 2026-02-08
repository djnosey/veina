import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCta = () => {
    setMobileOpen(false);
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-dark transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="text-2xl font-display font-bold text-white">
          Veina
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher dark />
          <Button variant="accent" size="sm" onClick={scrollToCta}>
            {t('navbar.cta')}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-dark-light hover:text-white transition-colors md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="bg-dark border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            <LanguageSwitcher dark />
            <Button variant="accent" size="md" onClick={scrollToCta} className="w-full">
              {t('navbar.cta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
