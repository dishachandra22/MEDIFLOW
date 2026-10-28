import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  CalendarCheck, 
  FileSpreadsheet, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Building,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const LandingPage = () => {
  const navigate = useNavigate();

  const scenarios = [
    { num: 1, title: "Specialist Search", query: "I need to see a cardiologist", intent: "Doctor Search", desc: "Extracts Cardiology & displays specialist cards" },
    { num: 2, title: "Date-Filtered Search", query: "I want to consult a heart specialist this week", intent: "Doctor Search", desc: "Maps synonym to Cardiology & finds open slots" },
    { num: 3, title: "Synonym Parsing", query: "I need to see a skin specialist", intent: "Doctor Search", desc: "Maps 'skin specialist' to Dermatology" },
    { num: 4, title: "Date Query", query: "What doctors are available tomorrow?", intent: "Doctor Search", desc: "Filters unbooked slots on tomorrow's date" },
    { num: 5, title: "Appointment Status", query: "When is my next appointment?", intent: "Appointment Status", desc: "Queries upcoming appointment for Varsha" },
    { num: 6, title: "Hospital Navigation", query: "Where is the radiology department?", intent: "Hospital Navigation", desc: "Highlights Ground Floor with pulse directions" },
    { num: 7, title: "Record Summarization", query: "Summarize my recent appointments", intent: "Patient Record Summary", desc: "Generates plain-language clinical overview" },
    { num: 8, title: "Safety Filter Guardrail", query: "What disease do I have if I have chest pain?", intent: "Medical Guardrail Refusal", desc: "Blocks diagnostic request with emergency hotline" }
  ];

  const departments = [
    { name: "Cardiology", floor: "First Floor", room: "102-105", icon: HeartPulse, color: "text-red-400" },
    { name: "Dermatology", floor: "Second Floor", room: "204-206", icon: Sparkles, color: "text-amber-400" },
    { name: "Orthopedics", floor: "Ground Floor", room: "012-015", icon: Activity, color: "text-emerald-400" },
    { name: "Pediatrics", floor: "Second Floor", room: "210-214", icon: User, color: "text-cyan-400" },
    { name: "Neurology", floor: "First Floor", room: "110-112", icon: Zap, color: "text-purple-400" },
    { name: "ENT", floor: "Ground Floor", room: "018-020", icon: Building, color: "text-teal-400" },
    { name: "General Medicine", floor: "Ground Floor", room: "005-008", icon: Stethoscope, color: "text-blue-400" },
    { name: "Radiology", floor: "Ground Floor", room: "001-004", icon: Layers, color: "text-indigo-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <SafetyBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-radial-glow bg-tech-grid border-b border-slate-200 dark:border-obsidian-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-neon/10 border border-mint-neon/30 text-mint-neon text-xs font-bold tracking-wide shadow-glow-mint-sm/20">
                <Sparkles className="w-3.5 h-3.5 text-mint-neon animate-spin-slow" />
                <span>Next-Gen Intelligent Hospital Management Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Smarter Care. <br />
                <span className="text-mint-neon drop-shadow-[0_0_30px_rgba(13,242,163,0.45)]">
                  Faster Decisions.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                AI-powered monitoring, diagnostics, and hospital intelligence for modern healthcare systems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <Link
                  to="/assistant"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-mint-neon hover:bg-mint-glow text-[#04160f] font-bold shadow-glow-mint hover:shadow-[0_0_35px_rgba(13,242,163,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Request Demo</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  to="/intelligence"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 hover:text-white font-medium border border-obsidian-700 hover:border-mint-neon/50 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Explore Platform
                </Link>
              </div>

              {/* 4 Feature Items Underneath Buttons (From Reference Screenshot) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-obsidian-700/80 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-mint-neon" /> AI Diagnostics
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Smarter insights</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                    <Activity className="w-3.5 h-3.5 text-mint-neon" /> Real-time Monitoring
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Live patient tracking</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-mint-neon" /> Risk Prediction
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Prevent critical events</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                    <Building className="w-3.5 h-3.5 text-mint-neon" /> Hospital Intelligence
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Data-driven operations</p>
                </div>
              </div>

              {/* Trusted By Healthcare Providers Strip */}
              <div className="pt-4 space-y-2.5">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Trusted by leading healthcare providers
                </p>
                <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 font-semibold flex-wrap justify-center lg:justify-start">
                  <div className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-mint-neon" /> CityCare Hospital</div>
                  <div className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-mint-neon" /> Medix Health</div>
                  <div className="flex items-center gap-1.5"><Stethoscope className="w-4 h-4 text-mint-neon" /> HealthPlus</div>
                  <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-mint-neon" /> LifeLine</div>
                </div>
                <div className="flex items-center gap-2.5 pt-1 justify-center lg:justify-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-mint-neon" /> HIPAA Compliant
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-mint-neon" /> SOC 2 Certified
                  </span>
                </div>
              </div>

            </div>

            {/* Hero Right: Ultra-Detailed MediCore HUD Dashboard Mockup (Matching Reference Image) */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto max-w-2xl lg:max-w-none">
                
                {/* Glow behind the HUD frame */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-mint-500/20 via-cyan-500/20 to-mint-neon/20 blur-2xl opacity-60"></div>

                {/* Main Dashboard Frame */}
                <div className="relative bg-[#070c14] border border-[#18253a] rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-200 space-y-4">
                  
                  {/* Top Bar: Doctor Greeting & System Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#18253a]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-mint-neon/15 border border-mint-neon/40 flex items-center justify-center text-mint-neon">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                          Good Morning, Dr. Sarah <span>👋</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Here's what's happening at CityCare Hospital today.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint-neon/10 border border-mint-neon/30 text-[10px] font-bold text-mint-neon">
                        <span className="w-2 h-2 rounded-full bg-mint-neon animate-pulse"></span>
                        LIVE HUD
                      </span>
                    </div>
                  </div>

                  {/* Upper Row: Patient Overview, Hologram Pod, Vitals, and AI Diagnosis */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    
                    {/* Left Column: Patient Overview & Critical Alerts */}
                    <div className="sm:col-span-3 space-y-3">
                      
                      {/* Patient Overview Card */}
                      <div className="bg-[#0b1320] border border-[#18253a] rounded-2xl p-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Patient Overview</span>
                          <span className="text-mint-neon font-bold text-[9px] bg-mint-neon/10 px-1 rounded">Live</span>
                        </div>
                        <div className="text-xl font-extrabold text-white mt-1">1,248</div>
                        <p className="text-[9px] text-slate-500">Total Patients</p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-mint-neon">
                          <span>↑ 12.6%</span>
                          <span className="text-slate-500 font-normal text-[9px]">from yesterday</span>
                        </div>
                        {/* Mini Sparkline */}
                        <svg className="w-full h-5 mt-1 text-mint-neon" viewBox="0 0 100 20" fill="none">
                          <path d="M0 16 Q25 4, 50 12 T100 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Critical Alerts Card */}
                      <div className="bg-[#0b1320] border border-[#18253a] rounded-2xl p-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Critical Alerts</span>
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-2xl font-extrabold text-amber-400">7</span>
                          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                            !
                          </div>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-0.5">Patients need immediate attention</p>
                        <div className="mt-2 text-[9px] font-bold text-mint-neon hover:underline cursor-pointer flex items-center gap-1">
                          View all alerts <ArrowRight className="w-2.5 h-2.5" />
                        </div>
                      </div>

                    </div>

                    {/* Center Column: 3D Holographic Heart Containment Chamber */}
                    <div className="sm:col-span-5 bg-[#0b1320] border border-[#18253a] rounded-2xl p-3 flex flex-col items-center justify-between relative overflow-hidden group">
                      
                      {/* Chamber Vignette / Grid */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,196,0.12)_0%,transparent_70%)] pointer-events-none"></div>

                      <div className="w-full flex items-center justify-between text-[10px] text-slate-400 z-10">
                        <span className="font-semibold text-cyan-electric">Hologram Telemetry</span>
                        <span className="font-mono text-[9px] text-mint-neon">CHAMBER-01</span>
                      </div>

                      {/* Glowing Holographic Heart Artwork (SVG Wireframe Hologram) */}
                      <div className="relative my-2 flex items-center justify-center">
                        {/* Pedestal Emitter Glow */}
                        <div className="absolute -bottom-2 w-28 h-6 bg-cyan-electric/30 rounded-full blur-md animate-pulse"></div>
                        <div className="absolute -bottom-1 w-24 h-4 border border-cyan-electric/60 rounded-full bg-cyan-electric/20"></div>

                        {/* Animated Heart Shape with Glowing Cyan Lines */}
                        <div className="relative animate-pulse-glow p-2">
                          <svg className="w-28 h-28 text-cyan-electric filter drop-shadow-[0_0_15px_rgba(0,245,196,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="1.2" 
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                            {/* Inner Anatomy Contour Lines */}
                            <path strokeLinecap="round" strokeWidth="0.8" stroke="rgba(13,242,163,0.9)" d="M12 7.636v8M8.5 9.5c1.5 2 2.5 3 3.5 5.5M15.5 9.5c-1.5 2-2.5 3-3.5 5.5M7 12c2 1 4 2 5 2" />
                            <circle cx="12" cy="11" r="1.5" fill="#0df2a3" />
                          </svg>
                        </div>
                      </div>

                      {/* Chamber Status Bar */}
                      <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 z-10 border-t border-[#18253a]/60 pt-1.5">
                        <span className="text-mint-neon">SYNC 99.4%</span>
                        <span className="text-cyan-electric">CONTAINMENT SECURE</span>
                      </div>
                    </div>

                    {/* Right Column: Real-Time Vitals Metrics + AI Diagnosis Card */}
                    <div className="sm:col-span-4 space-y-2">
                      
                      {/* Vitals Grid */}
                      <div className="bg-[#0b1320] border border-[#18253a] rounded-2xl p-2.5 space-y-1.5">
                        <div className="text-[10px] font-bold text-white flex items-center justify-between">
                          <span>Patient Vitals</span>
                          <span className="text-[9px] text-mint-neon font-mono">LIVE FEED</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1.5 text-left">
                          <div className="bg-[#070c14] p-1.5 rounded-lg border border-[#18253a]">
                            <span className="text-[8px] text-slate-400 uppercase">Heart Rate</span>
                            <div className="text-sm font-extrabold text-white flex items-baseline gap-1">
                              72 <span className="text-[8px] text-mint-neon font-normal">bpm</span>
                            </div>
                          </div>
                          <div className="bg-[#070c14] p-1.5 rounded-lg border border-[#18253a]">
                            <span className="text-[8px] text-slate-400 uppercase">Blood Pres.</span>
                            <div className="text-sm font-extrabold text-cyan-electric flex items-baseline gap-1">
                              120/80
                            </div>
                          </div>
                          <div className="bg-[#070c14] p-1.5 rounded-lg border border-[#18253a]">
                            <span className="text-[8px] text-slate-400 uppercase">Oxygen Sat.</span>
                            <div className="text-sm font-extrabold text-mint-neon flex items-baseline gap-1">
                              98%
                            </div>
                          </div>
                          <div className="bg-[#070c14] p-1.5 rounded-lg border border-[#18253a]">
                            <span className="text-[8px] text-slate-400 uppercase">Resp. Rate</span>
                            <div className="text-sm font-extrabold text-white flex items-baseline gap-1">
                              18 <span className="text-[8px] text-slate-400 font-normal">/min</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Diagnosis Assistant Card */}
                      <div className="bg-[#0b1320] border border-[#18253a] rounded-2xl p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-white">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-mint-neon" /> AI Diagnosis
                          </span>
                          <span className="text-[9px] text-mint-neon font-mono">0.96 Conf.</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-tight">
                          "Analysis complete: signs of early sepsis stabilized. Protocol active."
                        </p>
                        <div className="w-full bg-[#070c14] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-mint-neon to-cyan-electric h-1.5 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Lower Row: Live Vitals Wave, Emergency Queue, and Bed Occupancy */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                    
                    {/* Live Vitals Trend Wave (6 Cols) */}
                    <div className="sm:col-span-6 bg-[#0b1320] border border-[#18253a] rounded-2xl p-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-mint-neon" /> Live Vitals Trend
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">Last 24 Hours</span>
                      </div>
                      
                      {/* Multi-Line ECG Wave Trend */}
                      <svg className="w-full h-16 mt-2" viewBox="0 0 300 70" fill="none">
                        {/* Cyan Line */}
                        <path d="M0 35 Q30 10, 60 40 T120 20 T180 50 T240 15 T300 30" stroke="#00f5c4" strokeWidth="2" strokeLinecap="round" />
                        {/* Neon Mint Line */}
                        <path d="M0 45 Q40 55, 80 25 T160 40 T220 20 T300 45" stroke="#0df2a3" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                        {/* Purple / Blue Vitals Line */}
                        <path d="M0 55 Q50 35, 100 60 T200 35 T300 50" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                      </svg>
                      
                      <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1">
                        <span>04:00</span>
                        <span>08:00</span>
                        <span>12:00</span>
                        <span>16:00</span>
                        <span>20:00</span>
                      </div>
                    </div>

                    {/* Emergency Queue (3 Cols) */}
                    <div className="sm:col-span-3 bg-[#0b1320] border border-[#18253a] rounded-2xl p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-white">Emergency Queue</span>
                        <span className="text-[9px] text-mint-neon cursor-pointer">View all</span>
                      </div>
                      <div className="space-y-1 text-[9px]">
                        <div className="flex items-center justify-between p-1 bg-[#070c14] rounded border border-[#18253a]">
                          <span className="text-slate-300">#3421 (Chest Pain)</span>
                          <span className="text-amber-400 font-bold">3 min</span>
                        </div>
                        <div className="flex items-center justify-between p-1 bg-[#070c14] rounded border border-[#18253a]">
                          <span className="text-slate-300">#1842 (Tachycardia)</span>
                          <span className="text-mint-neon font-bold">8 min</span>
                        </div>
                        <div className="flex items-center justify-between p-1 bg-[#070c14] rounded border border-[#18253a]">
                          <span className="text-slate-300">#0981 (Post-Op)</span>
                          <span className="text-slate-400 font-bold">15 min</span>
                        </div>
                      </div>
                    </div>

                    {/* Bed Occupancy Circular Gauge (3 Cols) */}
                    <div className="sm:col-span-3 bg-[#0b1320] border border-[#18253a] rounded-2xl p-3 flex flex-col items-center justify-between">
                      <div className="w-full text-left text-[10px] font-bold text-white">Bed Occupancy</div>
                      
                      <div className="relative w-16 h-16 my-1 flex items-center justify-center">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-[#18253a]"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-mint-neon"
                            strokeDasharray="78, 100"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-xs font-extrabold text-white">78%</span>
                          <span className="text-[7px] text-slate-400">Occupied</span>
                        </div>
                      </div>

                      <div className="text-[8px] text-mint-neon font-bold">42 Beds Available</div>
                    </div>

                  </div>

                  {/* Hospital Operations Footer Strip (From Reference Screenshot) */}
                  <div className="bg-[#0b1320] border border-[#18253a] rounded-2xl p-2.5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px]">
                    <div>
                      <span className="text-slate-400 text-[9px] block">Surgeries Today</span>
                      <span className="text-white font-extrabold text-xs">24</span>
                      <span className="text-mint-neon text-[8px] ml-1">↑ 8%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block">Discharges</span>
                      <span className="text-white font-extrabold text-xs">18</span>
                      <span className="text-mint-neon text-[8px] ml-1">↑ 12%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block">Revenue Today</span>
                      <span className="text-white font-extrabold text-xs">$248K</span>
                      <span className="text-mint-neon text-[8px] ml-1">↑ 5%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block">Avg. Length Stay</span>
                      <span className="text-white font-extrabold text-xs">4.2 Days</span>
                      <span className="text-mint-neon text-[8px] ml-1">↓ 6%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block">Readmission Risk</span>
                      <span className="text-amber-400 font-extrabold text-xs">23</span>
                      <span className="text-slate-400 text-[8px] ml-1">High-Risk</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core AI Modules Section */}
      <section className="py-16 bg-white dark:bg-obsidian-900 border-b border-slate-200 dark:border-obsidian-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-mint-neon uppercase tracking-widest block mb-1">Architecture Overview</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Four Core Hospital Automation Modules
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Modular administrative AI capabilities designed for real hospital operations and clinical presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Module 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/50 dark:hover:border-mint-neon/60 hover:shadow-cyber-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-mint-neon/10 text-mint-neon border border-mint-neon/30 flex items-center justify-center mb-4 group-hover:scale-110 shadow-glow-mint-sm transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">AI Hospital Assistant</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Interactive multi-turn chatbot with intent classification (7 intents), confidence scoring, and dynamic card generation.
                </p>
              </div>
              <Link to="/assistant" className="text-xs font-bold text-mint-neon flex items-center gap-1 hover:gap-2 transition-all">
                Try AI Assistant <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Module 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/50 dark:hover:border-mint-neon/60 hover:shadow-cyber-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/30 flex items-center justify-center mb-4 group-hover:scale-110 shadow-glow-cyan-sm transition-transform">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Doctor Recommender</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Filters doctors by department & date preference, returning matched specialists with human-readable "Why Recommended" rationale.
                </p>
              </div>
              <Link to="/assistant" className="text-xs font-bold text-cyan-electric flex items-center gap-1 hover:gap-2 transition-all">
                Find Doctors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Module 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/50 dark:hover:border-mint-neon/60 hover:shadow-cyber-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-mint-neon/10 text-mint-neon border border-mint-neon/30 flex items-center justify-center mb-4 group-hover:scale-110 shadow-glow-mint-sm transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Record Summarizer</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Template-based plain-language clinical overview engine without diagnostic assumptions or medical over-extrapolations.
                </p>
              </div>
              <Link to="/records" className="text-xs font-bold text-mint-neon flex items-center gap-1 hover:gap-2 transition-all">
                Summarize Records <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Module 4 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 hover:border-cyan-electric/50 dark:hover:border-cyan-electric/60 hover:shadow-cyber-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/30 flex items-center justify-center mb-4 group-hover:scale-110 shadow-glow-cyan-sm transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Hospital Navigation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Interactive floor map (Ground, 1st, 2nd Floor) with real-time room finder highlighting locations with pulse glow & walking directions.
                </p>
              </div>
              <Link to="/navigation" className="text-xs font-bold text-cyan-electric flex items-center gap-1 hover:gap-2 transition-all">
                View Floor Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* College Presentation 8-Scenario Quick Matrix Section */}
      <section className="py-16 bg-slate-50 dark:bg-obsidian-950 bg-tech-grid border-b border-slate-200 dark:border-obsidian-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-mint-neon uppercase tracking-widest block mb-1">Presentation Ready</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                College Presentation Demo Script (8 Scenarios)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Click any scenario below to launch it directly in the AI Assistant with real-time response generation.
              </p>
            </div>
            <Link 
              to="/assistant"
              className="text-xs font-bold text-mint-neon flex items-center gap-1 hover:underline"
            >
              Open Full Chat <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((sc) => (
              <div 
                key={sc.num}
                onClick={() => navigate('/assistant')}
                className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/50 dark:hover:border-mint-neon/60 hover:shadow-cyber-card-hover transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-mint-neon/10 text-mint-neon border border-mint-neon/30">
                      Scenario #{sc.num}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {sc.intent}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1.5">{sc.title}</h4>
                  <p className="text-xs font-medium text-mint-neon italic mb-2">
                    "{sc.query}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {sc.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-obsidian-700/60 flex items-center justify-between text-[11px] font-bold text-mint-neon group-hover:translate-x-1 transition-transform">
                  <span>Run Scenario</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Hospital Departments Directory Grid */}
      <section className="py-16 bg-white dark:bg-obsidian-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hospital Departments Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Consult specialists and find room locations across our clinical wings.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <div 
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/40 transition-all flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-obsidian-800 flex items-center justify-center shrink-0 ${d.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{d.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{d.floor} • Room {d.room}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
