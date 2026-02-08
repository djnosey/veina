import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
] as const;

interface LanguageSwitcherProps {
  dark?: boolean;
}

export default function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0];

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {languages.map(({ code, label }, index) => (
        <span key={code} className="flex items-center">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(code)}
            className={`
              px-1.5 py-0.5 text-sm transition-colors duration-150 rounded
              ${
                currentLang === code
                  ? 'text-primary font-bold'
                  : dark
                    ? 'text-gray-400 hover:text-white font-medium'
                    : 'text-gray-500 hover:text-gray-700 font-medium'
              }
            `.trim()}
            aria-current={currentLang === code ? 'true' : undefined}
          >
            {label}
          </button>
          {index < languages.length - 1 && (
            <span className={`select-none ${dark ? 'text-gray-600' : 'text-gray-300'}`} aria-hidden="true">
              |
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
