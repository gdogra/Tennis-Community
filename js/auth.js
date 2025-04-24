// js/auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🛠 Supabase project values
const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Use your real full anon key here

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🚀 Login with Email and Password
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(`Login error: ${error.message}`);
  } else {
    alert('Login successful!');
    // Redirect after login
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 1000);
  }
});

// 🚀 Login with Google OAuth
document.getElementById('google-login').addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    alert(`Google login error: ${error.message}`);
  }
});

