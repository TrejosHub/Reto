import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.send('Parqueatrejos API en ejecución. Prueba /api/health o /api/vehicles');
});

// Salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Modelo simple en memoria para "vehículos"
 * Estructura: { id, plate, owner, checkIn, checkOut, status }
 * status: 'inside' | 'outside'
 */
let seq = 1;
const vehicles = [];

// Listar vehículos (opcional ?status=inside|outside)
app.get('/api/vehicles', (req, res) => {
  const { status } = req.query;
  if (status === 'inside' || status === 'outside') {
    return res.json(vehicles.filter(v => v.status === status));
  }
  res.json(vehicles);
});

// Obtener vehículo por id
app.get('/api/vehicles/:id', (req, res) => {
  const id = Number(req.params.id);
  const v = vehicles.find(v => v.id === id);
  if (!v) return res.status(404).json({ error: 'vehicle not found' });
  res.json(v);
});

// Ingreso (check-in)
app.post('/api/vehicles', (req, res) => {
  const { plate, owner } = req.body;
  if (!plate || !plate.trim()) {
    return res.status(400).json({ error: 'plate is required' });
  }
  const now = new Date().toISOString();
  const record = {
    id: seq++,
    plate: plate.trim().toUpperCase(),
    owner: owner?.trim() || '',
    checkIn: now,
    checkOut: null,
    status: 'inside'
  };
  vehicles.push(record);
  res.status(201).json(record);
});

// Actualizar o salida (check-out)
// - Para check-out: enviar { action: 'checkout' } o { checkOut: 'ISO' }
app.put('/api/vehicles/:id', (req, res) => {
  const id = Number(req.params.id);
  const v = vehicles.find(v => v.id === id);
  if (!v) return res.status(404).json({ error: 'vehicle not found' });

  const { plate, owner, checkOut, action, status } = req.body;

  if (plate !== undefined) v.plate = String(plate).trim().toUpperCase();
  if (owner !== undefined) v.owner = String(owner).trim();

  if (action === 'checkout' || checkOut !== undefined) {
    v.checkOut = checkOut ? new Date(checkOut).toISOString() : new Date().toISOString();
    v.status = 'outside';
  }

  if (status === 'inside' || status === 'outside') {
    v.status = status;
    if (status === 'inside') v.checkOut = null;
    if (status === 'outside' && !v.checkOut) v.checkOut = new Date().toISOString();
  }

  res.json(v);
});

// Eliminar registro
app.delete('/api/vehicles/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = vehicles.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: 'vehicle not found' });
  const [deleted] = vehicles.splice(idx, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Parqueatrejos API escuchando en http://localhost:${PORT}`);
});