import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  Receipt, 
  Search, 
  Filter, 
  Lock, 
  Check, 
  TrendingUp, 
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import DigitalReceiptModal from './DigitalReceiptModal';

export default function DigitalLedger({
  orders,
  onAdvanceOrderStatus,
  onAddToast
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'all') {
      if (filterStatus === 'locked' && order.escrowStatus !== 'ESCROW_LOCKED') return false;
      if (filterStatus === 'transit' && order.escrowStatus !== 'IN_TRANSIT') return false;
      if (filterStatus === 'settled' && order.escrowStatus !== 'DELIVERED_SETTLED') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = order.cropName.toLowerCase().includes(q);
      const matchBuyer = order.buyerName.toLowerCase().includes(q);
      const matchFarmer = order.fpoName.toLowerCase().includes(q);
      const matchId = order._id.toLowerCase().includes(q);
      if (!matchName && !matchBuyer && !matchFarmer && !matchId) return false;
    }
    return true;
  });

  const handleOpenReceipt = (order) => {
    setSelectedReceiptOrder(order);
    setIsReceiptModalOpen(true);
  };

  const handleSimulateDispatch = async (orderId) => {
    setIsUpdating(true);
    await onAdvanceOrderStatus(orderId, 'dispatch');
    setIsUpdating(false);
    onAddToast(
      'success',
      'Fleet Pickup Confirmed',
      'Produce loaded on Reefer truck. GPS telemetry and Cold-Chain monitoring active.'
    );
  };

  const handleSimulateDeliverySettlement = async (orderId) => {
    setIsUpdating(true);
    await onAdvanceOrderStatus(orderId, 'deliver');
    setIsUpdating(false);
    onAddToast(
      'success',
      'Instant Payout Released',
      'Delivery verified via destination OTP. 100% Escrow funds settled directly to Farmer UPI.'
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Banner: Digital Ledger & Order Tracking */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-zinc-700 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-100" />
              <span>SIH 26033 • Real-Time Order Tracking & Cryptographic Digital Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Digital Ledger & Order Lifecycle
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              End-to-end transparent order tracking, instant verifiable digital tax receipts, and automated smart escrow milestone releases from farmgate pickup to hub delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-xs text-slate-300 font-medium">Total Orders</span>
              <p className="text-2xl font-bold mt-1 text-white">{orders.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-xs text-emerald-300 font-medium">Trust Guarantee</span>
              <p className="text-sm font-bold mt-1.5 text-emerald-400 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 100% Escrow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, crop, buyer, or FPO..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-agri-800 outline-none transition"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'all'
                ? 'bg-agri-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Orders ({orders.length})
          </button>

          <button
            onClick={() => setFilterStatus('transit')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'transit'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            In Transit
          </button>

          <button
            onClick={() => setFilterStatus('locked')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'locked'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Escrow Locked
          </button>

          <button
            onClick={() => setFilterStatus('settled')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === 'settled'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Settled Payouts
          </button>
        </div>

      </div>

      {/* Orders List & Interactive Live Steppers */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800">No matching orders found</h4>
            <p className="text-xs text-slate-500">
              Procure a crop batch in the B2B Marketplace to create an escrow-backed order.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isSettled = order.escrowStatus === 'DELIVERED_SETTLED';
            const isInTransit = order.escrowStatus === 'IN_TRANSIT';
            const isLocked = order.escrowStatus === 'ESCROW_LOCKED';

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 sm:p-7 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                      isSettled ? 'bg-emerald-100 text-emerald-800' : isInTransit ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                    }`}>
                      <Receipt className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-slate-900 text-base">{order._id}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isSettled
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInTransit
                            ? 'bg-amber-100 text-amber-900 animate-pulse'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isSettled ? '✓ DELIVERED & SETTLED' : isInTransit ? '🚚 IN TRANSIT' : '🔒 ESCROW LOCKED'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Top Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenReceipt(order)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-700" />
                      <span>View Tax Invoice / Receipt</span>
                    </button>
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Column 1: Produce & Quantity */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Produce Sourced</span>
                    <h4 className="font-bold text-slate-900 text-sm">{order.cropName}</h4>
                    <p className="text-xs text-slate-600">
                      Quantity: <strong className="text-slate-900">{(order.quantityKg / 1000).toFixed(2)} MT</strong> ({order.quantityKg.toLocaleString()} kg)
                    </p>
                    <p className="text-xs text-slate-600">
                      Agreed Rate: <strong className="text-slate-900">₹{order.pricePerKg}/kg</strong>
                    </p>
                  </div>

                  {/* Column 2: Farmer & Buyer */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stakeholder Channel</span>
                    <p className="text-xs text-slate-800">
                      <strong className="text-slate-900">FPO:</strong> {order.fpoName}
                    </p>
                    <p className="text-xs text-slate-800">
                      <strong className="text-slate-900">Farmer:</strong> {order.farmerName}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-900">Buyer:</strong> {order.buyerName}
                    </p>
                  </div>

                  {/* Column 3: Escrow & Savings */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Escrow Settlement</span>
                    <p className="text-lg font-black text-emerald-950">₹{Math.round(order.totalEscrowAmount).toLocaleString('en-IN')}</p>
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-0.5">
                      <span>Middleman Cut Saved:</span>
                      <span className="font-bold">+₹{Math.round(order.middlemanSavings || order.quantityKg * 3.8).toLocaleString()}</span>
                    </div>
                  </div>

                </div>

                {/* Real-Time Stepper Progress Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Order Tracking & Escrow Milestone Verification
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                      Hash: {order.ledgerHash?.substring(0, 18)}...
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {order.trackingTimeline?.map((milestone) => {
                      const isComplete = milestone.status === 'completed';
                      const isCurrent = milestone.status === 'current';

                      return (
                        <div
                          key={milestone.step}
                          className={`p-3 rounded-2xl border transition text-xs space-y-1 ${
                            isComplete
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : isCurrent
                              ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs ring-2 ring-amber-400/30'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                              isComplete ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-300 text-slate-600'
                            }`}>
                              {isComplete ? '✓' : milestone.step}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {milestone.timestamp}
                            </span>
                          </div>

                          <p className="font-bold text-[11px] pt-1">{milestone.title}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{milestone.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Trigger Bar for Interactive Demo */}
                {!isSettled && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-700">SIH Interactive Demo Actions:</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isLocked && (
                        <button
                          onClick={() => handleSimulateDispatch(order._id)}
                          disabled={isUpdating}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Simulate Farm Pickup & Dispatch</span>
                        </button>
                      )}

                      {isInTransit && (
                        <button
                          onClick={() => handleSimulateDeliverySettlement(order._id)}
                          disabled={isUpdating}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirm Hub Delivery & Release Instant Payout</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Digital Receipt Modal */}
      <DigitalReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        order={selectedReceiptOrder}
      />

    </div>
  );
}
