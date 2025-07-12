const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
