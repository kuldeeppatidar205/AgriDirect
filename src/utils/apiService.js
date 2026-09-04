/**
 * RESTful API Service Simulation with Offline-First LocalStorage Synchronization.
 * Simulates Express/Node.js microservices aligned with SIH 26033:
 * - GET /api/v1/crops & POST /api/v1/crops
 * - GET /api/v1/orders & POST /api/v1/orders/escrow-lock & PATCH /api/v1/orders/:id/status
 * - POST /api/v1/logistics/optimize-route & POST /api/v1/logistics/auto-reroute
 * - GET /api/v1/market/agmarknet-feeds
 */

import { 
  INITIAL_CROPS_COLLECTION, 
  INITIAL_ORDERS_COLLECTION, 
  OPTIMIZED_LOGISTICS_ROUTES,
  AGMARKNET_LIVE_TERMINAL_FEEDS,
  DISTANCE_TIME_MATRIX_CACHE
} from '../data/mockData';

const LOCAL_STORAGE_CROPS_KEY = 'agridirect_crops_db_v1';
const LOCAL_STORAGE_OFFLINE_QUEUE_KEY = 'agridirect_offline_sync_queue_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'agridirect_orders_db_v1';
const LOCAL_STORAGE_ROUTES_KEY = 'agridirect_routes_db_v1';

// Initialize LocalStorage with mock documents if empty
export const initializeDatabase = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_CROPS_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_CROPS_KEY, JSON.stringify(INITIAL_CROPS_COLLECTION));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_OFFLINE_QUEUE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_OFFLINE_QUEUE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS_COLLECTION));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_ROUTES_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_ROUTES_KEY, JSON.stringify(OPTIMIZED_LOGISTICS_ROUTES));
  }
};

/**
 * Fetch all crop documents (GET /api/v1/crops)
 */
export const getCropsApi = async () => {
  await new Promise((res) => setTimeout(res, 150));
  const raw = localStorage.getItem(LOCAL_STORAGE_CROPS_KEY);
  return raw ? JSON.parse(raw) : INITIAL_CROPS_COLLECTION;
};

/**
 * Log new crop harvest (POST /api/v1/crops)
 */
