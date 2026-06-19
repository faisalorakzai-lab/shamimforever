'use client'
  import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

  export interface CartItem {
    product_id: string
    product_name: string
    slug: string
    price_usd: number
    quantity: number
    image: string
    custom_message: string
  }

  export interface DeliveryInfo {
    name: string; phone: string; address: string; city: string; country: string
  }

  interface CartState { items: CartItem[]; delivery: DeliveryInfo }

  type CartAction =
    | { type: 'ADD_ITEM'; item: CartItem }
    | { type: 'REMOVE_ITEM'; product_id: string }
    | { type: 'UPDATE_QTY'; product_id: string; quantity: number }
    | { type: 'CLEAR' }
    | { type: 'LOAD'; state: CartState }
    | { type: 'SET_DELIVERY'; delivery: DeliveryInfo }

  const emptyDelivery: DeliveryInfo = { name: '', phone: '', address: '', city: '', country: '' }

  function reducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case 'ADD_ITEM': {
        const ex = state.items.find(i => i.product_id === action.item.product_id)
        if (ex) return { ...state, items: state.items.map(i => i.product_id === action.item.product_id ? { ...i, quantity: i.quantity + action.item.quantity, custom_message: action.item.custom_message } : i) }
        return { ...state, items: [...state.items, action.item] }
      }
      case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.product_id !== action.product_id) }
      case 'UPDATE_QTY': return { ...state, items: state.items.map(i => i.product_id === action.product_id ? { ...i, quantity: action.quantity } : i) }
      case 'CLEAR': return { items: [], delivery: state.delivery }
      case 'LOAD': return action.state
      case 'SET_DELIVERY': return { ...state, delivery: action.delivery }
      default: return state
    }
  }

  interface CartCtx {
    items: CartItem[]
    delivery: DeliveryInfo
    addItem: (item: CartItem) => void
    removeItem: (product_id: string) => void
    updateQty: (product_id: string, quantity: number) => void
    clearCart: () => void
    setDelivery: (d: DeliveryInfo) => void
    totalItems: number
    totalPrice: number
  }

  const CartContext = createContext<CartCtx>({
    items: [], delivery: emptyDelivery, addItem: () => {}, removeItem: () => {}, updateQty: () => {}, clearCart: () => {}, setDelivery: () => {}, totalItems: 0, totalPrice: 0
  })

  export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { items: [], delivery: emptyDelivery })

    useEffect(() => {
      try {
        const stored = localStorage.getItem('sf_cart_v2')
        if (stored) dispatch({ type: 'LOAD', state: JSON.parse(stored) })
      } catch {}
    }, [])

    useEffect(() => {
      try { localStorage.setItem('sf_cart_v2', JSON.stringify(state)) } catch {}
    }, [state])

    return (
      <CartContext.Provider value={{
        items: state.items,
        delivery: state.delivery,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', product_id: id }),
        updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', product_id: id, quantity: qty }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        setDelivery: (d) => dispatch({ type: 'SET_DELIVERY', delivery: d }),
        totalItems: state.items.reduce((s, i) => s + i.quantity, 0),
        totalPrice: state.items.reduce((s, i) => s + i.price_usd * i.quantity, 0),
      }}>
        {children}
      </CartContext.Provider>
    )
  }

  export const useCart = () => useContext(CartContext)
  