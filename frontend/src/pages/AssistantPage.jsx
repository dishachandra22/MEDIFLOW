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
  MessageSquare,
  RotateCcw,
  Compass
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';
import { 
  DoctorCard, 
  LocationCard, 
  SummaryCard, 
  FAQCard, 
  AppointmentStatusCard,
  SafetyCard 
} from '../components/ChatCards';
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
  const initialWelcome = {
    id: 1,
    sender: 'ai',
    text: `Hello ${patientName}! I am MediFlow AI, your intelligent hospital management assistant. How can I help you today? You can search for doctors, book appointments, check hospital room locations, or summarize your medical records.`,
    detected_intent: 'General Hospital Assistance',
    confidence: 0.98,
    entities: { department: 'General', time_preference: 'anytime', requirement: 'Initial Welcome' },
    cards: []
  };

  const [messages, setMessages] = useState([initialWelcome]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
          text: "I encountered an error connecting to the backend server. Please verify that FastAPI is running on port 8000.",
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

  const handleClearChat = () => {
    setMessages([
      {
        ...initialWelcome,
        id: Date.now(),
        text: `Chat reset. Hello ${patientName}! How can MediFlow AI assist you right now?`
      }
    ]);
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
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors duration-200">
      <SafetyBanner />

      {/* Main Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        
        {/* Chat Header Actions */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-obsidian-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mint-neon animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Live AI Assistant Pipeline Active</span>
          </div>
          <button
            onClick={handleClearChat}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-mint-neon flex items-center gap-1.5 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="space-y-6 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              
              {/* Message Bubble Row */}
              <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-obsidian-850 border border-obsidian-700 text-mint-neon font-bold' 
                    : 'bg-mint-neon text-obsidian-950 font-bold shadow-glow-mint-sm'
                }`}>
                  {msg.sender === 'user' ? patientName[0] : <Bot className="w-5 h-5 stroke-[2.5]" />}
                </div>

                {/* Message Content & Metadata */}
                <div className={`max-w-[88%] sm:max-w-[82%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Speech Bubble */}
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-obsidian-850 border border-mint-neon/40 text-white rounded-tr-none shadow-glow-mint-sm/20 font-medium'
                      : 'bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-700 text-slate-900 dark:text-slate-100 rounded-tl-none shadow-sm dark:shadow-cyber-card'
                  }`}>
                    <div className="whitespace-pre-line font-medium">
                      {msg.text}
                    </div>
                  </div>

                  {/* AI Metadata Badge Bar (Intent & Entities) */}
                  {msg.sender === 'ai' && msg.detected_intent && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[11px]">
                      
                      {/* Intent Badge */}
                      <span className="font-bold bg-mint-neon/10 dark:bg-obsidian-850 text-mint-neon px-2.5 py-0.5 rounded-full border border-mint-neon/30 flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-mint-neon animate-spin-slow" />
                        Intent: <strong>{msg.detected_intent}</strong> ({Math.round(msg.confidence * 100)}%)
                      </span>

                      {/* Extracted Entity Tags */}
                      {msg.entities?.department && (
                        <span className="font-semibold bg-cyan-electric/10 dark:bg-obsidian-850 text-cyan-electric px-2.5 py-0.5 rounded-md border border-cyan-electric/30 flex items-center gap-1">
                          <Building className="w-2.5 h-2.5" /> Dept: {msg.entities.department}
                        </span>
                      )}

                      {msg.entities?.time_preference && msg.entities.time_preference !== 'anytime' && (
                        <span className="font-semibold bg-amber-500/10 dark:bg-obsidian-850 text-amber-400 px-2.5 py-0.5 rounded-md border border-amber-500/30 flex items-center gap-1">
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
                        } else if (card.card_type === 'safety_card') {
                          return <SafetyCard key={idx} safetyData={card} />;
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
              <div className="w-9 h-9 rounded-2xl bg-mint-neon text-obsidian-950 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse shadow-glow-mint-sm">
                <Bot className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-700 p-3 rounded-2xl rounded-tl-none text-xs text-slate-600 dark:text-mint-neon flex items-center gap-2 shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-mint-neon" />
                <span>Processing natural language & intent scoring...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="pt-2 pb-3">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-mint-neon" /> Suggested Prompts for Demo:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs px-3.5 py-1.5 rounded-xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-700 text-slate-700 dark:text-slate-300 hover:border-mint-neon/50 hover:bg-mint-neon/10 hover:text-mint-neon transition-all font-medium shadow-2xs"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Floating Input Bar */}
        <div className="sticky bottom-4 bg-white dark:bg-obsidian-900/95 border border-slate-200 dark:border-obsidian-700 rounded-2xl p-2 shadow-lg dark:shadow-cyber-card flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI: e.g. 'I need a skin specialist', 'Where is radiology?', 'Summarize my records'..."
            className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loading}
            className="px-5 py-2.5 bg-mint-neon hover:bg-mint-glow disabled:opacity-40 text-[#04160f] rounded-xl font-bold text-xs transition-all shadow-glow-mint flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
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
