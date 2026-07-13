import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainLayout from './layouts/main/MainLayout.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </StrictMode>,
)
