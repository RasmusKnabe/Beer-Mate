// ============================================================
// Beer-Mate: Data — Øl-database + Quiz-spørgsmål med scoring
// ============================================================

const DIMENSIONS = [
  'bitter', 'sweet', 'sour', 'body', 'fruity',
  'roasted', 'spicy', 'smoky', 'dryness', 'complexity'
];

// -------------------------------------------------
// Øl-database (fra Taphouse udvalg, scoret 0–5)
// -------------------------------------------------

const BEERS = [
  { name: "Big Hug", style: "Brown Ale", category: "Other", abv: 5.3, scores: { bitter: 2, sweet: 2, sour: 1, body: 3, fruity: 2, roasted: 1, spicy: 1, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Folk", style: "English Pale Ale", category: "Other", abv: 4.2, scores: { bitter: 2, sweet: 2, sour: 1, body: 2, fruity: 2, roasted: 1, spicy: 1, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Wild Raven", style: "Black IPA", category: "IPA", abv: 6.6, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 3, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Frankly Speaking", style: "Smoked", category: "Smoked", abv: 5.4, scores: { bitter: 2, sweet: 2, sour: 0, body: 3, fruity: 1, roasted: 3, spicy: 1, smoky: 5, dryness: 3, complexity: 3 } },
  { name: "Reimagined Dream Line Forms One", style: "Alcohol-Free IPA", category: "IPA", abv: 0.3, scores: { bitter: 5, sweet: 2, sour: 1, body: 2, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Condensed", style: "Gose w/ Lime & Vanilla", category: "Sour", abv: 4.5, scores: { bitter: 1, sweet: 2, sour: 5, body: 1, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Aspall Draught Cyder", style: "Cider", category: "Cider", abv: 4.5, scores: { bitter: 0, sweet: 3, sour: 3, body: 0, fruity: 5, roasted: 0, spicy: 0, smoky: 0, dryness: 3, complexity: 2 } },
  { name: "Cooneys Irish Cider", style: "Cider", category: "Cider", abv: 4.5, scores: { bitter: 0, sweet: 3, sour: 3, body: 0, fruity: 5, roasted: 0, spicy: 0, smoky: 0, dryness: 3, complexity: 2 } },
  { name: "Lunch Club", style: "Session IPA", category: "IPA", abv: 4.7, scores: { bitter: 4, sweet: 2, sour: 1, body: 2, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 2 } },
  { name: "Serenidad", style: "Session IPA", category: "IPA", abv: 4.7, scores: { bitter: 4, sweet: 2, sour: 1, body: 2, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 2 } },
  { name: "Wildflower IPA", style: "IPA", category: "IPA", abv: 5.9, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Freestyler", style: "New Zealand IPA", category: "IPA", abv: 6.5, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Green Room", style: "West Coast IPA", category: "IPA", abv: 6.0, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "First Place Doodle", style: "New England IPA", category: "IPA", abv: 6.2, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Pistero", style: "New England IPA", category: "IPA", abv: 7.0, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Buxton Axe Edge", style: "New England IPA", category: "IPA", abv: 6.8, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Who Knew?", style: "New England IPA", category: "IPA", abv: 6.6, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Drip Mode", style: "Double New England IPA", category: "IPA", abv: 8.3, scores: { bitter: 5, sweet: 3, sour: 1, body: 5, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 5 } },
  { name: "Local Drops", style: "New England IPA", category: "IPA", abv: 7.2, scores: { bitter: 5, sweet: 2, sour: 1, body: 3, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 3 } },
  { name: "Illegal Cargo", style: "Double New England IPA", category: "IPA", abv: 7.9, scores: { bitter: 5, sweet: 3, sour: 1, body: 4, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 4 } },
  { name: "Chin Music", style: "Double New England IPA", category: "IPA", abv: 8.4, scores: { bitter: 5, sweet: 3, sour: 1, body: 5, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 5 } },
  { name: "Super Fuzz", style: "Double New England IPA", category: "IPA", abv: 8.0, scores: { bitter: 5, sweet: 3, sour: 1, body: 5, fruity: 4, roasted: 1, spicy: 1, smoky: 0, dryness: 3, complexity: 5 } },
  { name: "Vinohradská 11", style: "Czech Pilsner", category: "Lager", abv: 4.5, scores: { bitter: 2, sweet: 1, sour: 0, body: 1, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Pils / Tannen Zäpfle", style: "Pilsner", category: "Lager", abv: 5.1, scores: { bitter: 2, sweet: 1, sour: 0, body: 2, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Taphouse Strålende Pils", style: "Pilsner", category: "Lager", abv: 5.3, scores: { bitter: 2, sweet: 1, sour: 0, body: 2, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Uno Pils", style: "Pale Lager", category: "Lager", abv: 4.5, scores: { bitter: 2, sweet: 1, sour: 0, body: 1, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Gamma Organic Classic", style: "Vienna", category: "Lager", abv: 4.6, scores: { bitter: 2, sweet: 1, sour: 0, body: 2, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Bad Seed Classic", style: "Vienna", category: "Lager", abv: 5.0, scores: { bitter: 2, sweet: 1, sour: 0, body: 2, fruity: 1, roasted: 0, spicy: 0, smoky: 0, dryness: 4, complexity: 1 } },
  { name: "Wheat Caroline", style: "German Hefeweizen", category: "Wheat", abv: 5.4, scores: { bitter: 1, sweet: 2, sour: 1, body: 3, fruity: 3, roasted: 0, spicy: 2, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Blanche de Namur", style: "Witbier", category: "Wheat", abv: 4.5, scores: { bitter: 1, sweet: 2, sour: 1, body: 2, fruity: 3, roasted: 0, spicy: 2, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Hefeweizen / Weizenzäpfle", style: "German Hefeweizen", category: "Wheat", abv: 5.4, scores: { bitter: 1, sweet: 2, sour: 1, body: 3, fruity: 3, roasted: 0, spicy: 2, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Lobotomy", style: "Witbier", category: "Wheat", abv: 4.7, scores: { bitter: 1, sweet: 2, sour: 1, body: 3, fruity: 3, roasted: 0, spicy: 2, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Ayinger Ur-Weisse", style: "Dunkelweizen", category: "Wheat", abv: 5.8, scores: { bitter: 1, sweet: 2, sour: 1, body: 3, fruity: 3, roasted: 0, spicy: 2, smoky: 0, dryness: 2, complexity: 2 } },
  { name: "Saison Dupont Cuvée Dry Hopping", style: "Saison", category: "Belgian", abv: 6.5, scores: { bitter: 2, sweet: 3, sour: 1, body: 4, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 4 } },
  { name: "Stolen Red Berries", style: "Berliner Weisse", category: "Sour", abv: 4.5, scores: { bitter: 1, sweet: 2, sour: 5, body: 1, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Tableau", style: "Wild Ale", category: "Sour", abv: 4.5, scores: { bitter: 1, sweet: 2, sour: 5, body: 1, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "3 Fonteinen Oude Lambik", style: "Lambic Style", category: "Sour", abv: 6.7, scores: { bitter: 1, sweet: 2, sour: 5, body: 2, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Duchesse De Bourgogne", style: "Sour Red/Brown", category: "Sour", abv: 6.2, scores: { bitter: 1, sweet: 2, sour: 5, body: 2, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Audacia Oak Juice", style: "Oak Aged Wild Ale", category: "Sour", abv: 6.5, scores: { bitter: 1, sweet: 2, sour: 5, body: 2, fruity: 4, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Mellow", style: "Fruit Sour", category: "Sour", abv: 5.1, scores: { bitter: 1, sweet: 2, sour: 5, body: 2, fruity: 5, roasted: 0, spicy: 1, smoky: 0, dryness: 4, complexity: 3 } },
  { name: "Big Bang Barley Wine — Vintage 2025", style: "Barley Wine", category: "Strong Ale", abv: 9.3, scores: { bitter: 2, sweet: 4, sour: 0, body: 5, fruity: 2, roasted: 3, spicy: 2, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Big Bang Barley Wine 2024", style: "Barley Wine", category: "Strong Ale", abv: 9.3, scores: { bitter: 2, sweet: 4, sour: 0, body: 5, fruity: 2, roasted: 3, spicy: 2, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Counter Stout", style: "Dry Stout", category: "Stout/Porter", abv: 4.2, scores: { bitter: 3, sweet: 3, sour: 0, body: 4, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 4 } },
  { name: "Gamma Nitro Stout", style: "Dry Stout (Nitro)", category: "Stout/Porter", abv: 4.2, scores: { bitter: 3, sweet: 3, sour: 0, body: 4, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 4 } },
  { name: "Good Morning, Vietnam", style: "Sweet Stout", category: "Stout/Porter", abv: 8.3, scores: { bitter: 3, sweet: 3, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Ports of Call", style: "Baltic Porter", category: "Stout/Porter", abv: 7.9, scores: { bitter: 3, sweet: 3, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Northern Monk Pilgrim", style: "Imperial Stout", category: "Stout/Porter", abv: 10.0, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Noa Pecan Mud Cake", style: "Imperial Stout", category: "Stout/Porter", abv: 11.0, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Põhjala Chocolate Porter", style: "Imperial Chocolate Porter", category: "Stout/Porter", abv: 10.0, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Okiść", style: "Baltic Porter", category: "Stout/Porter", abv: 9.0, scores: { bitter: 3, sweet: 3, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Patience (2025)", style: "Imp. Stout Bourbon BA", category: "Stout/Porter", abv: 12.0, scores: { bitter: 3, sweet: 4, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Northern Decadence", style: "BA Imperial Stout", category: "Stout/Porter", abv: 14.5, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Black Hawk", style: "Baltic Porter", category: "Stout/Porter", abv: 8.5, scores: { bitter: 3, sweet: 3, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Speedway Stout", style: "Imperial Stout", category: "Stout/Porter", abv: 12.0, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Mashish", style: "Imperial Pastry Stout", category: "Stout/Porter", abv: 13.0, scores: { bitter: 3, sweet: 5, sour: 0, body: 5, fruity: 1, roasted: 5, spicy: 1, smoky: 0, dryness: 1, complexity: 5 } },
  { name: "Duvel 6,66%", style: "Belgian Blonde Ale", category: "Belgian", abv: 6.66, scores: { bitter: 2, sweet: 3, sour: 1, body: 4, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 4 } },
  { name: "St. Bernardus Prior 8", style: "Abbey Dubbel", category: "Belgian", abv: 8.0, scores: { bitter: 2, sweet: 3, sour: 1, body: 5, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 5 } },
  { name: "Westmalle Dubbel", style: "Abbey Dubbel", category: "Belgian", abv: 7.0, scores: { bitter: 2, sweet: 3, sour: 1, body: 4, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 4 } },
  { name: "Straffe Hendrik Tripel", style: "Abbey Tripel", category: "Belgian", abv: 9.0, scores: { bitter: 2, sweet: 3, sour: 1, body: 5, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 5 } },
  { name: "Nostalgie 80s: Belgian Quadruple", style: "Belgian Quadrupel", category: "Belgian", abv: 9.3, scores: { bitter: 2, sweet: 3, sour: 1, body: 5, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 5 } },
  { name: "Straffe Hendrik Quadrupel", style: "Belgian Quadrupel", category: "Belgian", abv: 11.0, scores: { bitter: 2, sweet: 4, sour: 1, body: 5, fruity: 3, roasted: 2, spicy: 4, smoky: 0, dryness: 2, complexity: 5 } }
];

// -------------------------------------------------
// Quiz-spørgsmål med scoring pr. svarmulighed
// -------------------------------------------------

const QUESTIONS = [
  {
    id: 1,
    question: "Hvad tager du med i sofaen til en god film?",
    subtitle: "Vælg det der frister mest",
    answers: [
      {
        text: "🍋 Syrlige vingummier",
        scores: { sour: 3, body: -1, fruity: 1, dryness: 1 }
      },
      {
        text: "🍓 Søde og frugtige vingummier",
        scores: { bitter: -1, sweet: 2, fruity: 3 }
      },
      {
        text: "🍫 Chokolade",
        scores: { sweet: 1, sour: -1, body: 2, roasted: 3 }
      },
      {
        text: "🖤 Lakrids",
        scores: { bitter: 3, fruity: -1, roasted: 2, dryness: 1 }
      },
      {
        text: "🌰 Marcipan",
        scores: { sweet: 3, body: 1, dryness: -1 }
      },
      {
        text: "🍬 Bland-selv",
        scores: { fruity: 1, spicy: 1, complexity: 3 }
      }
    ]
  },
  {
    id: 2,
    question: "Hvordan vil du have din kaffe?",
    subtitle: "Vælg det der passer bedst",
    answers: [
      {
        text: "☕ Sort og stærk",
        scores: { bitter: 3, sweet: -1, body: 1, roasted: 2, dryness: 1 }
      },
      {
        text: "🥛 Med mælk",
        scores: { bitter: -1, sweet: 1, body: 3, dryness: -1 }
      },
      {
        text: "🍯 Med sirup eller sukker",
        scores: { sweet: 3, fruity: 1, dryness: -1 }
      },
      {
        text: "🚫 Jeg drikker ikke kaffe",
        scores: { bitter: -1, sweet: 1, fruity: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "Hvornår drikker du oftest en øl?",
    subtitle: "Vælg den situation du kender bedst",
    answers: [
      {
        text: "☀️ En varm eftermiddag",
        scores: { sour: 1, body: -1, dryness: 3 }
      },
      {
        text: "🍽️ Til mad",
        scores: { body: 2, spicy: 1, dryness: -1, complexity: 3 }
      },
      {
        text: "🛋️ Om aftenen i sofaen",
        scores: { sweet: 1, body: 3, roasted: 2, dryness: -1 }
      },
      {
        text: "🎉 Til fest",
        scores: { sweet: 1, body: -1, fruity: 3, dryness: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "Hvor eventyrlysten er du med smag?",
    subtitle: "Vær ærlig — der er ingen forkerte svar",
    answers: [
      {
        text: "🏠 Jeg vil have noget jeg kender",
        scores: { sweet: 1, spicy: -1, dryness: 2, complexity: -2 }
      },
      {
        text: "🌀 Jeg kan lide lidt twist",
        scores: { sour: 1, fruity: 1, complexity: 2 }
      },
      {
        text: "🎁 Overrask mig",
        scores: { sour: 1, spicy: 2, dryness: -1, complexity: 3 }
      },
      {
        text: "🚀 Giv mig noget helt skørt",
        scores: { sour: 1, spicy: 1, smoky: 2, dryness: -1, complexity: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "Hvad irriterer dig mest i en drink?",
    subtitle: "Vælg din største dealbreaker",
    answers: [
      {
        text: "😣 For bitter",
        scores: { bitter: -3, roasted: -1 }
      },
      {
        text: "🍭 For sød",
        scores: { sweet: -3, fruity: -1 }
      },
      {
        text: "🧱 For tung",
        scores: { body: -3, roasted: -1 }
      },
      {
        text: "👽 For mærkelig",
        scores: { spicy: -1, smoky: -1, complexity: -3 }
      }
    ]
  }
];

// -------------------------------------------------
// Kategori-metadata til resultatvisning
// -------------------------------------------------

const CATEGORY_META = {
  "IPA":          { label: "IPA",              desc: "Humlerige øl med frugtighed og bitterhed" },
  "Stout/Porter": { label: "Stout & Porter",   desc: "Mørke, ristede øl med dybde" },
  "Lager":        { label: "Lager & Pilsner",  desc: "Lette, tørre og forfriskende" },
  "Sour":         { label: "Sour",             desc: "Syrlige og friske med kompleksitet" },
  "Wheat":        { label: "Hvedeøl",          desc: "Bløde, frugtige og let krydrede" },
  "Belgian":      { label: "Belgisk",          desc: "Komplekse, krydrede og karakterfulde" },
  "Cider":        { label: "Cider",            desc: "Frugtige, friske og lette" },
  "Strong Ale":   { label: "Strong Ale",       desc: "Intense, søde og kraftfulde" },
  "Smoked":       { label: "Røget",            desc: "Røgede og intense smagsoplevelser" },
  "Other":        { label: "Andre stilarter",  desc: "Unikke øl med egen karakter" }
};

// -------------------------------------------------
// Smagsbeskrivelser til profilgenerering
// -------------------------------------------------

const TASTE_WORDS = {
  bitter:     { pos: "markante",              neg: "bløde" },
  sweet:      { pos: "runde og bløde",        neg: "tørre" },
  sour:       { pos: "friske og syrlige",     neg: null },
  body:       { pos: "fyldige",               neg: "lette" },
  fruity:     { pos: "frugtige",              neg: null },
  roasted:    { pos: "mørke",                 neg: null },
  spicy:      { pos: "krydrede",              neg: null },
  smoky:      { pos: "røgede",                neg: null },
  dryness:    { pos: "tørre og rene",         neg: "runde" },
  complexity: { pos: "komplekse",             neg: "enkle og rene" }
};
