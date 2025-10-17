import confetti from "canvas-confetti";

export function launchFireworks() {
  const duration = 4 * 1000; // 4 seconds
  const animationEnd = Date.now() + duration;

  // --- Fireworks layer (canvas-confetti) ---
  (function fireworksFrame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ffffff"],
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ffffff"],
    });

    if (Date.now() < animationEnd) requestAnimationFrame(fireworksFrame);
  })();

  // --- Cats layer (from previous version) ---
  const cats = ["😺", "😸", "😹", "😻", "😽", "😼", "🐾"];

  function showCat() {
    const cat = document.createElement("div");
    cat.textContent = cats[Math.floor(Math.random() * cats.length)];
    cat.style.position = "fixed";
    cat.style.fontSize = 40 + Math.random() * 30 + "px";
    cat.style.left = Math.random() * window.innerWidth + "px";
    cat.style.top = Math.random() * window.innerHeight + "px";
    cat.style.zIndex = 10000;
    cat.style.transition = "transform 2s ease-out, opacity 2s ease-out";
    cat.style.pointerEvents = "none";
    document.body.appendChild(cat);

    // animate
    setTimeout(() => {
      const dx = (Math.random() - 0.5) * 400;
      const dy = (Math.random() - 0.5) * 400;
      cat.style.transform = `translate(${dx}px, ${dy}px) scale(1.2) rotate(${Math.random() * 360}deg)`;
      cat.style.opacity = 0;
    }, 100);

    // cleanup
    setTimeout(() => cat.remove(), 2500);
  }

  (function catsLoop() {
    showCat();
    if (Date.now() < animationEnd) setTimeout(catsLoop, 250 + Math.random() * 250);
  })();
}
