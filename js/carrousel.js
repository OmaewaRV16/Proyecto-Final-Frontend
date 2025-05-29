function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".slide");
  let slideWidth = slideEl.offsetWidth;

  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  const getNewScrollPosition = (arg) => {
    const gap = 10;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft;
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };

  // Botones
  document.querySelector("#back-button").addEventListener("click", (e) => {
    e.preventDefault();
    navigate("backward");
  });
  document.querySelector("#forward-button").addEventListener("click", (e) => {
    e.preventDefault();
    navigate("forward");
  });

  // Autoplay
  let autoplay = setInterval(() => navigate("forward"), 3000);
  slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));

  // Resize
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  // Slide indicators (solo si existen)
  const indicators = carouselEl.querySelectorAll(".slide-indicator");
  if (indicators.length > 0) {
    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => navigate(index));
      dot.addEventListener("mouseenter", () => clearInterval(autoplay));
    });
  }
}
autoplayCarousel();

