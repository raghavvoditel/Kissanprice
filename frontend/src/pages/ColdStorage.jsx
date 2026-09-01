import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COLD_STORAGE, COMMODITIES, SHELF_LIFE, formatINR, localizedName } from '../data/marketData';
import { Snowflake, MapPin, Clock, ShieldCheck, Info, CurrencyInr } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function ColdStorage() {
  useSEO({
    title: 'Cold Storage & Export Options — KisanPrice',
    description:
      'Find cold storage facilities by crop with shelf life and subsidy details, so you can hold for a better price instead of selling low.',
    path: '/storage',
  });
  const t = useT();
  const { lang } = useLanguage();

  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return COLD_STORAGE;
    return COLD_STORAGE.filter((f) => f.suited.includes(filter));
  }, [filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="chip mb-3"><Snowflake size={12} weight="bold" /> {t('storage.tag')}</div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">{t('storage.h1')}</h1>
        <p className="mt-3 text-stone-600 max-w-2xl">
          {t('storage.body')}
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6" data-testid="storage-filter">
        <button
          data-testid="storage-filter-all"
          onClick={() => setFilter('all')}
          className={`h-11 px-5 rounded-full text-sm font-semibold border transition-colors duration-200 ${
            filter === 'all' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-700 border-stone-300 hover:border-emerald-700'
          }`}
        >{t('storage.allFacilities')}</button>
        {COMMODITIES.map((c) => (
          <button
            key={c.id}
            data-testid={`storage-filter-${c.id}`}
            onClick={() => setFilter(c.id)}
            className={`h-11 px-5 rounded-full text-sm font-semibold border transition-colors duration-200 ${
              filter === c.id ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-700 border-stone-300 hover:border-emerald-700'
            }`}
          >{localizedName(c, lang)}</button>
        ))}
      </div>

      {/* Facility cards */}
      <div className="grid md:grid-cols-2 gap-4" data-testid="storage-list">
        {filtered.map((f, idx) => (
          <div key={f.name} data-testid={`storage-card-${idx}`} className="card-lift rounded-2xl bg-white border border-stone-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-stone-900">{f.name}</h3>
                <div className="mt-1 text-sm text-stone-500 flex items-center gap-1">
                  <MapPin size={14} weight="duotone" /> {t('mandi.kmAway', { n: f.distance })}
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Snowflake size={22} weight="duotone" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-1"><CurrencyInr size={12} /> {t('storage.cost')}</div>
                <div className="font-display text-2xl text-stone-900 mt-1">₹{formatINR(f.cost)}</div>
                <div className="text-[11px] text-stone-500">{t('storage.perQuintalMonth')}</div>
              </div>
              <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-1"><Clock size={12} /> {t('storage.maxDuration')}</div>
                <div className="font-display text-2xl text-stone-900 mt-1">{f.maxDuration} {t('storage.monthsAbbr')}</div>
                <div className="text-[11px] text-stone-500">{t('storage.recommendedCap')}</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-stone-700 border-t border-stone-200 pt-4">
              <span className="font-bold text-stone-900">{t('storage.bestSuited')}</span> {f.note}
            </div>
          </div>
        ))}
      </div>

      {/* Shelf life */}
      <div className="mt-10 rounded-2xl bg-white border border-stone-200 p-6" data-testid="shelf-life-panel">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={22} weight="duotone" className="text-emerald-800" />
          <h2 className="font-display text-2xl">{t('storage.shelfLifeGuidance')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {SHELF_LIFE.map((s) => (
            <div key={s.commodity} className="rounded-xl border border-stone-200 p-4 bg-stone-50">
              <div className="font-bold text-stone-900">{s.commodity}</div>
              <div className="text-sm text-stone-600 mt-1">{s.life}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance + Subsidy */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6" data-testid="insurance-panel">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={22} weight="duotone" className="text-amber-700" />
            <h3 className="font-display text-xl">{t('storage.insuranceNote')}</h3>
          </div>
          <p className="text-sm text-stone-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('storage.insuranceBody') }} />
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6" data-testid="subsidy-panel">
          <div className="flex items-center gap-2 mb-2">
            <Info size={22} weight="duotone" className="text-emerald-800" />
            <h3 className="font-display text-xl">{t('storage.subsidyContext')}</h3>
          </div>
          <p className="text-sm text-stone-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('storage.subsidyBody') }} />
        </div>
      </div>
    </div>
  );
}
