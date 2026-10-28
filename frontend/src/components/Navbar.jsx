import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { 
  Bot, 
  HeartPulse,
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
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, darkMode, toggleDarkMode, patientName } = useRole();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-mint-500 via-mint-neon to-cyan-electric flex items-center justify-center text-obsidian-950 shadow-md shadow-mint-neon/30 group-hover:scale-105 group-hover:shadow-glow-mint-sm transition-all duration-300">
            <HeartPulse className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-mint-neon animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-mint-neon" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                MediFlow
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-mint-50 text-mint-700 dark:bg-obsidian-800 dark:text-mint-neon rounded-md uppercase tracking-wider border border-mint-300 dark:border-mint-neon/40 flex items-center gap-0.5 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-mint-neon" /> AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium tracking-wide">
              Hospital Intelligence Engine
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/assistant"
            className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/assistant')
                ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon border border-mint-neon/40 shadow-glow-mint-sm/30'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
            }`}
          >
            <Bot className="w-4 h-4 text-mint-neon" />
            AI Assistant
          </Link>

          {role === 'patient' && (
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/dashboard')
                  ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-mint-400" />
              Patient Portal
            </Link>
          )}

          {role === 'doctor' && (
            <Link
              to="/doctor-dashboard"
              className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/doctor-dashboard')
                  ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-cyan-electric" />
              Doctor Dashboard
            </Link>
          )}

          {role === 'staff' && (
            <Link
              to="/staff-dashboard"
              className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                isActive('/staff-dashboard')
                  ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
              }`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              Staff Operations
            </Link>
          )}

          <Link
            to="/records"
            className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/records')
                ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            Records & Summary
          </Link>

          <Link
            to="/navigation"
            className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/navigation')
                ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-mint-neon" />
            Hospital Map
          </Link>

          <Link
            to="/faq"
            className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/faq')
                ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm/30'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Hospital FAQ
          </Link>

          <Link
            to="/intelligence"
            className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
              isActive('/intelligence')
                ? 'bg-mint-neon/10 text-mint-700 dark:text-mint-neon font-semibold border border-mint-neon/40 shadow-glow-mint-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800/60'
            }`}
          >
            <Cpu className="w-4 h-4 text-mint-neon" />
            AI Intelligence
          </Link>
        </nav>

        {/* Right Section: Role Switcher & Dark Mode & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          
          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-obsidian-850 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-obsidian-700 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-mint-neon mr-1.5 shrink-0" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select User Role"
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="patient" className="bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white">Patient ({patientName})</option>
              <option value="doctor" className="bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white">Doctor (Dr. Rao)</option>
              <option value="staff" className="bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white">Staff Admin</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-xl text-slate-600 dark:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800 border border-slate-200 dark:border-obsidian-700 transition-all hover:shadow-glow-mint-sm"
            title={darkMode ? "Switch to Light Mode" : "Switch to Obsidian Theme"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-mint-neon hover:rotate-45 transition-transform" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-mint-neon hover:bg-slate-100 dark:hover:bg-obsidian-800 border border-slate-200 dark:border-obsidian-700 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-mint-neon" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-obsidian-700 bg-white/95 dark:bg-obsidian-900/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-fade-in shadow-xl">
          <Link
            to="/assistant"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isActive('/assistant') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4 text-mint-neon" />
            AI Assistant
          </Link>

          {role === 'patient' && (
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                isActive('/dashboard') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-mint-400" />
              Patient Portal
            </Link>
          )}

          {role === 'doctor' && (
            <Link
              to="/doctor-dashboard"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                isActive('/doctor-dashboard') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-cyan-electric" />
              Doctor Dashboard
            </Link>
          )}

          {role === 'staff' && (
            <Link
              to="/staff-dashboard"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                isActive('/staff-dashboard') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              Staff Operations
            </Link>
          )}

          <Link
            to="/records"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isActive('/records') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Medical Records & AI Summary
          </Link>

          <Link
            to="/navigation"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isActive('/navigation') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-mint-neon" />
            Floor Navigation & Wayfinding
          </Link>

          <Link
            to="/faq"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isActive('/faq') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/30' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Knowledge Base FAQ
          </Link>

          <Link
            to="/intelligence"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isActive('/intelligence') ? 'bg-mint-neon/10 text-mint-neon border border-mint-neon/40 shadow-glow-mint-sm' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-mint-neon" />
            AI Intelligence & Sandbox
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
