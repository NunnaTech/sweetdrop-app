import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4FjivH4c4fFC50tHj6JLFeLcR55V2X10",
  authDomain: "sweet-drop-ea39e.firebaseapp.com",
  projectId: "sweet-drop-ea39e",
  storageBucket: "sweet-drop-ea39e.appspot.com",
  messagingSenderId: "1016627312278",
  appId: "1:1016627312278:web:f13d3a15cd2a3ce25174b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
