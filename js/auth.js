const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Post-login check (Google or otherwise) ---
document.addEventListener('DOMContentLoaded', async () => {
  const { data: session } = await supabase.auth.getSession();
  const { data: userData } = await supabase.auth.getUser();

  if (userData?.user) {
    const userId = userData.user.id;

    // Check if profile exists
    const { data: existingProfile, error: profileErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (!existingProfile) {
      // Create profile if missing
      await supabase
        .from('profiles')
        .insert([{ id: userId, is_admin: false }])
        .then(() => console.log('Profile created after OAuth login'));
    }

    // Redirect user after OAuth login
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (profile?.is_admin) {
      window.location.href = '/admin.html';
    } else {
      window.location.href = '/index.html';
    }
  }
});

// --- Sign Up ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert('Sign-up error: ' + error.message);
      return;
    }

    if (data?.user) {
      await supabase
        .from('profiles')
        .insert([{ id: data.user.id, is_admin: false }])
        .then(() => console.log('Profile created after signup'));
    }

    alert('Signup successful! Please check your email to confirm.');
  });
}

// --- Log In ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Login error: ' + error.message);
      return;
    }

    alert('Login successful!');

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single();

    if (profile?.is_admin) {
      window.location.href = '/admin.html';
    } else {
      window.location.href = '/index.html';
    }
  });
}

// --- Google Login ---
const googleBtn = document.getElementById('google-login');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      alert('Google login failed: ' + error.message);
    }
  });
}

// --- Log Out ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert('Logout error: ' + error.message);
    } else {
      alert('Logged out successfully');
      logoutBtn.style.display = 'none';
      window.location.href = '/index.html';
    }
  });
}

