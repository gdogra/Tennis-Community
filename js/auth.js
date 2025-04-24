import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://tvdiznpwmimcwywaxew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bWltY3d5d2F4ZXciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwODY5ODg5NSwiZXhwIjoxNzQwMjM0ODk1fQ.g2y69zG3nB4eJZTkLJW-EyiKi62_k7M58uPfRPmV1_s';

export const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#email').value;
      const password = loginForm.querySelector('#password').value;

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(`Login error: ${error.message}`);
      } else {
        alert('Login successful!');
        window.location.href = '/index.html';
      }
    });
  }

  const googleLoginBtn = document.querySelector('#google-login');
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) alert(`Google Login error: ${error.message}`);
    });
  }
});

