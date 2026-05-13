// ============================================
// BOOKING.JS — Form Submit & Save to Firebase
// ============================================

import { db, auth } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.submitForm = async function () {
  const name     = document.getElementById("userName").value.trim();
  const phone    = document.getElementById("userPhone").value.trim();
  const lang     = document.getElementById("userLang").value;
  const friend   = document.getElementById("friendType").value;
  const callTime = document.getElementById("callTime").value;
  const message  = document.getElementById("userMsg").value.trim();
  const amount   = document.getElementById("paidAmount").value.trim();
  const utr      = document.getElementById("utrId").value.trim();
  const price    = document.getElementById("priceDisplay").textContent;

  if (!name || !phone) { showAlert("⚠️ Naam aur Phone Number zaroori hai!", "error"); return; }
  if (phone.length < 10) { showAlert("⚠️ Sahi phone number dalo!", "error"); return; }
  if (!amount || !utr) { showAlert("⚠️ Amount aur UTR ID dalna zaroori hai!", "error"); return; }
  if (utr.length < 10) { showAlert("⚠️ UTR ID sahi nahi lagti!", "error"); return; }

  // Duplicate UTR check
  try {
    const utrQuery = query(collection(db, "bookings"), where("utr", "==", utr));
    const utrSnap  = await getDocs(utrQuery);
    if (!utrSnap.empty) { showAlert("⚠️ Yeh UTR ID pehle se use ho chuki hai!", "error"); return; }
  } catch (e) {}

  const btn = document.querySelector(".btn-submit");
  btn.disabled = true;
  btn.innerHTML = "⏳ Submit ho raha hai...";

  try {
    // Get logged in user info
    let userEmail = "";
    let userUid   = "";
    try {
      const cu = auth.currentUser;
      if (cu) { userEmail = cu.email || ""; userUid = cu.uid || ""; }
    } catch(e) {}

    const bookingRef = await addDoc(collection(db, "bookings"), {
      name,
      phone,
      email:     userEmail,
      userEmail: userEmail,
      userUid:   userUid,
      language:  lang,
      friendType: friend,
      callTime:  callTime || "Koi time set nahi",
      userMessage: message,
      amount:    Number(amount),
      utr,
      selectedPlan: price,
      status:    "pending",
      createdAt: serverTimestamp()
    });

    playSuccess();

    document.querySelector(".booking-wrap").innerHTML = `
      <div style="text-align:center;padding:40px 20px;">
        <div style="font-size:4rem;margin-bottom:16px;">✅</div>
        <h2 style="font-family:'DM Sans',sans-serif;font-weight:700;font-size:1.4rem;color:#0a1628;margin-bottom:10px;">
          Request Submit Ho Gayi!
        </h2>
        <p style="color:#64748b;font-size:0.9rem;line-height:1.7;margin-bottom:24px;">
          Admin aapki payment verify karenge.<br>
          Jald hi <strong>${phone}</strong> pe call aayegi! 🤙
        </p>
        <div style="background:#e0f2fe;border-radius:14px;padding:16px;font-size:0.82rem;color:#0369a1;font-weight:600;">
          Booking ID: <strong>${bookingRef.id.slice(0,8).toUpperCase()}</strong>
        </div>
      </div>`;

  } catch (error) {
    showAlert("❌ Kuch galat hua! Internet check karo.", "error");
    btn.disabled = false;
    btn.innerHTML = "✅ Request Submit Karo";
  }
};

function showAlert(msg, type) {
  const existing = document.getElementById("customAlert");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.id = "customAlert";
  div.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${type==="error"?"#fee2e2":"#dcfce7"};color:${type==="error"?"#991b1b":"#166534"};border:1.5px solid ${type==="error"?"#fca5a5":"#86efac"};padding:12px 24px;border-radius:12px;font-weight:600;font-size:0.88rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.12);max-width:90vw;text-align:center;`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}
