import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';

export default function OfflineBanner({
  isOffline,
  offlineQueueCount,
  onSyncNow,
  isSyncing,
  toggleOfflineSimulator
}) {
  if (!isOffline && offlineQueueCount === 0) {
    return null;
  }

  return (
    <div
      className={`w-full transition-all duration-300 border-b px-4 py-3 sm:px-6 shadow-sm ${
        isOffline
          ? 'bg-amber-500/15 border-amber-500/30 text-amber-950'
          : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-950'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              isOffline ? 'bg-amber-500 text-slate-900 animate-pulse-subtle' : 'bg-emerald-600 text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
          </div>

          <div>
            <div className="font-semibold text-sm flex items-center gap-2">
              <span>
                {isOffline ? 'Offline Mode Active (Rural Connectivity Resilience)' : 'Online Connection Restored'}
              </span>
              {offlineQueueCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900 border border-amber-300">
                  {offlineQueueCount} harvest {offlineQueueCount === 1 ? 'batch' : 'batches'} pending sync
                </span>
              )}
            </div>
            <p className="text-xs text-slate-700 mt-0.5">
              {isOffline
                ? 'Produce listings are safely secured in your device\'s local storage and will automatically synchronize when connection resumes.'
                : `${offlineQueueCount} local record(s) ready to push to cloud database ledger.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {offlineQueueCount > 0 && (
            <button
              onClick={onSyncNow}
              disabled={isSyncing || isOffline}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition ${
                isOffline
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Cloud Now'}
            </button>
          )}

          <button
            onClick={toggleOfflineSimulator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 hover:bg-white text-slate-800 border border-slate-300/80 shadow-xs transition"
          >
            {isOffline ? 'Go Online' : 'Simulate Offline'}
          </button>
        </div>
      </div>
    </div>
  );
}
