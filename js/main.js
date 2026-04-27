// ============================================
// MAIN.JS — UI Interactions (Sound, Slots, Mood)
// ============================================

// ── SOUND ENGINE ──
let audioCtx;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

window.playClick = function () {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
    osc.start(); osc.stop(ctx.currentTime + 0.13);
  } catch (e) {}
};

window.playSuccess = function () {
  try {
    const ctx = getAudio();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.11;
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.start(t); osc.stop(t + 0.22);
    });
  } catch (e) {}
};

// ── TIME SLOT SELECTION ──
window.selectSlot = function (el, price, label) {
  playClick();
  document.querySelectorAll(".slot-card").forEach(s => s.classList.remove("selected"));
  el.classList.add("selected");
  document.getElementById("priceDisplay").textContent = "₹" + price;
  document.getElementById("priceNote").textContent = label + " ki baat";
  const amtField = document.getElementById("paidAmount");
  if (amtField) amtField.placeholder = "₹" + price;
};

// ── MOOD SELECTION ──
window.selectMood = function (el) {
  playClick();
  document.querySelectorAll(".mood-chip").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
};

// ── HERO BUTTON SOUNDS ──
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-main, .btn-ghost, .nav-cta").forEach(btn => {
    btn.addEventListener("click", () => playClick());
  });
});
