// -------------------- IMPORT FIREBASE --------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// -------------------- FIREBASE CONFIG --------------------
const firebaseConfig = {
  apiKey: "AIzaSyDMLYtUSS-2XYoKIRzvS39ls4ln4c56oY4",
  authDomain: "aggiorna-pagina-stato-server.firebaseapp.com",
  projectId: "aggiorna-pagina-stato-server",
  storageBucket: "aggiorna-pagina-stato-server.firebasestorage.app",
  messagingSenderId: "138766621965",
  appId: "1:138766621965:web:fc2631db734d7853696444",
  measurementId: "G-57HLJGTRJL",
  databaseURL: "https://aggiorna-pagina-stato-server-default-rtdb.europe-west1.firebasedatabase.app"
};

// -------------------- INIT --------------------
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// -------------------- UI ELEMENTS --------------------
const form = document.getElementById("loginForm");
const panel = document.getElementById("panel");
const msg = document.getElementById("login-msg");
const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");

// -------------------- UPDATE UI --------------------
function refreshUI(user) {
  if (user) {
    form.classList.add("hidden");
    panel.classList.remove("hidden");
    msg.textContent = "";
  } else {
    panel.classList.add("hidden");
    form.classList.remove("hidden");
  }
}

// 🔥 SI ATTIVA AUTOMATICAMENTE DOPO LOGIN / LOGOUT
onAuthStateChanged(auth, (user) => {
  refreshUI(user);
});

// -------------------- LOGIN --------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  msg.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // ❤️ Username → Email finta
  const email = `${username}@rfrp.local`;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    msg.textContent = "❌ Credenziali errate!";
  }
});

// -------------------- LOGOUT --------------------
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// -------------------- SAVE STATUS (FIREBASE DB) --------------------
saveBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    alert("⚠️ Non sei autenticato!");
    return;
  }

  const status = {
    server: document.getElementById("serverSelect").value,
    bot: document.getElementById("botSelect").value,
    app: document.getElementById("appSelect").value,
    updatedAt: new Date().toISOString()
  };

  try {
    await set(ref(db, "stato"), status);
    alert("✅ Stato aggiornato correttamente!");
  } catch (e) {
    alert("❌ Errore: " + e.message);
  }
});
