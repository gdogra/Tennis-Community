import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://tvdiznpwmmimcwywaxew.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc'
);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Login error: ' + error.message);
  } else {
    alert('Login successful!');
    window.location.href = '/index.html';
  }
});

document.getElementById('google-login').addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) {
    alert('Google login error: ' + error.message);
  }
});
