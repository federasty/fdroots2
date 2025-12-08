import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.tsx'
import NeuralBackground from './components/NeuralBackground.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NeuralBackground intensity="medium">
        <App />
      </NeuralBackground>
    </BrowserRouter>
  </StrictMode>,
)