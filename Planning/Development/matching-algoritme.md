# Beer-Mate: Matching-algoritme

## Overblik

Systemet matcher en brugers smagspræferencer med Taphouse's øludvalg i 4 trin:

1. **Quiz → Rå smagsprofil** — 5 spørgsmål genererer scores på 10 dimensioner
2. **Normalisering** — Rå scores mappes til 0–5 (samme skala som øl-data)
3. **Matching** — Vægtet euklidisk afstand mellem brugerprofil og hver øl
4. **Resultat** — Top-matches præsenteres med smagsbeskrivelse

---

## 1. Smagsdimensioner

### 1.1 Primære (direkte smagbare)

| Dimension | Kode | Beskrivelse |
|---|---|---|
| Bitterhed | `bitter` | Humlebitterhed, kaffebitterhed |
| Sødme | `sweet` | Maltsødme, karamelsødme |
| Syrlighed | `sour` | Mælkesyre, vild gær, tartness |
| Fylde | `body` | Krop, mundlighed, vægt |
| Frugtighed | `fruity` | Fra humle, gær eller tilsætning |
| Ristethed | `roasted` | Kaffe, chokolade, mørk malt |
| Krydrethed | `spicy` | Fra gær, humle eller krydderier |
| Røg | `smoky` | Røgmalt |

### 1.2 Sekundære (afledte)

| Dimension | Kode | Afledt fra |
|---|---|---|
| Tørhed | `dryness` | Bitter + lav Sweet + lav Body |
| Kompleksitet | `complexity` | Antal aktive dimensioner, dybde |

Alle 10 dimensioner scores på en **0–5 skala** i øl-databasen.

---

## 2. Quiz scoring-tabeller

### Scoring-mønster

Hvert svar følger som udgangspunkt dette mønster:

- **1 primær dimension:** +3
- **1–2 sekundære:** +1 til +2
- **1 dæmpning:** −1

Spørgsmål 4 og 5 afviger (se noter).

---

### Spørgsmål 1: Hvad tager du med i sofaen til en god film?

*Måler: Grundsmage — direkte smagspræferencer via snack-analogier*

| Svar | Bitter | Sweet | Sour | Body | Fruity | Roasted | Spicy | Smoky | Dryness | Complexity |
|---|---|---|---|---|---|---|---|---|---|---|
| 🍋 Syrlige vingummier | 0 | 0 | **+3** | −1 | +1 | 0 | 0 | 0 | +1 | 0 |
| 🍓 Søde frugtige vingummier | −1 | +2 | 0 | 0 | **+3** | 0 | 0 | 0 | 0 | 0 |
| 🍫 Chokolade | 0 | +1 | −1 | +2 | 0 | **+3** | 0 | 0 | 0 | 0 |
| 🖤 Lakrids | **+3** | 0 | 0 | 0 | −1 | +2 | 0 | 0 | +1 | 0 |
| 🌰 Marcipan | 0 | **+3** | 0 | +1 | 0 | 0 | 0 | 0 | −1 | 0 |
| 🍬 Bland-selv | 0 | 0 | 0 | 0 | +1 | 0 | +1 | 0 | 0 | **+3** |

**Signaler:**
- Syrlige vingummier → Sour/Gose, frisk hvede, cider
- Søde frugtige → NEIPA, frugtig pale ale
- Chokolade → Porter, sweet stout, mørke belgiere
- Lakrids → Dry stout, black IPA, tør og bitter
- Marcipan → Maltede lagers, dubbel, bløde brune øl
- Bland-selv → Åben profil, tæller mod komplekse/eksperimenterende øl

---

### Spørgsmål 2: Hvordan vil du have din kaffe?

*Måler: Bitterhedstolerancen og intensitetspræference*

| Svar | Bitter | Sweet | Sour | Body | Fruity | Roasted | Spicy | Smoky | Dryness | Complexity |
|---|---|---|---|---|---|---|---|---|---|---|
| ☕ Sort og stærk | **+3** | −1 | 0 | +1 | 0 | +2 | 0 | 0 | +1 | 0 |
| 🥛 Med mælk | −1 | +1 | 0 | **+3** | 0 | 0 | 0 | 0 | −1 | 0 |
| 🍯 Med sirup / sukker | 0 | **+3** | 0 | 0 | +1 | 0 | 0 | 0 | −1 | 0 |
| 🚫 Drikker ikke kaffe | −1 | +1 | 0 | 0 | **+3** | 0 | 0 | 0 | 0 | 0 |

