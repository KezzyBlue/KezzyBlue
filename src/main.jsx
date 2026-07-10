import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainLayout from './layouts/main/MainLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MainLayout> </MainLayout>
  </StrictMode>,
)
