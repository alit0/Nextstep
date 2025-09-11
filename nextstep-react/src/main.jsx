import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import DataDeletionPage from './pages/DataDeletionPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/politicas" element={<PrivacyPage />} />
        <Route path="/eliminacion-datos" element={<DataDeletionPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)