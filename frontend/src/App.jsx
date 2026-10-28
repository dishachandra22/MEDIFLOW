import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import AssistantPage from './pages/AssistantPage';
import PatientDashboard from './pages/PatientDashboard';
import RecordsPage from './pages/RecordsPage';
import NavigationPage from './pages/NavigationPage';
import FAQPage from './pages/FAQPage';
import DoctorDashboard from './pages/DoctorDashboard';
import StaffDashboard from './pages/StaffDashboard';
import IntelligencePage from './pages/IntelligencePage';

function App() {
  return (
    <RoleProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-obsidian-950 dark:text-slate-100 transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/navigation" element={<NavigationPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/intelligence" element={<IntelligencePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </RoleProvider>
  );
}

export default App;
