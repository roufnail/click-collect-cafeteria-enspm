import { useState } from 'react';

export default function AdminLogin({ onCancel, onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const secret = import.meta.env.VITE_ADMIN_PASSWORD || 'gerant123';
    if (password.trim() === secret) {
      setError('');
      onAuthenticate();
      return;
    }
    setError('Mot de passe incorrect.');
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal" style={{ maxWidth: '420px' }}>
        <div className="modal-title">Connexion Gérant</div>
        <div className="modal-sub">Ce tableau de bord est réservé au personnel autorisé.</div>
        <form onSubmit={handleSubmit}>
          {error && <div className="msg-err">{error}</div>}
          <label className="field-label">Mot de passe</label>
          <input
            className="field-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Entrez le mot de passe"
            autoFocus
          />
          <div className="modal-actions" style={{ justifyContent: 'flex-end' }}>
            <button className="btn-cancel" type="button" onClick={onCancel}>Annuler</button>
            <button className="btn-confirm" type="submit">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}
