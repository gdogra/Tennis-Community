// auth.js - Handles user auth for Tennis Community

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase project credentials (include yours below)
const SUPABASE_URL = 'https://tvdiznpwmmimcwywaxew.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZGl6bnB3bW1pbWN3eXdheGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ0MDQsImV4cCI6MjA2MTA0MDQwNH0.btc5JdXafOs-eqEo828aAxWOf3iBCPqCO6DDFe0WjWc'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function insertProfile(user) {
  await supabase.from('profiles').upsert([
    {
      id: user.id,
      is_admin: false,
      created_at: new Date().toISOString()
    }
  ])
}

// Sign Up
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('signup-email').value
  const password = document.getElementById('signup-password').value

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert('Sign-up error: ' + error.message)
  } else {
    await insertProfile(data.user)
    alert('Signup successful! Please check your email to confirm.')
  }
})

// Log In
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('Login error: ' + error.message)
  } else {
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', data.user.id).single()

    if (profile?.is_admin) {
      alert('Welcome Admin! You have elevated access.')
      window.location.href = '/admin.html'
    } else {
      alert('Login successful!')
      window.location.href = '/index.html'
    }
  }
})

// Google login
document.getElementById('google-login')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/auth/callback.html'
    }
  })
  if (error) alert('Google login error: ' + error.message)
})

