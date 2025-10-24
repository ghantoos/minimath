import confetti from "canvas-confetti";

export function launchFireworks(total = 10) {
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

  // --- Emoji layer (configurable) ---
  let emojis = []; // default none

  if (total === 10) emojis = ["🎉", "🎊", "✨", "🥳"];
  else if (total === 20) emojis = ["🌈", "🌸", "🌟", "💫", "🌞"];
  else if (total === 30) emojis = ["😺", "😸", "😹", "😻", "🐾"];
  else if (total === 50) emojis = ["💩", "😺", "😸", "🦄", "🐾"];

  function showEmoji() {
    const cat = document.createElement("div");
    cat.textContent = emojis[Math.floor(Math.random() * emojis.length)];
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

  (function emojiLoop() {
    showEmoji();
    if (Date.now() < animationEnd) setTimeout(emojiLoop, 250 + Math.random() * 250);
  })();
}
