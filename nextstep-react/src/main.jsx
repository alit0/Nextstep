import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import DataDeletionPage from './pages/DataDeletionPage.jsx'
import './index.css'

// Crear router con las flags futuras para evitar advertencias
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/politicas" element={<PrivacyPage />} />
      <Route path="/eliminacion-datos" element={<DataDeletionPage />} />
    </>
  ),
  {
    // Configurar las flags futuras para React Router v7
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)