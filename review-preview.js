(() => {
  "use strict";

  const slider = document.querySelector("[data-review-draft-slider]");
  const drafts = window.AKL_REVIEW_DRAFTS || [];

  if (!slider || !drafts.length) return;

  const categoryLabel = {
    "research-derived": "Araştırma temelli taslak",
    "general-draft": "Genel taslak",
  };

  for (const draft of drafts) {
    const article = document.createElement("article");
    article.className = "review-draft-card";

    const label = document.createElement("strong");
    label.textContent = categoryLabel[draft.category] || "Yayınlanmayan taslak";

    const copy = document.createElement("p");
    copy.textContent = draft.copy;

    article.append(label, copy);
    slider.append(article);
  }

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
})();
