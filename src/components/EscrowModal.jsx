import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  TrendingDown, 
  Building2, 
  Lock, 
  Clock, 
  FileCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function EscrowModal({
  isOpen,
  onClose,
  crop,
  onConfirmOrder,
  buyerProfile
}) {
  if (!isOpen || !crop) return null;

  const [orderQuantityKg, setOrderQuantityKg] = useState(
    Math.min(crop.quantityKg, 3000)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Financial Calculations
  const pricePerKg = crop.minPriceExpectationPerKg;
  const baseCropCost = orderQuantityKg * pricePerKg;
  
  // Freight calculation: Standard truck freight ₹3.20/kg - AI Route pooling discount ₹0.95/kg
  const baseFreightFee = orderQuantityKg * 3.2;
  const pooledRouteDiscount = orderQuantityKg * 0.95;
  const netFreightFee = Math.max(0, baseFreightFee - pooledRouteDiscount);

  // Disintermediation savings: Mandi middleman margin saved (approx ₹3.80/kg)
  const middlemanSavings = orderQuantityKg * 3.8;

  // Total Escrow Locked
  const totalEscrowAmount = baseCropCost + netFreightFee;

  const handleConfirm = async () => {
    setIsProcessing(true);
    const orderPayload = {
      buyerId: buyerProfile?.buyerId || 'buyer_reliance_fresh_771',
      buyerName: buyerProfile?.companyName || 'FreshMart Mega Retailers Pvt Ltd',
      cropId: crop._id,
      cropName: crop.cropName,
      farmerId: crop.farmerId,
      fpoName: crop.fpoName,
      quantityKg: orderQuantityKg,
      pricePerKg: pricePerKg,
      baseCropCost: baseCropCost,
      freightFee: netFreightFee,
      middlemanSavings: middlemanSavings,
      totalEscrowAmount: totalEscrowAmount,
      deliveryLocation: 'Vashi APMC Central Terminal & Cold Storage, Navi Mumbai'
    };

    const res = await onConfirmOrder(orderPayload);
    setIsProcessing(false);
    if (res?.success) {
      setCreatedOrder(res.data);
      setOrderSuccess(true);
    }
  };

  const handleClose = () => {
    setOrderSuccess(false);
    setCreatedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative animate-slide-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 border-b border-zinc-800 text-white p-6 sm:p-7 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-zinc-800/90 px-2.5 py-0.5 rounded-full border border-zinc-700">
                  Direct Escrow Contract
                </span>
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> SIH Trust Protocol
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                {orderSuccess ? 'Escrow Successfully Locked!' : 'Initiate B2B Sourcing Contract'}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {orderSuccess ? (
            /* ======================================================== */
            /* SUCCESS CONFIRMATION VIEW */
            /* ======================================================== */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">
                  ₹{totalEscrowAmount.toLocaleString('en-IN')} Secured in AgriDirect Trust
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Contract ID: <span className="font-mono font-semibold text-agri-800">{createdOrder?._id || 'ORD-9912A'}</span>
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto pt-1">
                  Funds are held in neutral escrow and will be automatically released to <strong className="text-slate-800">{crop.fpoName}</strong> upon quality gate verification and dispatch arrival.
                </p>
              </div>

              {/* Milestone Timeline */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Smart Escrow Release Schedule
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">1. Escrow Lock by Buyer</p>
                      <p className="text-slate-500 text-[11px]">Funds debited from enterprise credit line into RBI-regulated escrow</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      COMPLETED
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] animate-pulse">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">2. Farmgate Dispatch & IoT QA Scan</p>
                      <p className="text-slate-500 text-[11px]">Reefer truck dispatched for multi-stop consolidation</p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      IN PROGRESS
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">3. Hub Delivery & Instant FPO Payout</p>
                      <p className="text-slate-500 text-[11px]">Direct UPI / RTGS settlement to farmer bank account without commission</p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                      PENDING
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-agri-800 hover:bg-emerald-900 text-white font-bold text-sm transition"
                >
                  Return to Marketplace Catalog
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* ORDER DRAWER & ESCROW SUMMARY VIEW */
            /* ======================================================== */
            <>
              {/* Crop & FPO Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Batch Sourcing Details</span>
                  <h4 className="font-bold text-slate-900 text-lg">{crop.cropName}</h4>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{crop.fpoName} ({crop.location?.district}, {crop.location?.state})</span>
                  </p>
                </div>

                <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                  <span className="text-xs text-slate-500">Agreed Price</span>
                  <p className="text-xl font-extrabold text-slate-900">₹{crop.minPriceExpectationPerKg}/kg</p>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Quality Grade {crop.qualityGrade}
                  </span>
                </div>
              </div>

              {/* Quantity Adjustment Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Procurement Quantity
                  </label>
                  <span className="text-xs font-semibold text-slate-500">
                    Max Available: {(crop.quantityKg / 1000).toFixed(1)} MT ({crop.quantityKg.toLocaleString()} kg)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="500"
                    max={crop.quantityKg}
                    step="100"
                    value={orderQuantityKg}
                    onChange={(e) => setOrderQuantityKg(Number(e.target.value))}
                    className="flex-1 accent-emerald-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="w-32 flex items-center gap-1 border border-slate-300 rounded-xl px-3 py-1.5 bg-slate-50">
                    <input
                      type="number"
                      value={orderQuantityKg}
                      onChange={(e) => setOrderQuantityKg(Math.min(crop.quantityKg, Math.max(100, Number(e.target.value))))}
                      className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none"
                    />
                    <span className="text-xs text-slate-500 font-semibold">kg</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Procuring = {(orderQuantityKg / 1000).toFixed(2)} Metric Tons
                </div>
              </div>

              {/* Escrow Financial Breakdown Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Escrow Financial Breakdown
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Protected
                  </span>
                </div>

                {/* 1. Base Crop Cost */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">
                    Base Produce Cost ({orderQuantityKg.toLocaleString()} kg × ₹{pricePerKg})
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹{baseCropCost.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 2. Optimized Freight Route Fee */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <span>Consolidated Route Freight (Reefer Multi-Stop)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">
                      ₹{Math.round(netFreightFee).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      (Saved ₹{Math.round(pooledRouteDiscount).toLocaleString()} via AI Pooling)
                    </span>
                  </div>
                </div>

                {/* 3. Middleman Disintermediation Savings Highlight */}
                <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-200 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-800" />
                    <div>
                      <p className="font-bold text-emerald-950">Mandi Middleman Margin Saved</p>
                      <p className="text-emerald-800 text-[11px]">Direct-from-FPO disintermediation benefit</p>
                    </div>
                  </div>
                  <span className="font-black text-emerald-900 text-sm">
                    - ₹{Math.round(middlemanSavings).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Total Escrow */}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Total Escrow To Lock</span>
                    <span className="text-[11px] text-slate-500">Includes crop base + guaranteed carrier freight</span>
                  </div>
                  <span className="text-2xl font-black text-agri-800">
                    ₹{Math.round(totalEscrowAmount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-agri-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Locking Escrow Contract...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Lock Escrow (₹{Math.round(totalEscrowAmount).toLocaleString('en-IN')}) & Dispatch</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
