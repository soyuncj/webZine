(function () {
  "use strict";

  var landing = document.getElementById("landing");
  var transition = document.getElementById("transition");
  var balloon = document.getElementById("balloon");
  var blink = document.getElementById("blink");
  var eye = document.getElementById("eye");
  var typewriter = document.getElementById("typewriter");
  var main = document.getElementById("main");

  if (!landing || !transition || !main) {
    if (main) main.style.display = "block";
    return;
  }

  var hasPlayed = false;
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.set(".balloon-float", { xPercent: -50, yPercent: -50, scale: 0.3 });

  var floatTween = gsap.to(".balloon-float", {
    y: -60,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 2,
    paused: true,
  });

  var typewriterTimer = null;

  function typeText(text, callback) {
    var index = 0;
    if (typewriter) typewriter.textContent = "";
    typewriterTimer = setInterval(function () {
      if (typewriter) typewriter.textContent += text[index];
      index += 1;
      if (index >= text.length) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
        if (callback) callback();
      }
    }, 55);
  }

  window.addEventListener("beforeunload", function () {
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
  });

  if (prefersReducedMotion) {
    landing.addEventListener("click", function () {
      if (hasPlayed) return;
      hasPlayed = true;
      landing.style.display = "none";
      transition.style.display = "none";
      main.style.display = "block";
      main.style.opacity = "1";
    });
    return;
  }

  landing.addEventListener("click", function () {
    if (hasPlayed) return;
    hasPlayed = true;

    transition.style.opacity = 1;
    transition.style.pointerEvents = "auto";

    var tl = gsap.timeline();

    tl.to(landing, { opacity: 0, duration: 0.6, ease: "power2.out" })
      .set(landing, { display: "none" })
      .set(transition, { opacity: 1 })
      .to(balloon, { opacity: 1, duration: 0.6 })
      .add(function () {
        floatTween.play();
      })
      .to(balloon, {
        opacity: 0,
        duration: 0.4,
        delay: floatTween.totalDuration(),
      })
      .to(blink, { opacity: 1, duration: 0.2 })
      .to(blink, { opacity: 0, duration: 0.2 })
      .to(eye, { opacity: 1, duration: 0.6 })
      .add(function () {
        typeText("- It's definitely your first love.", function () {
          gsap
            .timeline()
            .to(transition, { opacity: 0, duration: 0.6, delay: 0.6 })
            .set(transition, { display: "none" })
            .set(main, { display: "block" })
            .fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.8 });
        });
      });
  });
})();
