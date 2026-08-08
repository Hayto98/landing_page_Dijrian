import { partnerLogos, productList, partnerLogoBasePath } from "./data.js";

/* ================ 
    Nav
  =================== */
$(function () {
  // hide show nav
  $(".navbar").hidescroll();

  // mobile dropdown menu
  const toggleBtn = $("#toggle_btn");
  const dropdownMenu = $(".dropdown-menu");

  toggleBtn.click(() => {
    dropdownMenu.toggleClass("open");
  });

  // close mobile menu when clicking a link
  $(".dropdown-menu a").click(() => {
    dropdownMenu.removeClass("open");
  });
});

/* ================ 
    i18n Language Switcher
  =================== */
$(function () {
  // Initialize i18n
  window.djirian_i18n.init();

  // Language switch buttons
  $(".lang-btn").on("click", function () {
    const lang = $(this).data("lang");
    window.djirian_i18n.switchTo(lang);
  });
});

/* ================
    Products Tabs
  =================== */
$(function () {
  // add activeTab to first li
  $("li:first").addClass("activeTab");

  // change activeTab color
  $("li").on("click", function () {
    $("li").removeClass("activeTab");
    $('div[id="products-tabs"] ul .r-tabs-state-active').addClass("activeTab");
  });

  if ($("#products-tabs").length) {
    $("#products-tabs").responsiveTabs({
      animation: "slide",
    });
  }
});

/* ================ 
   Best Sellers / Production Carousel
  =================== */
$(function () {
  if ($(".slider").length) {
    $(".slider").slick({
      autoplay: true,
      dots: true,
    });
  }
});

/* ================ 
 Stats Counter
  =================== */
$(function () {
  if (typeof window.counterUp !== "undefined") {
    const counterUp = window.counterUp.default;

    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 2000,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };

    const IO = new IntersectionObserver(callback, { threshold: 1 });

    document
      .querySelectorAll(".counter")
      .forEach((node) => IO.observe(node));
  }
});

/* ================ 
  AOS Animation
  =================== */
$(function () {
  AOS.init();

  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 100,
    delay: 0,
    duration: 700,
    easing: "ease-in-out",
    once: false,
    mirror: true,
    anchorPlacement: "center-bottom",
  });
});
