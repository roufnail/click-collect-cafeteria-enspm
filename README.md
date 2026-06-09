#  Click & Collect: Cafétéria — ENSPM
> Supervision : MANAODA DEUHWE Yves Hermann

---

## Prérequis (Kali Linux / Ubuntu)

```bash
# Vérifier Node.js (v18+ requis)
node --version

# Installer Node.js si absent
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer et démarrer MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

---

## 1. Lancer le Back-End

```bash
cd server
npm install
cp .env.example .env        # éditer si besoin
npm run seed                # injecter le menu par défaut
npm run dev                 # serveur sur http://localhost:5000
```

## 2. Lancer le Front-End

```bash
cd client
npm install
npm run dev                 # app sur http://localhost:5173
```

---

## Structure du projet

```
cafeteria-enspm/
├── server/
│   ├── models/
│   │   ├── Product.js          # Schéma Mongoose Produit
│   │   └── Order.js            # Schéma Mongoose Commande + ticketNumber auto
│   ├── routes/
│   │   ├── products.js         # GET /api/products  POST  PATCH /:id/availability
│   │   └── orders.js           # POST /api/orders   GET   PATCH /:id/status
│   ├── server.js               # Point d'entrée Express
│   ├── seed.js                 # npm run seed → 15 produits en BDD
│   ├── .env.example
│   └── package.json
└── client/
    ├── src/
    │   ├── context/
    │   │   └── CartContext.jsx  # État global panier (useReducer + Context API)
    │   ├── components/
    │   │   ├── ProductCard.jsx
    │   │   ├── Menu.jsx
    │   │   ├── Cart.jsx
    │   │   ├── CheckoutModal.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── api.js               # Fonctions fetch vers le Back-End
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js           # Proxy /api → localhost:5000
    └── package.json
```

## Routes API

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/products` | Produits disponibles |
| GET | `/api/products/all` | Tous les produits (admin) |
| POST | `/api/products` | Créer un produit |
| PATCH | `/api/products/:id/availability` | Changer disponibilité |
| POST | `/api/orders` | Créer une commande |
| GET | `/api/orders` | Toutes les commandes (gérant) |
| GET | `/api/orders/:id` | Détail commande |
| PATCH | `/api/orders/:id/status` | Changer statut |
