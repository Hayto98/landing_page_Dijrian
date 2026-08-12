import { partnerLogos, productList, partnerLogoBasePath } from "./data.js";

/* ================ 
    Nav
  =================== */
$(function () {
  // hide show nav
  if ($.fn.hidescroll) {
    $(".navbar").hidescroll();
  }

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

  // Force autoplay for mobile browsers (iOS Safari / Android Low Power Mode)
  const heroVid = document.getElementById("hero_video");
  if (heroVid) {
    heroVid.muted = true;
    heroVid.play().catch(() => {
      document.addEventListener("touchstart", () => heroVid.play(), { once: true });
      document.addEventListener("click", () => heroVid.play(), { once: true });
    });
  }
});

/* ================ 
    i18n Language Switcher
  =================== */
$(function () {
  if (window.djirian_i18n) {
    // Initialize i18n
    window.djirian_i18n.init();

    // Language switch buttons
    $(".lang-btn").on("click", function () {
      const lang = $(this).data("lang");
      window.djirian_i18n.switchTo(lang);
    });
  }
});

/* ================
    Products Tabs
  =================== */
$(function () {
  if ($("#products-tabs").length) {
    $("li:first", "#products-tabs").addClass("activeTab");

    $("#products-tabs li").on("click", function () {
      $("#products-tabs li").removeClass("activeTab");
      $('div[id="products-tabs"] ul .r-tabs-state-active').addClass("activeTab");
    });

    if ($.fn.responsiveTabs) {
      $("#products-tabs").responsiveTabs({
        animation: "slide",
      });
    }
  }
});

/* ================ 
   Best Sellers / Production Carousel
  =================== */
$(function () {
  if ($(".slider").length && $.fn.slick) {
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

    const IO = new IntersectionObserver(callback, { threshold: 0.5 });

    document
      .querySelectorAll(".counter")
      .forEach((node) => IO.observe(node));
  }
});

/* ================ 
   Hero Image Auto Slideshow
  =================== */
$(function () {
  const slides = $(".hero-slide");
  const dots = $(".slide-dot");

  if (slides.length > 0) {
    let currentIndex = 0;
    const intervalTime = 3000;

    function goToSlide(nextIndex) {
      if (nextIndex === currentIndex) return;

      $(slides[currentIndex])
        .removeClass("opacity-100 scale-100")
        .addClass("opacity-0 scale-95");

      $(dots[currentIndex])
        .removeClass("bg-p-600 w-6")
        .addClass("bg-p-300 w-2.5");

      currentIndex = nextIndex;

      $(slides[currentIndex])
        .removeClass("opacity-0 scale-95")
        .addClass("opacity-100 scale-100");

      $(dots[currentIndex])
        .removeClass("bg-p-300 w-2.5")
        .addClass("bg-p-600 w-6");
    }

    setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }, intervalTime);

    dots.on("click", function () {
      const dotIndex = $(this).index();
      goToSlide(dotIndex);
    });
  }
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
    
    const activeLang = window.djirian_i18n?.currentLang || document.documentElement.lang || "en";
    const captionText = activeLang === "zh" ? imgEl.attr("data-caption-zh") : imgEl.attr("data-caption-en");
    
    lightboxImg.attr("src", imgSrc);
    lightboxCaption.text(captionText || imgEl.attr("alt"));
    
    lightbox.removeClass("opacity-0 pointer-events-none");
    $("body").addClass("overflow-hidden");
  }
  
  function closeLightbox() {
    lightbox.addClass("opacity-0 pointer-events-none");
    $("body").removeClass("overflow-hidden");
  }
  
  const cards = $(".infographic-card");
  cards.on("click", function () {
    const index = cards.index(this);
    openLightbox(index);
  });
  
  lightboxClose.on("click", closeLightbox);
  
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

/* ================
   Product Image Galleries
  =================== */
$(function () {
  document.querySelectorAll("[data-product-gallery]").forEach((gallery) => {
    const images = gallery.dataset.images ? gallery.dataset.images.split("|").filter(Boolean) : [];
    const image = gallery.querySelector("img");

    if (!image || images.length === 0) return;

    const setGalleryBackground = (src) => {
      gallery.style.setProperty("--gallery-bg", `url("${src}")`);
    };

    setGalleryBackground(images[0]);
    if (images.length < 2) return;

    const alt = gallery.dataset.alt || image.alt;
    let currentIndex = 0;
    let startX = 0;

    gallery.insertAdjacentHTML(
      "beforeend",
      `<button class="product-gallery__control product-gallery__control--prev" type="button" aria-label="Previous product image">‹</button>
       <button class="product-gallery__control product-gallery__control--next" type="button" aria-label="Next product image">›</button>
       <div class="product-gallery__dots" aria-label="Product image selection">${images
         .map((_, index) => `<button class="product-gallery__dot${index === 0 ? " is-active" : ""}" type="button" aria-label="Show product image ${index + 1}"></button>`)
         .join("")}</div>`
    );

    const dots = [...gallery.querySelectorAll(".product-gallery__dot")];

    function showImage(index) {
      currentIndex = (index + images.length) % images.length;
      image.style.opacity = "0";

      window.setTimeout(() => {
        image.src = images[currentIndex];
        image.alt = `${alt} — image ${currentIndex + 1}`;
        setGalleryBackground(images[currentIndex]);
        image.style.opacity = "1";
      }, 150);

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === currentIndex);
      });
    }

    const prevBtn = gallery.querySelector(".product-gallery__control--prev");
    const nextBtn = gallery.querySelector(".product-gallery__control--next");
    if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => showImage(index)));

    gallery.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
    });

    gallery.addEventListener("pointerup", (event) => {
      const swipeDistance = event.clientX - startX;
      if (Math.abs(swipeDistance) < 40) return;
      showImage(currentIndex + (swipeDistance < 0 ? 1 : -1));
    });
  });
});

/* ================ 
   Safe AOS Animation Initialization
  =================== */
$(function () {
  if (typeof AOS !== 'undefined') {
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
  }
});
