import { useState, useEffect } from 'react';
import { api } from '../api';

const fmt    = n => `${n.toLocaleString('fr-FR')} FCFA`;
const ago    = d => { const m = Math.round((Date.now() - new Date(d)) / 60000); if (m < 1) return "À l'instant"; if (m < 60) return `il y a ${m} min`; return `il y a ${Math.round(m / 60)}h`; };
const S_CLS  = { 'En attente': 'attente', 'Pret': 'pret', 'Termine': 'termine' };
const FILTERS = ['Tous', 'En attente', 'Pret', 'Termine'];

export default function AdminDashboard() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('Tous');

  const load = () => {
    setLoading(true);
    api.getOrders().then(d => { setOrders(d); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    const updated = await api.updateStatus(id, status);
    setOrders(prev => prev.map(o => o._id === id ? updated : o));
  };

  const filtered = filter === 'Tous' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div className="admin-headline">
          <div>
            <h2 className="grid-title">Tableau de bord — Gérant</h2>
            <p className="grid-sub">{orders.length} commande{orders.length !== 1 ? 's' : ''} au total</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
        <div className="admin-filters">
          {FILTERS.map(s => (
            <button key={s} className={`status-filter${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
        <button className="refresh-btn" onClick={load}>↻ Rafraîchir</button>
      </div>

      {loading ? (
        <div className="loader">Chargement…</div>
      ) : filtered.length === 0 ? (
        <div className="no-orders">Aucune commande dans cette catégorie.</div>
      ) : (
        <div className="orders-grid">
          {filtered.map(order => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <span className="ticket-chip">{order.ticketNumber}</span>
                <span className={`status-badge ${S_CLS[order.status]}`}>{order.status}</span>
              </div>
              <div className="order-student">{order.studentName}</div>
              <div className="order-items">
                {order.items.map((it, i) => <div key={i}>{it.name} ×{it.quantity}</div>)}
              </div>
              <div className="order-footer">
                <span className="order-total">{fmt(order.totalPrice)}</span>
                <span className="order-time">{ago(order.createdAt)}</span>
              </div>
              <div className="order-actions">
                {order.status === 'En attente' && (
                  <button className="action-btn to-pret" onClick={() => handleStatus(order._id, 'Pret')}>
                     Marquer Prêt
                  </button>
                )}
                {order.status === 'Pret' && (
                  <button className="action-btn to-termine" onClick={() => handleStatus(order._id, 'Termine')}>
                    Terminé / Retiré
                  </button>
                )}
                {order.status === 'Termine' && (
                  <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>Commande clôturée</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
