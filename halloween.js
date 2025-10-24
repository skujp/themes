// halloween.js (Auto-Run + Dynamic Selector + Optional Mobile + Auto Dark Background + Battery Optimized)
(function () {
  const head = document.head;

  // ✅ Inject Google Font once
  if (!document.querySelector('link[href*="Nosifer"]')) {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Nosifer&display=swap";
    link.rel = "stylesheet";
    head.appendChild(link);
  }

  // ✅ Inject styles once
  if (!document.getElementById("halloween-styles")) {
    const style = document.createElement("style");
    style.id = "halloween-styles";
    style.textContent = `
      /* Base container */
      .halloween-container {
        position: relative;
        z-index: 1;
        pointer-events: auto;
      }

      .halloween-container .global-header-second {
        color: #f5f5f5 !important;
        text-shadow: 0 0 4px rgba(255,255,255,0.25);
      }

      /* 🔮 Auto-darken background (vignette) */
      .halloween-container::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at bottom, rgba(11, 0, 26, 0.80) 0%, rgba(0, 0, 0, 80) 100%);
        z-index: -1;
        pointer-events: none;
        transition: opacity 2s ease-in-out;
        opacity: 0.95;
      }

      /* Bats */
      .halloween-container .bat {
        position: absolute;
        width: 30px;
        height: 15px;
        transform-origin: center;
        animation: fly-path 12s linear infinite;
        z-index: -1;
        will-change: transform;
      }
      .halloween-container .bat::before,
      .halloween-container .bat::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        top: 0;
        background: black;
        border-radius: 50% 50% 0 0;
        transform-origin: bottom center;
        animation: flap 0.4s infinite alternate;
        will-change: transform;
      }
      .halloween-container .bat::before { left: 0; transform: rotate(25deg); }
      .halloween-container .bat::after { right: 0; transform: rotate(-25deg); }
      .halloween-container .bat:nth-child(2) { animation-delay: 2s; left: 30%; top: 60%; }
      .halloween-container .bat:nth-child(3) { animation-delay: 3s; left: 70%; top: 20%; }
      .halloween-container .bat:nth-child(4) { animation-delay: 4s; left: 10%; top: 50%; }
      .halloween-container .bat:nth-child(5) { animation-delay: 6s; left: 95%; top: 10%; }

      @keyframes flap {
        0% { transform: rotate(25deg) scaleY(1); }
        100% { transform: rotate(45deg) scaleY(0.8); }
      }
      @keyframes fly-path {
        0% { transform: translate(0,0) rotate(0deg) scale(1); }
        10% { transform: translate(-200px,-100px) rotate(15deg) scale(0.9); }
        25% { transform: translate(250px,-150px) rotate(-10deg) scale(1.1); }
        40% { transform: translate(-300px,100px) rotate(10deg) scale(0.95); }
        55% { transform: translate(200px,200px) rotate(-5deg) scale(1.05); }
        70% { transform: translate(-250px,-200px) rotate(20deg) scale(1); }
        85% { transform: translate(150px,100px) rotate(-10deg) scale(0.9); }
        100% { transform: translate(0,0) rotate(0deg) scale(1); }
      }

      /* Moon */
      .halloween-container .moon {
        position: absolute;
        top: 10%;
        left: 70%;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, #ffffff 0%, #bfbfbf 40%, #7a7a7a 70%, transparent 100%);
        box-shadow: 0 0 40px 10px rgba(255,255,255,0.3);
        border-radius: 50%;
        overflow: hidden;
        z-index: -1;
        will-change: transform;
      }
      .moon::after {
        content: "🦇";
        position: absolute;
        top: 45%;
        left: -20%;
        font-size: 1.4em;
        filter: grayscale(100%) brightness(0);
        animation: witchFly 6s linear infinite alternate;
        opacity: 0.9;
        will-change: transform;
      }
      @keyframes witchFly {
        0% { transform: translateX(0) rotate(5deg); opacity: 0; }
        50% { transform: translateX(120px) translateY(-6px) rotate(-5deg); opacity: 1; }
        100% { transform: translateX(200px) translateY(10px) rotate(8deg); opacity: 0; }
      }

      /* Text */
      .halloween-container .halloween-text {
        position: absolute;
        top: 88%;
        left: 50%;
        transform: translateX(-50%);
        font-family: "Nosifer", cursive;
        white-space: nowrap;
        font-size: 1.7em;
        color: #e8e8e8;
        text-shadow: 0 0 10px #ffffff, 0 0 20px #bfbfbf, 0 0 40px #9a9a9a, 0 0 80px rgba(255,255,255,0.25);
        animation: moonBloodGlow 6s infinite alternate ease-in-out;
        z-index: -1;
        pointer-events: none;
        will-change: color, text-shadow;
      }
      @keyframes moonBloodGlow {
        0% { color: #f5f5f5; text-shadow: 0 0 8px #d0d0d0, 0 0 16px #a0a0a0, 0 0 32px #707070; }
        50% { color: #ff4d4d; text-shadow: 0 0 12px #ff6666, 0 0 24px #ff1a1a, 0 0 48px #990000, 0 0 80px rgba(255,0,0,0.3); }
        100% { color: #f5f5f5; text-shadow: 0 0 16px #ffffff, 0 0 28px #cfcfcf, 0 0 48px rgba(255,255,255,0.4); }
      }

      /* Mobile Adjustments */
      @media (max-width: 768px) {
        .halloween-container .halloween-text {
          left: 120px;
          font-size: 0.5em;
        }
        .halloween-container .moon {
          width: 40px;
          height: 40px;
        }
      }
    `;
    head.appendChild(style);
  }

  // ✅ Add effect
  function addHalloweenEffect(selector) {
    const target = document.querySelector(selector);
    if (!target || target.classList.contains("halloween-container")) return;

    target.classList.add("halloween-container");

    const fragment = document.createDocumentFragment();

    // Moon
    const moon = document.createElement("div");
    moon.className = "moon";
    fragment.appendChild(moon);

    // Bats
    const batTemplate = document.createElement("div");
    batTemplate.className = "bat";
    for (let i = 0; i < 5; i++) fragment.appendChild(batTemplate.cloneNode(true));

    // Text
    const text = document.createElement("div");
    text.className = "halloween-text";
    text.textContent = "👻🕷🕸️🍬⚰🦉🎃Happy Halloween!🎃🐈‍⬛🪄🔮🧪🧹🧛";
    fragment.appendChild(text);

    target.appendChild(fragment);
  }

  // ✅ Auto-run after DOM ready (dynamic selector + mobile control)
  const currentScript = document.currentScript;
  const params = new URLSearchParams(currentScript.src.split("?")[1] || "");
  const selector = params.get("selector") || ".global-header";
  const mobileEnabled = params.get("mobile") === "1";
  const isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;

  if (isMobile && !mobileEnabled) return; // 📴 Skip on mobile unless forced

  window.addEventListener("DOMContentLoaded", () => addHalloweenEffect(selector));
})();


