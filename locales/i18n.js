// scripts/i18n.js
const I18n = (() => {
    const SUPPORTED = ['EN','FR','ES','DE','IT','PL','TR','FI','KR','SW','CZ','RO','ET','SK','PTbr'];
    
    function detectLang() {
      const saved = localStorage.getItem('lang');
      if (saved && SUPPORTED.includes(saved)) return saved;
      const browser = (navigator.language || '').split('-')[0].toUpperCase();
      return SUPPORTED.includes(browser) ? browser : 'EN';
    }
  
    async function load(lang) {
      const res = await fetch(`/locales/${lang}.json`);
      if (!res.ok) return load('EN'); // fallback
      return res.json();
    }
  
    function applyDict(dict) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!dict[key]) return;
        const val = dict[key];
        // innerHTML seulement si la valeur contient des balises
        if (/<[a-z][\s\S]*>/i.test(val)) el.innerHTML = val;
        else el.textContent = val;
      });
    }
  
    async function init() {
      const lang = detectLang();
      const dict = await load(lang);
      applyDict(dict);
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang.toLowerCase();
      return { lang, dict };
    }
  
    return { init, load, applyDict, SUPPORTED, detectLang };
  })();