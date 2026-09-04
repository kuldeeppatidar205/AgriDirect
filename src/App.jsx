import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import OfflineBanner from './components/OfflineBanner';
import FPODashboard from './components/FPODashboard';
import Marketplace from './components/Marketplace';
import LogisticsMap from './components/LogisticsMap';
import DigitalLedger from './components/DigitalLedger';
import ImpactView from './components/ImpactView';
import Toast from './components/Toast';
import { 
  initializeDatabase, 
  getCropsApi, 
  createCropApi, 
  getOfflineQueue, 
  syncOfflineQueueApi,
  createEscrowOrderApi,
  getOrdersApi,
  advanceOrderStatusApi
} from './utils/apiService';
import { Sprout, ShieldCheck, Zap, Globe, Sparkles, Heart, Award, Lock, Receipt } from 'lucide-react';

export default function App() {
  // Navigation State: 'fpo' | 'marketplace' | 'logistics' | 'ledger' | 'impact'
  const [activeTab, setActiveTab] = useState('fpo');

  // Vernacular Language State: 'en' | 'hi' | 'mr' | 'pa'
  const [currentLang, setCurrentLang] = useState('en');

  // Crops Database, Orders Ledger & Offline Sync Queue
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = useCallback((type, title, message) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize Data on Mount
  useEffect(() => {
    initializeDatabase();
    loadCrops();
    loadOrders();
    refreshOfflineQueue();

    // Listen to browser network changes
    const handleOnline = () => {
      setIsOffline(false);
      addToast('info', 'Connection Restored', 'Device is back online. Auto-synchronizing pending queue...');
      handleAutoSync();
    };

    const handleOffline = () => {
      setIsOffline(true);
      addToast('warning', 'Offline Mode', 'Internet connectivity lost. Offline local queue activated.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);

  // Load Crops from API / LocalStorage
  const loadCrops = async () => {
    const data = await getCropsApi();
    setCrops(data);
  };

  // Load Orders from API / LocalStorage
  const loadOrders = async () => {
    const data = await getOrdersApi();
    setOrders(data);
  };

  // Refresh Queue State
  const refreshOfflineQueue = () => {
    const queue = getOfflineQueue();
    setOfflineQueue(queue);
  };

  // Toggle Offline Simulator
  const toggleOfflineSimulator = () => {
    setIsOffline((prev) => {
      const nextState = !prev;
      if (nextState) {
        addToast('warning', 'Offline Simulator ON', 'Harvest batches will now be safely cached to local storage.');
      } else {
        addToast('success', 'Online Simulator ON', 'Live cloud REST API connection resumed.');
        setTimeout(handleAutoSync, 300);
      }
      return nextState;
    });
  };

  // Add Crop Harvest Handler
  const handleAddCrop = async (cropPayload) => {
    const result = await createCropApi(cropPayload, !isOffline);
    if (result.offlineQueued) {
      refreshOfflineQueue();
      addToast(
        'warning',
        'Saved Locally (Offline Queue)',
        'Network unavailable: harvest stored on device. Will auto-sync when online.'
      );
    } else {
      await loadCrops();
      addToast(
        'success',
        'Produce Registered',
        `${cropPayload.cropName} is now live on the B2B direct marketplace!`
      );
    }
    return result;
  };

  // Sync Offline Queue Handler
  const handleAutoSync = async () => {
    const queue = getOfflineQueue();
    if (queue.length === 0) return;

    setIsSyncing(true);
    try {
      const result = await syncOfflineQueueApi();
      await loadCrops();
      refreshOfflineQueue();
      if (result.syncedCount > 0) {
        addToast(
          'success',
          'Cloud Ledger Synchronized',
          `Successfully pushed ${result.syncedCount} offline harvest record(s) to cloud database.`
        );
      }
    } catch (err) {
      addToast('error', 'Sync Failed', 'Could not push records to cloud database.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Create Escrow Order Handler
  const handleInitiateEscrowOrder = async (orderPayload) => {
    const res = await createEscrowOrderApi(orderPayload);
    if (res.success) {
      await loadOrders();
      addToast(
        'success',
        'Escrow Contract Initialized',
        `₹${Math.round(orderPayload.totalEscrowAmount).toLocaleString('en-IN')} securely locked in AgriDirect Trust.`
      );
    }
    return res;
  };

  // Advance Order Status Handler
  const handleAdvanceOrderStatus = async (orderId, targetStage) => {
    const res = await advanceOrderStatusApi(orderId, targetStage);
    if (res.success) {
      await loadOrders();
    }
  };

  // Dispatch Logistics Route Handler
  const handleDispatchRoute = (route) => {
    addToast(
      'success',
      'Fleet Corridor Dispatched',
      `Vehicle ${route.vehicleRegNo} assigned. Farmer pickup OTPs broadcasted to ${route.pickupWaypoints.length} stops.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col justify-between selection:bg-emerald-200">
      
      {/* Top Application Area */}
      <div>
        {/* Offline / Auto-Sync Banner */}
        <OfflineBanner
          isOffline={isOffline}
          offlineQueueCount={offlineQueue.length}
          onSyncNow={handleAutoSync}
          isSyncing={isSyncing}
          toggleOfflineSimulator={toggleOfflineSimulator}
        />

        {/* Global Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOffline={isOffline}
          toggleOfflineSimulator={toggleOfflineSimulator}
          offlineQueueCount={offlineQueue.length}
          cropsCount={crops.length}
          ordersCount={orders.length}
          currentLang={currentLang}
          onChangeLang={setCurrentLang}
        />

        {/* Main Content Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          
          {/* Tab 1: FPO / Farmer Dashboard */}
          {activeTab === 'fpo' && (
            <FPODashboard
              crops={crops}
              onAddCrop={handleAddCrop}
              isOffline={isOffline}
              offlineQueueCount={offlineQueue.length}
            />
          )}

          {/* Tab 2: B2B Buyer Marketplace */}
          {activeTab === 'marketplace' && (
            <Marketplace
              crops={crops}
              onInitiateEscrowOrder={handleInitiateEscrowOrder}
            />
          )}

          {/* Tab 3: Route Optimization & Fleet Dispatch */}
          {activeTab === 'logistics' && (
            <LogisticsMap
              onDispatchRoute={handleDispatchRoute}
            />
          )}

          {/* Tab 4: Digital Ledger & Real-Time Orders (Slide 2 & 3) */}
          {activeTab === 'ledger' && (
            <DigitalLedger
              orders={orders}
              onAdvanceOrderStatus={handleAdvanceOrderStatus}
              onAddToast={addToast}
            />
          )}

          {/* Tab 5: Impact & Benefits Visualizer (Slide 5) */}
          {activeTab === 'impact' && (
            <ImpactView />
          )}

        </main>
      </div>

      {/* Floating Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-agri-800 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white">
                  Agri<span className="text-emerald-400">Direct</span>
                </span>
                <p className="text-xs text-slate-400">Smart India Hackathon 2026 • Problem Statement SIH26033</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> RBI-Compliant Smart Escrow
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Zap className="w-4 h-4" /> XGBoost & Prophet AI Engine
              </span>
              <span className="flex items-center gap-1.5 text-mint-200 font-semibold">
                <Globe className="w-4 h-4" /> Offline-First Rural Architecture
              </span>
            </div>

            <p className="text-xs text-slate-500 text-center md:text-right">
              Team 29 (Code Bullet) • Disintermediation Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
