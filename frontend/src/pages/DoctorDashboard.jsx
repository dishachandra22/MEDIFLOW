import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle,
  Activity,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';

export const DoctorDashboard = () => {
  const { doctorId, setDoctorId, doctorName, setDoctorName } = useRole();
  const [data, setData] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSummaryPatient, setActiveSummaryPatient] = useState(null);
  const [summaryResult, setSummaryResult] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [statusNotice, setStatusNotice] = useState('');

  useEffect(() => {
    fetchDoctorsList();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [doctorId]);

  const fetchDoctorsList = async () => {
    try {
      const res = await fetch('/api/doctors');
      if (res.ok) {
        const docs = await res.json();
        setAllDoctors(docs);
      }
    } catch (err) {
      console.error("Doctors list fetch error:", err);
    }
  };

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctor/${doctorId}/today`);
      if (res.ok) {
        const scheduleData = await res.json();
        setData(scheduleData);
      }
    } catch (err) {
      console.error("Doctor schedule fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = (e) => {
    const selectedId = Number(e.target.value);
    setDoctorId(selectedId);
    const docObj = allDoctors.find(d => d.id === selectedId);
    if (docObj) setDoctorName(docObj.name);
  };

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setStatusNotice(`Appointment marked as ${newStatus}`);
        setTimeout(() => setStatusNotice(''), 2500);
        setData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            schedule: prev.schedule.map(s => s.appointment_id === appointmentId ? { ...s, status: newStatus } : s)
          };
        });
      }
    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  };

  const handleSummarizePatient = async (patientId, patientName) => {
    setActiveSummaryPatient({ id: patientId, name: patientName });
    setLoadingSummary(true);
    setSummaryResult(null);

    try {
      const res = await fetch(`/api/patients/${patientId}/summary`, { method: 'POST' });
      if (res.ok) {
        const sumData = await res.json();
        setSummaryResult(sumData);
      }
    } catch (err) {
      console.error("Error summarizing patient:", err);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header with Doctor Selector */}
        <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <Stethoscope className="w-3.5 h-3.5 text-mint-neon" /> Physician Schedule & Clinical Operations
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {data?.doctor_name || doctorName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Department: <strong className="text-slate-800 dark:text-white">{data?.department_name || 'Cardiology'}</strong> • Room: <strong className="text-slate-800 dark:text-white">{data?.room_number || '102'}</strong> • Specialization: {data?.specialization || 'Consultant'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Doctor Profile Selector */}
            <div className="bg-slate-100 dark:bg-obsidian-850 px-3 py-2 rounded-2xl border border-slate-200 dark:border-obsidian-700 text-xs">
              <label className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-0.5">Switch Doctor View</label>
              <select
                value={doctorId}
                onChange={handleDoctorChange}
                className="bg-transparent font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {allDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id} className="bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white">
                    {doc.name} ({doc.department_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-mint-neon/10 dark:bg-obsidian-850 rounded-2xl text-center border border-mint-neon/20 px-4">
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-semibold">Today's Visits</span>
              <span className="text-lg font-extrabold text-mint-neon">{data?.today_appointments_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Status update alert toast */}
        {statusNotice && (
          <div className="p-3 bg-mint-neon/15 border border-mint-neon/40 text-mint-neon rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-mint-neon shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Doctor Schedule & Patient Summaries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Schedule List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-mint-neon" />
                  Scheduled Consultations ({data?.schedule?.length || 0})
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Room {data?.room_number || '102'}</span>
              </div>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-500">Loading schedule...</div>
              ) : !data?.schedule || data.schedule.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-dashed border-slate-200 dark:border-obsidian-700">
                  No appointments scheduled for this doctor on selected dates.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.schedule.map((slot) => (
                    <div key={slot.appointment_id} className="p-4 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-slate-200/80 dark:border-obsidian-700 space-y-3 hover:border-mint-neon/40 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{slot.patient_name}</h4>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">({slot.patient_age} yrs, {slot.patient_gender})</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              slot.status === 'Completed'
                                ? 'bg-mint-neon/15 text-mint-neon border-mint-neon/30'
                                : slot.status === 'In Progress'
                                ? 'bg-cyan-electric/15 text-cyan-electric border-cyan-electric/40'
                                : 'bg-slate-700/50 text-slate-300 border-slate-600'
                            }`}>
                              {slot.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-mint-neon mt-1">Reason: {slot.reason}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Medical History: {slot.medical_history}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 mt-1.5">
                            <span className="flex items-center gap-1 font-bold text-mint-neon"><Clock className="w-3.5 h-3.5" /> {slot.appointment_time}</span>
                            <span>• Date: {slot.appointment_date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSummarizePatient(slot.patient_id, slot.patient_name)}
                          className="px-3.5 py-2 text-xs font-bold text-[#04160f] bg-mint-neon hover:bg-mint-glow rounded-xl shadow-glow-mint transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                        >
                          <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                          AI Summarize
                        </button>
                      </div>

                      {/* Status Update Quick Buttons */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-obsidian-700/60 flex items-center gap-2 text-xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Update Status:</span>
                        <button
                          onClick={() => handleUpdateStatus(slot.appointment_id, 'In Progress')}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-200 dark:bg-obsidian-800 text-slate-700 dark:text-cyan-electric hover:bg-cyan-500/20"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(slot.appointment_id, 'Completed')}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-mint-neon/15 dark:bg-obsidian-800 text-mint-neon hover:bg-mint-neon/20"
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Patient Summary Inspector Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-mint-neon animate-spin-slow" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Clinical Record Inspector</h3>
                  </div>
                  {activeSummaryPatient && (
                    <span className="text-xs font-bold text-mint-neon">
                      {activeSummaryPatient.name}
                    </span>
                  )}
                </div>

                {!activeSummaryPatient ? (
                  <div className="py-14 text-center text-xs text-slate-400 dark:text-slate-500 space-y-3">
                    <FileText className="w-10 h-10 mx-auto text-slate-300 dark:text-obsidian-700" />
                    <p className="max-w-xs mx-auto">Click <strong>"AI Summarize"</strong> on any scheduled consultation to view an instant plain-language patient overview.</p>
                  </div>
                ) : loadingSummary ? (
                  <div className="py-14 text-center text-xs text-slate-500 dark:text-mint-neon flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-mint-neon" />
                    Generating patient summary...
                  </div>
                ) : summaryResult ? (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-slate-50 dark:bg-obsidian-850 rounded-2xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-obsidian-700">
                      {summaryResult.summary}
                    </div>

                    {summaryResult.key_insights && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Key Clinical Highlights:</span>
                        {summaryResult.key_insights.map((ins, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-mint-neon shrink-0 mt-0.5" />
                            <span>{ins}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical Notice:</strong> AI summaries provide administrative references and visit histories. All medical evaluations require physician examination.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
