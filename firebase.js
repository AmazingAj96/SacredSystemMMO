// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyACQKI02JmztkNkC8sscx0wqq5Ppjn2oKs",
  authDomain: "sacredsystemmmo.firebaseapp.com",
  projectId: "sacredsystemmmo",
  storageBucket: "sacredsystemmmo.firebasestorage.app",
  messagingSenderId: "854698379558",
  appId: "1:854698379558:web:c4ec0830a05bcad854d9e7",
  databaseURL: "https://sacredsystemmmo-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
