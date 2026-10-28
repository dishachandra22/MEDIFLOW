import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Navigation, 
  Building2, 
  Info,
  Compass,
  ArrowRight,
  Footprints
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const NavigationPage = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [matchedLocation, setMatchedLocation] = useState(null);
  const [answer, setAnswer] = useState('');
  const [activeFloor, setActiveFloor] = useState('All');

  useEffect(() => {
    fetchLocations('');
  }, []);

  const fetchLocations = async (searchQuery) => {
    try {
      const res = await fetch(`/api/navigation?query=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setLocations(data.all_locations || []);
        setMatchedLocation(data.matched_location || null);
        setAnswer(data.answer || '');
        if (data.matched_location) {
          setActiveFloor(data.matched_location.floor);
        }
      }
    } catch (err) {
      console.error("Navigation API error:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchLocations(query);
    }
  };

  const handleSelectRoom = (loc) => {
    setMatchedLocation(loc);
    setActiveFloor(loc.floor);
    setAnswer(`The ${loc.name} is located on the ${loc.floor} (${loc.building || 'Main Block'}), Room ${loc.room_number}. Landmark: ${loc.landmark}. Directions: ${loc.directions}`);
  };

  const groundRooms = locations.filter(l => l.floor === 'Ground Floor');
  const firstRooms = locations.filter(l => l.floor === 'First Floor');
  const secondRooms = locations.filter(l => l.floor === 'Second Floor');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header & Wayfinding Search */}
        <div className="bg-white dark:bg-obsidian-900/90 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <Compass className="w-3.5 h-3.5 text-mint-neon" /> Intelligent Hospital Navigation & Wayfinding
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Interactive Hospital Floor Map & Room Finder
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ask MediFlow AI for room numbers, floor wings, and step-by-step walking directions.
            </p>
          </div>

          {/* AI Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-mint-neon/70 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI where... (e.g. 'Where is the radiology department?', 'Where is the laboratory?')"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-neon-mint text-xs sm:text-sm !py-3 !px-5"
            >
              <Sparkles className="w-4 h-4" />
              Locate Room
            </button>
          </form>

          {/* Answer Banner */}
          {answer && (
            <div className="mt-4 p-4 bg-mint-neon/10 dark:bg-obsidian-850 border border-mint-neon/40 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-start gap-3 shadow-glow-mint/20 animate-fade-in">
              <MapPin className="w-5 h-5 text-mint-neon shrink-0 mt-0.5 animate-bounce" />
              <div>
                <strong className="text-mint-neon block font-bold">AI Wayfinding Directions:</strong>
                <p className="mt-0.5 leading-relaxed">{answer}</p>
              </div>
            </div>
          )}
        </div>

        {/* Floor Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Ground Floor', 'First Floor', 'Second Floor'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFloor(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFloor === f
                  ? 'bg-mint-neon text-obsidian-950 font-black shadow-glow-mint'
                  : 'bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/40 hover:text-mint-neon'
              }`}
            >
              {f === 'All' ? 'All Hospital Floors' : f}
            </button>
          ))}
        </div>

        {/* Interactive Floor Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Ground Floor Layout Card */}
          {(activeFloor === 'All' || activeFloor === 'Ground Floor') && (
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-mint-neon" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ground Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-mint-neon/10 text-mint-neon px-2.5 py-0.5 rounded-full border border-mint-neon/30">
                  Main Entry & Diagnostics
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {groundRooms.map((loc) => {
                  const isHighlighted = matchedLocation?.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectRoom(loc)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isHighlighted
                          ? 'bg-mint-neon/20 text-white border-mint-neon shadow-glow-mint scale-105'
                          : 'bg-slate-50 dark:bg-obsidian-850/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-obsidian-700 hover:border-mint-neon/50 hover:bg-mint-neon/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-mint-neon' : 'text-slate-400'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-mint-neon font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        Room {loc.room_number} • {loc.landmark}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* First Floor Layout Card */}
          {(activeFloor === 'All' || activeFloor === 'First Floor') && (
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-electric" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">First Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-cyan-electric/10 text-cyan-electric px-2.5 py-0.5 rounded-full border border-cyan-electric/30">
                  Cardiology & Surgery
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {firstRooms.map((loc) => {
                  const isHighlighted = matchedLocation?.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectRoom(loc)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isHighlighted
                          ? 'bg-cyan-electric/20 text-white border-cyan-electric shadow-glow-cyan scale-105'
                          : 'bg-slate-50 dark:bg-obsidian-850/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-obsidian-700 hover:border-cyan-electric/50 hover:bg-cyan-electric/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-cyan-electric' : 'text-slate-400'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-cyan-electric font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        Room {loc.room_number} • {loc.landmark}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Second Floor Layout Card */}
          {(activeFloor === 'All' || activeFloor === 'Second Floor') && (
            <div className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-700 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Second Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-emerald-400/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Dermatology & Pediatrics
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {secondRooms.map((loc) => {
                  const isHighlighted = matchedLocation?.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectRoom(loc)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isHighlighted
                          ? 'bg-emerald-400/20 text-white border-emerald-400 shadow-lg scale-105'
                          : 'bg-slate-50 dark:bg-obsidian-850/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-obsidian-700 hover:border-emerald-400/50 hover:bg-emerald-400/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-emerald-400' : 'text-slate-400'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-emerald-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        Room {loc.room_number} • {loc.landmark}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Selected Room Directions Panel */}
        {matchedLocation && (
          <div className="p-5 bg-white dark:bg-obsidian-900/95 border border-mint-neon/40 rounded-3xl shadow-glow-mint/20 space-y-2">
            <div className="flex items-center gap-2 text-mint-neon font-bold text-sm">
              <Footprints className="w-5 h-5 text-mint-neon" />
              <span>Step-by-Step Directions to {matchedLocation.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-obsidian-850 p-4 rounded-2xl border border-slate-100 dark:border-obsidian-700">
              {matchedLocation.directions}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NavigationPage;
