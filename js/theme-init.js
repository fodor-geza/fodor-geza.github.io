/* ============================================================
   TÉMA BEÁLLÍTÁSA KIRAJZOLÁS ELŐTT
   Ezt a fájlt a <head> tölti be, még mielőtt az oldal megjelenik.
   Ha a látogató korábban sötét módot választott, azonnal beállítjuk,
   így nem villan fel a világos változat. (Alapból világos az oldal.)
   ============================================================ */
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
} catch (e) {
  // Privát böngészés vagy letiltott tárolás esetén marad a világos.
}
