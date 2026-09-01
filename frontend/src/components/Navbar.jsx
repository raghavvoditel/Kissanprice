import { NavLink, Link } from 'react-router-dom';
import { Plant, List, X, Translate } from '@phosphor-icons/react';
import { useState } from 'react';
import useT from '../hooks/useT';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const { lang, setLang } = useLanguage();

  const links = [
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/mandi', label: t('nav.mandi') },
    { to: '/trends', label: t('nav.trends') },
    { to: '/storage', label: t('nav.storage') },
    { to: '/export', label: t('nav.export') },
    { to: '/about', label: t('nav.about') },
  ];

  const LanguageSwitcher = ({ heightClass = 'h-9', className = '' }) => (
    <select
      data-testid="language-switcher"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      aria-label={t('nav.langLabel')}
      className={`${heightClass} rounded-full border border-stone-300 bg-white pl-3 pr-7 text-sm font-semibold text-stone-700 hover:border-emerald-700 focus:ring-2 focus:ring-emerald-700 focus:outline-none ${className}`}
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/85 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group py-1.5 md:py-0" data-testid="brand-logo">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-800 text-white">
            <Plant size={20} weight="duotone" />
          </span>
          <span className="font-display text-xl leading-none text-stone-900">
            Kisan<span className="text-amber-600">Price</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.to.slice(1)}`}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'bg-emerald-900 text-white'
                    : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Translate size={16} className="text-stone-500" />
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-stone-300"
          onClick={() => setOpen(!open)}
          aria-label={t('nav.menu')}
          data-testid="mobile-menu-btn"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white" data-testid="mobile-menu">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-emerald-900 text-white'
                      : 'text-stone-800 hover:bg-emerald-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="px-4 pt-2 flex items-center gap-2">
              <Translate size={16} className="text-stone-500" />
              <LanguageSwitcher heightClass="h-11" className="flex-1" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
