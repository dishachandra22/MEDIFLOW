import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { 
  Bot, 
  LayoutDashboard, 
  FileText, 
  MapPin, 
  HelpCircle, 
  Cpu, 
  UserCheck, 
  Sun, 
  Moon,
  Stethoscope,
  Building2,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, darkMode, toggleDarkMode, patientName } = useRole();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 via-brand-500 to-teal-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-teal-400">
                MediFlow
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 rounded-md uppercase tracking-wider border border-brand-200 dark:border-brand-800 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-teal-500" /> AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">Smart Hospital Assistant</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/assistant"
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/assistant')
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-brand-500" />
            AI Assistant
          </Link>

          {role === 'patient' && (
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/dashboard')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Patient Portal
            </Link>
          )}

          {role === 'doctor' && (
            <Link
              to="/doctor-dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/doctor-dashboard')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-500" />
              Doctor Dashboard
            </Link>
          )}

          {role === 'staff' && (
            <Link
              to="/staff-dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/staff-dashboard')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-500" />
              Staff Operations
            </Link>
          )}

          <Link
            to="/records"
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/records')
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Records & AI Summary
          </Link>

          <Link
            to="/navigation"
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/navigation')
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Hospital Map
          </Link>

          <Link
            to="/faq"
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/faq')
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Hospital FAQ
          </Link>

          <Link
            to="/intelligence"
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/intelligence')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-teal-500" />
            AI Intelligence
          </Link>
        </nav>

        {/* Right Section: Role Switcher & Dark Mode */}
        <div className="flex items-center gap-2">
          
          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-brand-500 ml-1.5 mr-1" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select User Role"
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="patient" className="bg-white dark:bg-slate-900">Role: Patient ({patientName})</option>
              <option value="doctor" className="bg-white dark:bg-slate-900">Role: Doctor (Dr. Rao)</option>
              <option value="staff" className="bg-white dark:bg-slate-900">Role: Staff Admin</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
