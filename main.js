/**
 * Why Bubolo marquee (GSAP)
 */
(function initWhyMarquee() {
  if (typeof gsap === "undefined") return;
  const DURATION = 183.2;
  const leftTrack = document.querySelector(".why-marquee-track--left");
  const leftRow = document.querySelector(".why-marquee-row--left");
  if (!leftTrack || !leftRow) return;

  const tweenLeft = gsap.to(leftTrack, {
    xPercent: -50,
    duration: DURATION,
    ease: "none",
    repeat: -1,
  });

  leftRow.addEventListener("mouseenter", () => {
    tweenLeft.paused(true);
  });
  leftRow.addEventListener("mouseleave", () => {
    tweenLeft.paused(false);
  });
})();

/**
 * Site chrome
 */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/**
 * Steps accordion (global handlers for inline onclick)
 */
function toggleStep(el) {
  const wasOpen = el.classList.contains("open");
  document.querySelectorAll(".step-item").forEach((s) => s.classList.remove("open"));
  if (!wasOpen) el.classList.add("open");
}

/**
 * FAQ accordion
 */
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const wasOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((f) => f.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}

/**
 * Fade-up on scroll
 */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-up").forEach((el) => fadeObserver.observe(el));

/**
 * Testimonial videos: overlay, play/pause, mute
 */
(function initTestimonialVideos() {
  const wraps = document.querySelectorAll(".tcard-video");
  if (!wraps.length) return;

  function pauseOthers(exceptVideo) {
    wraps.forEach((w) => {
      const v = w.querySelector(".tcard-video-media");
      if (v && v !== exceptVideo && !v.paused) v.pause();
    });
  }

  wraps.forEach((wrap) => {
    const video = wrap.querySelector(".tcard-video-media");
    const overlay = wrap.querySelector(".tcard-play-overlay");
    const bar = wrap.querySelector(".tcard-video-controls");
    const btnPP = wrap.querySelector(".tcard-btn-playpause");
    const btnMute = wrap.querySelector(".tcard-btn-mute");
    if (!video || !overlay || !bar || !btnPP || !btnMute) return;

    function setPlayingUI(playing) {
      wrap.classList.toggle("tcard-video--playing", playing);
      overlay.hidden = playing;
      bar.hidden = !playing;
    }

    function playThis() {
      pauseOthers(video);
      setPlayingUI(true);
      video.play().catch(() => {
        setPlayingUI(false);
      });
    }

    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!video.paused) return;
      playThis();
    });

    wrap.addEventListener("click", (e) => {
      if (e.target.closest(".tcard-video-controls")) return;
      if (e.target.closest(".tcard-play-overlay")) return;
      if (!video.paused) return;
      playThis();
    });

    btnPP.addEventListener("click", (e) => {
      e.stopPropagation();
      if (video.paused) {
        playThis();
      } else {
        video.pause();
      }
    });

    btnMute.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      btnMute.classList.toggle("is-muted", video.muted);
      btnMute.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
    });

    video.addEventListener("play", () => {
      setPlayingUI(true);
    });
    video.addEventListener("pause", () => {
      setPlayingUI(false);
    });
    video.addEventListener("ended", () => {
      setPlayingUI(false);
    });
  });
})();

/**
 * Testimonials: dot indicators + scroll sync (CSS scroll-snap on mobile)
 */
(function initTestimonialsCarousel() {
  const carousel = document.getElementById("testimonials-carousel");
  const dotsRoot = document.getElementById("testimonials-dots");
  if (!carousel || !dotsRoot) return;
  const cards = Array.from(carousel.querySelectorAll(".tcard"));
  if (!cards.length) return;

  let dotButtons = [];

  function scrollToIndex(i, behavior) {
    const card = cards[i];
    if (!card) return;
    const cardLeft =
      card.getBoundingClientRect().left -
      carousel.getBoundingClientRect().left +
      carousel.scrollLeft;
    const target = cardLeft - (carousel.clientWidth - card.offsetWidth) / 2;
    const beh = behavior !== undefined ? behavior : "smooth";
    carousel.scrollTo({ left: Math.max(0, target), behavior: beh });
  }

  function buildDots() {
    dotsRoot.innerHTML = "";
    dotButtons = cards.map((card, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "testimonials-dot" + (i === 0 ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.setAttribute("aria-controls", card.id);
      b.setAttribute("aria-label", "Show testimonial " + (i + 1) + " of " + cards.length);
      b.addEventListener("click", () => scrollToIndex(i));
      dotsRoot.appendChild(b);
      return b;
    });
  }

  function alignCarouselToActiveDot() {
    const active = dotButtons.findIndex((b) => b.classList.contains("is-active"));
    scrollToIndex(active >= 0 ? active : 0, "instant");
  }

  let raf = 0;
  function syncDotsFromScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const cr = carousel.getBoundingClientRect();
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, idx) => {
        const r = c.getBoundingClientRect();
        const mid = carousel.scrollLeft + (r.left - cr.left) + c.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      });
      dotButtons.forEach((btn, idx) => {
        const on = idx === best;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
    });
  }

  buildDots();
  carousel.addEventListener("scroll", syncDotsFromScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      alignCarouselToActiveDot();
    }
    requestAnimationFrame(syncDotsFromScroll);
  });
  requestAnimationFrame(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      scrollToIndex(0, "instant");
    }
    requestAnimationFrame(syncDotsFromScroll);
  });
})();
