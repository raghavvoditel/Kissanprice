import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

function lookup(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
}

// useT() returns a t(key, vars) function. Falls back to English, then to the key itself.
export default function useT() {
  const { lang } = useLanguage();

  return function t(key, vars) {
    const value = lookup(translations[lang], key) ?? lookup(translations.en, key) ?? key;
    return interpolate(value, vars);
  };
}
