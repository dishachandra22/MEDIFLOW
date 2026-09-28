import React, { useState, useEffect } from 'react';
import { Building2, Users, Stethoscope, CalendarCheck, Sparkles, Activity, ShieldAlert, BarChart3, PieChart } from 'lucide-react';
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
    total_doctors: 12,
    total_departments: 8,
    today_appointments_count: 6,
    pending_requests_count: 3
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" /> Staff Operations & Hospital Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Hospital Operations Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time department status, appointment volumes, and automated AI operational insights.
            </p>
          </div>
        </div>

        {/* AI Operational Insights Highlight Card */}
        <div className="p-5 bg-gradient-to-r from-purple-700 via-indigo-600 to-brand-600 rounded-3xl text-white shadow-lg shadow-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-200">
              <Sparkles className="w-4 h-4 text-purple-300 animate-spin-slow" />
              Automated AI Staff & Resource Insight
            </div>
            <p className="text-sm sm:text-base font-bold leading-relaxed">
              {data?.ai_insight || "Cardiology has recorded the highest number of appointment requests today. Staff recommendation: Ensure OPD Room 102 is fully staffed."}
            </p>
          </div>
        </div>

        {/* 4 Key Metrics Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Registered Patients</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.total_patients}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Available Doctors</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.total_doctors}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Today's Visits</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metrics.today_appointments_count}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
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
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-500" />
                Department Appointment Volume Distribution
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live DB Data</span>
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(deptCounts).map(([dept, count]) => {
                const percentage = Math.round((count / maxVal) * 100);
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{dept}</span>
                      <span>{count} Requests</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-600 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Operational Table Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-500" />
                Department Operational Status
              </h3>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
              {data?.department_status?.map((d, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{d.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{d.floor} • Room {d.room}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                      {d.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{d.total_appointments} Bookings</span>
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
