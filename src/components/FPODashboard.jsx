import React, { useState } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  PlusCircle, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  FileCheck2, 
  Scale, 
  IndianRupee, 
  Calendar, 
  CheckCircle,
  Database,
  ArrowUpRight,
  HelpCircle,
  Clock,
  Compass,
  Layers,
  ChevronRight,
  Radio,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { 
  HISTORICAL_VS_PREDICTED_PRICE_TRENDS, 
  CROP_CATEGORIES, 
  AGMARKNET_LIVE_TERMINAL_FEEDS 
} from '../data/mockData';

const LOCATION_PRESETS = [
  { label: 'Nashik Agro Hub, MH', lat: 20.1754, lng: 73.9872, address: 'Pimpalgaon Baswant, Niphad Taluka, Nashik, MH 422209' },
  { label: 'Kolar Fresh Belt, KA', lat: 13.1367, lng: 78.1291, address: 'Bangarapet Highway, Kolar, Karnataka 563101' },
  { label: 'Jalandhar Grains, PB', lat: 31.3260, lng: 75.5762, address: 'Nakodar Road, Jalandhar, Punjab 144001' },
  { label: 'Indore Mandi Hub, MP', lat: 22.7196, lng: 75.8577, address: 'Sanwer Road Industrial Area, Indore, MP 452015' },
  { label: 'Guntur Spices, AP', lat: 16.3067, lng: 80.4365, address: 'Chilli Yard Road, Guntur, AP 522004' }
];

