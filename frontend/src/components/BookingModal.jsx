import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const BookingModal = ({ doctor, initialSlot, isOpen, onClose, onBookingSuccess }) => {
  const { patientId, patientName } = useRole();
  const [selectedDate, setSelectedDate] = useState(initialSlot?.available_date || initialSlot?.date || new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(initialSlot?.available_time || initialSlot?.time || '10:30 AM');
  const [slotId, setSlotId] = useState(initialSlot?.slot_id || initialSlot?.id || null);
  const [reason, setReason] = useState('Specialist Consultation');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_id: doctor.doctor_id || doctor.id,
          slot_id: slotId,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          reason: reason
        })
      });

      if (!res.ok) {
        throw new Error('Failed to create appointment');
      }

      const data = await res.json();
      setSuccessMsg(`Appointment confirmed with ${data.doctor_name} for ${data.appointment_date} at ${data.appointment_time}!`);
      
      setTimeout(() => {
        setSuccessMsg('');
        if (onBookingSuccess) onBookingSuccess(data);
        onClose();
      }, 1800);

    } catch (err) {
      setErrorMsg(err.message || 'Error booking appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Confirm Appointment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Patient: {patientName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Doctor Info Card */}
          <div className="p-3.5 bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {doctor.name ? doctor.name.split(' ').map(n=>n[0]).join('') : 'DR'}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{doctor.name}</h4>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{doctor.department_name} • {doctor.specialization}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{doctor.qualification} ({doctor.experience_years} yrs exp)</p>
            </div>
          </div>

          {/* Date & Time selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <div className="relative">
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:45 AM">11:45 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reason / Consultation Note
            </label>
            <input 
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Cardiology follow-up, routine skin check"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !!successMsg}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default BookingModal;
