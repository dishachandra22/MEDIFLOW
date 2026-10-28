import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Search, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Tag,
  ArrowRight
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchFaqs('');
  }, []);

  const fetchFaqs = async (q) => {
    try {
      const res = await fetch(`/api/faq?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
        setSearchResult(data.search_result || null);
      }
    } catch (err) {
      console.error("FAQ fetch error:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFaqs(searchQuery);
  };

  const categories = ['All', ...new Set(articles.map(a => a.category))];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian-950 bg-tech-grid transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header & Search */}
        <div className="bg-white dark:bg-obsidian-900/90 p-6 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-neon/10 text-mint-neon text-xs font-bold mb-2 border border-mint-neon/30">
              <BookOpen className="w-3.5 h-3.5 text-mint-neon" /> Official Hospital Knowledge Base & FAQ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Hospital Policies, Guidelines & FAQ Retrieval
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search verified administrative guidelines, registration documents, visiting hours, and casualty protocols. Answers strictly sourced from verified records.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-mint-neon/70 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ... (e.g. 'What documents do I need for registration?', 'What are visiting hours?')"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-mint-neon focus:ring-1 focus:ring-mint-neon transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-neon-mint text-xs sm:text-sm !py-3 !px-5"
            >
              <Sparkles className="w-4 h-4" />
              Ask Knowledge Base
            </button>
          </form>

          {/* Search Result Highlight */}
          {searchResult && (
            <div className="mt-4 p-4 bg-mint-neon/10 dark:bg-obsidian-850 border border-mint-neon/35 rounded-2xl text-xs sm:text-sm space-y-2 shadow-glow-mint/20 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-mint-neon" /> Matched Article: {searchResult.question}
                </span>
                <span className="text-[10px] font-bold text-mint-neon bg-mint-neon/10 px-2.5 py-0.5 rounded-full border border-mint-neon/30">
                  {searchResult.source || "Source: Hospital Knowledge Base"}
                </span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {searchResult.answer}
              </p>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-mint-neon text-obsidian-950 font-black shadow-glow-mint'
                  : 'bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-obsidian-700 hover:border-mint-neon/40 hover:text-mint-neon'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((art) => (
            <div key={art.id} className="bg-white dark:bg-obsidian-900/90 p-5 rounded-3xl border border-slate-200 dark:border-obsidian-700 shadow-sm dark:shadow-cyber-card space-y-3 hover:border-mint-neon/40 transition-all">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-mint-neon bg-mint-neon/10 px-2.5 py-1 rounded-md border border-mint-neon/30">
                  {art.category}
                </span>
                <span className="text-[10px] font-semibold text-cyan-electric bg-cyan-electric/10 px-2.5 py-1 rounded-md border border-cyan-electric/30">
                  {art.source || "Source: Hospital Knowledge Base"}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-mint-neon shrink-0" />
                {art.question}
              </h3>

              <div className="p-3.5 bg-slate-50 dark:bg-obsidian-850/80 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed border border-slate-100 dark:border-obsidian-700">
                {art.answer}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-400">
                <Tag className="w-3 h-3 text-mint-neon" />
                <span>Keywords: {art.keywords}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
