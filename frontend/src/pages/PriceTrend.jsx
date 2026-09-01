import { useMemo, useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { useFarmer } from '../context/FarmerContext';
import { useLanguage } from '../context/LanguageContext';
import { COMMODITIES, PRICE_TREND, formatINR, localizedName } from '../data/marketData';
import { Info } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function PriceTrend() {
  useSEO({
    title: 'Price Trends & Seasonal Patterns — KisanPrice',
    description:
      'Track how mandi prices move through the year by crop, with a near-term price estimate range to help you time your sale.',
    path: '/trends',
  });
  const t = useT();
  const { lang } = useLanguage();

  const { selection, update } = useFarmer();
  const [active, setActive] = useState(selection.commodity);

  const commodity = COMMODITIES.find((c) => c.id === active);
  const data = PRICE_TREND[active] || [];

  // Build chart data with confidence band for next 3 months
  const chartData = useMemo(() => {
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    return data.map((d, i) => {
      const isFuture = i >= currentMonthIdx && i < currentMonthIdx + 3;
      return {
        month: d.month,
        price: d.price,
        low: isFuture ? Math.round(d.price * 0.9) : null,
        high: isFuture ? Math.round(d.price * 1.1) : null,
        band: isFuture ? [Math.round(d.price * 0.9), Math.round(d.price * 1.1)] : null,
      };
    });
  }, [data]);

  const highest = data.reduce((a, b) => (b.price > a.price ? b : a), data[0] || {});
  const lowest = data.reduce((a, b) => (b.price < a.price ? b : a), data[0] || {});

  const handleSwitch = (id) => {
    setActive(id);
    update({ commodity: id });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="chip mb-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>{t('trends.tag')}</div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">
          {t('trends.h1', { commodity: localizedName(commodity, lang) })}
        </h1>
        <p className="mt-3 text-stone-600 max-w-2xl" dangerouslySetInnerHTML={{ __html: t('trends.body') }} />
      </div>

      {/* Commodity tabs */}
      <div className="flex flex-wrap gap-2 mb-6" data-testid="commodity-tabs">
        {COMMODITIES.map((c) => (
          <button
            key={c.id}
            data-testid={`trend-tab-${c.id}`}
            onClick={() => handleSwitch(c.id)}
            className={`h-11 px-5 rounded-full text-sm font-semibold border transition-colors duration-200 ${
              active === c.id
                ? 'bg-emerald-900 text-white border-emerald-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-emerald-700'
            }`}
          >
            {localizedName(c, lang)}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-6" data-testid="trend-chart">
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="bandFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" stopOpacity={0.35}/>
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#78716c" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis
                stroke="#78716c"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `₹${v/1000 >= 1 ? (v/1000).toFixed(1)+'k' : v}`}
              />
              <Tooltip
                contentStyle={{ background: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 12, fontFamily: 'Manrope' }}
                formatter={(v, name) => [`₹${formatINR(v)}`, name === 'price' ? t('mandi.modal') : (name === 'high' ? 'Range high' : 'Range low')]}
              />
              <Area type="monotone" dataKey="high" stroke="none" fill="url(#bandFill)" />
              <Area type="monotone" dataKey="low" stroke="none" fill="#fbfbf9" />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#166534"
                strokeWidth={3}
                dot={{ fill: '#166534', r: 4 }}
                activeDot={{ r: 6, fill: '#d97706' }}
                name="Modal"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats + Callout */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('trends.seasonalPeak')}</div>
          <div className="font-display text-3xl mt-1 text-emerald-800">₹{formatINR(highest.price || 0)}</div>
          <div className="text-sm text-stone-600">{highest.month} {highest.note ? `· ${highest.note}` : ''}</div>
        </div>
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('trends.seasonalLow')}</div>
          <div className="font-display text-3xl mt-1 text-red-700">₹{formatINR(lowest.price || 0)}</div>
          <div className="text-sm text-stone-600">{lowest.month} {lowest.note ? `· ${lowest.note}` : ''}</div>
        </div>
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('trends.peakVsTrough')}</div>
          <div className="font-display text-3xl mt-1 text-amber-700">
            +{Math.round(((highest.price - lowest.price) / (lowest.price || 1)) * 100)}%
          </div>
          <div className="text-sm text-stone-600">{t('trends.acrossYear')}</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3" data-testid="callout-estimate">
        <Info size={22} weight="duotone" className="text-amber-700 shrink-0 mt-0.5" />
        <p className="text-sm text-stone-800 leading-relaxed">
          {t('trends.calloutBody')}
        </p>
      </div>
    </div>
  );
}
