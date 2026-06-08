const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: [true, 'Nom requis'], trim: true },
  price:       { type: Number, required: [true, 'Prix requis'], min: 0 },
  category:    { type: String, enum: ['Plat', 'Boisson', 'Encas', 'Dessert'], default: 'Plat' },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