**Signaler:**
- Sort og stærk → Høj bitterhedstolerancen → IPA, dry stout, belgisk tripel
- Med mælk → Blød, rund, lav bitterhed → Wheat, brown ale, dubbel
- Med sirup/sukker → Sødt præg, lavt bittert → Frugt-sour, cider, sweet stout
- Drikker ikke kaffe → Undgår bitterhed → Wheat, cider, frugtøl

---

### Spørgsmål 3: Hvornår drikker du oftest en øl?

*Måler: Let ↔ Tung — foretrukken vægt og situation*

| Svar | Bitter | Sweet | Sour | Body | Fruity | Roasted | Spicy | Smoky | Dryness | Complexity |
|---|---|---|---|---|---|---|---|---|---|---|
| ☀️ En varm eftermiddag | 0 | 0 | +1 | −1 | 0 | 0 | 0 | 0 | **+3** | 0 |
| 🍽️ Til mad | 0 | 0 | 0 | +2 | 0 | 0 | +1 | 0 | −1 | **+3** |
| 🛋️ Om aftenen i sofaen | 0 | +1 | 0 | **+3** | 0 | +2 | 0 | 0 | −1 | 0 |
| 🎉 Til fest | 0 | +1 | 0 | −1 | **+3** | 0 | 0 | 0 | +1 | 0 |

**Signaler:**
- Varm eftermiddag → Crisp, let, tør → Pilsner, session IPA, cider
- Til mad → Kompleks, balanceret, gastronomisk → Belgisk, IPA, saison
- Aftenen i sofaen → Fyldig, mørk, hyggelig → Stout, porter, barley wine
- Til fest → Let, frugtig, social → Session IPA, wheat, cider

---

### Spørgsmål 4: Hvor eventyrlysten er du med smag?

*Måler: Ren ↔ Kompleks — risikovillighed og åbenhed*

> **Note:** Dette spørgsmål skalerer primært Complexity-dimensionen fra lav til høj.
> De konservative svar bruger negative scores i stedet for +3, da de signalerer fravær af kompleksitet.

| Svar | Bitter | Sweet | Sour | Body | Fruity | Roasted | Spicy | Smoky | Dryness | Complexity |
|---|---|---|---|---|---|---|---|---|---|---|
| Noget jeg kender | 0 | +1 | 0 | 0 | 0 | 0 | −1 | 0 | +2 | **−2** |
| Lidt twist | 0 | 0 | +1 | 0 | +1 | 0 | 0 | 0 | 0 | **+2** |
| Overrask mig | 0 | 0 | +1 | 0 | 0 | 0 | +2 | 0 | −1 | **+3** |
| Helt skørt | 0 | 0 | +1 | 0 | 0 | 0 | +1 | +2 | −1 | **+3** |

**Signaler:**
- Noget jeg kender → Ren, forudsigelig → Pilsner, standard wheat, brown ale
- Lidt twist → Lidt nysgerrig → Pale ale, saison, let sour
- Overrask mig → Åben og nysgerrig → Krydret belgier, wild ale, specialøl
- Helt skørt → Max eventyr → Røget øl, barrel aged, lambic, imperial stout

---

### Spørgsmål 5: Hvad irriterer dig mest i en drink?

*Måler: Dealbreakers — negativt filter som supplement til de 4 positive spørgsmål*

> **Note:** Q5 bruger kun negative scores. Ingen +3 primær.

| Svar | Bitter | Sweet | Sour | Body | Fruity | Roasted | Spicy | Smoky | Dryness | Complexity |
|---|---|---|---|---|---|---|---|---|---|---|
| For bitter | **−3** | 0 | 0 | 0 | 0 | −1 | 0 | 0 | 0 | 0 |
| For sød | 0 | **−3** | 0 | 0 | −1 | 0 | 0 | 0 | 0 | 0 |
| For tung | 0 | 0 | 0 | **−3** | 0 | −1 | 0 | 0 | 0 | 0 |
| For mærkelig | 0 | 0 | 0 | 0 | 0 | 0 | −1 | −1 | 0 | **−3** |

---

## 3. Matching-algoritme

### 3.1 Byg rå brugerprofil

Summér alle scores fra de 5 spørgsmål pr. dimension:

```
U[d] = Σ score[d] for alle 5 svar
```

**Eksempel:** En bruger svarer Chokolade, Sort kaffe, Sofaen, Lidt twist, For sød:

