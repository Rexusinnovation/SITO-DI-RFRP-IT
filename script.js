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

// -------------------- UI ELEMENTS (CORRETTI) --------------------
const loginArea = document.getElementById("login-area");
const panelArea = document.getElementById("panel-area");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("login-error");
const loggedUserEl = document.getElementById("logged-user");
const panelMsg = document.getElementById("panel-msg");
const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");

// -------------------- UPDATE UI --------------------
function refreshUI(user) {
  if (user) {
    loginArea.classList.add("hidden");
    panelArea.classList.remove("hidden");
    loggedUserEl.textContent = "admin";
  } else {
    panelArea.classList.add("hidden");
    loginArea.classList.remove("hidden");
  }
}

// 🔥 SI ATTIVA AUTOMATICAMENTE DOPO LOGIN / LOGOUT
onAuthStateChanged(auth, (user) => {
  refreshUI(user);
});

// -------------------- LOGIN --------------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  loginError.textContent = "";

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // ❤️ Username → Email finta
  const email = `${username}@rfrp.local`;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    loginError.textContent = "❌ Credenziali errate!";
  }
});

// -------------------- LOGOUT --------------------
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// -------------------- SAVE STATUS (FIREBASE DB) --------------------
saveBtn.addEventListener("click", async () => {
  if (!auth.currentUser) {
    panelMsg.textContent = "⚠️ Non sei autenticato!";
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
    panelMsg.textContent = "✅ Stato aggiornato correttamente!";
  } catch (e) {
    panelMsg.textContent = "❌ Errore: " + e.message;
  }
});
