import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// CRUD simple en memoria
const items = [{ id: 1, name: 'Item 1' }];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const item = { id: items.length ? items[items.length - 1].id + 1 : 1, name };
  items.push(item);
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});