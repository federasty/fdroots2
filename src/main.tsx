import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 👈 Importar BrowserRouter de React Router Dom
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 👈 ENVOLTURA NECESARIA */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)