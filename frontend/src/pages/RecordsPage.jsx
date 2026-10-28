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
  CheckCircle,
  Printer,
  Filter
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import SafetyBanner from '../components/SafetyBanner';

export const RecordsPage = () => {
  const { patientId, patientName } = useRole();
  const [patient, setPatient] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [records, setRecords] = useState([]);
  const [filterDept, setFilterDept] = useState('All');

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

  const handlePrint = () => {
    window.print();
  };

  const departmentsList = ['All', ...new Set(records.map(r => r.department_name))];

  const filteredRecords = filterDept === 'All' 
    ? records 
    : records.filter(r => r.department_name === filterDept);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <FileText className="w-3.5 h-3.5 text-mint-neon" /> Electronic Health Records & AI Summarizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Clinical Records for {patientName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Patient ID: #{patientId} • Blood Group: {patient?.blood_group || 'O+'} • Known allergies: Penicillin • Medical History: {patient?.medical_history_summary || 'Mild hypertension under control'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {summaryData && (
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-300 dark:border-obsidian-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:border-mint-neon/50 transition-all flex items-center gap-1.5 shadow-sm"
                title="Print Summary Document"
              >
                <Printer className="w-4 h-4 text-mint-neon" />
                Print / Save
              </button>
            )}

            <button
              onClick={handleGenerateSummary}
              disabled={loadingSummary}
              className="px-5 py-2.5 rounded-2xl bg-mint-neon hover:bg-mint-glow text-[#04160f] font-bold text-xs shadow-glow-mint flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loadingSummary ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#04160f]" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  Generate AI Summary
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Generated Summary Result Card */}
        {summaryData && (
          <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-mint-neon/40 shadow-glow-mint-sm/25 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-mint-neon/15 text-mint-neon flex items-center justify-center font-bold border border-mint-neon/30 shadow-glow-mint-sm">
                  <Sparkles className="w-5 h-5 text-mint-neon animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Generated AI Health Summary</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Plain-language administrative overview synthesized from clinical encounters</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon border border-mint-neon/30">
                Rule-Based NLP Engine
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-obsidian-850 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-obsidian-700">
              {summaryData.summary}
            </div>

            {summaryData.key_insights && (
              <div className="p-3 bg-mint-neon/10 dark:bg-obsidian-850 rounded-2xl border border-mint-neon/25 space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-mint-neon">Key AI Synthesized Highlights:</span>
                {summaryData.key_insights.map((ins, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-mint-neon shrink-0 mt-0.5" />
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Safety & Administrative Notice:</strong> {summaryData.disclaimer}
              </span>
            </div>
          </div>
        )}

        {/* Detailed Medical Records List */}
        <div className="bg-white dark:bg-obsidian-900 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-obsidian-700/80 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-mint-neon" />
              Historical Medical Visit Log ({filteredRecords.length} Records)
            </h3>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
              {departmentsList.map(dept => (
                <button
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterDept === dept
                      ? 'bg-mint-neon/15 text-mint-neon border border-mint-neon/40 shadow-glow-mint-sm/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-white hover:bg-obsidian-800'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-dashed border-slate-200 dark:border-obsidian-700">
              No historical medical records logged under this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((rec) => (
                <div key={rec.id} className="p-5 bg-slate-50 dark:bg-obsidian-850 rounded-2xl border border-slate-200/80 dark:border-obsidian-700 space-y-3 hover:border-mint-neon/40 transition-all">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-obsidian-700/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-mint-neon/15 border border-mint-neon/30 text-mint-neon flex items-center justify-center font-bold text-xs shadow-glow-mint-sm shrink-0">
                        {rec.department_name ? rec.department_name[0] : 'M'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {rec.department_name} Department ({rec.visit_type})
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Doctor: {rec.doctor_name || 'Consultant Specialist'}</p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-obsidian-700 rounded-xl text-slate-700 dark:text-slate-300 self-start sm:self-center">
                      Date: {rec.record_date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-obsidian-900 rounded-xl border border-slate-200/80 dark:border-obsidian-700">
                      <strong className="block text-slate-500 dark:text-slate-400 mb-1">Chief Complaint:</strong>
                      <span className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{rec.chief_complaint}</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-obsidian-900 rounded-xl border border-slate-200/80 dark:border-obsidian-700">
                      <strong className="block text-slate-500 dark:text-slate-400 mb-1">Doctor's Clinical Notes:</strong>
                      <span className="text-slate-800 dark:text-slate-200 leading-relaxed">{rec.doctor_notes}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-obsidian-900 rounded-xl border border-slate-200/80 dark:border-obsidian-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-slate-500 dark:text-slate-400">Diagnostic / Lab Findings:</strong>{' '}
                      <span className="text-mint-neon font-semibold">{rec.lab_results}</span>
                    </div>
                    {rec.follow_up_date && (
                      <span className="text-[11px] font-bold text-mint-neon bg-mint-neon/10 dark:bg-obsidian-800 px-2.5 py-1 rounded-lg border border-mint-neon/30 shrink-0">
                        Follow-up: {rec.follow_up_date}
                      </span>
                    )}
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
