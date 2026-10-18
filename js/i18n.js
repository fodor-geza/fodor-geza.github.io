/* ============================================================
   SZÓTÁR (i18n) – az oldal összes magyar és angol szövege
   ------------------------------------------------------------
   Hogyan működik?
   - A HTML-ben a lefordítandó elemeken egy kulcs áll, például:
       <h2 data-i18n="aboutH">…</h2>          → a szöveg (innerHTML) cserélődik
       <nav data-i18n-aria="navAria">          → az aria-label cserélődik
       <img data-i18n-alt="photoAlt">          → az alt szöveg cserélődik
   - Nyelvváltáskor a js/main.js a kulcs alapján innen veszi a szöveget.
   - Néhány érték HTML-t is tartalmaz (<em>, <br>, <small>): ezek a
     kiemelések és sortörések, a nyelvváltás ezeket is átveszi.

   Szöveg módosítása:
   1. Írd át itt, a megfelelő nyelvnél.
   2. Magyar szövegnél az index.html-ben is írd át ugyanígy: ott azért
      van meg a magyar szöveg, hogy a keresők és a JavaScript nélküli
      böngészők is lássák. Ha a kettő eltér, a böngésző konzolja
      figyelmeztet (lásd js/main.js, checkHtmlMatchesDictionary).

   A két nyelv kulcsai ugyanabban a sorrendben, szakaszonként követik egymást.
   Ez a felépítés megegyezik a React-projektekben használt i18next
   "resources" formátumával.
   ============================================================ */

