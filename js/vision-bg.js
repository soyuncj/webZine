(function () {
  "use strict";

  var bg = document.querySelector(".vision-bg");
  if (!bg) return;

  var letters = ["E", "F", "P", "T", "O", "Z", "L", "P", "D", "C"];
  var rand = function (min, max) {
    return Math.random() * (max - min) + min;
  };
  var sign = function () {
    return Math.random() < 0.5 ? -1 : 1;
  };

  for (var i = 0; i < 12; i++) {
    var el = document.createElement("span");
    el.className = "vision-letter";
    el.textContent = letters[Math.floor(Math.random() * letters.length)];
    el.style.left = rand(5, 90) + "%";
    el.style.top = rand(5, 90) + "%";
    el.style.fontSize = rand(30, 90) + "px";
    el.style.setProperty("--opa", rand(0.03, 0.11).toFixed(3));
    el.style.setProperty("--dur", rand(20, 45).toFixed(1) + "s");
    el.style.setProperty("--delay", rand(0, 5).toFixed(1) + "s");
    el.style.setProperty("--dx", (sign() * rand(5, 15)).toFixed(1) + "vw");
    el.style.setProperty("--dy", (sign() * rand(5, 15)).toFixed(1) + "vh");
    el.style.setProperty("--rot", (sign() * rand(5, 15)).toFixed(1) + "deg");
    bg.appendChild(el);
  }

  var rotations = [0, 90, 180, 270];
  var svgNS = "http://www.w3.org/2000/svg";

  for (var j = 0; j < 8; j++) {
    var wrap = document.createElement("div");
    wrap.className = "vision-landolt";
    var size = rand(40, 90);
    wrap.style.width = size + "px";
    wrap.style.height = size + "px";
    wrap.style.left = rand(5, 90) + "%";
    wrap.style.top = rand(5, 90) + "%";

    var initRot = rotations[Math.floor(Math.random() * rotations.length)];
    wrap.style.setProperty("--init-rot", initRot + "deg");
    wrap.style.setProperty("--opa", rand(0.06, 0.18).toFixed(3));
    wrap.style.setProperty("--dur", rand(20, 50).toFixed(1) + "s");
    wrap.style.setProperty("--delay", rand(0, 8).toFixed(1) + "s");
    wrap.style.setProperty("--dx", (sign() * rand(5, 20)).toFixed(1) + "vw");
    wrap.style.setProperty("--dy", (sign() * rand(5, 20)).toFixed(1) + "vh");
    wrap.style.setProperty("--rot", (sign() * rand(10, 30)).toFixed(1) + "deg");

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    var defs = document.createElementNS(svgNS, "defs");
    var mask = document.createElementNS(svgNS, "mask");
    mask.setAttribute("id", "lm" + j);

    var mRect = document.createElementNS(svgNS, "rect");
    mRect.setAttribute("width", "100");
    mRect.setAttribute("height", "100");
    mRect.setAttribute("fill", "white");
    mask.appendChild(mRect);

    var mCircle = document.createElementNS(svgNS, "circle");
    mCircle.setAttribute("cx", "50");
    mCircle.setAttribute("cy", "50");
    mCircle.setAttribute("r", "25");
    mCircle.setAttribute("fill", "black");
    mask.appendChild(mCircle);

    var mGap = document.createElementNS(svgNS, "rect");
    mGap.setAttribute("x", "50");
    mGap.setAttribute("y", "42.5");
    mGap.setAttribute("width", "40");
    mGap.setAttribute("height", "15");
    mGap.setAttribute("fill", "black");
    mask.appendChild(mGap);

    defs.appendChild(mask);
    svg.appendChild(defs);

    var circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", "#f472b6");
    circle.setAttribute("mask", "url(#lm" + j + ")");
    svg.appendChild(circle);

    wrap.appendChild(svg);
    bg.appendChild(wrap);
  }
})();
