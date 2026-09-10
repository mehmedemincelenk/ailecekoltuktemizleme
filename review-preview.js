(() => {
  "use strict";

  const slider = document.querySelector("[data-review-draft-slider]");
  const count = document.querySelector("[data-review-count]");
  const drafts = window.AKL_REVIEW_DRAFTS || [];

  if (!slider || !drafts.length) return;

  const categoryLabel = {
    "research-derived": "Araştırma temelli taslak",
    "general-draft": "Genel taslak",
  };

  drafts.forEach((draft, index) => {
    const article = document.createElement("article");
    article.className = "review-draft-card";

    const label = document.createElement("strong");
    label.textContent = `${index + 1} / ${drafts.length} · ${categoryLabel[draft.category] || "Yayınlanmayan taslak"}`;

    const copy = document.createElement("p");
    copy.textContent = draft.copy;

    article.append(label, copy);
    slider.append(article);
  });

  const updateCount = () => {
    if (!count) return;
    const cards = [...slider.querySelectorAll(".review-draft-card")];
    const sliderLeft = slider.getBoundingClientRect().left;
    const currentIndex = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - sliderLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
    count.textContent = `${currentIndex + 1} / ${drafts.length}`;
  };

  const moveByCard = (direction) => {
    const card = slider.querySelector(".review-draft-card");
    if (!card) return;

    const gap = Number.parseFloat(getComputedStyle(slider).getPropertyValue("gap")) || 0;
    slider.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  document.querySelector("[data-review-prev]")?.addEventListener("click", () => moveByCard(-1));
  document.querySelector("[data-review-next]")?.addEventListener("click", () => moveByCard(1));
  slider.addEventListener("scroll", updateCount, { passive: true });
  updateCount();
})();
