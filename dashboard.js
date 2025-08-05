// 🌌 Sacred Multiverse Dashboard v2

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyACQKI02JmztkNkC8sscx0wqq5Ppjn2oKs",
  authDomain: "sacredsystemmmo.firebaseapp.com",
  databaseURL: "https://sacredsystemmmo-default-rtdb.firebaseio.com",
  projectId: "sacredsystemmmo",
  storageBucket: "sacredsystemmmo.firebasestorage.app",
  messagingSenderId: "854698379558",
  appId: "1:854698379558:web:c4ec0830a05bcad854d9e7"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Utility to render sections
function renderSection(refName, elementId, formatter) {
  const listEl = document.getElementById(elementId);
  onValue(ref(db, refName), (snapshot) => {
    listEl.innerHTML = "";
    if (!snapshot.exists()) {
      listEl.innerHTML = `<div class="event">No data yet...</div>`;
      return;
    }

    snapshot.forEach((child) => {
      const val = child.val();
      const div = document.createElement("div");
      div.className = "event";
      div.innerHTML = formatter(child.key, val);
      listEl.appendChild(div);
    });
  });
}

// 🧙 Players
renderSection("players", "player-list", (key, val) => {
  return `<span class="player">${key}</span> — ${val.status || "Online"}`;
});

// 🌀 NPCs
renderSection("npcs", "npc-list", (key, val) => {
  return `<span class="npc">${key}</span> — ${val.status || "Idle"}`;
});

// ⚔️ Raids
renderSection("raids", "raid-list", (key, val) => {
  return `<span class="raid">${key}</span> — ${val.description || "Active Raid"}`;
});

// 📖 Logs
renderSection("logs", "log-list", (key, val) => {
  return `[${val.Time || "???"}] ${val.Type || "Event"} — ${val.Note || ""}`;
});
