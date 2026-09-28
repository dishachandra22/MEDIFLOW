import React, { useState, useEffect } from 'react';
import { Stethoscope, Calendar, Clock, User, FileText, Sparkles, RefreshCw, ShieldAlert, CheckCircle } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';

export const DoctorDashboard = () => {
  const { doctorId, doctorName } = useRole();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSummaryPatient, setActiveSummaryPatient] = useState(null);
  const [summaryResult, setSummaryResult] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [doctorId]);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
              <Stethoscope className="w-3.5 h-3.5" /> Doctor Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {data?.doctor_name || doctorName}'s Schedule
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Department: <strong>{data?.department_name || 'Cardiology'}</strong> • Room: <strong>{data?.room_number || '102'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center border border-slate-200 dark:border-slate-700">
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-semibold">Today's Visits</span>
              <span className="text-lg font-extrabold text-brand-600 dark:text-brand-400">{data?.today_appointments_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Doctor Schedule & Patient Summaries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Schedule List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Scheduled Consultations ({data?.schedule?.length || 0})
              </h3>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-500">Loading schedule...</div>
              ) : !data?.schedule || data.schedule.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  No appointments scheduled for today.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.schedule.map((slot) => (
                    <div key={slot.appointment_id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{slot.patient_name}</h4>
                          <span className="text-[11px] text-slate-500 font-medium">({slot.patient_age} yrs, {slot.patient_gender})</span>
                        </div>
                        <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">Reason: {slot.reason}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">History: {slot.medical_history}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1 font-semibold text-teal-600"><Clock className="w-3 h-3" /> {slot.appointment_time}</span>
                          <span>• Date: {slot.appointment_date}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSummarizePatient(slot.patient_id, slot.patient_name)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                        AI Summarize Patient
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Patient Summary Inspector Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-500" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Clinical Record Inspector</h3>
                  </div>
                  {activeSummaryPatient && (
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                      {activeSummaryPatient.name}
                    </span>
                  )}
                </div>

                {!activeSummaryPatient ? (
                  <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p>Click "AI Summarize Patient" on any scheduled appointment to view an instant plain-language summary.</p>
                  </div>
                ) : loadingSummary ? (
                  <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-500" />
                    Generating patient summary...
                  </div>
                ) : summaryResult ? (
                  <div className="mt-4 space-y-3">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-slate-700/60">
                      {summaryResult.summary}
                    </div>

                    {summaryResult.key_insights && (
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Summary Key Takeaways:</span>
                        {summaryResult.key_insights.map((ins, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ins}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Summaries are created by template-based NLP to assist fast chart reviews.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
