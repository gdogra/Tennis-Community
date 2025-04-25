import { auth } from './firebaseConfig.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export function handleLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function handleSignup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function handleAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export function handleLogout() {
  return signOut(auth);
}