export default function FPODashboard({
  crops,
  onAddCrop,
  isOffline,
  offlineQueueCount
}) {
  // Form State
  const [formData, setFormData] = useState({
    cropName: 'Nashik Red Onion',
    category: 'Vegetables',
    variety: 'Garwa Special Grade-1',
    harvestDate: new Date().toISOString().split('T')[0],
    weightValue: 5000,
    weightUnit: 'kg', // 'kg' or 'ton'
    minPriceExpectationPerKg: 29.0,
    mandiPricePerKg: 31.0,
    address: 'Pimpalgaon Baswant, Niphad Taluka, Nashik, MH 422209',
    lat: 20.1754,
    lng: 73.9872,
    qualityGrade: 'A+',
    moisturePercent: 11.0,
    labCertified: true,
    fpoName: 'Sahyadri Farmers Producer Co. Ltd',
    farmerName: 'Rameshwar Patil'
  });

  const [selectedAnalyticsCrop, setSelectedAnalyticsCrop] = useState('Nashik Red Onion');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Location Preset Handler
  const handleLocationPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      address: preset.address,
      lat: preset.lat,
      lng: preset.lng
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalKg = formData.weightUnit === 'ton' 
      ? Number(formData.weightValue) * 1000 
      : Number(formData.weightValue);

    const cropPayload = {
      fpoName: formData.fpoName,
      farmerName: formData.farmerName,
      cropName: formData.cropName,
      category: formData.category,
      variety: formData.variety,
      harvestDate: new Date(formData.harvestDate).toISOString(),
      quantityKg: totalKg,
      minPriceExpectationPerKg: Number(formData.minPriceExpectationPerKg),
      mandiPricePerKg: Number(formData.mandiPricePerKg),
      location: {
        address: formData.address,
        lat: Number(formData.lat),
        lng: Number(formData.lng)
      },
      qualityGrade: formData.qualityGrade,
      qualityMetrics: {
        moisturePercent: Number(formData.moisturePercent),
        labCertified: formData.labCertified,
        certifyingAgency: formData.labCertified ? 'Regional NABL Certified QA Lab' : 'Self-declared'
      },
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
      ]
    };

    await onAddCrop(cropPayload);
    setIsSubmitting(false);
    setSuccessMessage(
      isOffline
        ? 'Batch saved offline to local queue! Will automatically sync when online.'
        : 'Produce batch successfully logged and broadcasted to verified B2B buyers!'
    );

    setTimeout(() => setSuccessMessage(null), 6000);
  };

  // Get Chart Data for Selected Crop
  const chartData = HISTORICAL_VS_PREDICTED_PRICE_TRENDS[selectedAnalyticsCrop] || 
    HISTORICAL_VS_PREDICTED_PRICE_TRENDS['Nashik Red Onion'];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 26033 • AI Crop Price Advisory & Direct Disintermediation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              FPO & Farmer Aggregation Portal
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Log verified harvest lots, bypass mandi middleman commissions (saving 12–18%), lock direct contracts with enterprise buyers, and view predictive mandi rate forecasts powered by XGBoost & Prophet.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-emerald-300 font-medium">Active Batches</span>
              <p className="text-2xl font-bold mt-1 text-white">{crops.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <span className="text-xs text-amber-300 font-medium">Disintermediation Gain</span>
              <p className="text-2xl font-bold mt-1 text-amber-400">+14.2%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center col-span-2 sm:col-span-1">
              <span className="text-xs text-mint-200 font-medium">Escrow Security</span>
              <p className="text-sm font-bold mt-1.5 text-emerald-300 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agmarknet & e-NAM Terminal Live Feeds Ticker (Slide 3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
          <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-rose-600" /> Agmarknet Mandi Terminal Feeds:
          </span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {AGMARKNET_LIVE_TERMINAL_FEEDS.map((feed, idx) => (
            <div key={idx} className="flex items-center gap-2 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-800">{feed.mandiName}</span>
              <span className="text-slate-500 font-medium">₹{feed.modalPricePerKg}/kg</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                {feed.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Produce Logging Form + Market Analytics Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ======================================================== */}
        {/* 1. PRODUCE LOGGING FORM (7 Cols on LG) */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Log Harvest Batch
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Direct-to-buyer listing with automated ML price recommendation
              </p>
            </div>

            {isOffline && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                <Database className="w-3.5 h-3.5" /> Offline Storage
              </span>
            )}
          </div>

          {successMessage && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3 animate-slide-down">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Harvest Registered</p>
                <p className="text-xs text-emerald-800 mt-0.5">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* Category and Crop Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Produce Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                  required
                >
                  {CROP_CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Crop Name & Commercial Spec *
                </label>
                <input
                  type="text"
                  name="cropName"
                  value={formData.cropName}
                  onChange={handleChange}
                  placeholder="e.g. Nashik Red Onion, Basmati Rice"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Variety and Harvest Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Seed / Cultivar Variety
                </label>
                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="e.g. Garwa Special, Pusa-1121"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Harvest Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="harvestDate"
                    value={formData.harvestDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Weight and Price Expectations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Total Harvest Weight *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="weightValue"
                      value={formData.weightValue}
                      onChange={handleChange}
                      min="100"
                      step="50"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                      required
                    />
                    <Scale className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    className="w-24 px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-100 font-semibold text-slate-800 text-sm outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">Tons</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Min Expected Price (₹/kg) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    name="minPriceExpectationPerKg"
                    value={formData.minPriceExpectationPerKg}
                    onChange={handleChange}
                    min="1"
                    step="0.5"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-agri-800 focus:border-agri-800 outline-none transition"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
                  <span>Current Mandi Avg: ₹{formData.mandiPricePerKg}/kg</span>
                  <span className="text-emerald-700 font-medium">ML Peak: ₹{(formData.minPriceExpectationPerKg * 1.14).toFixed(1)}/kg</span>
                </div>
              </div>
            </div>

            {/* Geographic Coordinates & Pickup Location */}
            <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Pickup Farmgate Location & Geo Pins
                </label>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-emerald-600" /> GIS Enabled for Logistics Engine
                </span>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] font-medium text-slate-400 py-0.5">Presets:</span>
                {LOCATION_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleLocationPreset(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-medium transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Pickup Address (Village, Taluka, District, PIN)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-agri-800 outline-none transition mt-2"
                required
              />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[11px] text-slate-500">Latitude</span>
                  <input
                    type="number"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    step="0.0001"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500">Longitude</span>
                  <input
                    type="number"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    step="0.0001"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Quality Grading & Lab QA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quality Grade
                </label>
                <select
                  name="qualityGrade"
                  value={formData.qualityGrade}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                >
                  <option value="A+">Grade A+ (Export Quality)</option>
                  <option value="A">Grade A (Supermarket Premium)</option>
                  <option value="B">Grade B (Standard Mandi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Moisture Content %
                </label>
                <input
                  type="number"
                  name="moisturePercent"
                  value={formData.moisturePercent}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="labCertified"
                  name="labCertified"
                  checked={formData.labCertified}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-700 rounded border-slate-300 focus:ring-emerald-600 cursor-pointer"
                />
                <label htmlFor="labCertified" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  NABL Certified Lab Tested
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-agri-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging to Network...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    <span>{isOffline ? 'Save to Offline Queue' : 'Register Produce Batch & Broadcast'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ======================================================== */}
        {/* 2. MARKET ANALYTICS CARD (5 Cols on LG) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recharts Line Chart Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Predictive Mandi vs Direct Trend
                    </h3>
                    <p className="text-xs text-slate-500">
                      Historical prices vs XGBoost & Prophet ML Regression
                    </p>
                  </div>
                </div>
              </div>

              <select
                value={selectedAnalyticsCrop}
                onChange={(e) => setSelectedAnalyticsCrop(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:ring-1 focus:ring-agri-800 outline-none"
              >
                <option value="Nashik Red Onion">Nashik Red Onion</option>
                <option value="Pusa 1121 Basmati Rice">Pusa Basmati Rice</option>
                <option value="Hydroponic Hybrid Tomatoes">Hybrid Tomatoes</option>
                <option value="Sharbati Golden Wheat">Sharbati Wheat</option>
              </select>
            </div>

            {/* AI Model Specs & Confidence Pill (Slide 3) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Price Model</span>
                  <span className="font-bold text-slate-800 text-xs">XGBoost v3.2</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-700 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Sync Cycle</span>
                  <span className="font-bold text-slate-800 text-xs">Weekly Retrained</span>
                </div>
              </div>
            </div>

            {/* Price forecast delta banner */}
            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span className="font-semibold text-emerald-950">AI 7-Day Forecast:</span>
                <span className="font-bold text-emerald-700">+11.8% Peak Expected</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Confidence: 94% (High)
              </span>
            </div>

            {/* Recharts Container */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    tickLine={false}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#0F5132',
                      borderColor: '#15803d',
                      borderRadius: '0.75rem',
                      color: '#ffffff',
                      fontSize: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                    }}
                    formatter={(value, name) => [
                      `₹${value}/kg`,
                      name === 'mandiPrice'
                        ? 'Historical Mandi APMC'
                        : name === 'predictedPrice'
                        ? 'ML Predicted Rate'
                        : 'AgriDirect B2B Direct'
                    ]}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mandiPrice" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="APMC Mandi"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predictedPrice" 
                    stroke="#FFC107" 
                    strokeWidth={2.5} 
                    strokeDasharray="4 4"
                    dot={{ r: 4 }}
                    name="AI Forecast"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="directOfferPrice" 
                    stroke="#0F5132" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#0F5132' }}
                    name="AgriDirect B2B"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insights highlights */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Direct Disintermediation</span>
                <span className="font-bold text-slate-800 text-sm">Save ₹3.80 / kg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Recommended Window</span>
                <span className="font-bold text-emerald-800 text-sm">Next 3–5 Days</span>
              </div>
            </div>
          </div>

          {/* Offline Sync State Card */}
          <div className="bg-gradient-to-br from-mint-50 to-emerald-50 rounded-3xl p-6 border border-mint-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-agri-800 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-mint-100" />
              </div>
              <div>
                <h4 className="font-bold text-agri-800 text-sm">Smart Escrow Protection</h4>
                <p className="text-xs text-slate-600">
                  Direct farmer payment guaranteed before produce leaves farmgate.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs py-1 border-b border-mint-200/60">
                <span className="text-slate-600">Offline Queue Cache:</span>
                <span className="font-bold text-slate-800">{offlineQueueCount} items queued</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-mint-200/60">
                <span className="text-slate-600">Average Payout Cycle:</span>
                <span className="font-bold text-emerald-800">T+0 (Instant upon OTP arrival)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600">Commission Deductions:</span>
                <span className="font-bold text-emerald-800">0% (100% to Farmer FPO)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. FARMER ACTIVE BATCHES TABLE */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Registered Harvest Batches & Telemetry
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Active crops registered by your FPO on the AgriDirect National Network
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 self-start sm:self-auto">
            Total Batches: {crops.length}
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/50">
                <th className="py-3.5 px-4">Crop & Variety</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Price Expectation</th>
                <th className="py-3.5 px-4">ML Forecast</th>
                <th className="py-3.5 px-4">Quality Grade</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Escrow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crops.map((crop) => (
                <tr key={crop._id} className="hover:bg-slate-50/80 transition group">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{crop.cropName}</span>
                      {crop.createdViaOfflineSync && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-normal">
                          Offline Synced
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">{crop.variety || 'Standard Batch'}</span>
                  </td>

                  <td className="py-4 px-4 text-xs font-medium text-slate-600">
                    {crop.category}
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-800">
                    {(crop.quantityKg / 1000).toFixed(1)} MT
                    <span className="text-xs text-slate-400 font-normal block">
                      ({crop.quantityKg.toLocaleString()} kg)
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-900">
                    ₹{crop.minPriceExpectationPerKg}/kg
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                      ₹{crop.mlInsights?.predictedPricePerKg || (crop.minPriceExpectationPerKg * 1.1).toFixed(1)}/kg
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Demand: {crop.mlInsights?.demandIndex || 'High'} ({crop.mlInsights?.modelType || 'XGBoost'})
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {crop.qualityGrade || 'A+'}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      {crop.status === 'active' ? 'Active on Market' : crop.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-mint-100 text-agri-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Secured
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
