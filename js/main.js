// js/main.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Check for admin status
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Failed to check admin status:', error.message);
    return;
  }

  if (profile?.is_admin) {
    const nav = document.querySelector('nav ul') || document.getElementById('nav-links');
    if (nav) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="/admin.html">Admin</a>`;
      nav.appendChild(li);
    }
  }
});

