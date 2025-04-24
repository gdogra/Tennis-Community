import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'ey...WjWc'; // Use your actual anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  const feedback = document.getElementById('login-feedback');

  if (error) {
    feedback.textContent = 'Login failed: ' + error.message;
    feedback.classList.remove('fadeout');
  } else {
    feedback.textContent = 'Login successful!';
    feedback.classList.add('fadeout');

    // Get profile
    const user = data.user;
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 3000);
  }
});

document.getElementById('google-login').addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) alert('OAuth login failed: ' + error.message);
});

