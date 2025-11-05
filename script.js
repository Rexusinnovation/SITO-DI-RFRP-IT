const users = [
  { username: "admin", password: "1234" },
  { username: "dev", password: "rfrp" }
];

const form = document.getElementById("loginForm");
const panel = document.getElementById("panel");
const msg = document.getElementById("login-msg");

// Nascondo il pannello finché non sei loggato
if (localStorage.getItem("loggedUser")) {
  form.classList.add("hidden");
  panel.classList.remove("hidden");
} else {
  form.classList.remove("hidden");
  panel.classList.add("hidden");
}

// LOGIN
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("loggedUser", username);
    form.classList.add("hidden");
    panel.classList.remove("hidden");
    msg.textContent = "";
  } else {
    msg.textContent = "❌ Credenziali errate!";
  }
});

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  location.reload();
});

// SALVATAGGIO STATO
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", () => {
  const status = {
    server: document.getElementById("serverSelect").value,
    bot: document.getElementById("botSelect").value,
    app: document.getElementById("appSelect").value,
  };
  localStorage.setItem("rfrpStatus", JSON.stringify(status));
  alert("✅ Stato aggiornato con successo!");
});

// MOSTRA STATO SU STATUS.HTML
const serverStatus = document.getElementById("serverStatus");
if (serverStatus) {
  const saved = JSON.parse(localStorage.getItem("rfrpStatus"));
  if (saved) {
    document.getElementById("serverStatus").textContent = saved.server;
    document.getElementById("botStatus").textContent = saved.bot;
    document.getElementById("appStatus").textContent = saved.app;
  }
}
