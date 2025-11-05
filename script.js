console.log("Sito RFRP caricato ✅");

// Finto login staff
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("login-msg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msg.textContent = "Accesso eseguito (solo dimostrazione)";
      msg.style.color = "#00ff99";
    });
  }
});
