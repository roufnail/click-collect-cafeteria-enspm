require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafeteria_enspm';

const menu = [
  { name: 'Riz sauté au poulet',      price: 800,  category: 'Plat',    isAvailable: true },
  { name: 'Plantain frit + poisson',  price: 700,  category: 'Plat',    isAvailable: true },
  { name: 'Sandwich poulet-crudités', price: 500,  category: 'Plat',    isAvailable: true },
  { name: 'Haricots rouges + macabo', price: 600,  category: 'Plat',    isAvailable: true },
  { name: 'Omelette baguette',        price: 400,  category: 'Plat',    isAvailable: true },
  { name: 'Eau minérale 50cl',        price: 150,  category: 'Boisson', isAvailable: true },
  { name: 'Jus de gingembre maison',  price: 250,  category: 'Boisson', isAvailable: true },
  { name: 'Coca-Cola 33cl',           price: 300,  category: 'Boisson', isAvailable: true },
  { name: 'Café nescafé',             price: 200,  category: 'Boisson', isAvailable: true },
  { name: 'Lait Chocomalt',           price: 250,  category: 'Boisson', isAvailable: true },
  { name: 'Beignets de haricot (x5)', price: 200,  category: 'Encas',   isAvailable: true },
  { name: 'Galette maïs',             price: 150,  category: 'Encas',   isAvailable: true },
  { name: 'Cacahuètes grillées',      price: 100,  category: 'Encas',   isAvailable: true },
  { name: 'Yaourt brassé nature',     price: 250,  category: 'Dessert', isAvailable: true },
  { name: 'Banane sucrée',            price: 100,  category: 'Dessert', isAvailable: true },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('  MongoDB connecté');
    const { deletedCount } = await Product.deleteMany({});
    console.log(`   ${deletedCount} anciens produits supprimés`);
    const inserted = await Product.insertMany(menu);
    console.log(`  ${inserted.length} produits insérés :`);
    inserted.forEach(p => console.log(`   • [${p.category}] ${p.name} — ${p.price} FCFA`));
  } catch (err) {
    console.error('  Erreur seed :', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('  Connexion fermée');
  }
}

seed();
