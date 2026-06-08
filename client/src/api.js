const BASE = '/api';

export const api = {
  getProducts: () =>
    fetch(`${BASE}/products`).then(r => r.json()),

  getOrders: () =>
    fetch(`${BASE}/orders`).then(r => r.json()),

  createOrder: (body) =>
    fetch(`${BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(async r => {
      const data = await r.json();
      if (!r.ok) throw new Error(data.message || 'Erreur serveur');
      return data;
    }),

  updateStatus: (id, status) =>
    fetch(`${BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then(r => r.json()),
};
