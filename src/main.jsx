import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './contexts/CartContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
)
