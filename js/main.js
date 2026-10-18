/* ============================================================
   AZ OLDAL MŰKÖDÉSE
   ------------------------------------------------------------
   1. Nyelvváltás (HU / EN) a js/i18n.js szótár alapján
   2. Világos / sötét megjelenés
   3. E-mail-cím másolása
   4. Szakmai út: görgetésre megtelő idővonal
   5. Indítás: a mentett beállítások visszaállítása

   A fájl a <body> legvégén töltődik be, ezért itt már minden
   HTML-elem elérhető. A külső (function () { … })() keret azért
   van, hogy a változóink ne kerüljenek a globális térbe.
   ============================================================ */
(function () {
  'use strict';

  const root = document.documentElement;   // a <html> elem
  const dict = window.I18N;                 // a szótár (js/i18n.js)

  /** Kiolvasás a böngésző tárolójából; ha le van tiltva, null. */
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  /** Mentés a böngésző tárolójába; ha le van tiltva, csendben kihagyjuk. */
  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* nincs tárolás */ }
  }


  /* ----------------------------------------------------------
     1. NYELVVÁLTÁS
     A data-i18n, data-i18n-aria és data-i18n-alt attribútumú
     elemek szövegét a szótárból töltjük be.
     ---------------------------------------------------------- */
  const textEls = document.querySelectorAll('[data-i18n]');
  const ariaEls = document.querySelectorAll('[data-i18n-aria]');
  const altEls = document.querySelectorAll('[data-i18n-alt]');
  const btnHu = document.getElementById('langHu');
  const btnEn = document.getElementById('langEn');
  let currentLang = 'hu';

  /** Egy szöveg a kiválasztott nyelven. */
  function t(key) {
    return dict[currentLang][key];
  }

  /**
   * Fejlesztői ellenőrzés: a HTML-ben lévő magyar szöveg egyezik-e a szótárral.
   * Ha valahol csak az egyiket írtuk át, a konzolban figyelmeztetést kapunk.
   */
  function checkHtmlMatchesDictionary() {
    const hu = dict.hu;
    textEls.forEach(function (el) {
      const key = el.dataset.i18n;
      if (el.innerHTML !== hu[key]) console.warn('[i18n] A HTML és a szótár eltér:', key);
    });
    ariaEls.forEach(function (el) {
      const key = el.dataset.i18nAria;
      if (el.getAttribute('aria-label') !== hu[key]) console.warn('[i18n] Az aria-label eltér:', key);
    });
    altEls.forEach(function (el) {
      const key = el.dataset.i18nAlt;
      if (el.getAttribute('alt') !== hu[key]) console.warn('[i18n] Az alt szöveg eltér:', key);
    });
  }

  /** Átváltja az oldalt a megadott nyelvre ('hu' vagy 'en'), és megjegyzi. */
  function setLang(lang) {
    currentLang = lang;

    textEls.forEach(function (el) { el.innerHTML = t(el.dataset.i18n); });
    ariaEls.forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    altEls.forEach(function (el) { el.setAttribute('alt', t(el.dataset.i18nAlt)); });

    root.lang = lang;                 // a felolvasóprogramok és a keresők ebből tudják a nyelvet
    document.title = t('title');      // böngészőfül címe
    btnHu.setAttribute('aria-pressed', String(lang === 'hu'));
    btnEn.setAttribute('aria-pressed', String(lang === 'en'));
    save('lang', lang);

    refreshThemeButton();             // a témagomb felirata is nyelvfüggő
    updateTimeline();                 // a szöveghossz változhat, így az idővonal is
  }


  /* ----------------------------------------------------------
     2. VILÁGOS / SÖTÉT MEGJELENÉS
     Alapból világos (a készülék beállításától függetlenül).
     A választást a <html data-theme="…"> attribútum tárolja,
     a színeket a css/variables.css cseréli le.
     ---------------------------------------------------------- */
  const themeBtn = document.getElementById('themeBtn');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  /** A gomb ikonja és felirata mindig azt mutatja, amire a kattintás vált. */
  function refreshThemeButton() {
    const dark = currentTheme() === 'dark';
    // SVG elemen a .hidden tulajdonság nem létezik, ezért attribútummal kapcsoljuk
    iconSun.toggleAttribute('hidden', !dark);
    iconMoon.toggleAttribute('hidden', dark);
    const label = t(dark ? 'toLight' : 'toDark');
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    save('theme', theme);
    refreshThemeButton();
  }


  /* ----------------------------------------------------------
     3. E-MAIL-CÍM MÁSOLÁSA
     Ha a vágólap nem érhető el, legalább kijelöljük a címet.
     ---------------------------------------------------------- */
  const copyBtn = document.getElementById('copyBtn');
  const emailEl = document.getElementById('email');
  const EMAIL = 'fdgeza@gmail.com';

  function selectEmail() {
    const range = document.createRange();
    range.selectNodeContents(emailEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /** Rövid visszajelzés a gombon („Kimásolva” / „Kijelölve”), majd vissza alaphelyzetbe. */
  function showCopyResult(key) {
    copyBtn.textContent = t(key);
    setTimeout(function () { copyBtn.textContent = t('copy'); }, 1800);
  }

  function copyEmail() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(
        function () { showCopyResult('copied'); },
        function () { selectEmail(); showCopyResult('selected'); }
      );
    } else {
      selectEmail();
      showCopyResult('selected');
    }
  }


  /* ----------------------------------------------------------
     4. SZAKMAI ÚT – GÖRGETÉSRE MEGTELŐ IDŐVONAL
     A színes sín a képernyő 60%-áig ér le; amelyik állomás
     ennél feljebb van, annak a jelölője kigyullad (.reached).
     ---------------------------------------------------------- */
  const jobList = document.getElementById('jobs');
  const railFill = jobList.querySelector('.rail-fill');
  const jobs = jobList.querySelectorAll('.job');
  const MARKER_OFFSET = 38;   // a jelölő távolsága a kártya tetejétől (px)
  let frameRequested = false;

  function updateTimeline() {
    frameRequested = false;
    const box = jobList.getBoundingClientRect();
    const mark = window.innerHeight * 0.6;
    const maxHeight = box.height - 16;
    const height = Math.max(0, Math.min(maxHeight, mark - box.top - 8));
    railFill.style.setProperty('--fill', height + 'px');
    jobs.forEach(function (job) {
      job.classList.toggle('reached', job.getBoundingClientRect().top + MARKER_OFFSET <= mark);
    });
  }

  /** Görgetéskor képkockánként legfeljebb egyszer számolunk újra. */
  function onScroll() {
    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(updateTimeline);
    }
  }


  /* ----------------------------------------------------------
     5. INDÍTÁS
     ---------------------------------------------------------- */
  checkHtmlMatchesDictionary();

  // Téma: a mentett választás, különben világos.
  // (A sötétet a js/theme-init.js már a kirajzolás előtt beállította.)
  root.setAttribute('data-theme', load('theme') === 'dark' ? 'dark' : 'light');

  // Eseménykezelők
  btnHu.addEventListener('click', function () { setLang('hu'); });
  btnEn.addEventListener('click', function () { setLang('en'); });
  themeBtn.addEventListener('click', function () { setTheme(currentTheme() === 'dark' ? 'light' : 'dark'); });
  copyBtn.addEventListener('click', copyEmail);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Nyelv: a mentett választás, különben magyar.
  // A setLang a témagomb feliratát és az idővonalat is beállítja.
  setLang(load('lang') === 'en' ? 'en' : 'hu');

  // Ha a látogató kevesebb mozgást kér, a térképen haladó pont megáll a célnál.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const mapSvg = document.getElementById('mapSvg');
    if (mapSvg && mapSvg.pauseAnimations) {
      mapSvg.pauseAnimations();
      mapSvg.setCurrentTime(9);
    }
  }
})();
