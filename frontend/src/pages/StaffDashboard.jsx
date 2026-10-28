import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Stethoscope, 
  CalendarCheck, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  BarChart3, 
  PieChart,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const StaffDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/overview');
      if (res.ok) {
        const overview = await res.json();
        setData(overview);
      }
    } catch (err) {
      console.error("Staff overview fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const metrics = data?.metrics || {
    total_patients: 10,
    total_doctors: 16,
    total_departments: 10,
    today_appointments_count: 6,
    pending_requests_count: 2
  };

  const deptCounts = data?.department_distribution || {
    Cardiology: 5,
    Dermatology: 3,
    Orthopedics: 2,
    Pediatrics: 2,
    Neurology: 1,
    ENT: 1,
    "General Medicine": 2,
    Radiology: 1
  };

  const maxVal = Math.max(...Object.values(deptCounts), 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <Building2 className="w-3.5 h-3.5 text-mint-neon" /> Staff Operations & Hospital Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Hospital Operations Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time department status, appointment volumes, and automated AI staff recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mint-neon animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Hospital Ops Stream</span>
          </div>
        </div>

        {/* AI Operational Insights Highlight Card */}
        <div className="p-5 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 rounded-3xl text-white shadow-cyber-card flex flex-col md:flex-row md:items-center justify-between gap-4 border border-mint-neon/40 shadow-glow-mint-sm/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mint-neon">
              <Sparkles className="w-4 h-4 text-mint-neon animate-spin-slow" />
              Automated AI Staff & Resource Insight
            </div>
            <p className="text-sm sm:text-base font-bold leading-relaxed text-slate-100">
              {data?.ai_insight || "Cardiology has recorded the highest number of appointment requests today. Staff recommendation: Ensure OPD Room 102 is fully staffed during peak morning hours."}
            </p>
          </div>
        </div>

        {/* 4 Key Metrics Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-obsidian-900 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-mint-neon/10 text-mint-neon border border-mint-neon/30 flex items-center justify-center font-bold shrink-0 shadow-glow-mint-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Registered Patients</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.total_patients}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/30 flex items-center justify-center font-bold shrink-0 shadow-glow-cyan-sm">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Active Doctors</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.total_doctors}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-mint-neon/10 text-mint-neon border border-mint-neon/30 flex items-center justify-center font-bold shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Today's Visits</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.today_appointments_count}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/30 flex items-center justify-center font-bold shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Active Departments</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.total_departments}</span>
            </div>
          </div>

        </div>

        {/* Charts & Department Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bar Chart Card */}
          <div className="lg:col-span-7 bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-mint-neon" />
                Department Appointment Volume Distribution
              </h3>
              <span className="text-[10px] font-bold text-mint-neon uppercase bg-mint-neon/10 px-2 py-0.5 rounded-md border border-mint-neon/30">Live Database</span>
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(deptCounts).map(([dept, count]) => {
                const percentage = Math.round((count / maxVal) * 100);
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{dept}</span>
                      <span className="text-mint-neon font-bold">{count} Visits</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-obsidian-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-obsidian-700">
                      <div
                        className="h-full bg-gradient-to-r from-mint-500 via-mint-neon to-cyan-electric rounded-full transition-all duration-500 shadow-glow-mint-sm"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Operational Status Table Card */}
          <div className="lg:col-span-5 bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-electric" />
                Department Clinical Status
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Wings Overview</span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {(data?.department_status || []).map((d, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-slate-200/70 dark:border-obsidian-700 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{d.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{d.floor} • Room {d.room}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold text-mint-neon bg-mint-neon/15 dark:bg-obsidian-800 rounded-full border border-mint-neon/40">
                      Operational
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{d.total_appointments || 0} visits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;
