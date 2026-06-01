// scripts/i18n.js
const I18n = (() => {
    const SUPPORTED = ['EN','FR','ES','DE','IT','PL','TR','FI','KR','SW','CZ','RO','ET','SK','PTbr'];
    const _defaults = {};
  
    function detectLang() {
      const saved = localStorage.getItem('lang');
      if (saved && SUPPORTED.includes(saved)) return saved;
      const browser = (navigator.language || '').split('-')[0].toUpperCase();
      return SUPPORTED.includes(browser) ? browser : 'EN';
    }
  
    async function load(lang) {
      const res = await fetch(`/locales/${lang}.json`);
      if (!res.ok) return load('EN');
      return res.json();
    }
  
    function applyDict(dict) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!(key in _defaults)) _defaults[key] = el.innerHTML;
        const val = dict[key];
        if (!val || val.trim() === '') { el.innerHTML = _defaults[key]; return; }
        if (/<[a-z][\s\S]*>/i.test(val)) el.innerHTML = val;
        else el.textContent = val;
      });
    }
  
    async function setLang(lang) {
      if (!SUPPORTED.includes(lang)) {
        console.warn(`I18n: unsupported language "${lang}", falling back to EN`);
        lang = 'EN';
      }
      const dict = await load(lang);
      applyDict(dict);
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang.toLowerCase();
      return { lang, dict };
    }
  
    async function init() {
      return setLang(detectLang());
    }
  
    return { init, setLang, load, applyDict, detectLang, SUPPORTED };
  })();