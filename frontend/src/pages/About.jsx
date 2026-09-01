import { Database, ChartLineUp, Truck, Snowflake, HandCoins } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';

export default function About() {
  useSEO({
    title: 'How KisanPrice Works',
    description:
      "See how KisanPrice sources mandi price data, calculates net price after transport, and lays out storage and export options as alternatives to selling low.",
    path: '/about',
  });
  const t = useT();

  const items = [
    { icon: <Database size={24} weight="duotone" />, title: t('about.item1Title'), body: t('about.item1Body') },
    { icon: <ChartLineUp size={24} weight="duotone" />, title: t('about.item2Title'), body: t('about.item2Body') },
    { icon: <Truck size={24} weight="duotone" />, title: t('about.item3Title'), body: t('about.item3Body') },
    { icon: <Snowflake size={24} weight="duotone" />, title: t('about.item4Title'), body: t('about.item4Body') },
    { icon: <HandCoins size={24} weight="duotone" />, title: t('about.item5Title'), body: t('about.item5Body') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="chip mb-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>{t('about.tag')}</div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-stone-900">
          {t('about.h1')}
        </h1>
        <p className="mt-4 text-lg text-stone-700 leading-relaxed">
          {t('about.body')}
        </p>
      </div>

      <div className="grid gap-5">
        {items.map((it, i) => (
          <div key={it.title} data-testid={`about-item-${i}`} className="card-lift rounded-2xl bg-white border border-stone-200 p-6 flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              {it.icon}
            </div>
            <div>
              <h3 className="font-display text-xl text-stone-900">{it.title}</h3>
              <p className="mt-2 text-stone-700 leading-relaxed">{it.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-emerald-900 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <h3 className="relative font-display text-3xl">{t('about.coverageTitle')}</h3>
        <p className="relative mt-2 text-emerald-100/90 max-w-2xl" dangerouslySetInnerHTML={{ __html: t('about.coverageBody') }} />
      </div>
    </div>
  );
}
