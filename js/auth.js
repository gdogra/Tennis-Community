import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://tvdiznpwmmimcwywaxew.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Truncated for security
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle form login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(`Login error: ${error.message}`);
  } else {
    alert("Login successful!");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1200);
  }
});

// Google login
document.getElementById("google-login-btn").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) alert(`Google Login Error: ${error.message}`);
});

