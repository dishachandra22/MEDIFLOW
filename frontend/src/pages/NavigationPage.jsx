import React, { useState, useEffect } from 'react';
import { MapPin, Search, Sparkles, Navigation, Building2, Info } from 'lucide-react';
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
    setAnswer(`The ${loc.name} is located on the ${loc.floor} (${loc.building}), Room ${loc.room_number}. Landmark: ${loc.landmark}. Directions: ${loc.directions}`);
  };

  const groundRooms = locations.filter(l => l.floor === 'Ground Floor');
  const firstRooms = locations.filter(l => l.floor === 'First Floor');
  const secondRooms = locations.filter(l => l.floor === 'Second Floor');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
              <CompassIcon className="w-3.5 h-3.5" /> Intelligent Hospital Navigation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Hospital Interactive Floor Map & Wayfinding
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ask MediFlow AI for room locations, floor departments, and instant walking directions.
            </p>
          </div>

          {/* AI Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI where... (e.g. 'Where is the radiology department?', 'Where is the laboratory?')"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              Locate Room
            </button>
          </form>

          {/* Answer Banner */}
          {answer && (
            <div className="mt-4 p-4 bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <strong>AI Location Answer:</strong>
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
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f === 'All' ? 'Full Hospital Layout' : f}
            </button>
          ))}
        </div>

        {/* SVG & Grid Interactive Floor Plan Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Ground Floor Layout Card */}
          {(activeFloor === 'All' || activeFloor === 'Ground Floor') && (
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ground Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
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
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/30 scale-105 animate-pulse'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-white' : 'text-emerald-500'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
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
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">First Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                  Specialty Clinics
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
                          ? 'bg-brand-600 text-white border-brand-700 shadow-lg shadow-brand-500/30 scale-105 animate-pulse'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/60 hover:border-brand-400 hover:bg-brand-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-white' : 'text-brand-500'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-brand-100' : 'text-slate-500 dark:text-slate-400'}`}>
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
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Second Floor</h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                  Advanced Care & Pediatrics
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
                          ? 'bg-teal-600 text-white border-teal-700 shadow-lg shadow-teal-500/30 scale-105 animate-pulse'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/60 hover:border-teal-400 hover:bg-teal-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{loc.name}</span>
                        <MapPin className={`w-3.5 h-3.5 ${isHighlighted ? 'text-white' : 'text-teal-500'}`} />
                      </div>
                      <p className={`text-[10px] ${isHighlighted ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        Room {loc.room_number} • {loc.landmark}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const CompassIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2" />
  </svg>
);

export default NavigationPage;
