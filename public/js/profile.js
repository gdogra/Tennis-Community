import { handleAuthState, handleLogout } from './auth.js';

handleAuthState((user) => {
  if (!user) {
    window.location.href = "/auth/login.html";
  } else {
    document.getElementById("user-email").textContent = user.email;
  }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await handleLogout();
  window.location.href = "/auth/login.html";
});

