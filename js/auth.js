// js/auth.js

// Step 1: Make sure supabase-js is loaded
// (you're already loading it via CDN in login.html)

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4OTU3NzUsImV4cCI6MjAyOTQ3MTc3NX0.VEqX7UBOpXw1Nn5WmtZWKZRpN59nl3f3cDFTuXerN8g';

// Step 2: Initialize supabase AFTER global 'supabase' is available
document.addEventListener('DOMContentLoaded', () => {
  const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Sign up
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const { error } = await client.auth.signUp({ email, password });

    if (error) {
      alert('Sign-up error: ' + error.message);
    } else {
      alert('Check your email to confirm sign-up.');
    }
  });

  // Log in
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { error, data } = await client.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Login error: ' + error.message);
    } else {
      alert('Logged in as: ' + data.user.email);
      document.getElementById('logout-btn').style.display = 'block';
    }
  });

  // Log out
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await client.auth.signOut();
    alert('Logged out');
    document.getElementById('logout-btn').style.display = 'none';
  });

  // Show logout if session exists
  client.auth.getSession().then(({ data }) => {
    if (data.session) {
      document.getElementById('logout-btn').style.display = 'block';
    }
  });
});