export const createCropApi = async (cropPayload, isOnline = true) => {
  const newCropDoc = {
    _id: `crop_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
    ...cropPayload,
    status: 'active',
    isVerifiedFPO: true,
    escrowEnabled: true,
    timestamp: new Date().toISOString(),
    createdViaOfflineSync: !isOnline,
    // ML Prediction enrichments simulation (XGBoost + Prophet)
    mlInsights: {
      predictedPricePerKg: +(cropPayload.minPriceExpectationPerKg * (1 + (Math.random() * 0.12 + 0.05))).toFixed(2),
      priceTrendDeltaPercent: +(Math.random() * 12 + 4).toFixed(1),
      demandIndex: cropPayload.quantityKg > 10000 ? 'High' : 'Medium',
      demandScore: Math.floor(Math.random() * 20 + 80),
      confidenceScore: +(0.90 + Math.random() * 0.08).toFixed(2),
      isConfidenceReliable: true,
      modelType: "XGBoost Regression v3.2",
      demandModel: "Prophet Time-Series v2.1",
      lastTrainedAt: "Today, 04:30 AM (Weekly Agmarknet sync)",
      recommendedHarvestWindow: 'Peak B2B buyer window active (next 4 days)',
      targetMandiRecommendation: 'Direct Mega Retailer APMC Corridor'
    }
  };

  if (!isOnline) {
    const offlineQueue = getOfflineQueue();
    offlineQueue.push(newCropDoc);
    localStorage.setItem(LOCAL_STORAGE_OFFLINE_QUEUE_KEY, JSON.stringify(offlineQueue));
    return {
      success: true,
      data: newCropDoc,
      offlineQueued: true,
      message: 'Network offline: Harvest logged into secure offline queue. Will auto-sync when online.'
    };
  }

  const raw = localStorage.getItem(LOCAL_STORAGE_CROPS_KEY);
  const crops = raw ? JSON.parse(raw) : [...INITIAL_CROPS_COLLECTION];
  crops.unshift(newCropDoc);
  localStorage.setItem(LOCAL_STORAGE_CROPS_KEY, JSON.stringify(crops));

  return {
    success: true,
    data: newCropDoc,
    offlineQueued: false,
    message: 'Crop batch successfully registered & verified on AgriDirect Network.'
  };
};

/**
 * Get Offline Queue Items
 */
export const getOfflineQueue = () => {
  const raw = localStorage.getItem(LOCAL_STORAGE_OFFLINE_QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
};

/**
 * Synchronize offline queue with main database
 */
export const syncOfflineQueueApi = async () => {
  const queue = getOfflineQueue();
  if (queue.length === 0) return { syncedCount: 0 };

  const raw = localStorage.getItem(LOCAL_STORAGE_CROPS_KEY);
  let crops = raw ? JSON.parse(raw) : [...INITIAL_CROPS_COLLECTION];

  crops = [...queue, ...crops];
  localStorage.setItem(LOCAL_STORAGE_CROPS_KEY, JSON.stringify(crops));
  localStorage.setItem(LOCAL_STORAGE_OFFLINE_QUEUE_KEY, JSON.stringify([]));

  return {
    syncedCount: queue.length,
    success: true,
    message: `Successfully synchronized ${queue.length} pending crop records to cloud ledger.`
  };
};

/**
 * Fetch all Orders / Ledger (GET /api/v1/orders)
 */
export const getOrdersApi = async () => {
  await new Promise((res) => setTimeout(res, 150));
  const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
  return raw ? JSON.parse(raw) : INITIAL_ORDERS_COLLECTION;
};

/**
 * Create B2B Order & Lock Escrow (POST /api/v1/orders/escrow-lock)
 */
export const createEscrowOrderApi = async (orderPayload) => {
  await new Promise((res) => setTimeout(res, 350));
  
  const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const rawHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  
  const newOrderDoc = {
    _id: orderId,
    ...orderPayload,
    escrowStatus: 'ESCROW_LOCKED',
    paymentStatus: 'HELD_IN_TRUST',
    pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
    deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
    vehicleRegNo: orderPayload.vehicleRegNo || 'MH-15-EG-8821',
    driverName: orderPayload.driverName || 'Sunil Shinde',
    driverPhone: orderPayload.driverPhone || '+91 98231 44521',
    coldChainTempCelsius: 4.2,
    coldChainHumidityPercent: 88,
    createdAt: new Date().toISOString(),
    ledgerHash: `0x${rawHex}`,
    currentStageIndex: 1,
    trackingTimeline: [
      { step: 1, title: "Order Placed & Escrow Locked", status: "completed", timestamp: "Just now", detail: `₹${Math.round(orderPayload.totalEscrowAmount).toLocaleString('en-IN')} safely debited to RBI-regulated escrow trust.` },
      { step: 2, title: "Farmgate QA & Dispatch OTP", status: "current", timestamp: "Pending Inspection", detail: "NABL certified Grade A+ quality verification in progress." },
      { step: 3, title: "Multi-Stop Fleet Pickup", status: "pending", timestamp: "Scheduled", detail: "Assigned to 14-Ton Multi-Stop EV Reefer Corridor." },
      { step: 4, title: "Cold Chain Corridor Transit", status: "pending", timestamp: "In Queue", detail: "Chamber Temp 4.2°C target • Zero transit perishability." },
      { step: 5, title: "Hub Delivery & Instant Settlement", status: "pending", timestamp: "In 36 hrs", detail: `Instant direct UPI payout of ₹${Math.round(orderPayload.baseCropCost).toLocaleString('en-IN')} to farmer FPO upon destination delivery.` }
    ]
  };

  const rawOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
  const orders = rawOrders ? JSON.parse(rawOrders) : [...INITIAL_ORDERS_COLLECTION];
  orders.unshift(newOrderDoc);
  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));

  return {
    success: true,
    data: newOrderDoc,
    message: 'Smart Escrow Contract initialized. Funds safely held in direct agri-trust.'
  };
};

/**
 * Advance Order Stage / Status (PATCH /api/v1/orders/:id/status)
 */
export const advanceOrderStatusApi = async (orderId, targetStage) => {
  await new Promise((res) => setTimeout(res, 250));
  const rawOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
  let orders = rawOrders ? JSON.parse(rawOrders) : [...INITIAL_ORDERS_COLLECTION];

  orders = orders.map((ord) => {
    if (ord._id === orderId) {
      if (targetStage === 'dispatch') {
        return {
          ...ord,
          escrowStatus: 'IN_TRANSIT',
          currentStageIndex: 3,
          trackingTimeline: ord.trackingTimeline.map((t, idx) => ({
            ...t,
            status: idx <= 3 ? (idx === 3 ? 'current' : 'completed') : 'pending',
            timestamp: idx <= 2 ? (t.timestamp.includes('Pending') ? 'Completed' : t.timestamp) : t.timestamp
          }))
        };
      } else if (targetStage === 'deliver') {
        return {
          ...ord,
          escrowStatus: 'DELIVERED_SETTLED',
          paymentStatus: 'RELEASED_TO_FARMER',
          currentStageIndex: 4,
          settledAt: new Date().toISOString(),
          trackingTimeline: ord.trackingTimeline.map((t) => ({
            ...t,
            status: 'completed',
            timestamp: t.timestamp.includes('Est') ? 'Delivered & Settled' : t.timestamp
          }))
        };
      }
    }
    return ord;
  });

  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  return { success: true, orders };
};

/**
 * Route Optimization ML Dispatch Engine (POST /api/v1/logistics/optimize-route)
 */
export const optimizeLogisticsRouteApi = async (farmPickupPoints) => {
  await new Promise((res) => setTimeout(res, 400));
  
  const totalWaypoints = farmPickupPoints?.length || 3;
  const rawTraditionalDistance = totalWaypoints * 68; 
  const optimizedDistance = Math.round(rawTraditionalDistance * 0.702); 
  const distanceSaved = rawTraditionalDistance - optimizedDistance;
  const freightSavedRupees = distanceSaved * 48;

  return {
    success: true,
    clusterId: `cluster_${Date.now().toString(36)}`,
    distanceSavedKm: distanceSaved,
    optimizedDistanceKm: optimizedDistance,
    traditionalDistanceKm: rawTraditionalDistance,
    freightSavingsRupees: freightSavedRupees,
    co2SavedKg: +(distanceSaved * 1.82).toFixed(1),
    recommendedFleet: '14-Ton Electric / Euro-6 Multi-Stop Reefer Truck',
    efficiencyScore: '94.2% Fleet Consolidation Index',
    matrixCached: true,
    vrpSolver: 'Google OR-Tools CVRP Solver'
  };
};

/**
 * Auto Re-Route Simulator (POST /api/v1/logistics/auto-reroute)
 */
export const simulateAutoRerouteApi = async (routeId, newWaypoint = null) => {
  await new Promise((res) => setTimeout(res, 450));
  const rawRoutes = localStorage.getItem(LOCAL_STORAGE_ROUTES_KEY);
  let routes = rawRoutes ? JSON.parse(rawRoutes) : [...OPTIMIZED_LOGISTICS_ROUTES];

  routes = routes.map((r) => {
    if (r._id === routeId) {
      if (newWaypoint) {
        return {
          ...r,
          pickupWaypoints: [...r.pickupWaypoints, newWaypoint],
          totalPayloadKg: r.totalPayloadKg + newWaypoint.quantityKg,
          distanceSavedKm: r.distanceSavedKm + 14,
          freightSavingsRupees: r.freightSavingsRupees + 850
        };
      }
      return {
        ...r,
        status: 'rerouted_optimized',
        recalculatedAt: new Date().toLocaleTimeString()
      };
    }
    return r;
  });

  localStorage.setItem(LOCAL_STORAGE_ROUTES_KEY, JSON.stringify(routes));
  return { success: true, routes };
};

/**
 * Get Agmarknet Live Feeds & Cache
 */
export const getAgmarknetLiveFeeds = () => {
  return AGMARKNET_LIVE_TERMINAL_FEEDS;
};

/**
 * Get Distance-Time Matrix Cache
 */
export const getDistanceTimeMatrixCache = () => {
  return DISTANCE_TIME_MATRIX_CACHE;
};
