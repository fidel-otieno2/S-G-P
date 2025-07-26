const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Read goals from db.json
app.get('/api/goals', (req, res) => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(data);
    res.json(db.goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read goals' });
  }
});

// Save goals to db.json
app.post('/api/goals/save', (req, res) => {
  try {
    const { goals } = req.body;
    const db = { goals };
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save goals' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});