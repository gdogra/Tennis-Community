// js/admin.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    alert('You must be logged in');
    window.location.href = '/auth/login.html';
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    alert('Access denied: Admins only');
    window.location.href = '/';
    return;
  }

  const { data: players, error: playersError } = await supabase
    .from('players')
    .select('*');

  const adminSection = document.getElementById('admin-content');

  if (playersError) {
    adminSection.innerHTML = `<p>Error loading players: ${playersError.message}</p>`;
    return;
  }

  adminSection.innerHTML = `
    <h2>Player Management</h2>
    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Skill Level</th>
        </tr>
      </thead>
      <tbody>
        ${players
          .map(
            (p) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>${p.skill_level}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
});

