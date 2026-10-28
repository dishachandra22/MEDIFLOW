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
  ArrowRight,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';
import BookingModal from '../components/BookingModal';

export const PatientDashboard = () => {
  const { patientId, patientName } = useRole();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [actionNotice, setActionNotice] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchData();
  }, [patientId]);

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

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setCancellingId(appointmentId);
    try {
      const res = await fetch(`/api/appointments/${appointmentId}/cancel`, {
        method: 'PUT'
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'Cancelled' } : a));
        setActionNotice("Appointment successfully cancelled.");
        setTimeout(() => setActionNotice(''), 3000);
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    } finally {
      setCancellingId(null);
    }
  };

  const openQuickBooking = async () => {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const docs = await res.json();
        setSelectedDoctor(docs[0] || null);
        setBookingModalOpen(true);
      }
    } catch (err) {
      console.error("Error getting doctors:", err);
    }
  };

  const handleBookingSuccess = () => {
    fetchData();
    setActionNotice("New appointment booked successfully!");
    setTimeout(() => setActionNotice(''), 3000);
  };

  const upcomingAppointments = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Scheduled');
  const pastAppointments = appointments.filter(a => a.status === 'Cancelled' || a.status === 'Completed');
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <Sparkles className="w-3.5 h-3.5 text-mint-neon" /> Patient Health Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Good morning, {patientName}.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Medical record ID: #{patientId} • Blood Group: {patientData?.blood_group || 'O+'} • Phone: {patientData?.phone || '+91 98765 43210'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openQuickBooking}
              className="px-4 py-2.5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-300 dark:border-obsidian-700 text-slate-800 dark:text-slate-200 font-bold text-xs hover:border-mint-neon/50 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-mint-neon" />
              Book Slot
            </button>

            <Link
              to="/assistant"
              className="px-5 py-2.5 rounded-2xl bg-mint-neon hover:bg-mint-glow text-[#04160f] font-bold text-xs shadow-glow-mint flex items-center justify-center gap-2 transition-all"
            >
              <Bot className="w-4 h-4 stroke-[2.5]" />
              Ask AI Assistant
            </Link>
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="p-3 bg-mint-neon/15 border border-mint-neon/40 text-mint-neon rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-mint-neon shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* AI Insight Card */}
        <div className="p-5 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 rounded-3xl text-white shadow-cyber-card flex flex-col md:flex-row md:items-center justify-between gap-4 border border-mint-neon/40 shadow-glow-mint-sm/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mint-neon">
              <Sparkles className="w-4 h-4 text-mint-neon animate-spin-slow" />
              AI Automated Health Schedule Insight
            </div>
            <h3 className="text-lg font-extrabold text-white">
              {nextAppointment
                ? `Next visit: ${nextAppointment.appointment_date} at ${nextAppointment.appointment_time}.`
                : "No upcoming appointments scheduled for this week."}
            </h3>
            <p className="text-xs text-slate-400">
              {nextAppointment
                ? `Specialist: ${nextAppointment.doctor_name} (${nextAppointment.department_name}). OPD Room 102.`
                : "Need a checkup? Use MediFlow AI to instantly find available doctor slots."}
            </p>
          </div>

          <Link
            to="/assistant"
            className="px-4 py-2.5 bg-mint-neon text-[#04160f] font-bold text-xs rounded-xl hover:bg-mint-glow transition-all shrink-0 self-start md:self-center shadow-glow-mint"
          >
            Manage via AI
          </Link>
        </div>

        {/* Main Grid: Upcoming Appointments & AI Patient Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Upcoming Appointments & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming Appointments Section */}
            <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-mint-neon" />
                  Upcoming Consultations ({upcomingAppointments.length})
                </h3>
                <button
                  onClick={openQuickBooking}
                  className="text-xs font-bold text-mint-neon hover:underline flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Book New
                </button>
              </div>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-500">Loading appointments...</div>
              ) : upcomingAppointments.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-dashed border-slate-200 dark:border-obsidian-700">
                  No upcoming appointments booked. Use MediFlow AI to find open doctor slots.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((app) => (
                    <div key={app.id} className="p-4 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-slate-200/80 dark:border-obsidian-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-mint-neon/40 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-mint-neon/15 border border-mint-neon/30 text-mint-neon flex items-center justify-center font-bold text-sm shadow-glow-mint-sm shrink-0">
                          {app.doctor_name ? app.doctor_name[0] : 'D'}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.doctor_name}</h4>
                          <p className="text-xs font-semibold text-mint-neon">{app.department_name} • {app.reason}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-mint-neon" /> {app.appointment_date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-electric" /> {app.appointment_time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="px-2.5 py-1 text-[11px] font-bold text-mint-neon bg-mint-neon/15 dark:bg-obsidian-800 rounded-full border border-mint-neon/40">
                          {app.status}
                        </span>
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          disabled={cancellingId === app.id}
                          className="px-3 py-1 text-[11px] font-bold text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-500/30 transition-colors"
                          title="Cancel this appointment"
                        >
                          {cancellingId === app.id ? "Cancelling..." : "Cancel"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Quick Healthcare Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                <Link to="/assistant" className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group">
                  <Bot className="w-6 h-6 text-mint-neon mx-auto mb-1 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Ask AI Assistant</span>
                </Link>

                <button onClick={openQuickBooking} className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group w-full">
                  <Calendar className="w-6 h-6 text-cyan-electric mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Book Appointment</span>
                </button>

                <Link to="/records" className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group">
                  <FileText className="w-6 h-6 text-mint-neon mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">View AI Summary</span>
                </Link>

                <Link to="/navigation" className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group">
                  <MapPin className="w-6 h-6 text-cyan-electric mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Floor Navigation</span>
                </Link>

                <Link to="/faq" className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group">
                  <Bot className="w-6 h-6 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Hospital Knowledge</span>
                </Link>

                <Link to="/intelligence" className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl hover:border-mint-neon/60 hover:scale-[1.02] transition-all text-center group">
                  <Sparkles className="w-6 h-6 text-mint-neon mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">AI Sandbox</span>
                </Link>

              </div>
            </div>

          </div>

          {/* Right Column: AI Patient Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4 h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-obsidian-700/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-mint-neon/15 text-mint-neon flex items-center justify-center border border-mint-neon/30">
                      <FileText className="w-4 h-4 text-mint-neon" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Patient Record Summary</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Generated for {patientName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-mint-neon bg-mint-neon/10 dark:bg-obsidian-850 px-2.5 py-0.5 rounded-full border border-mint-neon/30">
                    Live Record
                  </span>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-500">Generating AI summary...</div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="p-3.5 bg-slate-50 dark:bg-obsidian-850 rounded-2xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-obsidian-700">
                      {summary?.summary || "Patient has previous visits logged in Cardiology and Dermatology."}
                    </div>

                    {summary?.key_insights && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Key AI Highlights:</span>
                        {summary.key_insights.map((ins, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-mint-neon shrink-0 mt-0.5" />
                            <span>{ins}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Safety Disclaimer:</strong> AI summary is strictly administrative and intended for quick doctor/patient reference. Does not provide clinical diagnosis.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
