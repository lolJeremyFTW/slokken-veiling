'use client';

import React, { useState } from 'react';
import SlokkenVeilingEngine from "../components/SlokkenVeilingEngine";
import QuizBattleEngine from "../components/QuizBattleEngine";
import { Gavel, Swords } from 'lucide-react';

export default function Home() {
  const [activeGame, setActiveGame] = useState<'VEILING' | 'QUIZ'>('VEILING');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sleek Game Selector Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-2 flex justify-center gap-2 sticky top-0 z-50 backdrop-blur-md">
        <button 
          onClick={() => setActiveGame('VEILING')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 ${
            activeGame === 'VEILING' 
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg' 
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Gavel className="w-3.5 h-3.5" /> 🔨 SLOKKEN VEILING
        </button>

        <button 
          onClick={() => setActiveGame('QUIZ')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 ${
            activeGame === 'QUIZ' 
              ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-slate-950 shadow-lg' 
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Swords className="w-3.5 h-3.5" /> 🧠 KAMPVUUR QUIZ BATTLE
        </button>
      </div>

      {/* Render Selected Game */}
      <div className="flex-1">
        {activeGame === 'VEILING' ? (
          <SlokkenVeilingEngine />
        ) : (
          <QuizBattleEngine onBackToVeiling={() => setActiveGame('VEILING')} />
        )}
      </div>
    </main>
  );
}
