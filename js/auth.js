// ============================================
// AUTH.JS — Admin Login / Logout
// ============================================

import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── ADMIN EMAIL (sirf yahi login kar sakta hai) ──
const ADMIN_EMAIL = "akans47g@gmail.com"; // 🔴 Apna email daalo

// ── Login Function ──
window.adminLogin = async function () {
  const email    = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPass").value.trim();
  const btn      = document.getElementById("loginBtn");

  if (!email || !password) {
    showMsg("Email aur Password dono dalo!", "error");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Login ho raha hai...";

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    // Sirf admin email allow karo
    if (userCred.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      showMsg("❌ Aap admin nahi hain!", "error");
      btn.disabled = false;
      btn.textContent = "Login";
      return;
    }

    // Admin login successful — dashboard pe bhejo
    window.location.href = "dashboard.html";

  } catch (error) {
    let msg = "❌ Login fail hua!";
    if (error.code === "auth/wrong-password")   msg = "❌ Password galat hai!";
    if (error.code === "auth/user-not-found")   msg = "❌ Email registered nahi hai!";
    if (error.code === "auth/too-many-requests") msg = "⚠️ Bahut zyada tries! Thodi der baad karo.";
    showMsg(msg, "error");
    btn.disabled = false;
    btn.textContent = "Login";
  }
};

// ── Logout Function ──
window.adminLogout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};

// ── Auth Guard — Dashboard pe bina login ke na aaye ──
window.checkAdminAuth = function (redirectIfNotLoggedIn = true) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        resolve(user);
      } else {
        if (redirectIfNotLoggedIn) {
          window.location.href = "login.html";
        }
        resolve(null);
      }
    });
  });
};

// ── Alert Helper ──
function showMsg(msg, type) {
  const div = document.getElementById("authMsg");
  if (!div) return;
  div.textContent = msg;
  div.style.display = "block";
  div.style.background = type === "error" ? "#fee2e2" : "#dcfce7";
  div.style.color = type === "error" ? "#991b1b" : "#166534";
  div.style.border = `1.5px solid ${type === "error" ? "#fca5a5" : "#86efac"}`;
}

