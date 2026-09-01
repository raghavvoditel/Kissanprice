import { EXPORT_BROKERS } from '../data/marketData';
import { Globe, Phone, Info, ArrowUpRight } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function ExportDirectory() {
  useSEO({
    title: 'Export & Broker Directory — KisanPrice',
    description:
      'Browse verified trade associations and export brokers by crop and region when domestic mandis and storage aren\'t the right fit.',
    path: '/export',
  });
  const t = useT();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="chip mb-3"><Globe size={12} weight="bold" /> {t('exportPage.tag')}</div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">{t('exportPage.h1')}</h1>
        <p className="mt-3 text-stone-600 max-w-2xl">
          {t('exportPage.body')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4" data-testid="broker-list">
        {EXPORT_BROKERS.map((b, idx) => (
          <div key={b.broker} data-testid={`broker-card-${idx}`} className="card-lift rounded-2xl bg-white border border-stone-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">{b.commodity}</div>
                <h3 className="font-display text-2xl mt-1 text-stone-900">{b.broker}</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Globe size={22} weight="duotone" />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">{t('exportPage.regionsCovered')}</div>
              <div className="flex flex-wrap gap-2">
                {b.regions.map((r) => (
                  <span key={r} className="chip chip-green">{r}</span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-stone-700">
                <Phone size={16} weight="duotone" /> {b.contact}
              </div>
              <button
                data-testid={`broker-request-${idx}`}
                className="inline-flex items-center gap-1 py-3 md:py-0 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
              >
                {t('exportPage.requestContact')} <ArrowUpRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6 flex items-start gap-3" data-testid="directory-note">
        <Info size={22} weight="duotone" className="text-stone-600 shrink-0 mt-0.5" />
        <p className="text-sm text-stone-700 leading-relaxed">
          {t('exportPage.note')}
        </p>
      </div>
    </div>
  );
}
