import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  Truck, 
  Calendar, 
  TrendingDown, 
  Lock, 
  QrCode,
  FileText,
  Copy,
  Check
} from 'lucide-react';

export default function DigitalReceiptModal({
  isOpen,
  onClose,
  order
}) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  const handleCopyHash = () => {
    if (order.ledgerHash) {
      navigator.clipboard.writeText(order.ledgerHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative animate-slide-up print:m-0 print:p-0 print:border-none print:shadow-none">
        
        {/* Header (No print close button) */}
        <div className="bg-gradient-to-r from-black via-zinc-900 to-slate-900 text-white p-6 relative border-b border-zinc-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Smart Escrow Verified Invoice
                  </span>
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    SIH 26033 Digital Ledger
                  </span>
                </div>
                <h3 className="text-xl font-black mt-1 text-white">
                  Tax Invoice & Settlement Receipt
                </h3>
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs">
              <p className="text-slate-400">Order Reference</p>
              <p className="font-mono font-bold text-emerald-400 text-sm">{order._id}</p>
            </div>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-sm">
          
          {/* Top Status & Date Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block">Transaction Timestamp</span>
              <span className="font-semibold text-slate-900">{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Escrow Status:</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                order.escrowStatus === 'DELIVERED_SETTLED'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                {order.escrowStatus === 'DELIVERED_SETTLED' ? 'SETTLED & RELEASED' : order.escrowStatus}
              </span>
            </div>
          </div>

          {/* Parties: Buyer & FPO Farmer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Buyer Details */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Enterprise Buyer</span>
              <p className="font-bold text-slate-900 text-sm">{order.buyerName}</p>
              <p className="text-xs text-slate-600">GSTIN: <span className="font-mono font-semibold">{order.buyerGstin || '27AABCF1234F1ZP'}</span></p>
              <p className="text-xs text-slate-500">{order.deliveryLocation}</p>
            </div>

            {/* FPO Farmer Details */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Producer Organization (FPO)</span>
              <p className="font-bold text-slate-900 text-sm">{order.fpoName}</p>
              <p className="text-xs text-slate-600">Farmer: <span className="font-semibold">{order.farmerName}</span></p>
              <p className="text-xs text-slate-600">Settlement UPI: <span className="font-mono text-emerald-800 font-semibold">{order.farmerBankUpi || 'fpo.payout@sbi'}</span></p>
            </div>

          </div>

          {/* Itemized Produce Line Items */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Description & Variety</th>
                  <th className="p-3 text-right">Quantity</th>
                  <th className="p-3 text-right">Agreed Rate</th>
                  <th className="p-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{order.cropName}</p>
                    <span className="text-[11px] text-slate-500">{order.variety || order.category} • Grade A+</span>
                  </td>
                  <td className="p-3 text-right font-semibold">
                    {(order.quantityKg / 1000).toFixed(2)} MT <br />
                    <span className="text-[10px] text-slate-400">({order.quantityKg.toLocaleString()} kg)</span>
                  </td>
                  <td className="p-3 text-right font-semibold">₹{order.pricePerKg}/kg</td>
                  <td className="p-3 text-right font-bold text-slate-900">₹{order.baseCropCost.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600">
                    Consolidated Cold-Chain Freight (14-Ton EV Reefer)
                  </td>
                  <td className="p-3 text-right text-slate-400">Multi-Stop</td>
                  <td className="p-3 text-right text-emerald-700 font-medium">-29.8% AI Pooled</td>
                  <td className="p-3 text-right font-semibold text-slate-800">₹{Math.round(order.freightFee).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600">
                    Platform Sustainable Fee (0.5% SIH Direct Model)
                  </td>
                  <td className="p-3 text-right text-slate-400">-</td>
                  <td className="p-3 text-right text-slate-400">0.5%</td>
                  <td className="p-3 text-right font-semibold text-slate-800">₹{Math.round(order.platformFee || order.baseCropCost * 0.005).toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Disintermediation Savings Highlight Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-800" />
              <div>
                <p className="font-bold text-emerald-950">Mandi Middleman Margin Saved</p>
                <p className="text-emerald-800 text-[11px]">Direct FPO disintermediation benefit returned to supply chain</p>
              </div>
            </div>
            <span className="font-black text-emerald-900 text-sm">
              ₹{Math.round(order.middlemanSavings || order.quantityKg * 3.8).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Total Settlement Amount */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Total Escrow Sourced</span>
              <p className="text-xs text-emerald-400">Includes Produce + Consolidated Carrier Freight</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">
                ₹{Math.round(order.totalEscrowAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Cryptographic Ledger Verification Hash */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-700" /> Cryptographic Ledger Audit Hash (SHA-256)
              </span>
              <button 
                onClick={handleCopyHash}
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <p className="font-mono text-[11px] text-slate-600 break-all select-all">
              {order.ledgerHash || '0x8f2d9c1e4b7a33e09841f62cb932a901842e77b4d32a10e8c671b58a2d109f4'}
            </p>
          </div>

          {/* Telemetry & Logistics Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Vehicle Reg</span>
              <span className="font-bold text-slate-800">{order.vehicleRegNo || 'MH-15-EG-8821'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Cold Temp</span>
              <span className="font-bold text-emerald-700">{order.coldChainTempCelsius || 4.2}°C</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Pickup OTP</span>
              <span className="font-mono font-bold text-slate-800">{order.pickupOtp || '8492'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Delivery OTP</span>
              <span className="font-mono font-bold text-slate-800">{order.deliveryOtp || '3177'}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons (Print / Download) */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-agri-800 hover:bg-emerald-900 text-white font-bold text-xs transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Receipt</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
