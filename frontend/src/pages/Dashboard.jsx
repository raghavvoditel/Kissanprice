import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarmer } from '../context/FarmerContext';
import { useLanguage } from '../context/LanguageContext';
import { COMMODITIES, STATES, MANDI_DATA, localizedName, formatINR } from '../data/marketData';
import { MapPin, Package, Scales, ArrowRight, Truck, Info } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function Dashboard() {
  useSEO({
    title: 'Check Your Crop Price — KisanPrice',
    description:
      'Select your state, district, crop, and quantity to see mandi price options and net returns after transport, tailored to your location.',
    path: '/dashboard',
  });
  const t = useT();
  const { lang } = useLanguage();

  const nav = useNavigate();
  const { selection, update } = useFarmer();

  const districts = useMemo(
    () => STATES.find((s) => s.name === selection.state)?.districts || [],
    [selection.state]
  );
  const towns = useMemo(
    () => districts.find((d) => d.name === selection.district)?.towns || [],
    [districts, selection.district]
  );

  const handleStateChange = (state) => {
    const first = STATES.find((s) => s.name === state)?.districts?.[0];
    update({ state, district: first?.name || '', town: first?.towns?.[0] || '' });
  };
  const handleDistrictChange = (district) => {
    const towns = districts.find((d) => d.name === district)?.towns || [];
    update({ district, town: towns[0] || '' });
  };

  const previewRows = MANDI_DATA[selection.commodity] || [];
  const previewMin = previewRows.length ? Math.min(...previewRows.map((r) => r.min)) : null;
  const previewMax = previewRows.length ? Math.max(...previewRows.map((r) => r.max)) : null;
  const commodityLabel = localizedName(COMMODITIES.find((c) => c.id === selection.commodity), lang);
  const stateLabel = localizedName(STATES.find((s) => s.name === selection.state), lang);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 fade-up">
        <div className="flex items-center gap-2 mb-3" data-testid="step-indicator">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`h-1.5 w-6 rounded-full ${s === 1 ? 'bg-emerald-700' : 'bg-stone-200'}`} />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{t('dashboard.stepIndicator', { current: 1, total: 3 })}</span>
        </div>
        <div className="chip mb-4"><span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>{t('dashboard.stepTag')}</div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">{t('dashboard.h1')}</h1>
        <p className="mt-3 text-stone-600 max-w-xl">{t('dashboard.body')}</p>
      </div>

      {previewMin !== null && (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 fade-up" data-testid="live-price-preview">
          <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">{t('dashboard.livePreviewTitle')}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="price-big text-emerald-800">₹{formatINR(previewMin)}–₹{formatINR(previewMax)}</span>
            <span className="text-sm text-stone-500">/quintal</span>
          </div>
          <p className="mt-1 text-sm text-stone-700">{t('dashboard.livePreviewBody', { commodity: commodityLabel, state: stateLabel })}</p>
          <div className="mt-3 pt-3 border-t border-amber-200/70 text-xs text-stone-500 flex items-start gap-1.5">
            <Info size={14} weight="duotone" className="shrink-0 mt-0.5" />
            <span>{t('common.lastUpdated', { time: '9:00 AM' })} · {t('common.disclaimer')}</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LOCATION */}
        <div className="card-lift bg-white rounded-2xl border border-stone-200 p-6 fade-up delay-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MapPin size={22} weight="duotone" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('dashboard.locationLabel')}</div>
              <div className="font-display text-lg">{t('dashboard.locationQuestion')}</div>
            </div>
          </div>

          <label className="block text-sm font-semibold text-stone-700 mb-1">{t('dashboard.state')}</label>
          <select
            data-testid="select-state"
            value={selection.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full h-12 rounded-xl border border-stone-300 bg-white px-3 mb-4 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          >
            {STATES.map((s) => <option key={s.name} value={s.name}>{localizedName(s, lang)}</option>)}
          </select>

          <label className="block text-sm font-semibold text-stone-700 mb-1">{t('dashboard.district')}</label>
          <select
            data-testid="select-district"
            value={selection.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full h-12 rounded-xl border border-stone-300 bg-white px-3 mb-4 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          >
            {districts.map((d) => <option key={d.name} value={d.name}>{localizedName(d, lang)}</option>)}
          </select>

          <label className="block text-sm font-semibold text-stone-700 mb-1">{t('dashboard.town')}</label>
          <select
            data-testid="select-town"
            value={selection.town}
            onChange={(e) => update({ town: e.target.value })}
            className="w-full h-12 rounded-xl border border-stone-300 bg-white px-3 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          >
            {towns.map((town) => <option key={town}>{town}</option>)}
          </select>
        </div>

        {/* COMMODITY */}
        <div className="card-lift bg-white rounded-2xl border border-stone-200 p-6 fade-up delay-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Package size={22} weight="duotone" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('dashboard.commodityLabel')}</div>
              <div className="font-display text-lg">{t('dashboard.commodityQuestion')}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {COMMODITIES.map((c) => (
              <button
                key={c.id}
                data-testid={`commodity-${c.id}`}
                onClick={() => update({ commodity: c.id })}
                className={`h-14 rounded-xl border text-left px-4 transition-colors duration-200 ${
                  selection.commodity === c.id
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-stone-800 border-stone-300 hover:border-emerald-700'
                }`}
              >
                <div className="text-sm font-bold">{localizedName(c, lang)}</div>
                <div className={`text-[11px] ${selection.commodity === c.id ? 'text-emerald-100' : 'text-stone-500'}`}>{c.region}</div>
              </button>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-stone-200">
            <label className="block text-sm font-semibold text-stone-700 mb-2">{t('dashboard.quantity')}</label>
            <div className="flex items-center gap-3">
              <button
                data-testid="qty-decrement"
                onClick={() => update({ quantity: Math.max(1, selection.quantity - 5) })}
                className="w-11 h-11 rounded-xl border border-stone-300 hover:border-emerald-700 font-bold text-lg"
              >−</button>
              <input
                data-testid="input-quantity"
                type="number"
                min="1"
                value={selection.quantity}
                onChange={(e) => update({ quantity: Math.max(1, parseInt(e.target.value || '1')) })}
                className="flex-1 h-11 rounded-xl border border-stone-300 bg-white px-3 text-center font-bold text-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              <button
                data-testid="qty-increment"
                onClick={() => update({ quantity: selection.quantity + 5 })}
                className="w-11 h-11 rounded-xl border border-stone-300 hover:border-emerald-700 font-bold text-lg"
              >+</button>
            </div>
          </div>
        </div>

        {/* QUALITY + TRUCK */}
        <div className="card-lift bg-white rounded-2xl border border-stone-200 p-6 fade-up delay-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Scales size={22} weight="duotone" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('dashboard.gradeLabel')}</div>
              <div className="font-display text-lg">{t('dashboard.gradeQuestion')}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {['A', 'B', 'C'].map((g) => (
              <button
                key={g}
                data-testid={`grade-${g}`}
                onClick={() => update({ grade: g })}
                className={`h-14 rounded-xl border font-bold text-lg transition-colors duration-200 ${
                  selection.grade === g
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-amber-500'
                }`}
              >
                {t('dashboard.grade', { g })}
              </button>
            ))}
          </div>

          <div className="pt-5 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={18} weight="duotone" className="text-stone-600" />
              <span className="text-sm font-semibold text-stone-700">{t('dashboard.transportType')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                data-testid="truck-small"
                onClick={() => update({ truck: 'small' })}
                className={`h-14 rounded-xl border text-left px-3 transition-colors duration-200 ${
                  selection.truck === 'small' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-800 border-stone-300 hover:border-emerald-700'
                }`}
              >
                <div className="text-sm font-bold">{t('dashboard.smallTruck')}</div>
                <div className={`text-[11px] ${selection.truck === 'small' ? 'text-emerald-100' : 'text-stone-500'}`}>{t('dashboard.perKmQuintal', { rate: '2.5' })}</div>
              </button>
              <button
                data-testid="truck-bulk"
                onClick={() => update({ truck: 'bulk' })}
                className={`h-14 rounded-xl border text-left px-3 transition-colors duration-200 ${
                  selection.truck === 'bulk' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-800 border-stone-300 hover:border-emerald-700'
                }`}
              >
                <div className="text-sm font-bold">{t('dashboard.bulkTruck')}</div>
                <div className={`text-[11px] ${selection.truck === 'bulk' ? 'text-emerald-100' : 'text-stone-500'}`}>{t('dashboard.perKmQuintal', { rate: '1.8' })}</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          data-testid="submit-dashboard"
          onClick={() => nav('/mandi')}
          className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-lg transition-colors duration-200"
        >
          {t('dashboard.submit')} <ArrowRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}
