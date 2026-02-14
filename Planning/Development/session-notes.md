# Beer-Mate: Session Notes

## Session 1 — 14. februar 2026

### Hvad vi lavede

**1. Gennemgang af koncept og datagrundlag**
- Læste proposal-dokumentet (`Planning/Proposal/Beer-Mate.md`) med 5 quiz-spørgsmål, scoring-system og idéer til matching
- Analyserede Taphouse design-reference (`Planning/Proposal/Design style.png`) — mobil-first, burgundy/rød palette, kort-baseret layout
- Gennemgik øl-databasen (`Planning/Proposal/Beer-Mate_Scored_List_10D.csv`) — 61 øl, 10 dimensioner, 10 kategorier

**2. Matching-algoritme dokument**
- Oprettet `Planning/Development/matching-algoritme.md`
- Definerede komplet scoring-tabeller for alle 5 quiz-spørgsmål (kun Q1 var delvist defineret i proposal)
- Designede matching-algoritmen: vægtet euklidisk afstand med 4 trin:
  1. Summér quiz-scores → rå brugerprofil
  2. Normalisér til 0–5 (`clamp(2.5 + raw × 0.4, 0, 5)`)
  3. Dimensionsvægte baseret på præference-styrke (`min(|raw|/5, 1.0)`)
  4. Vægtet euklidisk afstand → match-procent
- Inkluderede gennemregnet eksempel der validerer algoritmen
- Definerede resultatpræsentation: smagsbeskrivelse + kategori-anbefalinger + specifikke øl

**3. Prototype bygget (vanilla HTML/CSS/JS)**
- `src/index.html` — Single-page app med 4 skærme (intro → quiz → loading → resultater)
- `src/css/style.css` — Taphouse-inspireret design, mobil-first, burgundy farvepalette
- `src/js/data.js` — 61 øl konverteret fra CSV + 5 quiz-spørgsmål med scoring-tabeller
- `src/js/matching.js` — Matching-algoritme med profil-opbygning, normalisering, vægtning og smagsbeskrivelse
- `src/js/app.js` — Quiz-flow, skærm-navigation, resultat-rendering

**4. Git og deployment-forberedelse**
- Initialiseret git repo, første commit lavet (`ecedcde`)
- `.gitignore` oprettet (`.DS_Store`, `settings.local.json`, `node_modules/`)
- MCP SSH-forbindelse konfigureret i `.claude/settings.local.json` (server: `root@185.185.126.120`)

---

### Hvad der skal ske i næste session

**Deployment**
- [ ] Genstart Claude Code så MCP SSH-forbindelsen aktiveres
- [ ] Afklar sti på serveren (fx `/var/www/html/beer-mate/`)
- [ ] Deploy `src/`-mappen til serveren

**Test og finjustering**
- [ ] Kør prototypen og test quiz-flowet igennem med forskellige profiler
- [ ] Validér at matching-resultaterne giver intuitiv mening
- [ ] Finjuster scoring-tabeller hvis nødvendigt (især Q4 og Q5 som afviger fra +3 mønsteret)

**Mulige forbedringer**
- [ ] Finjustere design — farver, typografi, spacing baseret på den rigtige Taphouse branding
- [ ] Tilføje ABV-information i resultatvisningen (evt. advarsel ved stærke øl >8%)
- [ ] Håndtering af "flad profil" edge case (neutral/åben bruger)
- [ ] Evt. tilføje en "prøv igen" animation/transition
- [ ] Overvej om øl-databasen skal gøres dynamisk (JSON-fil / API) så Taphouse kan opdatere udvalget

**Senere (kravspec-fase)**
- [ ] Udarbejd fuld kravspecifikation baseret på den fungerende prototype
- [ ] User stories, sprints, teknisk dokumentation
