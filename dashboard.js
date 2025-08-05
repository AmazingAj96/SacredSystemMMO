import { db } from './firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Listen for data changes
onValue(ref(db), (snapshot) => {
  const data = snapshot.val() || {};

  document.querySelector('#activePlayers').innerText = Object.keys(data.Players || {}).length || 0;
  document.querySelector('#activeNPCs').innerText = Object.keys(data.NPCs || {}).length || 0;
  document.querySelector('#activeRaids').innerText = Object.keys(data.Raids || {}).length || 0;
  document.querySelector('#sacredLogs').innerText = Object.keys(data.Logs || {}).length || 0;
});
