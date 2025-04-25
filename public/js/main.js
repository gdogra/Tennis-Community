import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadPartial(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url);
  el.innerHTML = await res.text();
}

async function enhanceNavbar() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (user) {
    document.getElementById('login-link')?.remove();
    document.getElementById('register-link')?.remove();
    document.getElementById('logout-link').style.display = 'inline-block';

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (profile?.is_admin) {
      document.getElementById('admin-link').style.display = 'inline-block';
    }

    document.getElementById('logout-link')?.addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.href = '/';
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('nav-container', '/partials/navbar.html');
  await enhanceNavbar();
  await loadPartial('footer-container', '/partials/footer.html');
});

