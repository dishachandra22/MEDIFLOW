import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor' | 'staff'
  const [patientId, setPatientId] = useState(1);
  const [patientName, setPatientName] = useState('Varsha');
  const [doctorId, setDoctorId] = useState(1);
  const [doctorName, setDoctorName] = useState('Dr. Ananya Rao');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mediflow_midnight_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default to Midnight Blue + Electric Cyan!
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mediflow_midnight_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mediflow_midnight_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        patientId,
        setPatientId,
        patientName,
        setPatientName,
        doctorId,
        setDoctorId,
        doctorName,
        setDoctorName,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
