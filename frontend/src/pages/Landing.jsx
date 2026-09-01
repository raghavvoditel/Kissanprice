import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapTrifold, ChartLine, Snowflake, ShieldCheck, Truck, PlayCircle } from '@phosphor-icons/react';
import useSEO from '../hooks/useSEO';
import useT from '../hooks/useT';
import { useFarmer } from '../context/FarmerContext';

const EXAMPLE_SELECTION = {
  state: 'Maharashtra',
  district: 'Nashik',
  town: 'Lasalgaon',
  commodity: 'onion',
  quantity: 50,
  grade: 'A',
  truck: 'small',
};

export default function Landing() {
  useSEO({
    title: 'KisanPrice — Compare Mandi Prices Before You Sell',
    description:
      "Compare live mandi prices, transport costs, and storage options across Maharashtra, Karnataka, Himachal Pradesh, and Tamil Nadu. Built for smallholder farmers who deserve real price transparency.",
    path: '/',
  });
  const t = useT();
  const nav = useNavigate();
  const { update } = useFarmer();

  const tryLiveExample = () => {
    update(EXAMPLE_SELECTION);
    nav('/mandi');
  };

  const features = [
    { icon: <MapTrifold size={28} weight="duotone" />, title: t('landing.feat1Title'), body: t('landing.feat1Body'), testid: 'feat-compare' },
    { icon: <ChartLine size={28} weight="duotone" />, title: t('landing.feat2Title'), body: t('landing.feat2Body'), testid: 'feat-trends' },
    { icon: <Snowflake size={28} weight="duotone" />, title: t('landing.feat3Title'), body: t('landing.feat3Body'), testid: 'feat-storage' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-12 gap-10 items-center relative">
          <div className="md:col-span-7 fade-up">
            <div className="chip mb-6" data-testid="hero-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              {t('landing.heroTag')}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-stone-900">
              {t('landing.h1a')}
              <br />
              <span className="text-emerald-800">{t('landing.h1b')}</span>
            </h1>
            <p className="mt-6 text-lg text-stone-700 max-w-xl leading-relaxed">
              {t('landing.heroBody')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                data-testid="cta-check-price"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold transition-colors duration-200"
              >
                {t('landing.ctaCheckPrice')}
                <ArrowRight size={18} weight="bold" />
              </Link>
              <button
                type="button"
                onClick={tryLiveExample}
                data-testid="cta-try-example"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-stone-300 hover:border-emerald-800 text-stone-900 font-semibold transition-colors duration-200"
              >
                <PlayCircle size={18} weight="bold" />
                {t('landing.ctaTryExample')}
              </button>
              <Link
                to="/about"
                data-testid="cta-how-it-works"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-stone-300 hover:border-emerald-800 text-stone-900 font-semibold transition-colors duration-200"
              >
                {t('landing.ctaHowItWorks')}
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-800" weight="duotone" /> {t('landing.trustSourcing')}</div>
              <div className="flex items-center gap-2"><Truck size={16} className="text-emerald-800" weight="duotone" /> {t('landing.trustTransport')}</div>
            </div>
          </div>

          <div className="md:col-span-5 fade-up delay-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-amber-200/70 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-emerald-200/70 blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1620901433789-1d2f85a93653?crop=entropy&cs=srgb&fm=jpg&w=800"
                  alt="Indian farmer in field"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 border border-stone-200">
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t('landing.priceCardTitle')}</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="price-big text-emerald-800">₹1,450</span>
                    <span className="text-sm text-stone-500">{t('landing.priceCardUnit')}</span>
                  </div>
                  <div className="mt-2 chip chip-green">{t('landing.priceCardNote')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE ROW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-testid={f.testid}
              className={`card-lift rounded-2xl bg-white border border-stone-200 p-6 fade-up delay-${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-display text-2xl text-stone-900">{f.title}</h3>
              <p className="mt-2 text-stone-600 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BAND */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl border border-emerald-900/10 bg-emerald-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 dot-bg opacity-10" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                {t('landing.bandH2a')}
                <br />
                <span className="text-amber-300">{t('landing.bandH2b')}</span>
              </h2>
              <p className="mt-4 text-emerald-50/90 max-w-lg">
                {t('landing.bandBody')}
              </p>
              <Link
                to="/mandi"
                data-testid="cta-open-calculator"
                className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-emerald-900 hover:bg-amber-100 font-semibold transition-colors duration-200"
              >
                {t('landing.bandCta')} <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                <div className="text-xs uppercase tracking-widest text-amber-200 font-bold">{t('landing.bandCardSellLocal')}</div>
                <div className="mt-2 text-2xl font-display">Onion · 50q</div>
                <div className="mt-1 text-sm text-emerald-100">Nashik → Solapur</div>
                <div className="mt-3 text-3xl font-display text-red-200">−₹6,250</div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                <div className="text-xs uppercase tracking-widest text-amber-200 font-bold">{t('landing.bandCardTransport')}</div>
                <div className="mt-2 text-2xl font-display">Apple · 30q</div>
                <div className="mt-1 text-sm text-emerald-100">Shimla → Delhi</div>
                <div className="mt-3 text-3xl font-display text-emerald-200">+₹31,500</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
