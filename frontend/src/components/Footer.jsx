import { Link } from 'react-router-dom';
import useT from '../hooks/useT';

export default function Footer() {
  const t = useT();

  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-stone-900">Kisan<span className="text-amber-600">Price</span></div>
          <p className="mt-3 text-sm text-stone-600 max-w-sm leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">{t('footer.explore')}</div>
          <ul className="space-y-2 text-sm text-stone-700">
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/dashboard">{t('footer.farmerDashboard')}</Link></li>
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/mandi">{t('footer.mandiComparison')}</Link></li>
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/trends">{t('footer.priceTrends')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">{t('footer.decide')}</div>
          <ul className="space-y-2 text-sm text-stone-700">
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/storage">{t('footer.coldStorage')}</Link></li>
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/export">{t('footer.exportBrokers')}</Link></li>
            <li><Link className="link-sweep inline-block py-3 md:py-0" to="/about">{t('footer.howItWorks')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
