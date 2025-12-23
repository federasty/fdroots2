import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import NeuralBackground from './components/NeuralBackground.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
      <NeuralBackground intensity="medium">
        <App />
      </NeuralBackground>
  
  </StrictMode>,
)