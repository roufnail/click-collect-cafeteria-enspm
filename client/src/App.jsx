import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Menu            from './components/Menu';
import Cart            from './components/Cart';
import CheckoutModal   from './components/CheckoutModal';
import AdminDashboard  from './components/AdminDashboard';
import AdminLogin      from './components/AdminLogin';

function AppInner() {
  const [view, setView]       = useState('menu');
  const [checkout, setCheckout] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { count } = useCart();

  const handleAdminClick = () => {
    if (!adminAuth) {
      setShowAdminLogin(true);
      return;
    }
    setView('admin');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">Click <span>&amp;</span> Collect : Cafétéria ENSPM</div>
        <img className="header-logo" src="/enpm-logo.jpg" alt="ENPM Logo" />
        <div className="header-actions">
          <button className={`header-tab${view === 'menu' ? ' active' : ''}`} onClick={() => setView('menu')}>Menu</button>
          <button className={`header-tab${view === 'admin' ? ' active' : ''}`} onClick={handleAdminClick}>Admin</button>
          {adminAuth && (
            <button className="header-tab" onClick={() => { setAdminAuth(false); setView('menu'); }}>Déconnexion</button>
          )}
          {view === 'menu' && (
            <button className="cart-btn" onClick={() => setCheckout(true)}>
               {count > 0 && <span className="cart-count">{count}</span>} Panier
            </button>
          )}
        </div>
      </header>

      {view === 'menu' && (
        <div className="layout">
          <Menu />
          <Cart onCheckout={() => setCheckout(true)} />
        </div>
      )}
      {view === 'admin' && adminAuth && (
        <div className="layout">
          <AdminDashboard />
        </div>
      )}
      {view === 'admin' && !adminAuth && (
        <div className="layout">
          <div className="no-orders">Accès réservé. Veuillez vous connecter comme gérant.</div>
        </div>
      )}

      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
      {showAdminLogin && (
        <AdminLogin
          onCancel={() => setShowAdminLogin(false)}
          onAuthenticate={() => {
            setAdminAuth(true);
            setShowAdminLogin(false);
            setView('admin');
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
