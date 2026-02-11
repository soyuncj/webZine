(function () {
  "use strict";

  var THEME_KEY = "love-eye-exam-theme";
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var scrollTopBtn = document.getElementById("scrollTop");

  // --- Dark mode: localStorage persistence + OS preference detection ---

  function applyTheme(isDark) {
    if (isDark) {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
  }

  var stored = localStorage.getItem(THEME_KEY);
  if (stored !== null) {
    applyTheme(stored === "dark");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    applyTheme(true);
  }

  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (localStorage.getItem(THEME_KEY) === null) {
          applyTheme(e.matches);
        }
      });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark = root.classList.toggle("theme-dark");
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }

  // --- Scroll-to-top: show only after scrolling ---

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var SCROLL_THRESHOLD = 200;

    function updateScrollTopVisibility() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", updateScrollTopVisibility, {
      passive: true,
    });

    updateScrollTopVisibility();
  }
})();
