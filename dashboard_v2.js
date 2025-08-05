// ===== Sacred Multiverse Dashboard v2 (v2.2 Upgrade) =====

// Firebase v9 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// --- Your Firebase Config ---
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "sacredsystemmmo.firebaseapp.com",
    databaseURL: "https://sacredsystemmmo-default-rtdb.firebaseio.com",
    projectId: "sacredsystemmmo",
    storageBucket: "sacredsystemmmo.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("🔥 Sacred Dashboard v2.2 Loaded");

// --- Select DOM Elements ---
const playersContainer = document.querySelector('.active-players');
const npcsContainer = document.querySelector('.active-npcs');
const raidsContainer = document.querySelector('.active-raids');
const logsContainer = document.querySelector('.sacred-logs');

// --- Fetch Active Players ---
function loadPlayers() {
    const playersRef = ref(db, 'sacredSystem/players');

    onValue(playersRef, (snapshot) => {
        const players = snapshot.val();
        playersContainer.innerHTML = "";

        if (!players) {
            playersContainer.innerHTML = `<p>No players online...</p>`;
            return;
        }

        Object.keys(players).forEach(playerName => {
            const player = players[playerName];

            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <strong>${playerName}</strong>
                <br> Level ${player.level}, XP: ${player.xp}, Status: ${player.status}
                <br><em>${player.sacredTitle}</em>
            `;

            if (player.status === "online") {
                card.style.color = "#00ff90";
            } else if (player.status === "idle") {
                card.style.color = "#ffcc00";
            } else {
                card.style.color = "#999";
            }

            playersContainer.appendChild(card);
        });
    });
}

// --- Fetch Active NPCs ---
function loadNPCs() {
    const npcsRef = ref(db, 'sacredSystem/npcs');

    onValue(npcsRef, (snapshot) => {
        const npcs = snapshot.val();
        npcsContainer.innerHTML = "";

        if (!npcs) {
            npcsContainer.innerHTML = `<p>No NPCs active...</p>`;
            return;
        }

        Object.keys(npcs).forEach(npcName => {
            const npc = npcs[npcName];
            const card = document.createElement('div');
            card.className = 'npc-card';
            card.innerHTML = `<strong>${npcName}</strong> - ${npc.status || 'unknown'}`;
            npcsContainer.appendChild(card);
        });
    });
}

// --- Fetch Active Raids ---
function loadRaids() {
    const raidsRef = ref(db, 'sacredSystem/raids');

    onValue(raidsRef, (snapshot) => {
        const raids = snapshot.val();
        raidsContainer.innerHTML = "";

        if (!raids) {
            raidsContainer.innerHTML = `<p>No raids active...</p>`;
            return;
        }

        Object.keys(raids).forEach(raidName => {
            const raid = raids[raidName];
            const card = document.createElement('div');
            card.className = 'raid-card';
            card.innerHTML = `
                <strong>${raidName}</strong> 
                <br>Status: ${raid.status || 'unknown'} 
                <br>Players: ${raid.players || 0}
            `;
            raidsContainer.appendChild(card);
        });
    });
}

// --- Fetch Sacred Logs ---
function loadLogs() {
    const logsRef = ref(db, 'sacredSystem/logs');

    onValue(logsRef, (snapshot) => {
        const logs = snapshot.val();
        logsContainer.innerHTML = "";

        if (!logs) {
            logsContainer.innerHTML = `<p>No data yet...</p>`;
            return;
        }

        // Show the 10 most recent logs
        const logEntries = Object.values(logs)
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, 10);

        logEntries.forEach(log => {
            const card = document.createElement('div');
            card.className = 'log-entry';
            const time = log.timestamp 
                ? new Date(log.timestamp).toLocaleTimeString() 
                : 'Unknown';
            card.innerHTML = `[${time}] ${log.message || JSON.stringify(log)}`;
            logsContainer.appendChild(card);
        });
    });
}

// --- Load everything ---
loadPlayers();
loadNPCs();
loadRaids();
loadLogs();
