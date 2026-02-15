// ============================================================
// Beer-Mate: App — Quiz-flow og UI-logik
// ============================================================

(function () {
  // State
  let currentQuestion = 0;
  const userAnswers = [];

  // DOM-elementer
  const screens = {
    intro: document.getElementById("intro"),
    quiz: document.getElementById("quiz"),
    loading: document.getElementById("loading"),
    results: document.getElementById("results")
  };

  const els = {
    startBtn: document.getElementById("start-btn"),
    restartBtn: document.getElementById("restart-btn"),
    progressFill: document.getElementById("progress-fill"),
    progressText: document.getElementById("progress-text"),
    questionText: document.getElementById("question-text"),
    questionSubtitle: document.getElementById("question-subtitle"),
    answersContainer: document.getElementById("answers"),
    tasteDesc: document.getElementById("taste-description"),
    categoryRecs: document.getElementById("category-recs"),
    beerRecs: document.getElementById("beer-recs")
  };

  // -------------------------------------------------
  // Skærm-navigation
  // -------------------------------------------------

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  // -------------------------------------------------
  // Quiz-flow
  // -------------------------------------------------

  function startQuiz() {
    currentQuestion = 0;
    userAnswers.length = 0;
    showScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTIONS[currentQuestion];

    // Progress
    const progress = ((currentQuestion) / QUESTIONS.length) * 100;
    els.progressFill.style.width = progress + "%";
    els.progressText.textContent = `${currentQuestion + 1} / ${QUESTIONS.length}`;

    // Spørgsmål
    els.questionText.textContent = q.question;
    els.questionSubtitle.textContent = q.subtitle;

    // Svar-kort
    els.answersContainer.innerHTML = "";
    q.answers.forEach((answer, i) => {
      const card = document.createElement("button");
      card.className = "answer-card";
      card.textContent = answer.text;
      card.addEventListener("click", () => selectAnswer(i));
      els.answersContainer.appendChild(card);
    });

    // Fade-in animation
    els.answersContainer.classList.remove("fade-in");
    void els.answersContainer.offsetWidth; // Force reflow
    els.answersContainer.classList.add("fade-in");
  }

  function selectAnswer(index) {
    const q = QUESTIONS[currentQuestion];
    userAnswers.push(q.answers[index]);

    // Highlight valgte kort kort
    const cards = els.answersContainer.querySelectorAll(".answer-card");
    cards[index].classList.add("selected");

    // Deaktivér alle kort
    cards.forEach(c => c.style.pointerEvents = "none");

    // Gå videre efter kort delay
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < QUESTIONS.length) {
        renderQuestion();
      } else {
        showLoading();
      }
    }, 350);
  }

  // -------------------------------------------------
  // Loading → Resultater
  // -------------------------------------------------

  function showLoading() {
    showScreen("loading");

    // Simulér beregning (giver en bedre oplevelse end instant)
    setTimeout(() => {
      const results = getMatchResults(userAnswers);
      renderResults(results);
      showScreen("results");
    }, 1500);
  }

  // -------------------------------------------------
  // Resultat-rendering
  // -------------------------------------------------

  function renderResults(results) {
    // Smagsbeskrivelse
    els.tasteDesc.textContent = `"${results.tasteDescription}"`;

    // Kategori-anbefalinger
    els.categoryRecs.innerHTML = "";
    results.topCategories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `
        <div class="cat-name">🍺 ${cat.label}</div>
        <div class="cat-desc">${cat.desc}</div>
      `;
      els.categoryRecs.appendChild(card);
    });

    // Top øl (maks 8)
    els.beerRecs.innerHTML = "";
    const topBeers = results.matches.slice(0, 8);
    topBeers.forEach(beer => {
      const card = document.createElement("div");
      card.className = "beer-card";
      card.innerHTML = `
        <div class="beer-info">
          <div class="beer-name">${beer.name}</div>
          <div class="beer-style">${beer.style}</div>
          <div class="beer-abv">${beer.abv}%</div>
          <div class="beer-rating">★ ${beer.rating}</div>
        </div>
        <div class="beer-match">${beer.matchPct}%</div>
      `;
      els.beerRecs.appendChild(card);
    });
  }

  // -------------------------------------------------
  // Event listeners
  // -------------------------------------------------

  els.startBtn.addEventListener("click", startQuiz);
  els.restartBtn.addEventListener("click", () => {
    showScreen("intro");
  });
})();
