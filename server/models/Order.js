const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  studentName:  { type: String, required: [true, 'Nom/matricule requis'], trim: true },
  items:        { type: [itemSchema], validate: { validator: a => a.length > 0, message: 'Au moins 1 article requis' } },
  totalPrice:   { type: Number, required: true, min: 0 },
  status:       { type: String, enum: ['En attente', 'Pret', 'Termine'], default: 'En attente' },
  ticketNumber: { type: String, unique: true },
}, { timestamps: true });

// Génère le numéro de ticket automatiquement
orderSchema.pre('save', function (next) {
  if (!this.ticketNumber) {
    const ts   = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.ticketNumber = `TKT-${ts}-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
