import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Sign-up error: ' + error.message);
  } else {
    alert('Signup successful! Please check your email to confirm.');
  }
});

// Log In
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    alert('Login error: ' + loginError.message);
    return;
  }

  alert('Login successful!');
  document.getElementById('logout-btn').style.display = 'block';

  // Role check
  const { data: userInfo } = await supabase.auth.getUser();
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('is_admin')
    .eq('id', userInfo.user.id)
    .single();

  if (roleError) {
    console.error('Failed to fetch role:', roleError.message);
  } else if (roleData.is_admin) {
    alert('Welcome Admin! You have elevated access.');
    // Optionally show admin-only UI elements
  } else {
    alert('Welcome Player!');
  }
});

// Log Out
document.getElementById('logout-btn').addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Logout error: ' + error.message);
  } else {
    alert('Logged out successfully');
    document.getElementById('logout-btn').style.display = 'none';
  }
});

