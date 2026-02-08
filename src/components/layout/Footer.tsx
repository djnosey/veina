import { useTranslation } from 'react-i18next';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const socialLinks = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
] as const;

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-white/10 text-gray-500">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-10">
          <p className="text-white font-display font-bold text-xl">Veina</p>
          <p className="mt-2 text-sm">{t('footer.tagline')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              {t('footer.contactTitle')}
            </h3>
            <a
              href="mailto:hola@veina.app"
              className="text-sm hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              hola@veina.app
            </a>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              {t('footer.legalTitle')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              {t('footer.socialTitle')}
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-500 hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <LanguageSwitcher dark />
          <p className="text-xs">
            &copy; {year} Veina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
