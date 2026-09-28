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
  ArrowRight
} from 'lucide-react';

export const DoctorCard = ({ doctor, onBookClick }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
            {doctor.name ? doctor.name.split(' ').map(n=>n[0]).join('') : 'DR'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doctor.name}</h4>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                <Star className="w-3 h-3 fill-amber-400" /> {doctor.rating}
              </span>
            </div>
            <p className="text-xs font-medium text-brand-600 dark:text-brand-400">{doctor.specialization} ({doctor.department_name})</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{doctor.qualification} • {doctor.experience_years} Years Exp.</p>
          </div>
        </div>

        <button
          onClick={() => onBookClick(doctor)}
          className="self-start sm:self-center px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-95 rounded-xl shadow-sm shadow-brand-500/20 transition-all flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Slot
        </button>

      </div>

      {/* Recommended Slot Info */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-brand-500" />
          <span>Available: <strong>{doctor.available_date}</strong></span>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <Clock className="w-3.5 h-3.5 text-teal-500" />
          <span>Time: <strong>{doctor.available_time}</strong></span>
        </div>
      </div>

      {/* AI Recommender Explanation */}
      {doctor.why_recommended && (
        <div className="mt-2.5 p-2.5 bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/50 rounded-xl text-[11px] text-teal-900 dark:text-teal-200 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <span><strong>Why Recommended:</strong> {doctor.why_recommended}</span>
        </div>
      )}
    </div>
  );
};


export const LocationCard = ({ location }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{location.room_name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{location.department_name} Department</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs my-2.5">
        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300">
          Floor: <strong>{location.floor}</strong>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300">
          Room No: <strong>{location.room_number}</strong>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
        <strong>Building:</strong> {location.building} • <strong>Landmark:</strong> {location.landmark}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
        "{location.directions}"
      </p>
    </div>
  );
};


export const SummaryCard = ({ summaryData }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-800 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Medical Record Summary</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Patient: {summaryData.patient_name || 'Varsha'}</p>
        </div>
      </div>

      <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed mb-3">
        {summaryData.summary}
      </div>

      <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{summaryData.disclaimer || "Administrative summary only. Does not replace physician diagnosis."}</span>
      </div>
    </div>
  );
};


export const FAQCard = ({ faq }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
          {faq.category}
        </span>
        <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
          {faq.source || "Source: Hospital Knowledge Base"}
        </span>
      </div>

      <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-brand-500 shrink-0" />
        {faq.question}
      </h4>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        {faq.answer}
      </p>
    </div>
  );
};


export const AppointmentStatusCard = ({ appointment }) => {
  return (
    <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-800 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Scheduled Appointment</h4>
        </div>
        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
          {appointment.status || "Confirmed"}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>Doctor:</strong> {appointment.doctor_name} ({appointment.department_name})</p>
        <p><strong>Date & Time:</strong> {appointment.appointment_date} at {appointment.appointment_time}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
        <p className="text-slate-500 dark:text-slate-400"><strong>Location:</strong> {appointment.location || "OPD Block"}</p>
      </div>
    </div>
  );
};
