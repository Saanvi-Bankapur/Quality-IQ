import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ChecklistsPage from './pages/ChecklistsPage';
import FailuresPage from './pages/FailuresPage';
import CertificationsPage from './pages/CertificationsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="checklists" element={<ChecklistsPage />} />
            <Route path="failures" element={<FailuresPage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;