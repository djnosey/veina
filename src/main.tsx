import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource-variable/plus-jakarta-sans'
import './i18n'
import './styles/index.css'
import App from './App.tsx'
import CostCalculator from './pages/CostCalculator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculadora" element={<CostCalculator />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
