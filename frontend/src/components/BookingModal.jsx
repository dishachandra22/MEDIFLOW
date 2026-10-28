import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const BookingModal = ({ doctor, initialSlot, isOpen, onClose, onBookingSuccess }) => {
  const { patientId, patientName } = useRole();
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(initialSlot?.available_date || initialSlot?.date || todayStr);
  const [selectedTime, setSelectedTime] = useState(initialSlot?.available_time || initialSlot?.time || '10:30 AM');
  const [slotId, setSlotId] = useState(initialSlot?.slot_id || initialSlot?.id || null);
  const [reason, setReason] = useState('Specialist Consultation & Health Review');
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
      setSuccessMsg(`Appointment confirmed with ${data.doctor_name} on ${data.appointment_date} at ${data.appointment_time}!`);
      
      setTimeout(() => {
        setSuccessMsg('');
        if (onBookingSuccess) onBookingSuccess(data);
        onClose();
      }, 1600);

    } catch (err) {
      setErrorMsg(err.message || 'Error booking appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-700 rounded-3xl shadow-2xl dark:shadow-cyber-card max-w-md w-full overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-obsidian-850 border-b border-slate-200 dark:border-obsidian-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-mint-neon/15 flex items-center justify-center text-mint-neon">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">Confirm Appointment</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Patient: {patientName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-mint-neon hover:bg-slate-200 dark:hover:bg-obsidian-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Doctor Info Card */}
          <div className="p-3.5 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-mint-neon/15 border border-mint-neon/30 text-mint-neon flex items-center justify-center font-bold text-sm shadow-glow-mint-sm shrink-0">
              {doctor.name ? doctor.name.split(' ').map(n=>n[0]).join('') : 'DR'}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doctor.name}</h4>
              <p className="text-xs font-semibold text-mint-neon">{doctor.department_name} • {doctor.specialization}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{doctor.qualification} • {doctor.experience_years} yrs exp • Room {doctor.room_number || '102'}</p>
            </div>
          </div>

          {/* Date & Time selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-mint-neon" /> Date
              </label>
              <input 
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-obsidian-700 bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-electric" /> Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-obsidian-700 bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon cursor-pointer"
              >
                <option value="09:00 AM">09:00 AM (Morning)</option>
                <option value="10:30 AM">10:30 AM (Morning)</option>
                <option value="11:45 AM">11:45 AM (Morning)</option>
                <option value="02:00 PM">02:00 PM (Afternoon)</option>
                <option value="03:30 PM">03:30 PM (Evening)</option>
                <option value="05:00 PM">05:00 PM (Evening)</option>
              </select>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Consultation Reason / Clinical Note
            </label>
            <input 
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Cardiology follow-up, routine skin check, allergy advice"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-obsidian-700 bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon"
              required
            />
          </div>

          {successMsg && (
            <div className="p-3 bg-mint-neon/15 dark:bg-obsidian-850 border border-mint-neon/40 text-mint-neon rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-mint-neon" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-obsidian-850 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-obsidian-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !!successMsg}
              className="px-5 py-2.5 text-xs font-bold text-[#04160f] bg-mint-neon hover:bg-mint-glow disabled:opacity-50 rounded-xl shadow-glow-mint transition-all flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#04160f]/30 border-t-[#04160f] rounded-full animate-spin" />
                  Booking Slot...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default BookingModal;
