document.addEventListener("DOMContentLoaded", () => {
  const motionTargets = document.querySelectorAll(
    ".stats-item, #highlights .poster-card, #intro .container, #products .tabContainer, #process .slider, #garden .grid > img, #contact .container"
  );

  motionTargets.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
  });

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    motionTargets.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  motionTargets.forEach((element) => revealObserver.observe(element));
});