| Dimension | Q1 | Q2 | Q3 | Q4 | Q5 | **Rå total** |
|---|---|---|---|---|---|---|
| Bitter | 0 | +3 | 0 | 0 | 0 | **+3** |
| Sweet | +1 | −1 | +1 | 0 | −3 | **−2** |
| Sour | −1 | 0 | 0 | +1 | 0 | **0** |
| Body | +2 | +1 | +3 | 0 | 0 | **+6** |
| Fruity | 0 | 0 | 0 | +1 | −1 | **0** |
| Roasted | +3 | +2 | +2 | 0 | 0 | **+7** |
| Spicy | 0 | 0 | 0 | 0 | 0 | **0** |
| Smoky | 0 | 0 | 0 | 0 | 0 | **0** |
| Dryness | 0 | +1 | −1 | 0 | 0 | **0** |
| Complexity | 0 | 0 | 0 | +2 | 0 | **+2** |

### 3.2 Normalisér til 0–5

De rå scores har et realistisk spænd på ca. **−5 til +9**. Vi mapper til øl-dataens 0–5 skala:

```
U_norm[d] = clamp(2.5 + U[d] × 0.4, 0, 5)
```

- Rå score 0 → 2.5 (neutral midte)
- Rå score +6 → 4.9 (stærk præference)
- Rå score −5 → 0.5 (stærk aversion)
- Rå score ≥ +7 → clamped til 5.0

**Eksempel fortsat:**

| Dimension | Rå | Normaliseret |
|---|---|---|
| Bitter | +3 | 3.7 |
| Sweet | −2 | 1.7 |
| Sour | 0 | 2.5 |
| Body | +6 | 4.9 |
| Fruity | 0 | 2.5 |
| Roasted | +7 | 5.0 |
| Spicy | 0 | 2.5 |
| Smoky | 0 | 2.5 |
| Dryness | 0 | 2.5 |
| Complexity | +2 | 3.3 |

### 3.3 Beregn dimensionsvægte

Ikke alle dimensioner er lige vigtige for brugeren. Dimensioner med stærke præferencer (høj |rå score|) skal veje tungere end neutrale dimensioner:

```
W[d] = min(|U[d]| / 5, 1.0)
```

- |Rå| = 0 → vægt 0.0 (brugeren har ingen præference — ignorer)
- |Rå| = 3 → vægt 0.6 (moderat præference)
- |Rå| ≥ 5 → vægt 1.0 (stærk præference — fuld vægt)

**Eksempel fortsat:**

| Dimension | |Rå| | Vægt |
|---|---|---|
| Bitter | 3 | 0.6 |
| Sweet | 2 | 0.4 |
| Sour | 0 | 0.0 |
| Body | 6 | 1.0 |
| Fruity | 0 | 0.0 |
| Roasted | 7 | 1.0 |
| Spicy | 0 | 0.0 |
| Smoky | 0 | 0.0 |
| Dryness | 0 | 0.0 |
| Complexity | 2 | 0.4 |

> **Effekt:** Sour, Fruity, Spicy, Smoky og Dryness ignoreres i matchingen for denne bruger, fordi quizzen ikke aktiverede dem. Det forhindrer at en øl straffes for at have fx høj Smoky, når brugeren slet ikke har taget stilling til røg.

### 3.4 Beregn match-distance

For hver øl beregnes en **vægtet euklidisk afstand**:

```
distance(beer) = √( Σ W[d] × (U_norm[d] − beer[d])² )
```

Konvertér til **match-procent** for brugervenlig præsentation:

```
max_distance = √( Σ W[d] × 25 )      // worst case: afstand 5 på alle vægtede dimensioner
match% = 100 × (1 − distance / max_distance)
```

### 3.5 Eksempel: Beregn match for 3 øl

Med brugerprofilen fra ovenfor (Chokolade + Sort kaffe + Sofaen + Lidt twist + For sød):

**Ports of Call** (Baltic Porter): `[3, 3, 0, 5, 1, 5, 1, 0, 1, 5]`
```
distance = √(0.6×(3.7−3)² + 0.4×(1.7−3)² + 1.0×(4.9−5)² + 1.0×(5.0−5)² + 0.4×(3.3−5)²)
         = √(0.29 + 0.68 + 0.01 + 0.00 + 1.16)
         = √2.14 = 1.46
```

**Counter Stout** (Dry Stout): `[3, 3, 0, 4, 1, 5, 1, 0, 1, 4]`
```
distance = √(0.6×(3.7−3)² + 0.4×(1.7−3)² + 1.0×(4.9−4)² + 1.0×(5.0−5)² + 0.4×(3.3−4)²)
         = √(0.29 + 0.68 + 0.81 + 0.00 + 0.20)
         = √1.98 = 1.41
```

