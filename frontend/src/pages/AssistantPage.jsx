import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ShieldAlert, 
  Tag, 
  Clock, 
  Building, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';
import { DoctorCard, LocationCard, SummaryCard, FAQCard, AppointmentStatusCard } from '../components/ChatCards';
import BookingModal from '../components/BookingModal';
import { useRole } from '../context/RoleContext';

const SUGGESTED_PROMPTS = [
  "I need to see a cardiologist",
  "I want to consult a heart specialist this week",
  "I need to see a skin specialist",
  "What doctors are available tomorrow?",
  "When is my next appointment?",
  "Where is the radiology department?",
  "Where is the laboratory?",
  "Summarize my recent appointments",
  "What documents do I need for registration?",
  "What disease do I have if I have chest pain?"
];

export const AssistantPage = () => {
  const { patientId, patientName } = useRole();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${patientName}! I am MediFlow AI, your intelligent hospital management assistant. How can I help you today? You can search for doctors, book appointments, check hospital room locations, or summarize your medical records.`,
      detected_intent: 'General Hospital Assistance',
      confidence: 0.98,
      entities: { department: 'General', time_preference: 'anytime', requirement: 'Initial Welcome' },
      cards: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          patient_id: patientId
        })
      });

      if (!res.ok) {
        throw new Error('API server error');
      }

      const data = await res.json();

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.message,
        detected_intent: data.detected_intent,
        confidence: data.confidence,
        entities: data.entities || {},
        cards: data.cards || [],
        safety_flag: data.safety_flag
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I encountered an error processing your query. Please make sure the backend server is running.",
          detected_intent: "Error",
          confidence: 0.0,
          entities: {},
          cards: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctorForBooking(doctor);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingData) => {
    const confirmMsg = {
      id: Date.now(),
      sender: 'ai',
      text: `🎉 Appointment successfully booked with **${bookingData.doctor_name}** on **${bookingData.appointment_date}** at **${bookingData.appointment_time}**! It is now visible on your Patient Dashboard.`,
      detected_intent: 'Appointment Booking Confirmed',
      confidence: 1.0,
      entities: { department: bookingData.department_name, time_preference: bookingData.appointment_time, requirement: bookingData.reason },
      cards: [
        {
          card_type: 'appointment_status_card',
          appointment_id: bookingData.appointment_id,
          patient_name: patientName,
          doctor_name: bookingData.doctor_name,
          department_name: bookingData.department_name,
          appointment_date: bookingData.appointment_date,
          appointment_time: bookingData.appointment_time,
          status: 'Confirmed',
          reason: bookingData.reason
        }
      ]
    };
    setMessages(prev => [...prev, confirmMsg]);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <SafetyBanner />

      {/* Main Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        
        {/* Messages Scroll Area */}
        <div className="space-y-6 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              
              {/* Message Bubble Row */}
              <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' 
                    : 'bg-gradient-to-tr from-brand-600 to-teal-500 text-white'
                }`}>
                  {msg.sender === 'user' ? patientName[0] : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Content & Metadata */}
                <div className={`max-w-[88%] sm:max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Speech Bubble */}
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-line font-medium">
                      {msg.text}
                    </div>
                  </div>

                  {/* AI Metadata Badge Bar (Intent & Entities) */}
                  {msg.sender === 'ai' && msg.detected_intent && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[11px]">
                      
                      {/* Intent Badge */}
                      <span className="font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 px-2.5 py-0.5 rounded-full border border-brand-200 dark:border-brand-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-brand-500" />
                        Intent: <strong>{msg.detected_intent}</strong> ({Math.round(msg.confidence * 100)}%)
                      </span>

                      {/* Extracted Entity Tags */}
                      {msg.entities?.department && (
                        <span className="font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                          <Building className="w-2.5 h-2.5" /> Dept: {msg.entities.department}
                        </span>
                      )}

                      {msg.entities?.time_preference && msg.entities.time_preference !== 'anytime' && (
                        <span className="font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> Time: {msg.entities.time_preference}
                        </span>
                      )}

                    </div>
                  )}

                  {/* Render Rich Cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.cards.map((card, idx) => {
                        if (card.card_type === 'doctor_card') {
                          return <DoctorCard key={idx} doctor={card} onBookClick={handleBookClick} />;
                        } else if (card.card_type === 'location_card') {
                          return <LocationCard key={idx} location={card} />;
                        } else if (card.card_type === 'summary_card') {
                          return <SummaryCard key={idx} summaryData={card} />;
                        } else if (card.card_type === 'faq_card') {
                          return <FAQCard key={idx} faq={card} />;
                        } else if (card.card_type === 'appointment_status_card') {
                          return <AppointmentStatusCard key={idx} appointment={card} />;
                        }
                        return null;
                      })}
                    </div>
                  )}

                </div>

              </div>

            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-500" />
                <span>Processing query & NLP intent recognition...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="pt-2 pb-3">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
            <MessageSquare className="w-3 h-3" /> Suggested Prompts for Demo:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-all font-medium shadow-2xs"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="sticky bottom-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-lg flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI: e.g. 'I need a skin specialist', 'Where is radiology?', 'Summarize my records'..."
            className="flex-1 text-xs sm:text-sm px-3 py-2 bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loading}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl font-semibold text-xs transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Booking Confirmation Modal */}
      <BookingModal
        doctor={selectedDoctorForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default AssistantPage;
