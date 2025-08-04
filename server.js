const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Root route: serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example test route (optional)
app.get('/ping', (req, res) => {
  res.send('🔥 Sacred System MMO Server is Running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Sacred System MMO server running on port ${PORT}`);
});
