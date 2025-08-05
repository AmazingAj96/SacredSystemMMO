import { db } from './firebase.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ---- Sacred System Sync Functions ----

// Add a Sacred Log entry
export function logSacredEvent(type, note, players = ["System"]) {
  const logsRef = ref(db, 'logs');
  const newLog = {
    Type: type,
    Note: note,
    Players: players,
    Time: new Date().toLocaleString()
  };
  push(logsRef, newLog);
}

// Update or Add NPC
export function updateNPC(name, status) {
  const npcRef = ref(db, `npcs/${name}`);
  set(npcRef, { status });
}

// Add Raid
export function addRaid(name, description) {
  const raidsRef = ref(db, `raids/${name}`);
  set(raidsRef, { description });
}

// Example: Fire test events
logSacredEvent("🌟 Magic Moment", "Atlas has connected to the Multiverse!", ["Atlas"]);
updateNPC("Atlas", "⚡ Online and Observing");
addRaid("Echo Realm Surge", "Dimensional energy spike detected.");
