import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  RefreshCw, 
  ShieldAlert, 
  Calendar, 
  User, 
  Stethoscope, 
  Activity, 
  CheckCircle 
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';

export const RecordsPage = () => {
  const { patientId, patientName } = useRole();
  const [patient, setPatient] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/patients/${patientId}`);
      if (res.ok) {
        const data = await res.json();
        setPatient(data);
        setRecords(data.records || []);
      }
    } catch (err) {
      console.error("Error fetching patient records:", err);
    }
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch(`/api/patients/${patientId}/summary`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSummaryData(data);
      }
    } catch (err) {
      console.error("Error generating summary:", err);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" /> Medical Records & AI Summarization
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Clinical Records for {patientName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              View historical hospital consultations, diagnostic lab results, and generate plain-language AI overviews.
            </p>
          </div>

          <button
            onClick={handleGenerateSummary}
            disabled={loadingSummary}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loadingSummary ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating AI Summary...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-300" />
                Generate AI Summary
              </>
            )}
          </button>
        </div>

        {/* AI Generated Summary Result Card */}
        {summaryData && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-300 dark:border-brand-800 shadow-md space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Generated AI Health Summary</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Plain-language administrative overview</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Rule-Based NLP Engine
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-slate-700/60">
              {summaryData.summary}
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Safety & Administrative Notice:</strong> {summaryData.disclaimer}
              </span>
            </div>
          </div>
        )}

        {/* Detailed Medical Records List */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-500" />
            Historical Medical Visit Log ({records.length} Records)
          </h3>

          {records.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              No historical medical records logged yet.
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((rec) => (
                <div key={rec.id} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-3">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                        {rec.department_name ? rec.department_name[0] : 'M'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {rec.department_name} Department ({rec.visit_type})
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Doctor: {rec.doctor_name || 'Consultant Specialist'}</p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300">
                      Date: {rec.record_date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block mb-1">Chief Complaint & Symptoms:</strong>
                      <span className="text-slate-600 dark:text-slate-400">{rec.chief_complaint}</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block mb-1">Doctor Notes:</strong>
                      <span className="text-slate-600 dark:text-slate-400">{rec.doctor_notes}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/50 rounded-xl text-xs">
                    <strong className="text-teal-900 dark:text-teal-200 block mb-1">Diagnostic & Lab Findings:</strong>
                    <span className="text-teal-800 dark:text-teal-300">{rec.lab_results}</span>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default RecordsPage;
