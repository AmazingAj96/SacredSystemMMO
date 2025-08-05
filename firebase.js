// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyACQKI02JmztkNkC8sscx0wqq5Ppjn2oKs",
  authDomain: "sacredsystemmmo.firebaseapp.com",
  databaseURL: "https://sacredsystemmmo-default-rtdb.firebaseio.com",
  projectId: "sacredsystemmmo",
  storageBucket: "sacredsystemmmo.firebasestorage.app",
  messagingSenderId: "854698379558",
  appId: "1:854698379558:web:c4ec0830a05bcad854d9e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = getDatabase(app);

// Export db so dashboard can use it
export { db };
