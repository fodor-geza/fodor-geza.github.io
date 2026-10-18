# Fodor Géza – személyes weboldal

Front-End Developer, 25+ év IT- és fejlesztői tapasztalattal.

**Élő oldal:** https://fodor-geza.github.io

- Magyar és angol nyelv (HU / EN választó a fejlécben)
- Világos és sötét megjelenés
- Keretrendszer nélkül: HTML, CSS, vanilla JavaScript

## Felépítés

```
index.html          az oldal szerkezete (szakaszonként megjegyzésekkel)
css/
  variables.css     színek és betűtípusok (világos + sötét téma)
  base.css          alapbeállítások, tipográfia, közös elemek
  header.css        fejléc, menü, nyelv- és témaválasztó
  hero.css          nyitó rész és számok sáv
  about.css         Rólam
  career.css        Szakmai út: idővonal és útvonal-térkép
  skills.css        Készségek
  contact.css       Kapcsolat és lábléc
  responsive.css    tabletre és telefonra vonatkozó szabályok (utolsóként töltődik be)
js/
  theme-init.js     a mentett sötét mód / angol nyelv kezelése kirajzolás előtt
  main.js           szótárak betöltése, nyelvváltás, témaváltás, e-mail-másolás, idővonal
data/
  i18n/
    hu.json         magyar szótár
    en.json         angol szótár
foto.jpg, favicon.svg
robots.txt, sitemap.xml   keresőmotoroknak
```

## Szöveg módosítása

A szótárakban a kulcsok ponttal tagolt névterek (pl. `"about.title"`, `"career.nng.item1"`),
és a HTML-ben ugyanez a kulcs áll: `data-i18n="about.title"`.

1. Írd át a `data/i18n/hu.json` vagy `data/i18n/en.json` fájlban.
2. Magyar szövegnél az `index.html`-ben is írd át ugyanígy (a keresők és a JavaScript
   nélküli böngészők ezt látják). Ha a kettő eltér, a böngésző konzolja figyelmeztet.

## Helyi kipróbálás

A szótárakat a böngésző tölti le (`fetch`), ezért az `index.html` dupla kattintással
megnyitva nem tud nyelvet váltani. Helyben a beépített kis szerverrel nyisd meg
(csak Node.js kell hozzá, külső csomag nem):

```
npm start
```

Utána a böngészőben: http://localhost:5500. Ha elmentesz egy fájlt, az oldal
magától újratöltődik. Leállítás: a terminálban `Ctrl+C`.
A szerver kódja: `tools/dev-server.js` (a GitHub Pages nem használja).
