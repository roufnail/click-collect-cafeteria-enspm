import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api';

const fmt = n => `${n.toLocaleString('fr-FR')} FCFA`;

export default function CheckoutModal({ onClose }) {
  const { items, total, dispatch } = useCart();
  const [name, setName]     = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);

  const handleConfirm = async () => {
    setError('');
    if (!name.trim()) return setError('Veuillez saisir votre nom ou matricule.');
    setLoading(true);
    try {
      const order = await api.createOrder({
        studentName: name.trim(),
        items: items.map(i => ({ productId: i._id, quantity: i.quantity })),
      });
      setTicket(order.ticketNumber);
      dispatch({ type: 'CLEAR' });
    } catch (e) {
      setError(e.message || 'Erreur lors de la commande.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {ticket ? (
          <>
            <div className="modal-title">Commande confirmée !</div>
            <div className="modal-sub">Présentez ce ticket à la cafétéria pour retirer votre commande.</div>
            <div className="ticket-box">
              <div className="ticket-label">Votre numéro de ticket</div>
              <div className="ticket-number">{ticket}</div>
              <div className="ticket-note">Paiement lors du retrait • Service rapide assuré</div>
            </div>
            <button className="checkout-btn" style={{ marginTop: '1.2rem' }} onClick={onClose}>Fermer</button>
          </>
        ) : (
          <>
            <div className="modal-title">Valider la commande</div>
            <div className="modal-sub">Récapitulatif de votre panier</div>
            <div className="order-summary">
              {items.map(i => (
                <div className="order-summary-row" key={i._id}>
                  <span>{i.name} ×{i.quantity}</span>
                  <span>{fmt(i.price * i.quantity)}</span>
                </div>
              ))}
              <div className="order-summary-total">
                <span>Total à payer</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <label className="field-label">Nom complet / Matricule *</label>
            <input
              className="field-input"
              placeholder="ex: 20C0210EP — AHMADOU ROUFAI"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {error && <div className="msg-err">{error}</div>}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>Annuler</button>
              <button className="btn-confirm" onClick={handleConfirm} disabled={loading}>
                {loading ? 'Envoi…' : 'Commander'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
