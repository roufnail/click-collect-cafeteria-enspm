import { useCart } from '../context/CartContext';

const fmt = n => `${n.toLocaleString('fr-FR')} FCFA`;

export default function ProductCard({ product }) {
  const { dispatch, items } = useCart();
  const inCart = items.find(i => i._id === product._id);

  return (
    <div className={`product-card${!product.isAvailable ? ' unavailable' : ''}`}>
      {!product.isAvailable && <div className="rupture-badge">Rupture</div>}
      <span className={`cat-tag ${product.category}`}>{product.category}</span>
      <div className="product-name">{product.name}</div>
      <div className="product-price">
        {fmt(product.price)}<span> / unité</span>
      </div>
      <button
        className="add-btn"
        disabled={!product.isAvailable}
        onClick={() => dispatch({ type: 'ADD', product })}
      >
        {inCart ? `+ Ajouter (×${inCart.quantity})` : '+ Ajouter au panier'}
      </button>
    </div>
  );
}
