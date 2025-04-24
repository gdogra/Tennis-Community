const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auto-create profile on signup
async function createProfile(userId) {
  const { error } = await supabase.from('profiles').insert([
    { id: userId, is_admin: false }
  ]);
  if (error) console.error('Profile creation error:', error.message);
}

// Sign-up
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Sign-up error: ' + error.message);
  } else {
    alert('Signup successful! Please check your email.');
    await createProfile(data.user.id);
  }
});

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Login error: ' + error.message);
    return;
  }

  const userId = data.user.id;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError.message);
    alert('Login error: Could not fetch user role.');
    return;
  }

  if (profile.is_admin) {
    alert('Welcome Admin! You have elevated access.');
    window.location.href = '/admin.html';
  } else {
    alert('Login successful!');
    window.location.href = '/index.html';
  }
});

// Logout
document.getElementById('logout-btn')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Logout error: ' + error.message);
  } else {
    alert('Logged out!');
    window.location.href = '/auth/login.html';
  }
});

// Google Login
document.getElementById('google-login')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/admin.html' }
  });
  if (error) {
    alert('Google login error: ' + error.message);
  }
});

