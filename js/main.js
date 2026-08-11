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
   Hero Image Auto Slideshow (Every 3.0 Seconds with Hover Pause & Dot Click)
  =================== */
$(function () {
  const slides = $(".hero-slide");
  const dots = $(".slide-dot");
  const container = $(".hero-slideshow-container");

  if (slides.length > 0) {
    let currentIndex = 0;
    let isPaused = false;
    const intervalTime = 3000; // 3 seconds per user request

    function goToSlide(nextIndex) {
      if (nextIndex === currentIndex) return;

      // Hide current slide smoothly
      $(slides[currentIndex])
        .removeClass("opacity-100 scale-100")
        .addClass("opacity-0 scale-95");

      $(dots[currentIndex])
        .removeClass("bg-p-600 w-6")
        .addClass("bg-p-300 w-2.5");

      currentIndex = nextIndex;

      // Show next slide smoothly
      $(slides[currentIndex])
        .removeClass("opacity-0 scale-95")
        .addClass("opacity-100 scale-100");

      $(dots[currentIndex])
        .removeClass("bg-p-300 w-2.5")
        .addClass("bg-p-600 w-6");
    }

    // Auto slideshow timer (Runs continuously every 3s)
    setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }, intervalTime);

    // Dot click navigation
    dots.on("click", function () {
      const dotIndex = $(this).index();
      goToSlide(dotIndex);
    });
  }
});

/* ================ 
  AOS Animation
  =================== */
$(function () {
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
    once: true,
    mirror: false,
    anchorPlacement: "center-bottom",
  });
});

/* ================ 
   About Djirian Lightbox Gallery
  =================== */
$(function () {
  const lightbox = $("#about-lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxClose = $("#lightbox-close");
  const lightboxPrev = $("#lightbox-prev");
  const lightboxNext = $("#lightbox-next");
  const lightboxCaption = $("#lightbox-caption");
  const infoImages = $(".infographic-img");
  
  if (infoImages.length === 0 || lightbox.length === 0) return;
  
  let currentIndex = 0;
  
  function openLightbox(index) {
    if (index < 0) index = infoImages.length - 1;
    if (index >= infoImages.length) index = 0;
    
    currentIndex = index;
    
    const imgEl = $(infoImages[currentIndex]);
    const imgSrc = imgEl.attr("src");
    
    // Get language code
    const activeLang = window.djirian_i18n?.currentLang || document.documentElement.lang || "en";
    const captionText = activeLang === "zh" ? imgEl.attr("data-caption-zh") : imgEl.attr("data-caption-en");
    
    lightboxImg.attr("src", imgSrc);
    lightboxCaption.text(captionText || imgEl.attr("alt"));
    
    lightbox.removeClass("opacity-0 pointer-events-none");
    $("body").addClass("overflow-hidden"); // Disable page scrolling
  }
  
  function closeLightbox() {
    lightbox.addClass("opacity-0 pointer-events-none");
    $("body").removeClass("overflow-hidden");
  }
  
  // Click on image cards to open lightbox
  infoImages.on("click", function () {
    const index = infoImages.index(this);
    openLightbox(index);
  });
  
  lightboxClose.on("click", closeLightbox);
  
  // Close lightbox on click outside the image
  lightbox.on("click", function (e) {
    if ($(e.target).is(lightbox) || $(e.target).closest(".select-none").length === 0) {
      if (!$(e.target).is("#lightbox-img") && !$(e.target).is("#lightbox-prev") && !$(e.target).is("#lightbox-next") && !$(e.target).is("#lightbox-caption")) {
        closeLightbox();
      }
    }
  });
  
  lightboxPrev.on("click", function (e) {
    e.stopPropagation();
    openLightbox(currentIndex - 1);
  });
  
  lightboxNext.on("click", function (e) {
    e.stopPropagation();
    openLightbox(currentIndex + 1);
  });
  
  // Keyboard navigation for lightbox
  $(document).on("keydown", function (e) {
    if (lightbox.hasClass("opacity-0")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      lightboxPrev.trigger("click");
    } else if (e.key === "ArrowRight") {
      lightboxNext.trigger("click");
    }
  });
});

