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
  theme-init.js     a mentett sötét mód beállítása kirajzolás előtt
  i18n.js           szótár: az összes magyar és angol szöveg
  main.js           nyelvváltás, témaváltás, e-mail-másolás, idővonal
foto.jpg, favicon.svg
robots.txt, sitemap.xml   keresőmotoroknak
```

## Szöveg módosítása

1. Írd át a `js/i18n.js` szótárban, a megfelelő nyelvnél (`hu` vagy `en`).
2. Magyar szövegnél az `index.html`-ben is írd át ugyanígy (a keresők és a JavaScript
   nélküli böngészők ezt látják). Ha a kettő eltér, a böngésző konzolja figyelmeztet.
