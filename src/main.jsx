import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/auth.jsx'
import { ItemContextProvider } from './Context/item.jsx'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemContextProvider>
       <AuthProvider>
      <App />
    </AuthProvider>
    </ItemContextProvider>
   
  </StrictMode>
)
