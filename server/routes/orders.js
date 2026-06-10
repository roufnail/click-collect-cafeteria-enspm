// Routes Orders — AZEMO STEVE
const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders — créer une commande (recalcul prix côté serveur)
router.post('/', async (req, res) => {
  try {
    const { studentName, items } = req.body;
    if (!studentName || !items?.length)
      return res.status(400).json({ message: 'Nom étudiant et articles requis' });

    let totalPrice = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product)        return res.status(404).json({ message: `Produit ${item.productId} introuvable` });
      if (!product.isAvailable) return res.status(400).json({ message: `"${product.name}" n'est plus disponible` });
      const qty = parseInt(item.quantity) || 1;
      totalPrice += product.price * qty;
      validatedItems.push({ productId: product._id, name: product.name, price: product.price, quantity: qty });
    }

    const order = await new Order({ studentName, items: validatedItems, totalPrice }).save();
    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: 'Erreur serveur', error: err.message }); }
});

// GET /api/orders — toutes les commandes (gérant)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: 'Erreur serveur', error: err.message }); }
});

// GET /api/orders/:id — détail d'une commande
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(order);
  } catch (err) { res.status(400).json({ message: 'ID invalide', error: err.message }); }
});

// PATCH /api/orders/:id/status — mettre à jour le statut
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['En attente', 'Pret', 'Termine'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: `Statut invalide. Valeurs : ${allowed.join(', ')}` });

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(order);
  } catch (err) { res.status(400).json({ message: 'Erreur', error: err.message }); }
});

module.exports = router;
