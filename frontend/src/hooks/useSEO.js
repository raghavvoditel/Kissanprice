import { useEffect } from 'react';

// TODO: replace with the real production domain once KisanPrice is deployed.
const SITE_URL = 'https://kisanprice.example.com';
const SITE_NAME = 'KisanPrice';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets document title + description/Open Graph/Twitter meta tags for the
 * current page. Note: this only affects clients that execute JS (browsers,
 * Googlebot). Link-preview bots that don't run JS (WhatsApp, iMessage, some
 * Facebook/Twitter crawlers) will only ever see the static tags baked into
 * public/index.html, so those are kept as sensible site-wide defaults.
 */
export default function useSEO({ title, description, path = '/' }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaByName('description', description);

    setMetaByProperty('og:title', title || SITE_NAME);
    setMetaByProperty('og:description', description || '');
    setMetaByProperty('og:url', `${SITE_URL}${path}`);
    setMetaByProperty('og:image', DEFAULT_IMAGE);
    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:site_name', SITE_NAME);
    setCanonical(`${SITE_URL}${path}`);

    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title || SITE_NAME);
    setMetaByName('twitter:description', description || '');
    setMetaByName('twitter:image', DEFAULT_IMAGE);
  }, [title, description, path]);
}
