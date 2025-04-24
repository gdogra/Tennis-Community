// js/main.js

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...'; // truncated for clarity

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const adminNav = document.getElementById('admin-nav');
  if (!adminNav) return;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    adminNav.style.display = 'none';
    return;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (profile?.is_admin) {
    adminNav.style.display = 'inline-block';
  } else {
    adminNav.style.display = 'none';
  }
});

