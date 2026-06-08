import { createContext, useContext, useReducer } from 'react';

const CartCtx = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i._id === action.product._id);
      if (existing)
        return state.map(i => i._id === action.product._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE':    return state.filter(i => i._id !== action.id);
    case 'INCREMENT': return state.map(i => i._id === action.id ? { ...i, quantity: i.quantity + 1 } : i);
    case 'DECREMENT': return state.map(i => i._id === action.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i);
    case 'CLEAR':     return [];
    default:          return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return (
    <CartCtx.Provider value={{ items, dispatch, total, count }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
