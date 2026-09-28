import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Calendar, 
  Clock, 
  FileText, 
  MapPin, 
  Sparkles, 
  UserCheck, 
  PlusCircle, 
  ShieldAlert, 
  CheckCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';

export const PatientDashboard = () => {
  const { patientId, patientName } = useRole();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [patRes, appRes, sumRes] = await Promise.all([
          fetch(`/api/patients/${patientId}`),
          fetch(`/api/appointments?patient_id=${patientId}`),
          fetch(`/api/patients/${patientId}/summary`, { method: 'POST' })
        ]);

        if (patRes.ok) setPatientData(await patRes.json());
        if (appRes.ok) setAppointments(await appRes.json());
        if (sumRes.ok) setSummary(await sumRes.json());
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  const upcomingAppointments = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Scheduled');
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" /> Patient Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Good morning, {patientName}.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Here is your healthcare schedule, upcoming consultations, and AI-summarized health records.
            </p>
          </div>

          <Link
            to="/assistant"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            Ask AI Assistant
          </Link>
        </div>

        {/* AI Insight Card */}
        <div className="p-5 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-600 rounded-3xl text-white shadow-lg shadow-brand-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-200">
              <Sparkles className="w-4 h-4 text-teal-300 animate-spin-slow" />
              AI Automated Health Schedule Insight
            </div>
            <h3 className="text-lg font-extrabold">
              {nextAppointment
                ? `Your next appointment is ${nextAppointment.appointment_date} at ${nextAppointment.appointment_time}.`
                : "No upcoming appointments scheduled for this week."}
            </h3>
            <p className="text-xs text-brand-100 opacity-90">
              {nextAppointment
                ? `Scheduled with ${nextAppointment.doctor_name} (${nextAppointment.department_name}). OPD Room 102.`
                : "Need a checkup? Use MediFlow AI to instantly find available doctor slots."}
            </p>
          </div>

          <Link
            to="/assistant"
            className="px-4 py-2.5 bg-white text-brand-700 font-bold text-xs rounded-xl hover:bg-brand-50 transition-colors shrink-0 self-start md:self-center"
          >
            Manage via AI
          </Link>
        </div>

        {/* Main Grid: Upcoming Appointments & AI Patient Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Upcoming Appointments & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming Appointments Section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-500" />
                  Upcoming Appointments ({upcomingAppointments.length})
                </h3>
                <Link to="/assistant" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  + Book New
                </Link>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  No upcoming appointments booked.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((app) => (
                    <div key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
                          {app.doctor_name ? app.doctor_name[0] : 'D'}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.doctor_name}</h4>
                          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{app.department_name} • {app.reason}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brand-500" /> {app.appointment_date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-teal-500" /> {app.appointment_time}</span>
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-800">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Quick Healthcare Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                <Link to="/assistant" className="p-3.5 bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <Bot className="w-6 h-6 text-brand-600 dark:text-brand-400 mx-auto mb-1 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Ask AI Assistant</span>
                </Link>

                <Link to="/assistant" className="p-3.5 bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Book Appointment</span>
                </Link>

                <Link to="/records" className="p-3.5 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">View AI Summary</span>
                </Link>

                <Link to="/navigation" className="p-3.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Floor Navigation</span>
                </Link>

                <Link to="/faq" className="p-3.5 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <Bot className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Hospital Knowledge</span>
                </Link>

                <Link to="/intelligence" className="p-3.5 bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 rounded-2xl hover:scale-[1.02] transition-transform text-center group">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">AI Demos</span>
                </Link>

              </div>
            </div>

          </div>

          {/* Right Column: AI Patient Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Patient Record Summary</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Generated for {patientName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                    Live Record
                  </span>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-500">Generating AI summary...</div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line border border-slate-100 dark:border-slate-800">
                      {summary?.summary || "Patient has previous visits logged in Cardiology and Dermatology."}
                    </div>

                    {summary?.key_insights && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Key AI Highlights:</span>
                        {summary.key_insights.map((ins, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ins}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Safety Disclaimer:</strong> AI summary is strictly administrative and intended for quick doctor/patient reference. Does not provide clinical diagnosis.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
