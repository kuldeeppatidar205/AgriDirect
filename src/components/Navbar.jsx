import React from 'react';
import { 
  Sprout, 
  Store, 
  Truck, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Bell, 
  SlidersHorizontal,
  Sparkles,
  Layers,
  FileText,
  Award,
  Globe,
  Receipt
} from 'lucide-react';
import { VERNACULAR_TRANSLATIONS } from '../data/mockData';

export default function Navbar({
  activeTab,
  setActiveTab,
  isOffline,
  toggleOfflineSimulator,
  offlineQueueCount,
  cropsCount,
  ordersCount,
  currentLang = 'en',
  onChangeLang
}) {
  const t = VERNACULAR_TRANSLATIONS[currentLang] || VERNACULAR_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('fpo')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-agri-800 to-agri-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-agri-800">
                  Agri<span className="text-emerald-600">Direct</span>
                </span>
               
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                AI Direct-to-Buyer Disintermediation & Smart Escrow Network
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            
            {/* 1. FPO Dashboard */}
            <button
              onClick={() => setActiveTab('fpo')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'fpo'
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>{t.fpoDashboard}</span>
              {offlineQueueCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>

            {/* 2. Marketplace */}
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'marketplace'
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{t.marketplace}</span>
              <span className="px-1.5 py-0.2 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                {cropsCount}
              </span>
            </button>

            {/* 3. Logistics Map */}
            <button
              onClick={() => setActiveTab('logistics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'logistics'
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{t.logistics}</span>
              <span className="px-1.5 py-0.2 rounded-md text-[10px] uppercase font-extrabold bg-amber-100 text-amber-900">
                AI -29.8%
              </span>
            </button>

            {/* 4. Digital Ledger & Orders (Slide 2 & 3) */}
            <button
              onClick={() => setActiveTab('ledger')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'ledger'
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>{t.ordersLedger}</span>
              <span className="px-1.5 py-0.2 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                {ordersCount}
              </span>
            </button>

            {/* 5. Impact & Benefits (Slide 5) */}
            <button
              onClick={() => setActiveTab('impact')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'impact'
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t.impact}</span>
            </button>

          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline Simulation Switcher */}
            <button
              onClick={toggleOfflineSimulator}
              title="Click to test offline resilience & auto-sync queue"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                isOffline
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.offlineSim}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">{t.liveCloud}</span>
                </>
              )}
            </button>

            {/* Escrow Guarantee Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-mint-100 text-agri-800 border border-mint-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.smartEscrow}</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex xl:hidden items-center justify-around py-2 border-t border-slate-200 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('fpo')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition whitespace-nowrap ${
              activeTab === 'fpo'
                ? 'bg-agri-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>FPO</span>
            {offlineQueueCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition whitespace-nowrap ${
              activeTab === 'marketplace'
                ? 'bg-agri-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition whitespace-nowrap ${
              activeTab === 'logistics'
                ? 'bg-agri-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Logistics</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'bg-agri-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Orders ({ordersCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition whitespace-nowrap ${
              activeTab === 'impact'
                ? 'bg-agri-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Impact</span>
          </button>
        </div>
      </div>
    </header>
  );
}
