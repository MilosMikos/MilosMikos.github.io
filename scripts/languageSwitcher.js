// scripts/languageSwitcher.js
// Depends on: i18n.js, comicsManager.js

document.addEventListener('DOMContentLoaded', async () => {
  const dropdown    = document.getElementById('language-dropdown');
  const container   = document.getElementById('select-container');
  const items       = container.querySelectorAll('ul li');
  const selectedItem = document.getElementById('selectedItem');

  if (items.length === 0) {
    console.error('LanguageSwitcher: no language items found.');
    return;
  }

  // --- Init: apply detected language on page load ---

  const { lang } = await I18n.init();
  syncUI(lang);
  hideSelected();
  ComicsManager.update(lang);

  // --- Event listeners ---

  selectedItem.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });

  items.forEach(item => {
    item.addEventListener('click', () => onSelect(item));
  });

  // --- Handlers ---

  async function onSelect(item) {
    const langCode = item.getAttribute('lang-selection');
    console.log('LanguageSwitcher: selected', langCode);

    showUnselected();
    const { lang } = await I18n.setLang(langCode);
    syncUI(lang);
    hideSelected();
    lockBriefly();
    dropdown.classList.remove('open');

    ComicsManager.update(lang);
  }

  // --- UI helpers ---

  // Updates the visible selected button to match the given lang code
  function syncUI(langCode) {
    const source = container.querySelector(`li[lang-selection="${langCode}"]`);
    if (!source) return;
    selectedItem.innerHTML = source.innerHTML + '<span class="arrow-down"></span>';
    selectedItem.setAttribute('lang-selection', langCode);
  }

  function hideSelected() {
    const langCode = selectedItem.getAttribute('lang-selection');
    items.forEach(item => {
      if (item.getAttribute('lang-selection') === langCode) {
        item.style.opacity = '0';
        setTimeout(() => (item.style.display = 'none'), 200);
      }
    });
  }

  function showUnselected() {
    const langCode = selectedItem.getAttribute('lang-selection');
    items.forEach(item => {
      if (item.getAttribute('lang-selection') === langCode) {
        item.style.opacity = '1';
        item.style.display = '';
      }
    });
  }

  function lockBriefly() {
    container.style.pointerEvents = 'none';
    setTimeout(() => (container.style.pointerEvents = 'auto'), 200);
  }
});