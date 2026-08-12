/**
 * Djirian i18n — Bilingual EN / ZH system
 * Uses data-en and data-zh attributes on elements
 */

const i18n = {
  currentLang: localStorage.getItem("djirian-lang") || "en",
  isDesktop: window.matchMedia("(min-width: 48rem)").matches,

  init() {
    this.applyLanguage(this.currentLang);
    this.updateButtons();

    // Reload responsive document assets only when crossing the mobile/desktop breakpoint.
    window.addEventListener("resize", () => {
      const nextIsDesktop = window.matchMedia("(min-width: 48rem)").matches;
      if (nextIsDesktop === this.isDesktop) return;
      this.isDesktop = nextIsDesktop;
      this.applyLanguage(this.currentLang);
    });
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

    // Swap localized and responsive assets such as company profile pages.
    const viewport = this.isDesktop ? "desktop" : "mobile";
    document.querySelectorAll("[data-src-en], [data-src-zh]").forEach((el) => {
      const responsiveSource = el.getAttribute(`data-src-${viewport}-${lang}`);
      const fallbackSource = el.getAttribute(`data-src-${lang}`);
      const source = responsiveSource || fallbackSource;

      if (source && el.getAttribute("src") !== source) {
        el.setAttribute("src", source);
      }
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
