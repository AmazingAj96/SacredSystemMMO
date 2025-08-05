import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const db = getDatabase(app);

// Get references
const playersRef = ref(db, 'sacredSystem/players');
const npcsRef = ref(db, 'sacredSystem/npcs');
const raidsRef = ref(db, 'sacredSystem/multiplayerStatus');
const logsRef = ref(db, 'sacredSystem/magicMoments');

// Load Active Players
onValue(playersRef, (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('playersList');
    container.innerHTML = '';

    if (data) {
        Object.keys(data).forEach(name => {
            const player = data[name];
            container.innerHTML += `<div>🎮 <b>${name}</b> - ${player.status} | Lvl ${player.level} | ${player.sacredTitle}</div>`;
        });
    } else {
        container.innerHTML = '<div>No players online</div>';
    }
});

// Load NPCs
onValue(npcsRef, (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('npcsList');
    container.innerHTML = '';

    if (data) {
        Object.keys(data).forEach(npc => {
            container.innerHTML += `<div>🤖 ${npc}</div>`;
        });
    } else {
        container.innerHTML = '<div>No active NPCs</div>';
    }
});

// Load Raids (from multiplayerStatus)
onValue(raidsRef, (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('raidsList');
    container.innerHTML = '';

    if (data) {
        Object.keys(data).forEach(raid => {
            container.innerHTML += `<div>⚔️ Raid: ${raid}</div>`;
        });
    } else {
        container.innerHTML = '<div>No active raids</div>';
    }
});

// Load Logs (magicMoments)
onValue(logsRef, (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('logsList');
    container.innerHTML = '';

    if (data) {
        Object.keys(data).forEach(logKey => {
            container.innerHTML += `<div>📖 ${logKey}: ${data[logKey]}</div>`;
        });
    } else {
        container.innerHTML = '<div>No sacred logs</div>';
    }
});
