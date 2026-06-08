import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { api } from '../api';

const CATS = ['Tous', 'Plat', 'Boisson', 'Encas', 'Dessert'];

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [cat, setCat]           = useState('Tous');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.getProducts().then(d => { setProducts(d); setLoading(false); });
  }, []);

  const filtered = cat === 'Tous' ? products : products.filter(p => p.category === cat);

  if (loading) return <div className="loader">Chargement du menu…</div>;

  return (
    <div className="product-grid">
      <div className="menu-header">
        <div>
          <h2 className="grid-title">Menu du jour</h2>
          <p className="grid-sub">{products.length} articles disponibles</p>
        </div>
      </div>
      <div className="filters">
        {CATS.map(c => (
          <button
            key={c}
            className={`filter-pill${cat === c ? ' active' : ''}`}
            onClick={() => setCat(c)}
          >{c}</button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
