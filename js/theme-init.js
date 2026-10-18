/* ============================================================
   BEÁLLÍTÁSOK KIRAJZOLÁS ELŐTT
   Ezt a fájlt a <head> tölti be, még mielőtt az oldal megjelenik.

   1. Téma: ha a látogató korábban sötét módot választott, azonnal
      beállítjuk, így nem villan fel a világos változat.
   2. Nyelv: ha korábban angolt választott, az oldalt elrejtjük, amíg
      a js/main.js be nem tölti az angol szótárat – így nem villan fel
      a magyar szöveg. Biztonsági okból legfeljebb 2 másodpercig.
   ============================================================ */
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if (localStorage.getItem('lang') === 'en') {
    document.documentElement.classList.add('i18n-pending');
    setTimeout(function () { document.documentElement.classList.remove('i18n-pending'); }, 2000);
  }
} catch (e) {
  // Privát böngészés vagy letiltott tárolás esetén marad a világos téma és a magyar nyelv.
}
