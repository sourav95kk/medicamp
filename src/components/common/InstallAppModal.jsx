import React, { useState, useEffect } from 'react';
import { Smartphone, Share, PlusSquare, X, CheckCircle, Apple, Download, ExternalLink } from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose }) {
  const [platform, setPlatform] = useState('ios');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if already installed as standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsStandalone(true);
    }

    // Detect iOS vs Android
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else {
      setPlatform('android');
    }

    // Capture Android PWA install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleAndroidInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black">Install MediCamp on Mobile</h3>
              <p className="text-xs text-sky-100">Full-screen native app experience</p>
            </div>
          </div>

          {/* Platform Switcher */}
          <div className="mt-4 flex bg-white/20 p-1 rounded-xl gap-1">
            <button
              onClick={() => setPlatform('ios')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                platform === 'ios' ? 'bg-white text-sky-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              iPhone / iPad (iOS)
            </button>
            <button
              onClick={() => setPlatform('android')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                platform === 'android' ? 'bg-white text-sky-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Android Phone
            </button>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="p-6 space-y-4">
          
          {isStandalone ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">App Already Installed!</h4>
              <p className="text-xs text-slate-500">
                You are currently running MediCamp in standalone app mode.
              </p>
            </div>
          ) : platform === 'ios' ? (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Install on iPhone via Safari (3 Quick Steps):
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="text-xs text-slate-700">
                    <p className="font-bold text-slate-900">Open in Safari Browser</p>
                    <p className="text-slate-500 mt-0.5">Make sure you are viewing this website in Safari on your iPhone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs text-slate-700">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      Tap the <Share className="w-4 h-4 text-sky-600 inline" /> Share button
                    </p>
                    <p className="text-slate-500 mt-0.5">Located in the bottom toolbar of Safari.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="text-xs text-slate-700">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      Select <PlusSquare className="w-4 h-4 text-sky-600 inline" /> "Add to Home Screen"
                    </p>
                    <p className="text-slate-500 mt-0.5">Tap "Add" in top-right. The MediCamp app icon will appear on your iPhone screen!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Install on Android via Chrome:
              </h4>

              {deferredPrompt ? (
                <button
                  onClick={handleAndroidInstallClick}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Tap to Install App Now
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs text-slate-700">
                      <p className="font-bold text-slate-900">Open Chrome Browser menu (⋮)</p>
                      <p className="text-slate-500 mt-0.5">Tap the 3 dots in the top right corner.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs text-slate-700">
                      <p className="font-bold text-slate-900">Tap "Install App" or "Add to Home screen"</p>
                      <p className="text-slate-500 mt-0.5">MediCamp will install with native offline support.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Native Xcode Option */}
          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 text-center">
            <p className="text-[11px] text-slate-500">
              Developer Option: Run <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">npx cap open ios</code> to build via Xcode on Mac.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
