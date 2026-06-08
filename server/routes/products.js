const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// GET /api/products — produits disponibles (vue client)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    res.json(products);
  } catch (err) { res.status(500).json({ message: 'Erreur serveur', error: err.message }); }
});

// GET /api/products/all — tous les produits (vue admin)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ category: 1, name: 1 });
    res.json(products);
  } catch (err) { res.status(500).json({ message: 'Erreur serveur', error: err.message }); }
});

// POST /api/products — créer un produit
router.post('/', async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.status(201).json(product);
  } catch (err) { res.status(400).json({ message: 'Données invalides', error: err.message }); }
});

// PATCH /api/products/:id/availability — changer disponibilité
router.patch('/:id/availability', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isAvailable: req.body.isAvailable },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(product);
  } catch (err) { res.status(400).json({ message: 'Erreur', error: err.message }); }
});

module.exports = router;
