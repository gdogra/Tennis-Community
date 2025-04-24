// js/admin.js

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return (window.location.href = '/auth/login.html');

  const userId = userData.user.id;
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (!profile?.is_admin) return (window.location.href = '/');

  loadStats();
  loadPlayers();
  loadUserRoles();
});

async function loadStats() {
  const { data: players } = await supabase.from('players').select('*');

  document.getElementById('total-players').textContent = players.length;
  document.getElementById('beginner-count').textContent = players.filter(p => p.skill_level === 'Beginner').length;
  document.getElementById('intermediate-count').textContent = players.filter(p => p.skill_level === 'Intermediate').length;
  document.getElementById('advanced-count').textContent = players.filter(p => p.skill_level === 'Advanced').length;
}

async function loadPlayers() {
  const { data: players } = await supabase.from('players').select('*');
  const tbody = document.getElementById('players-body');
  tbody.innerHTML = '';

  players.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td contenteditable="true" data-field="name" data-id="${p.id}">${p.name}</td>
      <td>${p.email || ''}</td>
      <td contenteditable="true" data-field="skill_level" data-id="${p.id}">${p.skill_level}</td>
      <td><button onclick="deletePlayer('${p.id}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.addEventListener(
    'blur',
    async (e) => {
      if (e.target.matches('[contenteditable]')) {
        const id = e.target.dataset.id;
        const field = e.target.dataset.field;
        const value = e.target.textContent;
        await supabase.from('players').update({ [field]: value }).eq('id', id);
      }
    },
    true
  );
}

async function deletePlayer(id) {
  if (confirm('Delete this player?')) {
    await supabase.from('players').delete().eq('id', id);
    loadPlayers();
    loadStats();
  }
}

async function loadUserRoles() {
  const { data: profiles } = await supabase.from('profiles').select('id, is_admin');
  const tbody = document.getElementById('roles-body');
  tbody.innerHTML = '';

  profiles.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.is_admin ? '✅' : '❌'}</td>
      <td>
        <button onclick="toggleAdmin('${p.id}', ${p.is_admin})">
          ${p.is_admin ? 'Demote' : 'Promote'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function toggleAdmin(id, current) {
  await supabase.from('profiles').update({ is_admin: !current }).eq('id', id);
  loadUserRoles();
}

