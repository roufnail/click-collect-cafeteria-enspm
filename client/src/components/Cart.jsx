import { useCart } from '../context/CartContext';

const fmt = n => `${n.toLocaleString('fr-FR')} FCFA`;

export default function Cart({ onCheckout }) {
  const { items, dispatch, total, count } = useCart();

  return (
    <div className="cart-sidebar">
      <div className="cart-title"> Panier {count > 0 && `(${count})`}</div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon"></div>
          Votre panier est vide.<br />Ajoutez des articles depuis le menu.
        </div>
      ) : (
        <>
          <div>
            {items.map(item => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-name">{item.name}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => dispatch({ type: 'DECREMENT', id: item._id })}>−</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => dispatch({ type: 'INCREMENT', id: item._id })}>+</button>
                </div>
                <div className="cart-item-price">{fmt(item.price * item.quantity)}</div>
                <button className="rm-btn" onClick={() => dispatch({ type: 'REMOVE', id: item._id })}>✕</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span className="total-price">{fmt(total)}</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>Valider la commande →</button>
          <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR' })}>Vider le panier</button>
        </>
      )}
    </div>
  );
}