window.I18N = {
  hu: {
    // ---- Böngészőfül és felület (gombfeliratok, állapotok) ----
    title: 'Fodor Géza – Front-End Developer',
    copy: 'Másolás',
    copied: 'Kimásolva',
    selected: 'Kijelölve',
    open: 'Megnyitás',
    toDark: 'Sötét megjelenés',
    toLight: 'Világos megjelenés',

    // ---- Fejléc ----
    name: 'Fodor Géza',
    navAria: 'Fő navigáció',
    navAbout: 'Rólam',
    navCareer: 'Szakmai út',
    navSkills: 'Készségek',
    navContact: 'Kapcsolat',
    langAria: 'Nyelv választása',

    // ---- Nyitó rész ----
    h1: 'Fodor <em>Géza</em>',
    lead: 'Több mint 25 éves IT- és fejlesztői tapasztalattal rendelkezem. Pályámat nyomdai grafikusként kezdtem, majd webalkalmazásokat és portálokat fejlesztettem, az elmúlt közel két évtizedben pedig navigációs rendszerek programozásával foglalkoztam.',
    photoAlt: 'Fodor Géza portréja',
    fact1: 'év IT- és fejlesztői tapasztalat',
    fact2: 'év navigációs szoftverek fejlesztése',
    fact3: 'terület: grafika, web, navigáció',

    // ---- Rólam ----
    aboutH: 'Kreatív látásmód és technikai szakértelem egy személyben',
    about1: 'Szakmai tapasztalatomat a navigációs rendszerek script-alapú programozásában, webalkalmazások és portálok fejlesztésében, valamint nyomdai és multimédiás tartalmak előkészítésében szereztem.',
    about2: 'Pályám során grafikai és fejlesztői feladatokat egyaránt végeztem, ezért egy felület készítésekor a megjelenésre és a működésre egyformán figyelek. Jelenleg React és TypeScript ismereteimet bővítem.',
    about3: 'Szakmai munkámban kiemelt szerepet kap a precizitás, a hatékony kommunikáció, a csapatmunka és az önálló problémamegoldás.',
    specPos: 'Pozíció',
    specLoc: 'Helyszín',
    location: 'Gödöllő és Budapest környéke',
    specEdu: 'Tanulmányok',
    edu: 'Prompt Számítástechnikai Oktatóközpont<br><small>Gödöllő</small>',
    specLang: 'Nyelvek',
    langs: 'Magyar <small>· anyanyelvi</small><br>Angol <small>· A2 szintű gyakorlati nyelvismeret</small>',
    specLic: 'Jogosítvány',
    lic: 'B és C kategória',

    // ---- Szakmai út: cím, térkép, navigációs sáv ----
    careerH: 'Grafikától a navigációs szoftverekig',
    mapAria: 'Szakmai útvonal térképen: 1997 grafika, 2003 web, 2008 navigáció, és ma',
    mapGfx: 'Grafika',
    mapNav: 'Navigáció',
    today: 'Ma',
    todayCap: 'Ma',
    panelDist: 'Megtett út',
    panelDistV: '1997 → ma',
    panelStops: 'Állomások',
    panelStopsV: '3 munkahely',
    panelDir: 'Útirány',

    // ---- Szakmai út: következő célállomás ----
    instrNext: 'Következő célállomás',
    destH: 'Modern front-end fejlesztés',
    destText: 'Tapasztalatomat a mai webes technológiákkal ötvözöm: jelenleg a React és a TypeScript elmélyítésén dolgozom.',

    // ---- Szakmai út: NNG ----
    instrHwy: 'Hajtson fel az autópályára',
    nngSpan: '2008. jan – 2026. szept · 18 év 9 hó',
    nngCo: 'NNG Kft. · Budapest',
    nng1: 'GPS-alapú navigációs rendszerek fejlesztése és karbantartása, főként Lua és az objektumorientált, JavaScript-alapú XScript nyelven.',
    nng2: 'A felhasználói felület layout- és grafikai elemeinek tervezése és szerkesztése navigációs szoftverekhez.',
    nng3: 'A fejlesztett tartalmak integrálása autóba épített és mobil platformokra.',
    nng4: 'Verziókövetés GIT, HG és SVN segítségével, csapatmunka agilis fejlesztési környezetben.',
    tagUi: 'UI-layout',

    // ---- Szakmai út: Inverse Hungary ----
    instrRight: 'Forduljon jobbra',
    invSpan: '2003. jan – 2007. szept · 4 év 9 hó',
    invH: 'Internetes Rendszerfejlesztő',
    inv1: 'Internetes cégrendszerek, vállalati portálok és webáruházak tervezése és fejlesztése.',
    inv2: 'PHP, MySQL, HTML és CSS alapú webalkalmazások az ügyfelek egyedi igényei szerint.',

    // ---- Szakmai út: Inverse – Graphics ----
    instrStart: 'Indulás',
    gfxSpan: '1997. jún – 2002. dec · 5 év 7 hó',
    gfxH: 'Grafikus – Szerkesztő',
    gfx1: 'Kiadványok, plakátok és szóróanyagok nyomdakész kivitelezése.',
    gfx2: 'Nyomdai előkészítés, levilágítás, prezentációs és multimédiás anyagok készítése.',
    tagPrepress: 'Nyomdai előkészítés',

    // ---- Készségek ----
    skillsH: 'Technológiák és eszközök',
    skScript: 'Script',
    skGfx: 'Grafika és verziókezelés',
    skLearn: 'Folyamatban lévő képzések',

    // ---- Kapcsolat ----
    contactH: 'Vegye fel velem a <em>kapcsolatot</em>',
    contactP: 'Ha együttműködésben gondolkodik, vagy kérdése van, e-mailben vagy a LinkedInen ér el a legkönnyebben.',
    chEmail: 'E-mail'
  },

  en: {
    // ---- Browser tab and UI (button labels, states) ----
    title: 'Géza Fodor – Front-End Developer',
    copy: 'Copy',
    copied: 'Copied',
    selected: 'Selected',
    open: 'Open',
    toDark: 'Dark theme',
    toLight: 'Light theme',

    // ---- Header ----
    name: 'Géza Fodor',
    navAria: 'Main navigation',
    navAbout: 'About me',
    navCareer: 'Career path',
    navSkills: 'Skills',
    navContact: 'Contact',
    langAria: 'Choose language',

    // ---- Hero ----
    h1: '<em>Géza</em> Fodor',
    lead: 'I have more than 25 years of experience in IT and software development. I began my career as a print graphic designer, went on to develop web applications and portals, and spent most of the past two decades programming navigation systems.',
    photoAlt: 'Portrait of Géza Fodor',
    fact1: 'years of experience in IT and development',
    fact2: 'years of navigation software development',
    fact3: 'fields: graphic design, web, navigation',

    // ---- About me ----
    aboutH: 'Where design meets development',
    about1: 'My professional background includes script-based development for navigation systems, web application and portal development, and the preparation of print and multimedia content.',
    about2: 'Throughout my career, I have worked in both graphic design and software development roles. This allows me to give equal weight to visual design and functionality when creating digital solutions. I am currently expanding my skills in React and TypeScript.',
    about3: 'My work reflects precision, effective communication, strong teamwork, and independent problem-solving.',
    specPos: 'Position',
    specLoc: 'Location',
    location: 'Gödöllő and the Budapest area',
    specEdu: 'Education',
    edu: 'Prompt Számítástechnikai Oktatóközpont<br><small>Computer training center · Gödöllő, Hungary</small>',
    specLang: 'Languages',
    langs: 'Hungarian <small>· native</small><br>English <small>· A2 (basic working knowledge)</small>',
    specLic: 'Driver’s license',
    lic: 'Categories B and C',

    // ---- Career path: heading, map, navigation panel ----
    careerH: 'From graphic design to navigation software',
    mapAria: 'Career path shown on a map: graphic design in 1997, web in 2003, navigation in 2008, and today',
    mapGfx: 'Design',
    mapNav: 'Navigation',
    today: 'Today',
    todayCap: 'Today',
    panelDist: 'Distance covered',
    panelDistV: '1997 → today',
    panelStops: 'Stops',
    panelStopsV: '3 employers',
    panelDir: 'Heading',

    // ---- Career path: next destination ----
    instrNext: 'Next destination',
    destH: 'Modern front-end development',
    destText: 'I am combining my previous experience with modern web technologies while continuously deepening my knowledge of React and TypeScript.',

    // ---- Career path: NNG ----
    instrHwy: 'Merge onto the highway',
    nngSpan: 'Jan 2008 – Sep 2026 · 18 years 9 months',
    nngCo: 'NNG LLC · Budapest',
    nng1: 'Developed and maintained GPS-based navigation systems, mainly in Lua and XScript, an object-oriented, JavaScript-based language.',
    nng2: 'Designed and edited user interface layouts and graphic elements for navigation software.',
    nng3: 'Integrated the developed content into in-car and mobile platforms.',
    nng4: 'Used Git, Mercurial (HG) and SVN for version control; worked as part of a team in an agile development environment.',
    tagUi: 'UI layout',

    // ---- Career path: Inverse Hungary ----
    instrRight: 'Turn right',
    invSpan: 'Jan 2003 – Sep 2007 · 4 years 9 months',
    invH: 'Web Systems Developer',
    inv1: 'Designed and developed corporate web systems, company portals and online stores.',
    inv2: 'Built web applications with PHP, MySQL, HTML and CSS, tailored to each client’s needs.',

    // ---- Career path: Inverse – Graphics ----
    instrStart: 'Start',
    gfxSpan: 'Jun 1997 – Dec 2002 · 5 years 7 months',
    gfxH: 'Graphic Designer and Editor',
    gfx1: 'Produced print-ready publications, posters and flyers.',
    gfx2: 'Handled prepress and imagesetting, and created presentation and multimedia materials.',
    tagPrepress: 'Prepress',

    // ---- Skills ----
    skillsH: 'Technologies and tools',
    skScript: 'Scripting',
    skGfx: 'Graphics and version control',
    skLearn: 'Ongoing training',

    // ---- Contact ----
    contactH: 'Get in <em>touch</em>',
    contactP: 'Interested in working together or have a question? Feel free to reach out via email or LinkedIn.',
    chEmail: 'Email'
  }
};
