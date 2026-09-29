import React from 'react';
import { RunProgressState } from '../types/pcr';

interface InstrumentChassisProps {
  children: React.ReactNode;
  isChassisMode: boolean;
  runProgress: RunProgressState;
  lidHeatingEnabled: boolean;
}

export const InstrumentChassis: React.FC<InstrumentChassisProps> = ({
  children,
  isChassisMode,
  runProgress,
  lidHeatingEnabled,
}) => {
  if (!isChassisMode) {
    // Pure fullscreen touch monitor mode
    return <div className="w-full h-screen flex flex-col bg-slate-950 text-slate-100">{children}</div>;
  }

  const isRunning = runProgress.state !== 'idle' && runProgress.state !== 'completed';
  const isLidHot = lidHeatingEnabled && runProgress.currentLidTemp >= (runProgress.targetLidTemp - 1);

  return (
    <div className="min-h-screen w-full bg-slate-950 p-2 sm:p-5 flex items-center justify-center">
      {/* Outer Lab Instrument Housing */}
      <div className="w-full max-w-6xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 rounded-3xl p-3 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-300 relative flex flex-col">
        {/* Top Header of the Physical Machine */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-slate-300/80 mb-3 select-none">
          {/* Brand & Model Lockup */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-cyan-700 flex items-center justify-center text-[9px] font-bold text-white font-mono">
              T
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider font-mono">
                T5000-96 GRADIENT THERMAL CYCLER
              </div>
              <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                96-WELL 0.2 mL PELTIER TEMPERATURE CONTROL SYSTEM · BIOEQUILABS
              </div>
            </div>
          </div>

          {/* Physical LED Indicators */}
          <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px]">
            {/* LED 1: Power */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] ring-2 ring-emerald-500/30"></span>
              <span className="text-slate-600 font-bold uppercase hidden sm:inline">POWER</span>
            </div>

            {/* LED 2: Heated Lid */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ring-2 transition-all ${
                  lidHeatingEnabled
                    ? isLidHot
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] ring-emerald-500/30'
                      : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] ring-amber-500/30 animate-pulse'
                    : 'bg-slate-400 ring-slate-300'
                }`}
              ></span>
              <span className="text-slate-600 font-bold uppercase hidden sm:inline">LID HEAT</span>
            </div>

            {/* LED 3: Status / Run */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ring-2 transition-all ${
                  isRunning
                    ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)] ring-cyan-400/40'
                    : 'bg-blue-400 ring-blue-400/30'
                }`}
              ></span>
              <span className="text-slate-600 font-bold uppercase hidden sm:inline">
                {isRunning ? 'RUNNING' : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>

        {/* Recessed Matte LCD Touchscreen Frame */}
        <div className="bg-slate-900 rounded-2xl p-2 sm:p-3 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] border-2 border-slate-700/80 flex flex-col min-h-[640px] overflow-hidden">
          {children}
        </div>

        {/* Lower Chassis Details: USB Slot, Ventilation and Anti-slip feet */}
        <div className="mt-3 pt-2 border-t border-slate-300/80 flex items-center justify-between px-3 select-none text-[10px] text-slate-500 font-mono">
          {/* Ventilation grilles */}
          <div className="flex gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-3 bg-slate-300 rounded-full inline-block shadow-inner"></span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">USB 2.0 PROTOCOL PORT</span>
            <div className="w-7 h-3 rounded-xs bg-slate-800 border border-slate-400 shadow-inner flex items-center justify-center">
              <span className="w-4 h-1 bg-slate-900 rounded-xs"></span>
            </div>
            <span className="text-slate-600 font-bold">SN: T5000-8429-CE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
