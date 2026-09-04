import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Zap, 
  TrendingDown, 
  Leaf, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  RefreshCw, 
  Fuel, 
  Compass, 
  ChevronRight,
  PhoneCall,
  User,
  Database,
  Route,
  Table,
  Plus,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { OPTIMIZED_LOGISTICS_ROUTES, DISTANCE_TIME_MATRIX_CACHE } from '../data/mockData';

export default function LogisticsMap({ onDispatchRoute }) {
  const [selectedRouteId, setSelectedRouteId] = useState(OPTIMIZED_LOGISTICS_ROUTES[0]._id);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isRerouting, setIsRerouting] = useState(false);
  const [showMatrixModal, setShowMatrixModal] = useState(false);
  const [routesState, setRoutesState] = useState(OPTIMIZED_LOGISTICS_ROUTES);
  const [rerouteNotification, setRerouteNotification] = useState(null);

  // Find active selected route
  const currentRoute = routesState.find((r) => r._id === selectedRouteId) || routesState[0];

  // Re-run AI Route Optimizer Engine simulation (VRP solver)
  const handleRecalculateOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setRerouteNotification('VRP solver re-verified 100% route optimality via Google OR-Tools.');
      setTimeout(() => setRerouteNotification(null), 5000);
    }, 700);
  };

  // Simulate Dynamic Auto Re-routing (Slide 3: Auto re-routes when orders are added or cancelled)
  const handleSimulateAutoReroute = () => {
    setIsRerouting(true);
    setTimeout(() => {
      setIsRerouting(false);
      const emergencyStop = {
        stopNumber: currentRoute.pickupWaypoints.length + 1,
        farmerId: `fpo_emergency_${Date.now().toString(36)}`,
        farmerName: "Dattatray Kadam (Ozar FPO)",
        crop: "Capsicum & Cherry Tomatoes",
        quantityKg: 1800,
        address: "Dindori Road Cross, Nashik",
        lat: 20.0821,
        lng: 73.8421,
        status: "pending",
        deliveryWindow: "09:30 AM - 11:00 AM",
        etaTime: "10:15 AM",
        actualTime: "Auto-Rerouted Stop",
        otpVerified: false
      };

      setRoutesState((prev) =>
        prev.map((r) => {
          if (r._id === currentRoute._id) {
            return {
              ...r,
              pickupWaypoints: [...r.pickupWaypoints, emergencyStop],
              totalPayloadKg: r.totalPayloadKg + 1800,
              totalDistanceKm: r.totalDistanceKm + 12,
              distanceSavedKm: r.distanceSavedKm + 16,
              freightSavingsRupees: r.freightSavingsRupees + 960
            };
          }
          return r;
        })
      );

      setRerouteNotification('Auto Re-Route Triggered: Emergency farm pickup aggregated without breaking delivery window constraints (+1.8 MT added).');
      setTimeout(() => setRerouteNotification(null), 6000);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Banner: AI Fleet Dispatch Engine */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-emerald-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 26033 AI Logistics & Cold Chain Aggregator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Route Optimization & Fleet Dispatch
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Consolidate fragmented smallholder farm pickups into optimized multi-stop reefer truck corridors using Google OR-Tools CVRP solver. Cut middleman transport deadhead miles by ~30% and eliminate produce transit shrinkage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5">
            <button
              onClick={handleRecalculateOptimization}
              disabled={isOptimizing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'Running VRP Solver...' : 'Re-Run Path Optimizer'}</span>
            </button>

            <button
              onClick={handleSimulateAutoReroute}
              disabled={isRerouting}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95"
            >
              <Sparkles className={`w-4 h-4 ${isRerouting ? 'animate-spin' : ''}`} />
              <span>{isRerouting ? 'Re-Routing...' : 'Simulate Dynamic Auto Re-Route'}</span>
            </button>

            <button
              onClick={() => setShowMatrixModal(!showMatrixModal)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
            >
              <Table className="w-3.5 h-3.5 text-emerald-300" />
              <span>{showMatrixModal ? 'Hide Distance Matrix' : 'View Distance-Time Matrix'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reroute Alert Notification Banner */}
      {rerouteNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-center justify-between gap-3 animate-slide-down">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span className="font-semibold">{rerouteNotification}</span>
          </div>
          <button onClick={() => setRerouteNotification(null)} className="text-emerald-700 hover:text-emerald-900 font-bold text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* System Resilience Flow Badges (Slide 4) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
            <Database className="w-3.5 h-3.5" /> Route Matrix Cache: ACTIVE (MongoDB Sub-50ms)
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
            <Compass className="w-3.5 h-3.5" /> Solver: Google OR-Tools CVRP / Dijkstra
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Delivery Window Constraints: Compliant
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Live Traffic-Aware ETA Synchronization
        </span>
      </div>

      {/* Collapsible Distance & Time Matrix View (Slide 3 & 4) */}
      {showMatrixModal && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-700" />
                <span>Computed Distance & Travel Time Matrix</span>
              </h4>
              <p className="text-xs text-slate-500">
                Pre-cached pairwise transit calculations reducing live Mapbox API calls and latency
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Cache Hit Rate: 98.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Origin Node</th>
                  <th className="p-3">Destination Node</th>
                  <th className="p-3 text-right">Distance (km)</th>
                  <th className="p-3 text-right">Estimated Travel Time</th>
                  <th className="p-3 text-right">Cache Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DISTANCE_TIME_MATRIX_CACHE.map((matrix, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{matrix.from}</td>
                    <td className="p-3 font-semibold text-slate-800">{matrix.to}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{matrix.distanceKm} km</td>
                    <td className="p-3 text-right font-mono text-emerald-700 font-bold">{matrix.travelTimeMins} mins</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        MongoDB Memory
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TRANSIT EFFICIENCY SUMMARY METRICS */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Distance Saved */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Distance Saved</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">{currentRoute.distanceSavedKm} km</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                -{currentRoute.distanceSavedPercent}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400">vs fragmented individual trips</span>
          </div>
        </div>

        {/* Metric 2: Freight Cost Reduction */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Total Freight Saved</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">₹{currentRoute.freightSavingsRupees.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                -{currentRoute.savingsPercentage}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Direct savings passed to farmers</span>
          </div>
        </div>

        {/* Metric 3: Carbon Reduction */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">CO₂ Reduced</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{currentRoute.co2SavedKg} kg</span>
              <span className="text-xs font-semibold text-emerald-700">GHG Cut</span>
            </div>
            <span className="text-[11px] text-slate-400">Green corridor certified</span>
          </div>
        </div>

        {/* Metric 4: Multi-Farm Payload */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Consolidated Load</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{(currentRoute.totalPayloadKg / 1000).toFixed(1)} MT</span>
              <span className="text-xs font-semibold text-slate-500">/ 14 MT Cap</span>
            </div>
            <span className="text-[11px] text-slate-400">{currentRoute.pickupWaypoints.length} Farm Gate Pickups</span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE ROUTE VIEWER & VEHICLE TELEMETRY */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Map Container (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between space-y-4">
          
          {/* Map Header & Corridor Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <h3 className="font-bold text-slate-900 text-base">
                  Live Farm Aggregation Corridor
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {currentRoute.clusterName}
              </p>
            </div>

            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 focus:ring-1 focus:ring-agri-800 outline-none"
            >
              {routesState.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.clusterName}
                </option>
              ))}
            </select>
          </div>

          {/* High-Fidelity SVG Interactive GIS Route Map */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-agri-950 p-4 overflow-hidden border border-slate-700 shadow-inner flex flex-col justify-between">
            
            {/* Grid overlay for radar feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

            {/* SVG Visual Route Paths & Polyline */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#FFC107" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Traditional Inefficient Red Dotted Route */}
              <path
                d="M 60 70 Q 180 30 260 90 T 360 220 T 480 300"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* AI Optimized Green Route Polyline */}
              <path
                d="M 60 70 L 150 120 L 250 160 L 370 230 L 490 280"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                filter="url(#glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Top GIS Map Overlay Controls */}
            <div className="relative z-10 flex items-center justify-between text-white text-xs">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-mono font-bold text-emerald-300">GPS TELEMETRY ACTIVE</span>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-slate-300 font-mono text-[11px]">
                Consolidation: 94.2% Efficiency
              </div>
            </div>

            {/* Waypoint Interactive Marker Nodes on Map */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-white my-auto">
              
              {/* Waypoint 1 */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 p-2.5 rounded-xl shadow-lg transform hover:scale-105 transition">
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-[9px]">1</span>
                  <span>Stop 1: Loaded</span>
                </div>
                <p className="font-bold text-xs mt-1 text-white truncate">Pimpalgaon Farm</p>
                <p className="text-[10px] text-slate-400">4.5 MT Onion</p>
              </div>

              {/* Waypoint 2 */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/70 p-2.5 rounded-xl shadow-lg transform hover:scale-105 transition animate-pulse-subtle">
                <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-[9px]">2</span>
                  <span>Stop 2: In Transit</span>
                </div>
                <p className="font-bold text-xs mt-1 text-white truncate">Niphad Grape Yard</p>
                <p className="text-[10px] text-slate-400">3.2 MT Grapes</p>
              </div>

              {/* Waypoint 3 */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-600 p-2.5 rounded-xl shadow-lg transform hover:scale-105 transition">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                  <span className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center font-extrabold text-[9px]">3</span>
                  <span>Stop 3: Scheduled</span>
                </div>
                <p className="font-bold text-xs mt-1 text-white truncate">Sinnar Agro Hub</p>
                <p className="text-[10px] text-slate-400">3.5 MT Produce</p>
              </div>

              {/* Destination */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-blue-500/70 p-2.5 rounded-xl shadow-lg transform hover:scale-105 transition">
                <div className="flex items-center gap-1 text-[10px] text-blue-400 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dest: Vashi APMC</span>
                </div>
                <p className="font-bold text-xs mt-1 text-white truncate">Cold Hub Terminal</p>
                <p className="text-[10px] text-slate-400">ETA 02:30 PM</p>
              </div>

            </div>

            {/* Bottom Vehicle Telemetry Strip */}
            <div className="relative z-10 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-white">{currentRoute.vehicleRegNo} ({currentRoute.vehicleType})</p>
                  <p className="text-[10px] text-slate-400">Driver: {currentRoute.driverName} • {currentRoute.driverPhone}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400">Transit Speed</span>
                <p className="font-mono font-bold text-emerald-400 text-xs">54 km/h (Optimal)</p>
              </div>
            </div>

          </div>

          {/* Map Legend & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-2">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex items-center gap-1">
                <span className="w-3 h-1 bg-gradient-to-r from-emerald-500 to-amber-400 rounded"></span>
                <span>AI Consolidated Path ({currentRoute.totalDistanceKm} km)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 border-b border-rose-400 border-dashed"></span>
                <span>Individual Trips ({currentRoute.traditionalDistanceKm} km)</span>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              ⚡ {currentRoute.distanceSavedKm} km Deadhead Miles Eliminated
            </span>
          </div>

        </div>

        {/* Right Waypoint Schedule & Dispatch Execution (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Farm Aggregation Schedule Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-agri-800 text-white flex items-center justify-center font-bold text-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  Pickup Waypoint Schedule
                </h4>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {currentRoute.pickupWaypoints.length} Pickup Stops
              </span>
            </div>

            {/* List of stops */}
            <div className="space-y-3">
              {currentRoute.pickupWaypoints.map((stop) => {
                const isDone = stop.status === 'completed';
                const isInProgress = stop.status === 'in_progress';

                return (
                  <div
                    key={stop.stopNumber}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                        : isInProgress
                        ? 'bg-amber-50/70 border-amber-300 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isInProgress
                              ? 'bg-amber-500 text-white animate-pulse'
                              : 'bg-slate-300 text-slate-700'
                          }`}
                        >
                          {isDone ? '✓' : stop.stopNumber}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900">{stop.farmerName}</p>
                          <p className="text-[11px] text-slate-500">{stop.address}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                            <span className="font-semibold text-agri-800 bg-mint-100 px-2 py-0.5 rounded">
                              {stop.crop} ({stop.quantityKg.toLocaleString()} kg)
                            </span>
                            {stop.deliveryWindow && (
                              <span className="text-slate-500 text-[10px] flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-slate-400" /> {stop.deliveryWindow}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full block ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress
                              ? 'bg-amber-200 text-amber-900 font-black'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isDone
                            ? 'LOADED'
                            : isInProgress
                            ? 'ARRIVING'
                            : 'ETA ' + stop.etaTime}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {stop.actualTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Destination Final Delivery Point */}
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-700" />
                <div>
                  <p className="font-bold text-blue-950">Destination Cold Storage</p>
                  <p className="text-[11px] text-blue-800">{currentRoute.destinationHub.name}</p>
                </div>
              </div>
              <span className="font-bold text-blue-900">ETA 02:30 PM</span>
            </div>

            {/* Dispatch Action */}
            <div className="pt-2">
              <button
                onClick={() => onDispatchRoute(currentRoute)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-agri-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Truck className="w-4 h-4 text-mint-100" />
                <span>Confirm Fleet Dispatch & Trigger OTPs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Cold Chain Quality Assurance Card */}
          <div className="bg-gradient-to-br from-mint-50 to-emerald-50 rounded-3xl p-5 border border-mint-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-agri-800 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>IoT Reefer Temperature Monitoring</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Real-time ambient payload chamber maintained at <strong className="text-slate-900">4.2°C (Relative Humidity 88%)</strong> to ensure zero perishability during multi-stop aggregation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
