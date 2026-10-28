import React from 'react';
import { 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Building, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  FileText,
  ShieldAlert,
  ArrowRight,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorCard = ({ doctor, onBookClick }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-obsidian-900/95 border border-slate-200 dark:border-obsidian-700 rounded-2xl shadow-sm dark:shadow-cyber-card hover:border-mint-neon/50 hover:shadow-cyber-card-hover transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-obsidian-700/80">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-mint-neon/15 border border-mint-neon/30 text-mint-neon flex items-center justify-center font-bold text-base shadow-glow-mint-sm shrink-0">
            {doctor.name ? doctor.name.split(' ').map(n=>n[0]).join('') : 'DR'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doctor.name}</h4>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-50 dark:bg-obsidian-800 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-400" /> {doctor.rating}
              </span>
            </div>
            <p className="text-xs font-semibold text-mint-neon">{doctor.specialization} • {doctor.department_name}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{doctor.qualification} • {doctor.experience_years} Years Exp. • Room {doctor.room_number || '102'}</p>
          </div>
        </div>

        <button
          onClick={() => onBookClick(doctor)}
          className="self-start sm:self-center px-4 py-2 text-xs font-bold text-[#04160f] bg-mint-neon hover:bg-mint-glow active:scale-95 rounded-xl shadow-glow-mint transition-all flex items-center gap-1.5 shrink-0"
        >
          <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
          Book Slot
        </button>

      </div>

      {/* Recommended Slot Info */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-slate-50 dark:bg-obsidian-850 rounded-xl flex items-center gap-2 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-obsidian-700">
          <Calendar className="w-3.5 h-3.5 text-mint-neon" />
          <span>Available: <strong className="text-slate-900 dark:text-white">{doctor.available_date}</strong></span>
        </div>
        <div className="p-2.5 bg-slate-50 dark:bg-obsidian-850 rounded-xl flex items-center gap-2 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-obsidian-700">
          <Clock className="w-3.5 h-3.5 text-cyan-electric" />
          <span>Earliest: <strong className="text-slate-900 dark:text-white">{doctor.available_time}</strong></span>
        </div>
      </div>

      {/* AI Recommender Explanation Rationale */}
      {doctor.why_recommended && (
        <div className="mt-2.5 p-3 bg-mint-neon/10 dark:bg-obsidian-850 border border-mint-neon/30 rounded-xl text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5 shadow-2xs">
          <Sparkles className="w-4 h-4 text-mint-neon shrink-0 mt-0.5 animate-pulse" />
          <span className="leading-relaxed"><strong className="text-mint-neon">AI Recommendation Rationale:</strong> {doctor.why_recommended}</span>
        </div>
      )}
    </div>
  );
};


export const LocationCard = ({ location }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-obsidian-900/95 border border-slate-200 dark:border-obsidian-700 rounded-2xl shadow-sm dark:shadow-cyber-card">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-mint-neon/15 dark:bg-obsidian-800 text-mint-neon flex items-center justify-center border border-mint-neon/30">
            <MapPin className="w-4 h-4 text-mint-neon" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{location.room_name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{location.department_name} Department</p>
          </div>
        </div>
        <Link 
          to={`/navigation`}
          className="text-[11px] font-bold text-mint-neon bg-mint-neon/10 dark:bg-obsidian-800 px-2.5 py-1 rounded-lg border border-mint-neon/30 flex items-center gap-1 hover:underline"
        >
          View Map <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs my-2.5">
        <div className="p-2.5 bg-slate-50 dark:bg-obsidian-850 rounded-xl text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-obsidian-700">
          Floor: <strong className="text-slate-900 dark:text-white">{location.floor}</strong>
        </div>
        <div className="p-2.5 bg-slate-50 dark:bg-obsidian-850 rounded-xl text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-obsidian-700">
          Room No: <strong className="text-slate-900 dark:text-white">{location.room_number}</strong>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        <strong>Building:</strong> {location.building || "Main Block"} • <strong>Landmark:</strong> {location.landmark}
      </p>
      <div className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-obsidian-850 p-2.5 rounded-xl border border-slate-100 dark:border-obsidian-700">
        "{location.directions}"
      </div>
    </div>
  );
};


export const SummaryCard = ({ summaryData }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-obsidian-900/95 border border-slate-200 dark:border-obsidian-700 rounded-2xl shadow-sm dark:shadow-cyber-card space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-mint-neon/15 dark:bg-obsidian-800 text-mint-neon flex items-center justify-center border border-mint-neon/30">
            <FileText className="w-4 h-4 text-mint-neon" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Medical Record Overview</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Patient: {summaryData.patient_name || 'Varsha'} ({summaryData.age || 28} yrs)</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-mint-neon bg-mint-neon/10 dark:bg-obsidian-800 px-2 py-0.5 rounded-md border border-mint-neon/30">
          Explainable NLP
        </span>
      </div>

      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-obsidian-850 p-3.5 rounded-xl border border-slate-100 dark:border-obsidian-700">
        {summaryData.summary}
      </div>

      {summaryData.key_insights && summaryData.key_insights.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-900 dark:text-white">AI Highlights:</span>
          {summaryData.key_insights.map((ins, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-mint-neon shrink-0 mt-0.5" />
              <span>{ins}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
        <span>{summaryData.disclaimer || "Administrative summary only. Does not replace physician diagnosis."}</span>
      </div>
    </div>
  );
};


export const FAQCard = ({ faq }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-obsidian-900/95 border border-slate-200 dark:border-obsidian-700 rounded-2xl shadow-sm dark:shadow-cyber-card space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-mint-neon bg-mint-neon/10 dark:bg-obsidian-800 px-2.5 py-0.5 rounded-full border border-mint-neon/30">
          {faq.category}
        </span>
        <span className="text-[10px] font-semibold text-cyan-electric bg-cyan-electric/10 dark:bg-obsidian-800 px-2.5 py-0.5 rounded-full border border-cyan-electric/30">
          {faq.source || "Source: Hospital Knowledge Base"}
        </span>
      </div>

      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-mint-neon shrink-0" />
        {faq.question}
      </h4>

      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-obsidian-850 p-3.5 rounded-xl border border-slate-100 dark:border-obsidian-700">
        {faq.answer}
      </p>
    </div>
  );
};


export const AppointmentStatusCard = ({ appointment }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-obsidian-900/95 border border-mint-neon/30 rounded-2xl shadow-sm dark:shadow-cyber-card space-y-2">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700/80 pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-mint-neon" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Scheduled Appointment</h4>
        </div>
        <span className="text-[10px] font-bold bg-mint-neon/15 dark:bg-obsidian-800 text-mint-neon px-2.5 py-0.5 rounded-full border border-mint-neon/40">
          {appointment.status || "Confirmed"}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>Doctor:</strong> <span className="text-slate-900 dark:text-white">{appointment.doctor_name}</span> ({appointment.department_name})</p>
        <p><strong>Date & Time:</strong> <span className="text-mint-neon font-semibold">{appointment.appointment_date} at {appointment.appointment_time}</span></p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
        <p className="text-slate-500 dark:text-slate-400"><strong>Location:</strong> {appointment.location || "OPD Block A"}</p>
      </div>
    </div>
  );
};


export const SafetyCard = ({ safetyData }) => {
  return (
    <div className="my-3 p-4 bg-red-500/10 dark:bg-obsidian-900/95 border-2 border-red-500/50 rounded-2xl shadow-sm space-y-3 animate-fade-in">
      <div className="flex items-center gap-2 border-b border-red-500/20 pb-2">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
        <h4 className="font-bold text-sm text-red-900 dark:text-red-300">
          {safetyData?.title || "Safety Protocol: Diagnostic Refusal"}
        </h4>
      </div>

      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
        {safetyData?.content || "MediFlow AI is an administrative hospital assistant and cannot interpret symptoms, diagnose medical diseases, or recommend medication."}
      </p>

      <div className="p-3 bg-red-500/15 dark:bg-obsidian-850 rounded-xl border border-red-500/30 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 block">Emergency Ward Location</span>
          <span className="font-bold text-slate-900 dark:text-white">{safetyData?.emergency_location || "Casualty / Emergency, Ground Floor"}</span>
        </div>
        <a
          href="tel:18009990000"
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          {safetyData?.emergency_contact || "+91 1800-999-0000"}
        </a>
      </div>
    </div>
  );
};
