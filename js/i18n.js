/**
 * Djirian i18n — Bilingual EN / ZH system
 * Uses data-en and data-zh attributes on elements
 */

const i18n = {
  currentLang: localStorage.getItem("djirian-lang") || "en",

  init() {
    this.applyLanguage(this.currentLang);
    this.updateButtons();
  },

  switchTo(lang) {
    this.currentLang = lang;
    localStorage.setItem("djirian-lang", lang);
    this.applyLanguage(lang);
    this.updateButtons();
  },

  applyLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        el.innerHTML = text;
      }
    });

    // Swap localized assets such as the company profile document pages.
    document.querySelectorAll(`[data-src-${lang}]`).forEach((el) => {
      el.src = el.getAttribute(`data-src-${lang}`);
    });

    // Update html lang attribute
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  },

  updateButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === this.currentLang);
    });
  },
};

// Export for use
window.djirian_i18n = i18n;
