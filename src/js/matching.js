// ============================================================
// Beer-Mate: Matching-algoritme
// Vægtet euklidisk afstand mellem brugerprofil og øl-scores
// ============================================================

/**
 * Byg rå brugerprofil ved at summere scores fra alle quiz-svar.
 * @param {Object[]} answers - Array af valgte svar-objekter (med .scores)
 * @returns {Object} Rå score pr. dimension, fx { bitter: 3, sweet: -2, ... }
 */
function buildProfile(answers) {
  const profile = {};
  DIMENSIONS.forEach(d => profile[d] = 0);

  answers.forEach(answer => {
    DIMENSIONS.forEach(d => {
      profile[d] += answer.scores[d] || 0;
    });
  });

  return profile;
}

/**
 * Beregn gennemsnitlig score pr. dimension på tværs af alle øl i databasen.
 * Bruges som dynamisk center for normalisering.
 * @returns {Object} Gennemsnit pr. dimension
 */
function getBeerAverages() {
  const avg = {};
  DIMENSIONS.forEach(d => {
    const sum = BEERS.reduce((acc, beer) => acc + beer.scores[d], 0);
    avg[d] = sum / BEERS.length;
  });
  return avg;
}

/**
 * Normalisér rå profil til 0–5 skalaen (samme som øl-data).
 * Bruger dynamisk center baseret på databasens gennemsnit pr. dimension.
 * Formel: clamp(beerAvg[d] + raw × 0.4, 0, 5)
 * @param {Object} rawProfile
 * @returns {Object} Normaliseret profil
 */
function normalizeProfile(rawProfile) {
  const avg = getBeerAverages();
  const norm = {};
  DIMENSIONS.forEach(d => {
    norm[d] = Math.max(0, Math.min(5, avg[d] + rawProfile[d] * 0.4));
  });
  return norm;
}

/**
 * Beregn dimensionsvægte baseret på styrken af brugerens præferencer.
 * Stærkere præference (højere |rå score|) = højere vægt.
 * Formel: min(|raw| / 5, 1.0)
 * @param {Object} rawProfile
 * @returns {Object} Vægt pr. dimension (0.0 – 1.0)
 */
function calculateWeights(rawProfile) {
  const weights = {};
  DIMENSIONS.forEach(d => {
    weights[d] = Math.min(Math.abs(rawProfile[d]) / 5, 1.0);
  });
  return weights;
}

/**
 * Beregn vægtet euklidisk afstand mellem brugerprofil og en øl.
 * @param {Object} normProfile - Normaliseret brugerprofil (0–5)
 * @param {Object} weights - Dimensionsvægte (0–1)
 * @param {Object} beerScores - Øllens scores (0–5)
 * @returns {number} Afstand (lavere = bedre match)
 */
function weightedDistance(normProfile, weights, beerScores) {
  let sum = 0;
  DIMENSIONS.forEach(d => {
    const diff = normProfile[d] - beerScores[d];
    sum += weights[d] * diff * diff;
  });
  return Math.sqrt(sum);
}

/**
 * Beregn den maksimalt mulige afstand (worst case) for normalisering til procent.
 * @param {Object} weights
 * @returns {number}
 */
function maxPossibleDistance(weights) {
  let sumWeights = 0;
  DIMENSIONS.forEach(d => sumWeights += weights[d]);
  return Math.sqrt(sumWeights * 25); // Max diff per dimension = 5, squared = 25
}

/**
 * Kør fuld matching: returnér alle øl sorteret efter match%.
 * @param {Object[]} answers - Brugerens valgte svar (5 stk)
 * @returns {Object} { profile, matches, tasteDescription, topCategories }
 */
function getMatchResults(answers) {
  const rawProfile = buildProfile(answers);
  const normProfile = normalizeProfile(rawProfile);
  const weights = calculateWeights(rawProfile);
  const maxDist = maxPossibleDistance(weights);

  // Tjek for flad profil (sum af absolutte raw-scores)
  const rawSum = DIMENSIONS.reduce((acc, d) => acc + Math.abs(rawProfile[d]), 0);
  const isFlat = rawSum < 15;

  // Beregn match for hver øl
  const matches = BEERS.map(beer => {
    const dist = weightedDistance(normProfile, weights, beer.scores);
    const matchPct = isFlat ? 50 : Math.round(100 * (1 - dist / maxDist));

    return {
      ...beer,
      distance: dist,
      matchPct: Math.max(0, Math.min(100, matchPct))
    };
  });

  // Sortér efter match% (højest først)
  matches.sort((a, b) => b.matchPct - a.matchPct);

  // Generer smagsbeskrivelse
  const tasteDescription = generateTasteDescription(rawProfile, isFlat);

  // Find top-kategorier baseret på gennemsnits-match
  const topCategories = getTopCategories(matches);

  return {
    rawProfile,
    normProfile,
    weights,
    isFlat,
    matches,
    tasteDescription,
    topCategories
  };
}

/**
 * Generer en naturlig smagsbeskrivelse baseret på brugerens top-dimensioner.
 * @param {Object} rawProfile
 * @param {boolean} isFlat
 * @returns {string}
 */
function generateTasteDescription(rawProfile, isFlat) {
  if (isFlat) {
    return "Du er åben for det meste — her er et bredt udvalg at vælge imellem!";
  }

  // Sortér dimensioner efter absolut værdi
  const ranked = DIMENSIONS
    .map(d => ({ dim: d, val: rawProfile[d], abs: Math.abs(rawProfile[d]) }))
    .sort((a, b) => b.abs - a.abs)
    .filter(d => d.abs >= 2);

  // Tag top 3
  const top = ranked.slice(0, 3);

  const words = top.map(d => {
    const tw = TASTE_WORDS[d.dim];
    if (d.val > 0) return tw.pos;
    if (d.val < 0 && tw.neg) return tw.neg;
    return null;
  }).filter(Boolean);

  if (words.length === 0) {
    return "Du har en alsidig smag — her er vores bedste bud!";
  }

  if (words.length === 1) {
    return `Du er til ${words[0]} smagsoplevelser`;
  }

  const last = words.pop();
  return `Du er til ${words.join(", ")} og ${last} smagsoplevelser`;
}

/**
 * Find de 2–3 bedst matchende kategorier baseret på top-3 gennemsnit.
 * Bruger de 3 bedst matchende øl pr. kategori (eller alle, hvis færre end 3).
 * @param {Object[]} matches - Sorterede øl med matchPct
 * @returns {Object[]} Top kategorier med label, desc og avgMatch
 */
function getTopCategories(matches) {
  // Gruppér efter kategori
  const catMap = {};
  matches.forEach(m => {
    if (!catMap[m.category]) {
      catMap[m.category] = [];
    }
    catMap[m.category].push(m.matchPct);
  });

  const categories = Object.entries(catMap)
    .map(([cat, pcts]) => {
      // Sortér match-procenter faldende og tag top 3
      pcts.sort((a, b) => b - a);
      const topN = pcts.slice(0, 3);
      const avg = topN.reduce((a, b) => a + b, 0) / topN.length;

      return {
        category: cat,
        label: CATEGORY_META[cat]?.label || cat,
        desc: CATEGORY_META[cat]?.desc || "",
        avgMatch: Math.round(avg)
      };
    })
    .sort((a, b) => b.avgMatch - a.avgMatch);

  // Returnér top 3
  return categories.slice(0, 3);
}
