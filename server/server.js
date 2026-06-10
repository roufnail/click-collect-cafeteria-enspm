// Configuration serveur Express — Cafétéria ENSPM | HAWAOU MOUSSArequire('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');

const productRoutes = require('./routes/products');
const orderRoutes   = require('./routes/orders');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middlewares ────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ─────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);
app.get('/', (_req, res) => res.json({ message: '  API Click & Collect ENSPM — OK' }));
app.use((_req, res) => res.status(404).json({ message: 'Route introuvable' }));

// ── MongoDB ────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafeteria_enspm';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('  MongoDB connecté :', MONGO_URI);
    app.listen(PORT, () => console.log(`  Serveur sur http://localhost:${PORT}`));
  })
  .catch(err => { console.error('  MongoDB :', err.message); process.exit(1); });
