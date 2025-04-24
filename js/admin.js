// js/admin.js

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...'; // truncated for clarity

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert('Please log in first.');
    window.location.href = '/auth/login.html';
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    alert('Access denied. Admins only.');
    window.location.href = '/index.html';
    return;
  }

  const { data: players, error: playersError } = await supabase.from('players').select('*');
  const container = document.getElementById('player-data');

  if (playersError) {
    container.innerHTML = `<li>Error loading players: ${playersError.message}</li>`;
    return;
  }

  if (!players || players.length === 0) {
    container.innerHTML = '<li>No players found.</li>';
    return;
  }

  container.innerHTML = players
    .map(p => `<li><strong>${p.name}</strong> — Skill Level: ${p.skill_level}</li>`)
    .join('');
});

