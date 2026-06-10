# Click & Collect — Cafétéria ENSPM

Projet Full-Stack développé dans le cadre du cours de IDE ET FRAMEWORK — INFOTEL IC3, ENSPM 2025-2026.

## Prérequis
- Node.js v18+
- MongoDB (local ou Atlas)

## 1. Initialiser la base de données
```bash
cd server
npm install
cp .env.example .env   # puis renseigne MONGO_URI
node seed.js
```

## 2. Lancer le serveur Express
```bash
cd server
npm run dev
# API disponible sur http://localhost:5000
```

## 3. Démarrer l'application React
```bash
cd client
npm install
npm run dev
# Interface sur http://localhost:5173
```

## Stack technique
- **Front-End** : React 18 + Vite, Context API
- **Back-End** : Node.js, Express.js
- **Base de données** : MongoDB + Mongoose

## Équipe
- [AHMADOU ROUFAI-IC4_SEC] — Chef de projet / Architecture
- [AZEMO STEVE IVRIC-IC4_DSC] — Lead Back-End
- [HAWAOU MOUSSA-IC4_DSC] — Back-End / Config
- [WANGBI DOURGA HONORE-IC4_DSC] — Lead Front-End
- [SINGA FREDERIC-IC3_SEC] — Front-End / Intégration
