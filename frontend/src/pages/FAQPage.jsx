import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, Sparkles, BookOpen, ShieldCheck, Tag } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" /> AI Knowledge Base FAQ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Official Hospital Knowledge Base & Administrative FAQ
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search verified hospital policies, registration documents, visiting hours, and emergency guidelines. Answers strictly sourced from official records.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ... (e.g. 'What documents do I need for registration?', 'What are visiting hours?')"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              Ask Knowledge Base
            </button>
          </form>

          {/* Search Result Highlight */}
          {searchResult && (
            <div className="mt-4 p-4 bg-brand-50/80 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-2xl text-xs sm:text-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-900 dark:text-brand-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-500" /> Matched Query: {searchResult.question}
                </span>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                  {searchResult.source}
                </span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {searchResult.answer}
              </p>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((art) => (
            <div key={art.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-md border border-brand-200 dark:border-brand-800">
                  {art.category}
                </span>
                <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-md border border-teal-200 dark:border-teal-800">
                  {art.source}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                {art.question}
              </h3>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                {art.answer}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                <Tag className="w-3 h-3" />
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
