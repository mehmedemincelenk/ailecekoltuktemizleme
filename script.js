(() => {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  const analyticsConfig = window.AKL_ANALYTICS || {};
  const validGtmId = /^GTM-[A-Z0-9]+$/.test(analyticsConfig.gtmId || "");
  const validGa4Id = /^G-[A-Z0-9]+$/.test(analyticsConfig.ga4MeasurementId || "");
  const hasAnalytics = validGtmId || validGa4Id;
  const consentKey = "akl_analytics_consent";
  let analyticsLoaded = false;

  const readConsent = () => {
    try {
      return window.localStorage.getItem(consentKey);
    } catch {
      return null;
    }
  };

  const saveConsent = (value) => {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch {
      // The preference remains valid for the current page when storage is unavailable.
    }
  };

  const loadAnalytics = () => {
    if (analyticsLoaded || !hasAnalytics) return;
    analyticsLoaded = true;

    const script = document.createElement("script");
    script.async = true;

    if (validGtmId) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(analyticsConfig.gtmId)}`;
    } else {
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsConfig.ga4MeasurementId)}`;
      window.gtag("js", new Date());
      window.gtag("config", analyticsConfig.ga4MeasurementId);
    }

    document.head.append(script);
  };

  const updateAnalyticsConsent = (granted) => {
    window.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
    });

    window.dataLayer.push({
      event: "consent_update",
      analytics_consent: granted ? "granted" : "denied",
    });

    if (granted) loadAnalytics();
  };

  const consentBanner = document.querySelector("[data-consent-banner]");
  const consentAccept = document.querySelector("[data-consent-accept]");
  const consentReject = document.querySelector("[data-consent-reject]");
  const cookieSettings = document.querySelector("[data-cookie-settings]");

  if (hasAnalytics) {
    if (cookieSettings) cookieSettings.hidden = false;

    const savedConsent = readConsent();

    if (savedConsent === "granted") {
      updateAnalyticsConsent(true);
    } else if (savedConsent === "denied") {
      updateAnalyticsConsent(false);
    } else if (consentBanner) {
      consentBanner.hidden = false;
    }

    const chooseConsent = (granted) => {
      saveConsent(granted ? "granted" : "denied");
      updateAnalyticsConsent(granted);
      if (consentBanner) consentBanner.hidden = true;
    };

    consentAccept?.addEventListener("click", () => chooseConsent(true));
    consentReject?.addEventListener("click", () => chooseConsent(false));
    cookieSettings?.addEventListener("click", () => {
      if (consentBanner) consentBanner.hidden = false;
    });
  }

  const whatsappLinks = document.querySelectorAll("[data-whatsapp-cta]");

  for (const link of whatsappLinks) {
    link.addEventListener("click", () => {
      window.dataLayer.push({
        event: "whatsapp_click",
        cta_placement: link.dataset.ctaPlacement,
        link_url: link.href,
      });
    });
  }

  const phoneLinks = document.querySelectorAll("[data-phone-cta]");

  for (const link of phoneLinks) {
    link.addEventListener("click", () => {
      window.dataLayer.push({
        event: "phone_click",
        cta_placement: link.dataset.ctaPlacement,
        link_url: link.href,
      });
    });
  }

  const customerReviewSection = document.querySelector("[data-customer-reviews]");
  const customerReviewSlider = document.querySelector("[data-customer-review-slider]");
  const reviewPreviewMode = window.location.protocol === "file:"
    || new URLSearchParams(window.location.search).get("preview-reviews") === "1";
  const visibleReviews = (window.AKL_REVIEW_DRAFTS || []).filter(
    (review) => review.verified === true || reviewPreviewMode,
  );

  if (customerReviewSection && customerReviewSlider && visibleReviews.length) {
    for (const review of visibleReviews) {
      const article = document.createElement("article");
      article.className = "customer-review-card";

      const quoteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      quoteIcon.setAttribute("viewBox", "0 0 24 24");
      quoteIcon.setAttribute("aria-hidden", "true");
      quoteIcon.innerHTML = '<path d="M9.5 7.5H5.8A2.8 2.8 0 0 0 3 10.3v1.2a3 3 0 0 0 3 3h2.5v2H6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M21 7.5h-3.7a2.8 2.8 0 0 0-2.8 2.8v1.2a3 3 0 0 0 3 3H20v2h-2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

      const copy = document.createElement("p");
      copy.textContent = review.copy;

      article.append(quoteIcon, copy);
      customerReviewSlider.append(article);
    }

    const reviewReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reviewAutoplayInterval;

    const moveReviewsByCard = () => {
      const card = customerReviewSlider.querySelector(".customer-review-card");
      if (!card) return;

      const gap = Number.parseFloat(getComputedStyle(customerReviewSlider).getPropertyValue("gap")) || 0;
      const isAtEnd = customerReviewSlider.scrollLeft + customerReviewSlider.clientWidth
        >= customerReviewSlider.scrollWidth - 4;

      if (isAtEnd) {
        customerReviewSlider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        customerReviewSlider.scrollBy({
          left: card.getBoundingClientRect().width + gap,
          behavior: "smooth",
        });
      }
    };

    const stopReviewAutoplay = () => {
      window.clearInterval(reviewAutoplayInterval);
    };

    const startReviewAutoplay = () => {
      stopReviewAutoplay();
      if (reviewReducedMotion.matches || document.hidden) return;
      reviewAutoplayInterval = window.setInterval(moveReviewsByCard, 3000);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopReviewAutoplay();
      else startReviewAutoplay();
    });

    if (reviewPreviewMode) {
      customerReviewSection.dataset.preview = "true";
    }

    customerReviewSection.hidden = false;
    startReviewAutoplay();
  }

  const floatingCta = document.querySelector(".mobile-cta");
  const inlineCtas = [
    document.querySelector('[data-cta-placement="hero"]'),
    document.querySelector('[data-cta-placement="final_cta"]'),
  ].filter(Boolean);

  if (floatingCta && inlineCtas.length && "IntersectionObserver" in window) {
    const visibility = new Map(inlineCtas.map((cta) => [cta, false]));

    const updateFloatingCta = () => {
      const shouldHide = [...visibility.values()].some(Boolean);
      floatingCta.classList.toggle("is-hidden", shouldHide);
      floatingCta.toggleAttribute("inert", shouldHide);
      floatingCta.setAttribute("aria-hidden", String(shouldHide));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.isIntersecting);
        }

        updateFloatingCta();
      },
      { threshold: 0 },
    );

    for (const cta of inlineCtas) {
      observer.observe(cta);
    }
  }

  const faqCarousel = document.querySelector("[data-faq-carousel]");

  if (faqCarousel) {
    const cards = [...faqCarousel.querySelectorAll(".faq-card")];
    const stage = faqCarousel.querySelector("[data-faq-stage]");
    const previousButton = faqCarousel.querySelector("[data-faq-prev]");
    const nextButton = faqCarousel.querySelector("[data-faq-next]");
    const liveRegion = faqCarousel.querySelector("[data-faq-live]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let resumeTimeout;
    let autoplayInterval;

    const updateStageHeight = () => {
      if (stage && cards.length) {
        cards.forEach((card) => {
          card.style.height = "";
        });

        const tallestCard = Math.max(...cards.map((card) => card.offsetHeight));

        cards.forEach((card) => {
          card.style.height = `${tallestCard}px`;
        });
        stage.style.height = `${tallestCard + 20}px`;
      }
    };

    const showCard = (nextIndex, announce = false) => {
      currentIndex = (nextIndex + cards.length) % cards.length;

      cards.forEach((card, index) => {
        const offset = (index - currentIndex + cards.length) % cards.length;
        const state = offset === 0 ? "active" : offset === 1 ? "next" : offset === 2 ? "after" : "hidden";
        card.dataset.state = state;
        card.setAttribute("aria-hidden", String(state !== "active"));
      });

      if (announce) {
        liveRegion.textContent = `${currentIndex + 1}. soru gösteriliyor: ${cards[currentIndex].querySelector("h3").textContent}`;
      }

      updateStageHeight();
    };

    const stopAutoplay = () => {
      window.clearTimeout(resumeTimeout);
      window.clearInterval(autoplayInterval);
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (reducedMotion.matches || document.hidden) return;

      autoplayInterval = window.setInterval(() => {
        showCard(currentIndex + 1);
      }, 3000);
    };

    const pauseForInteraction = () => {
      stopAutoplay();

      if (!reducedMotion.matches && !document.hidden) {
        resumeTimeout = window.setTimeout(startAutoplay, 15000);
      }
    };

    const moveManually = (direction) => {
      showCard(currentIndex + direction, true);
      pauseForInteraction();
    };

    previousButton.addEventListener("click", () => moveManually(-1));
    nextButton.addEventListener("click", () => moveManually(1));
    stage.addEventListener("click", pauseForInteraction);

    let pointerStartX = null;

    stage.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerStartX = event.clientX;
      pauseForInteraction();
    });

    stage.addEventListener("pointerup", (event) => {
      if (pointerStartX === null) return;

      const distance = event.clientX - pointerStartX;
      pointerStartX = null;

      if (Math.abs(distance) >= 45) {
        moveManually(distance < 0 ? 1 : -1);
      } else {
        pauseForInteraction();
      }
    });

    stage.addEventListener("pointercancel", () => {
      pointerStartX = null;
      pauseForInteraction();
    });
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
    window.addEventListener("resize", updateStageHeight);

    faqCarousel.classList.add("is-enhanced");
    showCard(0);
    startAutoplay();
  }
})();
