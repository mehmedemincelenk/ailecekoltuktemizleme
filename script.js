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
    if (savedConsent === "granted") updateAnalyticsConsent(true);
    else if (savedConsent === "denied") updateAnalyticsConsent(false);
    else if (consentBanner) consentBanner.hidden = false;

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

  for (const link of document.querySelectorAll("[data-whatsapp-cta]")) {
    link.addEventListener("click", () => {
      window.dataLayer.push({
        event: "whatsapp_click",
        cta_placement: link.dataset.ctaPlacement,
        link_url: link.href,
      });
    });
  }

  for (const link of document.querySelectorAll("[data-phone-cta]")) {
    link.addEventListener("click", () => {
      window.dataLayer.push({
        event: "phone_click",
        cta_placement: link.dataset.ctaPlacement,
        link_url: link.href,
      });
    });
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

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visibility.set(entry.target, entry.isIntersecting);
      updateFloatingCta();
    }, { threshold: 0 });

    for (const cta of inlineCtas) observer.observe(cta);
  }

  const heroGallery = document.querySelector("[data-hero-gallery]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroGallery && !reducedMotion) {
    let intervalId;
    let resumeId;

    const stop = () => window.clearInterval(intervalId);
    const advance = () => {
      const card = heroGallery.querySelector("figure");
      if (!card) return;
      const gap = Number.parseFloat(getComputedStyle(heroGallery).gap) || 0;
      const maxPosition = heroGallery.scrollWidth - heroGallery.clientWidth;
      const nextPosition = heroGallery.scrollLeft + card.offsetWidth + gap;

      if (nextPosition >= maxPosition - 2) {
        heroGallery.scrollTo({ left: 0, behavior: "auto" });
        return;
      }

      heroGallery.scrollTo({ left: nextPosition, behavior: "smooth" });
    };
    const start = () => {
      stop();
      intervalId = window.setInterval(advance, 4200);
    };
    const pauseTemporarily = () => {
      stop();
      window.clearTimeout(resumeId);
      resumeId = window.setTimeout(start, 10000);
    };

    heroGallery.addEventListener("pointerdown", pauseTemporarily, { passive: true });
    heroGallery.addEventListener("focusin", pauseTemporarily);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
    start();
  }
})();
