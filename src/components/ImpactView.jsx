import React from 'react';
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
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Truck, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Coins, 
  GraduationCap, 
  Globe2,
  Award,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { PROJECTED_IMPACT_METRICS } from '../data/mockData';

export default function ImpactView() {
  const chartData = [
    { name: "Farmer Income Boost", impactPercent: 20.0, label: "+20.0%", color: "#0F5132" },
    { name: "Consumer Retail Price Drop", impactPercent: 13.0, label: "-13.0%", color: "#16a34a" },
    { name: "Logistics Spoilage Saved", impactPercent: 20.0, label: "-20.0%", color: "#2563eb" }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Banner: Impact & Benefits */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart India Hackathon 2026 • SIH26033 Impact & Benefits</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Measurable Gains for Farmers, Buyers & the Planet
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Disintermediation delivers quantifiable socio-economic and environmental transformation — putting money back into rural producers' pockets while lowering consumer costs and transit carbon emissions.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col gap-1 text-center min-w-[200px]">
            <span className="text-xs text-amber-300 font-semibold">Team 29 (Code Bullet)</span>
            <span className="text-2xl font-black text-white">SIH 26033</span>
            <span className="text-[11px] text-slate-300">Software Category</span>
          </div>
        </div>
      </div>

      {/* Potential Impact Cards (3 Key Stakeholder Impacts from Slide 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Impact on Farmers & FPOs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Users className="w-6 h-6 text-emerald-700" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Impact on Farmers & FPOs
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">+15–25%</span>
            <span className="text-xs font-semibold text-emerald-700">Net Realization</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Boosts net farmer realization by 15–25% by removing 3–4 layers of middlemen and commission agents across APMC mandis.
          </p>
        </div>

        {/* 2. Impact on Buyers & Consumers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-amber-600" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            Impact on Buyers & Consumers
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">10–15%</span>
            <span className="text-xs font-semibold text-amber-700">Retail Price Drop</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Reduces end-consumer retail prices by 10–15% by trimming multi-tier markup layers, grading inefficiencies, and speculation.
          </p>
        </div>

        {/* 3. Impact on Logistics & Supply Chain */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Truck className="w-6 h-6 text-blue-700" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
            Impact on Logistics & Cold Chain
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">Up to 20%</span>
            <span className="text-xs font-semibold text-blue-700">Spoilage Saved</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cuts post-harvest spoilage and transit delays by up to 20% using dynamic multi-stop VRP route optimization and temperature telemetry.
          </p>
        </div>

      </div>

      {/* Projected Impact Chart Card (Slide 5 Exact Visualizer) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Projected Impact (%) Benchmark
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical projections modelled on SIH 26033 agricultural disintermediation metrics
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            SIH Presentation Slide 5 Model
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          
          {/* Recharts Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis domain={[0, 25]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#0F5132',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val}% Projected Gain/Reduction`, 'Impact']}
                />
                <Bar dataKey="impactPercent" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Impact Explanations (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950">1.0 Farmer Realizations</span>
                <span className="font-black text-emerald-800 text-sm">+20.0%</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Direct procurement payouts without 8-12% commission deductions and mandi cess.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950">2.0 Consumer Price Reduction</span>
                <span className="font-black text-emerald-800 text-sm">-13.0%</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Elimination of multi-tier wholesalers and transit markups reduces food inflation.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-950">3.0 Logistics Spoilage Reduction</span>
                <span className="font-black text-blue-800 text-sm">-20.0%</span>
              </div>
              <p className="text-[11px] text-blue-800 mt-1">
                Cold-chain multi-stop pooling eliminates produce perishability and deadhead miles.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Key Benefits (Economic, Social, Environmental from Slide 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Economic Benefits */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Economic Benefits</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Creates a transparent, decentralized B2B marketplace that stabilizes food commodity inflation. Reduces transaction risk and payment defaults through automated smart escrow settlements.
          </p>
        </div>

        {/* Social Benefits */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Social Benefits</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enhances digital literacy and financial inclusion for rural Farmer Producer Organizations (FPOs). Encourages youth and rural entrepreneurs to adopt agri-tech tools in local farming communities.
          </p>
        </div>

        {/* Environmental Benefits */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">Environmental Benefits</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Significantly lowers carbon footprint and greenhouse-gas (GHG) emissions by cutting unnecessary transit mileage and refrigerated deadhead transit across the agricultural supply chain.
          </p>
        </div>

      </div>

      {/* Research & References Summary (Slide 6) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-base text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-400" />
            <span>Research, Standards & Precedents Alignment</span>
          </h4>
          <span className="text-xs text-slate-400">SIH 26033 Technical References</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="font-bold text-emerald-400">Agmarknet Portal</p>
            <p className="text-[11px] text-slate-400">Mandi price/arrival feeds</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="font-bold text-emerald-400">e-NAM & ONDC</p>
            <p className="text-[11px] text-slate-400">B2B Commerce Standards</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="font-bold text-emerald-400">Google OR-Tools</p>
            <p className="text-[11px] text-slate-400">CVRP & VRP Route Solver</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="font-bold text-emerald-400">XGBoost & Prophet</p>
            <p className="text-[11px] text-slate-400">Price & Demand ML Forecast</p>
          </div>
        </div>
      </div>

    </div>
  );
}
