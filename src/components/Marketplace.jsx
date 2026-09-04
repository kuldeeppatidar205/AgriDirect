import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  Building2, 
  Layers, 
  Calendar, 
  Scale, 
  SlidersHorizontal, 
  CheckCircle, 
  Award,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';
import { DEMAND_FORECAST_CATEGORIES, CROP_CATEGORIES, MOCK_B2B_BUYER_PROFILE } from '../data/mockData';
import EscrowModal from './EscrowModal';

export default function Marketplace({
  crops,
  onInitiateEscrowOrder
}) {
  // State Filters
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [minQualityGrade, setMinQualityGrade] = useState('all');
  const [maxPrice, setMaxPrice] = useState(250);
  const [onlyVerifiedFPO, setOnlyVerifiedFPO] = useState(false);
  const [onlyHighDemand, setOnlyHighDemand] = useState(false);

  // Escrow Modal State
  const [selectedCropForEscrow, setSelectedCropForEscrow] = useState(null);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);

  // Filtered Produce Logic
  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      // Category filter
      if (selectedCategory !== 'All Categories' && crop.category !== selectedCategory) {
        return false;
      }
      // Search filter (query by crop name, variety, FPO name, or location)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = crop.cropName.toLowerCase().includes(q);
        const matchesVariety = crop.variety?.toLowerCase().includes(q);
        const matchesFPO = crop.fpoName?.toLowerCase().includes(q);
        const matchesState = crop.location?.state?.toLowerCase().includes(q);
        const matchesDistrict = crop.location?.district?.toLowerCase().includes(q);
        if (!matchesName && !matchesVariety && !matchesFPO && !matchesState && !matchesDistrict) {
          return false;
        }
      }
      // Max price filter
      if (crop.minPriceExpectationPerKg > maxPrice) {
        return false;
      }
      // Quality grade filter
      if (minQualityGrade !== 'all' && crop.qualityGrade !== minQualityGrade) {
        return false;
      }
      // High demand filter
      if (onlyHighDemand && crop.mlInsights?.demandIndex !== 'High') {
        return false;
      }
      return true;
    });
  }, [crops, selectedCategory, searchQuery, minQualityGrade, maxPrice, onlyHighDemand]);

  // Open Sourcing Drawer
  const handleOpenEscrow = (crop) => {
    setSelectedCropForEscrow(crop);
    setIsEscrowModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Banner: Enterprise Sourcing & Buyer Profile */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-100" />
              <span>Smart India Hackathon • B2B Direct Sourcing Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Enterprise Crop Marketplace
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Procure farmgate-tested produce directly from verified FPOs with guaranteed smart escrow, pooled route freight savings, and automated quality verification.
            </p>
          </div>

          {/* Buyer Quick Stats */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col gap-2 min-w-[260px]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Enterprise Buyer</span>
              <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Verified GSTIN
              </span>
            </div>
            <p className="font-bold text-white text-sm">{MOCK_B2B_BUYER_PROFILE.companyName}</p>
            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-slate-300">Escrow Line:</span>
              <span className="font-mono font-bold text-emerald-400">
                ₹{(MOCK_B2B_BUYER_PROFILE.escrowBalanceRupees / 100000).toFixed(1)} Lakhs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DEMAND FORECASTING WIDGET */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  AI Market Demand Forecasting Engine
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Live ML Index
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time procurement demand indices (0–100) predicted across APMC terminals and retail buyers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-slate-700">High Demand (80+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-700">Medium (60–79)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-400"></span>
              <span className="text-slate-700">Low (&lt;60)</span>
            </div>
          </div>
        </div>

        {/* Demand Chart & Category Gauge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Recharts Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEMAND_FORECAST_CATEGORIES} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#475569' }} 
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={40}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#0F5132',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value} / 100`, 'Demand Score']}
                />
                <Bar dataKey="demandIndex" radius={[6, 6, 0, 0]}>
                  {DEMAND_FORECAST_CATEGORIES.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.demandIndex >= 85
                          ? '#0F5132'
                          : entry.demandIndex >= 70
                          ? '#FFC107'
                          : '#94a3b8'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Insights Cards (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {DEMAND_FORECAST_CATEGORIES.slice(0, 4).map((item) => (
              <div 
                key={item.name} 
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[100px]">{item.name}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      item.level === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">{item.demandIndex}</span>
                    <span className="text-xs text-emerald-700 font-bold">{item.trend}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 mt-2 flex justify-between items-center text-[10px] text-slate-600">
                  <span>{item.buyersActive} Active Bids</span>
                  <span className="font-semibold text-slate-900">₹{item.avgB2BQuotePerKg}/kg</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* PRODUCE CATALOG FILTERS & TABS */}
      {/* ======================================================== */}
      <div className="space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CROP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-agri-800 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Fine-grain Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Query Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop, variety, FPO, or state..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 outline-none transition"
            />
          </div>

          {/* Filter Badges & Sliders */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            
            {/* Grade Filter */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span className="text-slate-500">Grade:</span>
              <select
                value={minQualityGrade}
                onChange={(e) => setMinQualityGrade(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs font-bold outline-none"
              >
                <option value="all">All Grades</option>
                <option value="A+">Grade A+ (Export)</option>
                <option value="A">Grade A (Supermarket)</option>
                <option value="B">Grade B (Standard)</option>
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="text-slate-500">Max ₹:</span>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 sm:w-24 accent-emerald-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="font-bold text-slate-900 w-12 text-right">₹{maxPrice}/kg</span>
            </div>

            {/* High Demand Toggle */}
            <button
              onClick={() => setOnlyHighDemand(!onlyHighDemand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                onlyHighDemand
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>High Demand</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LIVE PRODUCE CARD CATALOG */}
      {/* ======================================================== */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Available Verified Harvest Lots ({filteredCrops.length})
          </p>
          <span className="text-xs text-slate-500">
            Real-time Direct Farmgate Listings
          </span>
        </div>

        {filteredCrops.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800">No crop batches found</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms, price filter range, or category tabs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => {
              const totalTons = (crop.quantityKg / 1000).toFixed(1);
              const predictedPrice = crop.mlInsights?.predictedPricePerKg || (crop.minPriceExpectationPerKg * 1.12).toFixed(1);
              const demandLevel = crop.mlInsights?.demandIndex || 'High';

              return (
                <div
                  key={crop._id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  <div>
                    {/* Image Header with Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={crop.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'}
                        alt={crop.cropName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-white/90 backdrop-blur-md text-emerald-900 shadow-sm">
                          <Award className="w-3.5 h-3.5 text-emerald-700" />
                          Grade {crop.qualityGrade || 'A+'}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-sm">
                          <Flame className="w-3 h-3" />
                          {demandLevel} Demand
                        </span>
                      </div>

                      {/* Bottom Banner on Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-mint-100 block">
                            {crop.category}
                          </span>
                          <h4 className="font-black text-lg text-white leading-tight drop-shadow-sm">
                            {crop.cropName}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-200">Available Lot</span>
                          <p className="font-extrabold text-white text-base">
                            {totalTons} MT
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      {/* FPO Info & Location */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Building2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          <span className="truncate">{crop.fpoName}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">
                            {crop.location?.district ? `${crop.location.district}, ${crop.location.state}` : crop.location?.address}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Block */}
                      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Farm Price</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900">₹{crop.minPriceExpectationPerKg}</span>
                            <span className="text-xs font-semibold text-slate-500">/ kg</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">ML Mandi Baseline</span>
                          <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-0.5">
                            ₹{crop.mandiPricePerKg || (crop.minPriceExpectationPerKg * 1.08).toFixed(1)}/kg
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Save ~₹3.5/kg
                          </span>
                        </div>
                      </div>

                      {/* Quality & Lab QA highlights */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 flex items-center justify-between">
                          <span>Moisture:</span>
                          <span className="font-bold text-slate-800">{crop.qualityMetrics?.moisturePercent || 11}%</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 flex items-center justify-between">
                          <span>Lab QA:</span>
                          <span className="font-bold text-emerald-700">Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleOpenEscrow(crop)}
                      className="w-full py-3 px-4 rounded-xl bg-agri-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:bg-agri-900"
                    >
                      <ShieldCheck className="w-4 h-4 text-mint-100" />
                      <span>Procure Batch & Lock Escrow</span>
                      <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Escrow Modal / Smart Order Drawer */}
      <EscrowModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        crop={selectedCropForEscrow}
        onConfirmOrder={onInitiateEscrowOrder}
        buyerProfile={MOCK_B2B_BUYER_PROFILE}
      />
    </div>
  );
}