**Vinohradská 11** (Pilsner): `[2, 1, 0, 1, 1, 0, 0, 0, 4, 1]`
```
distance = √(0.6×(3.7−2)² + 0.4×(1.7−1)² + 1.0×(4.9−1)² + 1.0×(5.0−0)² + 0.4×(3.3−1)²)
         = √(1.73 + 0.20 + 15.21 + 25.00 + 2.12)
         = √44.26 = 6.65
```

**Max distance** = √((0.6 + 0.4 + 1.0 + 1.0 + 0.4) × 25) = √85 = **9.22**

| Øl | Distance | Match% |
|---|---|---|
| Counter Stout | 1.41 | **85%** |
| Ports of Call | 1.46 | **84%** |
| Vinohradská 11 | 6.65 | **28%** |

> Resultatet giver intuitiv mening: brugeren som vælger chokolade, sort kaffe og sofa-aftener matcher stouts og porters — og matcher dårligt med en let pilsner.

---

## 4. Resultatpræsentation

### 4.1 Smagsbeskrivelse

Baseret på brugerens **top 2–3 dimensioner** (højeste |rå score|) genereres en naturlig beskrivelse:

| Dimension | Positiv beskrivelse | Negativ beskrivelse |
|---|---|---|
| Bitter | Markante og karakterfulde | Bløde uden bitterhed |
| Sweet | Bløde og runde | Tørre og stramme |
| Sour | Friske og syrlige | — |
| Body | Fyldige og dybe | Lette og friske |
| Fruity | Frugtige og saftige | — |
| Roasted | Mørke og ristede | — |
| Spicy | Krydrede og komplekse | — |
| Smoky | Røgede og intense | — |
| Dryness | Tørre og rene | Runde og bløde |
| Complexity | Komplekse og spændende | Rene og enkle |

**Eksempel-output:**

> *"Du er til **mørke, fyldige** smagsoplevelser med **karakter**"*

Bygget fra: Roasted (+7) → "mørke", Body (+6) → "fyldige", Bitter (+3) → "karakter"

### 4.2 Anbefalinger

Resultatet vises i to niveauer:

**Niveau 1 — Kategori-anbefalinger (2–3 stk)**
Baseret på gennemsnitlig match% pr. kategori:

> 🍺 **Stout & Porter** — Mørke, ristede øl med dybde
> 🍺 **Belgian Dark** — Komplekse, krydrede mørke øl

**Niveau 2 — Specifikke øl (4–8 stk)**
Top-matchede øl sorteret efter match%, med navn, stil og match%:

> 1. Counter Stout — Dry Stout — **85% match**
> 2. Ports of Call — Baltic Porter — **84% match**
> 3. Gamma Nitro Stout — Dry Stout (Nitro) — **83% match**
> 4. ...

---

## 5. Edge cases og justeringer

### 5.1 Flad profil

Hvis brugeren svarer meget neutralt (alle rå scores tæt på 0), vil alle vægte være lave og matches upålidelige. I dette tilfælde:

- Vis en "vild kort"-besked: *"Du er åben for alt — her er et bredt udvalg!"*
- Præsentér én øl fra hver hovedkategori (Lager, IPA, Wheat, Sour, Stout, Belgian)

**Detektionskriterium:** Hvis `max(|U[d]|) < 2` → flad profil

### 5.2 Meget ekstrem profil

Hvis en bruger konsekvent vælger de mest intense svar, kan normaliserede scores ramme loftet (5.0) på flere dimensioner.

- Algoritmen håndterer dette naturligt via clamping
- Overvej at tilføje en "intensity tier": mild → moderat → intens → ekstrem

### 5.3 Alkoholfølsomhed

Øl-databasen indeholder ABV fra 0.3% til 14.5%. Overvej at tilføje et simpelt ABV-filter eller disclaimer for stærke øl (>8%) i præsentationen, da quizzen ikke direkte måler alkoholtolerance.

---

## 6. Opsummering af formler

```
// 1. Rå profil
U[d] = Σ quiz_score[d]

// 2. Normalisering
U_norm[d] = clamp(2.5 + U[d] × 0.4, 0, 5)

// 3. Dimensionsvægte
W[d] = min(|U[d]| / 5, 1.0)

// 4. Match-distance
distance(beer) = √( Σ W[d] × (U_norm[d] − beer[d])² )

// 5. Match-procent
max_dist = √( Σ W[d] × 25 )
match% = 100 × (1 − distance / max_dist)
```
