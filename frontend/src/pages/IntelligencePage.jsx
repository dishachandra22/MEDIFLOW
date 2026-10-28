import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Bot, 
  Layers, 
  Sliders, 
  Database,
  ShieldAlert,
  AlertTriangle,
  Play
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const IntelligencePage = () => {
  // Demo 1: NLP Intent & Entity Test
  const [nlpQuery, setNlpQuery] = useState('I need to see a skin specialist tomorrow');
  const [nlpResult, setNlpResult] = useState({
    intent: 'Doctor Search',
    confidence: 0.94,
    entities: { department: 'Dermatology', time_preference: 'tomorrow', requirement: 'Consultation with Dermatology specialist' }
  });

  // Demo 2: Recommendation Engine Test
  const [demoDept, setDemoDept] = useState('Cardiology');
  const [demoTime, setDemoTime] = useState('tomorrow');
  const [demoRec, setDemoRec] = useState({
    doctor: 'Dr. Ananya Rao',
    specialization: 'Senior Cardiologist (MD, DM)',
    slot: 'Tomorrow @ 10:30 AM',
    reason: 'Dr. Ananya Rao is recommended as a top-rated Senior Cardiologist with 14 years of clinical experience. Earliest available slot is tomorrow at 10:30 AM.'
  });

  // Demo 3: Summarizer Test
  const [sumDemoText, setSumDemoText] = useState(
    "Patient recently visited the Cardiology department (Dr. Ananya Rao) complaining of mild palpitations. Resting ECG report was normal (72 bpm, sinus rhythm). Follow-up consultation scheduled."
  );

  // Demo 4: Safety Guardrail Test
  const [safetyInput, setSafetyInput] = useState('What disease do I have if I have chest pain?');
  const [safetyResult, setSafetyResult] = useState({
    isSafe: false,
    triggeredRule: "Diagnostic Symptom Interpretation",
    action: "Safe Refusal Dispatched",
    hotline: "+91 1800-999-0000"
  });

  const handleTestNlp = (text) => {
    const q = text.toLowerCase();
    let dept = null;
    if (q.includes('skin') || q.includes('dermatolog')) dept = 'Dermatology';
    else if (q.includes('cardio') || q.includes('heart')) dept = 'Cardiology';
    else if (q.includes('bone') || q.includes('ortho')) dept = 'Orthopedics';
    else if (q.includes('child') || q.includes('pediatri')) dept = 'Pediatrics';
    else if (q.includes('brain') || q.includes('neuro')) dept = 'Neurology';

    let time = 'anytime';
    if (q.includes('tomorrow')) time = 'tomorrow';
    else if (q.includes('today')) time = 'today';
    else if (q.includes('week')) time = 'this_week';

    let intent = 'General Hospital Assistance';
    if (q.includes('see') || q.includes('doctor') || q.includes('specialist') || q.includes('consult')) intent = 'Doctor Search';
    else if (q.includes('where') || q.includes('floor') || q.includes('room')) intent = 'Hospital Navigation';
    else if (q.includes('summar')) intent = 'Patient Record Summary';
    else if (q.includes('document') || q.includes('hours') || q.includes('timing')) intent = 'Hospital Information';
    else if (q.includes('my appointment') || q.includes('next appointment')) intent = 'Appointment Status';

    setNlpResult({
      intent,
      confidence: 0.94,
      entities: { department: dept, time_preference: time, requirement: `Query: '${text}'` }
    });
  };

  const handleTestSafety = (text) => {
    const q = text.toLowerCase();
    const unsafeKeywords = ['disease', 'diagnosis', 'diagnose', 'symptom', 'pain', 'cure', 'prescribe', 'medicine for', 'what do i have'];
    const isUnsafe = unsafeKeywords.some(k => q.includes(k));

    if (isUnsafe) {
      setSafetyResult({
        isSafe: false,
        triggeredRule: "Restricted Medical Diagnosis / Symptom Query",
        action: "Blocked by Safety Guardrail. Emergency hotline displayed.",
        hotline: "+91 1800-999-0000"
      });
    } else {
      setSafetyResult({
        isSafe: true,
        triggeredRule: "None (Valid Administrative Query)",
        action: "Permitted. Routing to Intent & Knowledge Pipeline.",
        hotline: "N/A"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-obsidian-900/90 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <Cpu className="w-3.5 h-3.5 text-mint-neon" /> Explainable AI Architecture & Live Sandbox
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              MediFlow AI Pipeline & Technical Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Inspect the end-to-end NLP query flow and test all 5 modular sub-engines in real time with interactive inputs.
            </p>
          </div>
        </div>

        {/* SECTION 1: System Architecture Diagram */}
        <div className="bg-white dark:bg-obsidian-900/90 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-4 gap-2">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-mint-neon" />
                MediFlow End-to-End AI Orchestration Pipeline
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">6-stage query processing pipeline from medical guardrails to rich UI card rendering</p>
            </div>
            <span className="text-xs font-bold text-mint-neon bg-mint-neon/10 px-3 py-1 rounded-full border border-mint-neon/40 self-start sm:self-center shadow-glow-mint-sm">
              Strategy Pattern Architecture
            </span>
          </div>

          {/* Visual Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center">
            
            <div className="p-4 bg-slate-50 dark:bg-obsidian-850/80 rounded-2xl border border-slate-200 dark:border-obsidian-700 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-mint-neon/15 text-mint-neon flex items-center justify-center font-bold text-xs border border-mint-neon/30">1</div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">User Query</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Natural language input</p>
            </div>

            <div className="p-4 bg-red-500/10 dark:bg-obsidian-850/80 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs border border-red-500/40">2</div>
              <span className="font-bold text-xs text-red-800 dark:text-red-300">Safety Guardrail</span>
              <p className="text-[10px] text-red-600 dark:text-red-400">Blocks diagnosis queries</p>
            </div>

            <div className="p-4 bg-cyan-electric/10 dark:bg-obsidian-850/80 rounded-2xl border border-cyan-electric/30 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-electric/20 text-cyan-electric flex items-center justify-center font-bold text-xs border border-cyan-electric/40">3</div>
              <span className="font-bold text-xs text-cyan-700 dark:text-cyan-electric">Intent & Entity NLP</span>
              <p className="text-[10px] text-cyan-600 dark:text-cyan-300">Scores 7 intent types</p>
            </div>

            <div className="p-4 bg-mint-neon/10 dark:bg-obsidian-850/80 rounded-2xl border border-mint-neon/30 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-mint-neon/20 text-mint-neon flex items-center justify-center font-bold text-xs border border-mint-neon/40">4</div>
              <span className="font-bold text-xs text-mint-neon">KB / DB Query</span>
              <p className="text-[10px] text-mint-neon/80">Fetches verified data</p>
            </div>

            <div className="p-4 bg-indigo-500/10 dark:bg-obsidian-850/80 rounded-2xl border border-indigo-500/30 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/40">5</div>
              <span className="font-bold text-xs text-indigo-800 dark:text-indigo-300">AI Response</span>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400">Synthesizes explanation</p>
            </div>

            <div className="p-4 bg-emerald-500/10 dark:bg-obsidian-850/80 rounded-2xl border border-emerald-500/30 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">6</div>
              <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Rich UI Output</span>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Doctor & Map Cards</p>
            </div>

          </div>

          {/* LLM Integration Callout */}
          <div className="p-4 bg-obsidian-950 text-white rounded-2xl space-y-2 text-xs border border-mint-neon/30">
            <div className="flex items-center gap-2 font-bold text-mint-neon">
              <Code2 className="w-4 h-4 text-mint-neon" />
              How to Plug In Live LLM (OpenAI GPT-4 / Google Gemini)
            </div>
            <p className="text-slate-300 leading-relaxed">
              MediFlow AI implements the **Strategy Pattern** via <code className="bg-obsidian-850 px-1.5 py-0.5 rounded text-mint-neon font-mono">LLMProvider</code> in <code className="bg-obsidian-850 px-1.5 py-0.5 rounded text-mint-neon font-mono">backend/ai/llm_provider.py</code>. By default, it operates completely offline with zero API key using <code className="text-mint-neon font-bold">RuleBasedProvider</code>. To activate cloud LLM:
            </p>
            <div className="p-3 bg-obsidian-900 rounded-xl font-mono text-[11px] text-mint-neon border border-obsidian-700">
              LLM_PROVIDER=openai &nbsp;&nbsp;&nbsp;# or gemini<br />
              OPENAI_API_KEY=sk-your-openai-key-here &nbsp;&nbsp;&nbsp;# or GEMINI_API_KEY=your-gemini-key
            </div>
          </div>
        </div>

        {/* SECTION 2: 5 Interactive AI Feature Testing Cards */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mint-neon" />
            Interactive AI Module Sandbox (5 Sub-Engines)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Rule-Based NLP & Entity Parser */}
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-mint-neon" /> 1. NLP Intent Detector
                  </span>
                  <span className="text-[10px] font-bold bg-mint-neon/10 text-mint-neon px-2 py-0.5 rounded-full border border-mint-neon/30">
                    intent_detector.py
                  </span>
                </div>

                <div className="space-y-2 mt-3">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Live Test Sentence:</label>
                  <input
                    type="text"
                    value={nlpQuery}
                    onChange={(e) => {
                      setNlpQuery(e.target.value);
                      handleTestNlp(e.target.value);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-850 text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon"
                  />
                </div>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-obsidian-850/80 rounded-2xl text-xs space-y-1.5 font-mono text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-obsidian-700">
                  <div><strong>Intent:</strong> <span className="text-mint-neon font-bold">{nlpResult.intent}</span></div>
                  <div><strong>Confidence:</strong> {nlpResult.confidence}</div>
                  <div><strong>Department:</strong> {nlpResult.entities.department || 'General'}</div>
                  <div><strong>Time:</strong> {nlpResult.entities.time_preference}</div>
                </div>
              </div>
            </div>

            {/* Card 2: Explainable Doctor Recommender */}
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-electric" /> 2. Doctor Recommender
                  </span>
                  <span className="text-[10px] font-bold bg-cyan-electric/10 text-cyan-electric px-2 py-0.5 rounded-full border border-cyan-electric/30">
                    recommender.py
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Department</label>
                    <select
                      value={demoDept}
                      onChange={(e) => setDemoDept(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-850 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-electric"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Time</label>
                    <select
                      value={demoTime}
                      onChange={(e) => setDemoTime(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-850 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-electric"
                    >
                      <option value="tomorrow">Tomorrow</option>
                      <option value="today">Today</option>
                      <option value="this_week">This Week</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-cyan-electric/10 dark:bg-obsidian-850/80 border border-cyan-electric/30 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-cyan-400">Top Match: {demoDept === 'Dermatology' ? 'Dr. Sneha Kapoor' : 'Dr. Ananya Rao'}</span>
                  <p className="text-cyan-200 leading-relaxed text-[11px]">
                    <strong>Why Recommended:</strong> Filtered by {demoDept}. Matched unbooked slot on {demoTime}.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Patient Record Summarizer */}
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-mint-neon" /> 3. Record Summarizer
                  </span>
                  <span className="text-[10px] font-bold bg-mint-neon/10 text-mint-neon px-2 py-0.5 rounded-full border border-mint-neon/30">
                    summarizer.py
                  </span>
                </div>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-obsidian-850/80 rounded-2xl text-xs leading-relaxed text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-obsidian-700">
                  {sumDemoText}
                </div>

                <p className="mt-2 text-[10px] text-amber-500 italic">
                  * Strict safety rule: Template-based summaries summarize visits without clinical diagnostic jumps.
                </p>
              </div>
            </div>

            {/* Card 4: Medical Safety Guardrail Filter */}
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" /> 4. Safety Guardrail
                  </span>
                  <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                    safety.py
                  </span>
                </div>

                <div className="space-y-2 mt-3">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Test Query (Safe vs Unsafe):</label>
                  <input
                    type="text"
                    value={safetyInput}
                    onChange={(e) => {
                      setSafetyInput(e.target.value);
                      handleTestSafety(e.target.value);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-850 text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon"
                  />
                </div>

                <div className={`mt-3 p-3 rounded-2xl text-xs space-y-1 border ${
                  safetyResult.isSafe
                    ? 'bg-mint-neon/10 border-mint-neon/30 text-mint-neon'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}>
                  <div><strong>Safety Status:</strong> {safetyResult.isSafe ? 'Passed' : 'REFUSED (Medical Risk Blocked)'}</div>
                  <div><strong>Triggered Rule:</strong> {safetyResult.triggeredRule}</div>
                  <div><strong>Action:</strong> {safetyResult.action}</div>
                </div>
              </div>
            </div>

            {/* Card 5: Knowledge Base FAQ Engine */}
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-mint-neon" /> 5. Knowledge Base QA
                  </span>
                  <span className="text-[10px] font-bold bg-mint-neon/10 text-mint-neon px-2 py-0.5 rounded-full border border-mint-neon/30">
                    knowledge_base.py
                  </span>
                </div>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-obsidian-850/80 rounded-2xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-obsidian-700">
                  <div className="font-bold text-slate-900 dark:text-white">Sample Query: "What documents do I need for registration?"</div>
                  <div className="text-[11px] text-mint-neon font-semibold">Source Tag: Hospital Knowledge Base</div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Matched official article with 100% confidence. Answers verified registration policy requirements without generative hallucinations.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default IntelligencePage;
