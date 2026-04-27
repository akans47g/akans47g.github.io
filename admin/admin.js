// ============================================
// ADMIN.JS — Dashboard, Approve/Reject Bookings
// ============================================

import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Load All Bookings (Real-time) ──
window.loadBookings = function (filterStatus = "all") {
  const container = document.getElementById("bookingsContainer");
  container.innerHTML = `<div class="loading">⏳ Loading...</div>`;

  let q;
  if (filterStatus === "all") {
    q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(db, "bookings"),
      where("status", "==", filterStatus),
      orderBy("createdAt", "desc")
    );
  }

  // Real-time listener — jaise hi koi booking aaye, update ho
  onSnapshot(q, (snapshot) => {
    updateStats(snapshot.docs);

    if (snapshot.empty) {
      container.innerHTML = `<div class="no-data">📭 Koi booking nahi mili</div>`;
      return;
    }

    container.innerHTML = "";
    snapshot.docs.forEach((docSnap) => {
      const b = docSnap.data();
      const id = docSnap.id;
      const time = b.createdAt?.toDate().toLocaleString("en-IN") || "—";

      const statusColors = {
        pending:  { bg: "#fef3c7", color: "#92400e", label: "⏳ Pending" },
        approved: { bg: "#dcfce7", color: "#166534", label: "✅ Approved" },
        rejected: { bg: "#fee2e2", color: "#991b1b", label: "❌ Rejected" }
      };
      const s = statusColors[b.status] || statusColors.pending;

      container.innerHTML += `
        <div class="booking-card" id="card-${id}">
          <div class="bc-top">
            <div class="bc-name">${b.name} <span class="bc-phone">${b.phone}</span></div>
            <div class="bc-status" style="background:${s.bg}; color:${s.color}">${s.label}</div>
          </div>
          <div class="bc-details">
            <div class="bc-row"><span>🤝 Friend</span><strong>${b.friendType}</strong></div>
            <div class="bc-row"><span>⏱️ Plan</span><strong>${b.selectedPlan}</strong></div>
            <div class="bc-row"><span>💰 Amount</span><strong>₹${b.amount}</strong></div>
            <div class="bc-row"><span>🔢 UTR</span><strong>${b.utr}</strong></div>
            <div class="bc-row"><span>🗣️ Language</span><strong>${b.language}</strong></div>
            <div class="bc-row"><span>📅 Call Time</span><strong>${b.callTime}</strong></div>
            ${b.userMessage ? `<div class="bc-msg">💬 "${b.userMessage}"</div>` : ""}
            <div class="bc-row"><span>🕐 Submitted</span><strong>${time}</strong></div>
          </div>
          ${b.status === "pending" ? `
          <div class="bc-actions">
            <button class="btn-approve" onclick="approveBooking('${id}')">✅ Approve</button>
            <button class="btn-reject"  onclick="rejectBooking('${id}')">❌ Reject</button>
          </div>` : ""}
        </div>
      `;
    });
  });
};

// ── Approve Booking ──
window.approveBooking = async function (id) {
  if (!confirm("Is booking ko APPROVE karna chahte ho?")) return;
  await updateDoc(doc(db, "bookings", id), {
    status: "approved",
    approvedAt: new Date()
  });
  showToast("✅ Booking Approved!");
};

// ── Reject Booking ──
window.rejectBooking = async function (id) {
  if (!confirm("Is booking ko REJECT karna chahte ho?")) return;
  await updateDoc(doc(db, "bookings", id), {
    status: "rejected",
    rejectedAt: new Date()
  });
  showToast("❌ Booking Rejected!");
};

// ── Update Stats Cards ──
function updateStats(docs) {
  const all      = docs.length;
  const pending  = docs.filter(d => d.data().status === "pending").length;
  const approved = docs.filter(d => d.data().status === "approved").length;
  const earning  = docs
    .filter(d => d.data().status === "approved")
    .reduce((sum, d) => sum + (d.data().amount || 0), 0);

  setEl("statTotal",    all);
  setEl("statPending",  pending);
  setEl("statApproved", approved);
  setEl("statEarning",  "₹" + earning);
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Toast ──
function showToast(msg) {
  const t = document.createElement("div");
  t.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:#0a1628; color:white; padding:12px 24px; border-radius:12px;
    font-size:0.88rem; font-weight:600; z-index:9999;
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
               }

