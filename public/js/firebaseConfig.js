import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBImlOes5-C8I0-ywO5l75dUGZiJ7LvXcE",
  authDomain: "tennisleague-8ce6b.firebaseapp.com",
  projectId: "tennisleague-8ce6b",
  storageBucket: "tennisleague-8ce6b.appspot.com",
  messagingSenderId: "878253507461",
  appId: "1:878253507461:web:17cd550e8a01a921ea7aec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

