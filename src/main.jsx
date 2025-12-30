import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UIProvider } from './context/UIContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <CartProvider>
        <WishlistProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </WishlistProvider>
    </CartProvider>
    </UIProvider>
  </StrictMode>,
)
