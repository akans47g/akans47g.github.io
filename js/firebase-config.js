// ============================================
// FIREBASE CONFIG — Call a Friend
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyChyETFT5LuVb1tkj4R6IG5gx8tyaDJjuc",
  authDomain: "call-friend-b8bb3.firebaseapp.com",
  projectId: "call-friend-b8bb3",
  storageBucket: "call-friend-b8bb3.firebasestorage.app",
  messagingSenderId: "373738461022",
  appId: "1:373738461022:web:d9c74804f2018019b6e1cf",
  measurementId: "G-017315WQY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

