const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://admin:yourpassword@localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeTaken: { type: Number, required: true },
  difficulty: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);

app.get('/api/leaderboard/:difficulty', async (req, res) => {
  try {
    const { difficulty } = req.params;
    const entries = await LeaderboardEntry.find({ difficulty })
      .sort({ timeTaken: 1 })
      .limit(100);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    const { name, timeTaken, difficulty } = req.body;
    if (!name || !timeTaken || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const entry = new LeaderboardEntry({ name, timeTaken, difficulty });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.delete('/api/leaderboard', async (req, res) => {
  try {
    await LeaderboardEntry.deleteMany({});
    res.json({ message: 'Leaderboard cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear leaderboard' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});