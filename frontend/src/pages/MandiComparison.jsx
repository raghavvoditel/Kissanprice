import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFarmer } from '../context/FarmerContext';
import { useLanguage } from '../context/LanguageContext';
import { MANDI_DATA, COMMODITIES, GRADE_MULTIPLIER, TRUCK_RATES, formatINR, localizedName } from '../data/marketData';
import { TrendUp, TrendDown, Truck, MapPin, ChartLine, Sliders, ArrowRight, CaretDoubleRight } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function MandiComparison() {
  useSEO({
    title: 'Compare Mandi Prices — KisanPrice',
    description:
      'See modal prices, transport cost, and net price side by side across nearby mandis, so you know which market actually pays more after distance.',
    path: '/mandi',
  });
  const t = useT();
  const { lang } = useLanguage();

  const { selection, update } = useFarmer();
  const [sortBy, setSortBy] = useState('net'); // net | gross | distance

  const commodity = COMMODITIES.find((c) => c.id === selection.commodity);
  const rows = MANDI_DATA[selection.commodity] || [];
  const gradeMult = GRADE_MULTIPLIER[selection.grade];
  const truck = TRUCK_RATES[selection.truck];

  // The local mandi is the one at the smallest distance
  const local = useMemo(() => [...rows].sort((a, b) => a.distance - b.distance)[0], [rows]);

  const enriched = useMemo(() => {
    return rows.map((r) => {
      const adjustedModal = r.modal * gradeMult;
      const gross = adjustedModal * selection.quantity;
      const transport = truck.rate * r.distance * selection.quantity;
      const net = gross - transport;

      const localAdjusted = (local?.modal || 0) * gradeMult;
      const localNet = localAdjusted * selection.quantity - (truck.rate * (local?.distance || 0) * selection.quantity);
      const delta = net - localNet;

      return { ...r, adjustedModal, gross, transport, net, delta };
    });
  }, [rows, gradeMult, selection.quantity, truck.rate, local]);

  const sorted = useMemo(() => {
    const arr = [...enriched];
    if (sortBy === 'net') arr.sort((a, b) => b.net - a.net);
    else if (sortBy === 'gross') arr.sort((a, b) => b.modal - a.modal);
    else if (sortBy === 'distance') arr.sort((a, b) => a.distance - b.distance);
    return arr;
  }, [enriched, sortBy]);

  const best = sorted.length ? [...enriched].sort((a, b) => b.net - a.net)[0] : null;
  const winRecommendation = best && best.mandi !== local?.mandi && best.delta > 0;
  const commodityName = localizedName(commodity, lang);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="chip mb-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>{commodity?.region}</div>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">
            {commodityName} · <span className="text-emerald-800">{selection.quantity}q</span>
          </h1>
          <p className="mt-2 text-stone-600">{t('dashboard.grade', { g: selection.grade })} · {truck.label} @ ₹{truck.rate}/km/quintal</p>
          <p className="mt-2 text-xs text-stone-500" data-testid="price-disclaimer">{t('common.lastUpdated', { time: '9:00 AM' })} · {t('common.disclaimer')}</p>
        </div>
        <Link
          to="/dashboard"
          data-testid="edit-selection"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-stone-300 hover:border-emerald-700 text-stone-800 font-semibold"
        >
          <Sliders size={16} /> {t('mandi.editSelection')}
        </Link>
      </div>

      {/* Recommendation banner */}
      {best && (
        <div
          data-testid="recommendation-banner"
          className={`rounded-2xl p-5 md:p-6 mb-6 border ${
            winRecommendation
              ? 'bg-emerald-900 text-white border-emerald-900'
              : 'bg-amber-50 text-stone-900 border-amber-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className={`text-xs uppercase tracking-widest font-bold ${winRecommendation ? 'text-amber-200' : 'text-amber-700'}`}>
                {t('mandi.recommendation')}
              </div>
              <div className="font-display text-2xl md:text-3xl mt-1">
                {winRecommendation ? (
                  <>{t('mandi.recTransport', { mandi: best.mandi, amount: formatINR(best.delta) })}</>
                ) : (
                  <>{t('mandi.recSellLocal', { mandi: local?.mandi })}</>
                )}
              </div>
            </div>
            <div className={`text-sm ${winRecommendation ? 'text-emerald-100' : 'text-stone-600'}`}>
              {t('mandi.vsSelling', { mandi: local?.mandi })}
            </div>
          </div>
        </div>
      )}

      {/* Calculator strip */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 mb-6" data-testid="calculator-strip">
        <div className="flex items-center gap-2 mb-4">
          <Truck size={20} weight="duotone" className="text-emerald-800" />
          <span className="font-display text-xl">{t('mandi.calcTitle')}</span>
          <span className="text-xs text-stone-500">{t('mandi.calcLive')}</span>
        </div>

        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{t('mandi.quantity')}</label>
            <input
              data-testid="calc-quantity"
              type="range"
              min="1"
              max="200"
              value={selection.quantity}
              onChange={(e) => update({ quantity: parseInt(e.target.value) })}
              className="w-full accent-emerald-800"
            />
            <div className="mt-1 text-sm font-bold">{t('mandi.quintals', { n: selection.quantity })}</div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{t('mandi.truckType')}</label>
            <div className="flex gap-2">
              <button
                data-testid="calc-truck-small"
                onClick={() => update({ truck: 'small' })}
                className={`flex-1 h-11 rounded-xl border text-sm font-semibold transition-colors duration-200 ${selection.truck === 'small' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-800 border-stone-300'}`}
              >{t('mandi.small')}</button>
              <button
                data-testid="calc-truck-bulk"
                onClick={() => update({ truck: 'bulk' })}
                className={`flex-1 h-11 rounded-xl border text-sm font-semibold transition-colors duration-200 ${selection.truck === 'bulk' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-stone-800 border-stone-300'}`}
              >{t('mandi.bulk')}</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{t('dashboard.gradeLabel')}</label>
            <div className="flex gap-2">
              {['A', 'B', 'C'].map((g) => (
                <button
                  key={g}
                  data-testid={`calc-grade-${g}`}
                  onClick={() => update({ grade: g })}
                  className={`flex-1 h-11 rounded-xl border text-sm font-bold transition-colors duration-200 ${selection.grade === g ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-stone-700 border-stone-300'}`}
                >{g}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{t('mandi.sortBy')}</label>
            <select
              data-testid="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-300 bg-white px-3 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="net">{t('mandi.sortNet')}</option>
              <option value="gross">{t('mandi.sortGross')}</option>
              <option value="distance">{t('mandi.sortDistance')}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-xs text-stone-500 leading-relaxed">
          {t('mandi.formulaLabel')} <span className="font-semibold text-stone-700">{t('mandi.formulaTransport', { rate: truck.rate })}</span> ·
          {' '}{t('mandi.formulaNet')}
        </div>
      </div>

      {/* Mandi cards */}
      <div className="grid gap-4" data-testid="mandi-list">
        {sorted.map((m, idx) => {
          const positive = m.delta >= 0;
          const isLocal = m.mandi === local?.mandi;
          const isBest = m.mandi === best?.mandi;

          return (
            <div
              key={m.mandi}
              data-testid={`mandi-card-${idx}`}
              className={`card-lift relative rounded-2xl bg-white border p-5 md:p-6 grid md:grid-cols-12 gap-4 items-center ${
                isBest ? 'border-emerald-800 ring-1 ring-emerald-800' : 'border-stone-200'
              }`}
            >
              {isBest && (
                <div className="absolute -top-3 left-4 chip chip-green">
                  <TrendUp size={14} weight="bold" /> {t('mandi.bestNetPrice')}
                </div>
              )}
              {isLocal && !isBest && (
                <div className="absolute -top-3 left-4 chip"><MapPin size={12} weight="bold" /> {t('mandi.yourLocalMandi')}</div>
              )}

              <div className="md:col-span-3">
                <div className="font-display text-2xl text-stone-900">{m.mandi}</div>
                <div className="text-sm text-stone-500 mt-1 flex items-center gap-1">
                  <MapPin size={14} weight="duotone" /> {t('mandi.kmAway', { n: m.distance })}
                </div>
                <div className="text-xs text-stone-400 mt-1">{t('mandi.updated', { day: m.updated })}</div>
              </div>

              <div className="md:col-span-3 grid grid-cols-3 gap-2 md:gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{t('mandi.min')}</div>
                  <div className="text-sm font-bold text-stone-700">₹{formatINR(m.min)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold">{t('mandi.modal')}</div>
                  <div className="text-lg font-bold text-emerald-900">₹{formatINR(m.adjustedModal)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{t('mandi.max')}</div>
                  <div className="text-sm font-bold text-stone-700">₹{formatINR(m.max)}</div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">{t('mandi.transportCost')}</div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-stone-500" />
                  <div className="text-lg font-bold text-stone-800">−₹{formatINR(m.transport)}</div>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  ₹{truck.rate} × {m.distance}km × {selection.quantity}q
                </div>
              </div>

              <div className="md:col-span-3 md:text-right">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{t('mandi.netEarnings')}</div>
                <div className={`price-big ${positive ? 'text-emerald-800' : 'text-red-700'}`}>
                  ₹{formatINR(m.net)}
                </div>
                <div className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${positive ? 'text-emerald-700' : 'text-red-600'}`}>
                  {positive ? <TrendUp size={14} weight="bold" /> : <TrendDown size={14} weight="bold" />}
                  {positive ? '+' : ''}₹{formatINR(m.delta)} {t('mandi.vsLocal')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Worked examples */}
      <div className="mt-10 grid md:grid-cols-2 gap-4" data-testid="worked-examples">
        <div className="rounded-2xl border border-red-200 bg-red-50/60 p-6">
          <div className="chip chip-red mb-3"><CaretDoubleRight size={12} weight="bold" /> {t('mandi.exampleSellLocal')}</div>
          <h3 className="font-display text-xl text-stone-900">Onion · 50q · Nashik → Solapur</h3>
          <ul className="mt-3 text-sm text-stone-700 space-y-1">
            <li>{t('mandi.transportLine')} ₹2.5 × 210 × 50 = <b>₹26,250</b></li>
            <li>{t('mandi.priceGainLine')} (1,850 − 1,450) × 50 = <b>₹20,000</b></li>
            <li>{t('mandi.netLine')} <b className="text-red-700">−₹6,250</b> {t('mandi.sellAtNashik')}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
          <div className="chip chip-green mb-3"><CaretDoubleRight size={12} weight="bold" /> {t('mandi.exampleTransport')}</div>
          <h3 className="font-display text-xl text-stone-900">Apple · 30q · Shimla → Delhi</h3>
          <ul className="mt-3 text-sm text-stone-700 space-y-1">
            <li>{t('mandi.transportLine')} ₹2.5 × 340 × 30 = <b>₹25,500</b></li>
            <li>{t('mandi.priceGainLine')} (7,100 − 5,200) × 30 = <b>₹57,000</b></li>
            <li>{t('mandi.netLine')} <b className="text-emerald-800">+₹31,500</b> {t('mandi.transportToAzadpur')}</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/trends" data-testid="link-trends" className="inline-flex items-center gap-2 h-12 px-5 rounded-full border border-stone-300 hover:border-emerald-700 font-semibold">
          <ChartLine size={18} /> {t('mandi.seeTrend', { commodity: commodityName })} <ArrowRight size={16} />
        </Link>
        <Link to="/storage" data-testid="link-storage" className="inline-flex items-center gap-2 h-12 px-5 rounded-full border border-stone-300 hover:border-emerald-700 font-semibold">
          {t('mandi.exploreStorage')} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
