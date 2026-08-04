'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import { sounds } from '../utils/soundEffects';
import { 
  Swords, 
  Trophy, 
  Flame, 
  Beer, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Shield, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  UserPlus, 
  UserMinus, 
  Play, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  Globe,
  Award
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  score: number;
  sipsDrunk: number;
  correctAnswers: number;
  wrongAnswers: number;
  hasShield: boolean;
}

export default function QuizBattleEngine({ onBackToVeiling }: { onBackToVeiling: () => void }) {
  // Players State
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Jeremy', score: 0, sipsDrunk: 0, correctAnswers: 0, wrongAnswers: 0, hasShield: true },
    { id: '2', name: 'Lars', score: 0, sipsDrunk: 0, correctAnswers: 0, wrongAnswers: 0, hasShield: true },
    { id: '3', name: 'Bram', score: 0, sipsDrunk: 0, correctAnswers: 0, wrongAnswers: 0, hasShield: true },
    { id: '4', name: 'Sanne', score: 0, sipsDrunk: 0, correctAnswers: 0, wrongAnswers: 0, hasShield: true },
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Game Engine State
  const [phase, setPhase] = useState<'SETUP' | 'QUESTION' | 'RESULT' | 'LEADERBOARD'>('SETUP');
  const [questionsDeck, setQuestionsDeck] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  
  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Resolution Details
  const [lastOutcome, setLastOutcome] = useState<{
    isCorrect: boolean;
    playerName: string;
    sipsToDrink: number;
    explanation: string;
    shieldUsed: boolean;
  } | null>(null);

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {}
    }
  };

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    setPlayers([...players, {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      score: 0,
      sipsDrunk: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hasShield: true
    }]);
    setNewPlayerName('');
    sounds.playBid();
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) {
      alert("Je hebt minimaal 2 spelers nodig!");
      return;
    }
    setPlayers(players.filter(p => p.id !== id));
    sounds.playPass();
  };

  const startQuizGame = () => {
    if (players.length < 2) {
      alert("Voeg minimaal 2 spelers toe!");
      return;
    }
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestionsDeck(shuffled);
    setCurrentQuestionIndex(0);
    setActivePlayerIndex(0);
    startQuestionRound(shuffled[0]);
    sounds.playGavel();
    confetti({ particleCount: 100, spread: 70 });
  };

  const startQuestionRound = (q: QuizQuestion) => {
    setSelectedOptionIndex(null);
    setTimerSeconds(15);
    setPhase('QUESTION');
    setIsTimerRunning(true);
  };

  // Timer interval
  useEffect(() => {
    if (phase === 'QUESTION' && isTimerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current as NodeJS.Timeout);
            setIsTimerRunning(false);
            handleTimeExpired();
            return 0;
          }
          sounds.playTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [phase, isTimerRunning, timerSeconds]);

  const handleTimeExpired = () => {
    const player = players[activePlayerIndex];
    sounds.playFail();
    triggerHaptic();

    let sips = 3;
    let shieldUsed = false;
    if (player.hasShield) {
      sips = 0;
      shieldUsed = true;
    }

    setPlayers(prev => prev.map((p, idx) => {
      if (idx === activePlayerIndex) {
        return {
          ...p,
          sipsDrunk: p.sipsDrunk + sips,
          wrongAnswers: p.wrongAnswers + 1,
          hasShield: shieldUsed ? false : p.hasShield
        };
      }
      return p;
    }));

    setLastOutcome({
      isCorrect: false,
      playerName: player.name,
      sipsToDrink: sips,
      explanation: "Tijd verlopen! ⌛ " + questionsDeck[currentQuestionIndex].explanation,
      shieldUsed
    });
    setPhase('RESULT');
  };

  const handleSelectOption = (optIdx: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(optIdx);
    setIsTimerRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const question = questionsDeck[currentQuestionIndex];
    const player = players[activePlayerIndex];
    const isCorrect = optIdx === question.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 120, spread: 80 });
      triggerHaptic();

      const earnedPoints = 100 + timerSeconds * 10;
      setPlayers(prev => prev.map((p, idx) => {
        if (idx === activePlayerIndex) {
          return {
            ...p,
            score: p.score + earnedPoints,
            correctAnswers: p.correctAnswers + 1
          };
        }
        return p;
      }));

      setLastOutcome({
        isCorrect: true,
        playerName: player.name,
        sipsToDrink: 0,
        explanation: `+${earnedPoints} Punten! ` + question.explanation,
        shieldUsed: false
      });
    } else {
      sounds.playFail();
      triggerHaptic();

      let sips = 2;
      let shieldUsed = false;
      if (player.hasShield) {
        sips = 0;
        shieldUsed = true;
      }

      setPlayers(prev => prev.map((p, idx) => {
        if (idx === activePlayerIndex) {
          return {
            ...p,
            sipsDrunk: p.sipsDrunk + sips,
            wrongAnswers: p.wrongAnswers + 1,
            hasShield: shieldUsed ? false : p.hasShield
          };
        }
        return p;
      }));

      setLastOutcome({
        isCorrect: false,
        playerName: player.name,
        sipsToDrink: sips,
        explanation: question.explanation,
        shieldUsed
      });
    }

    setPhase('RESULT');
  };

  const nextQuestion = () => {
    const nextQIdx = currentQuestionIndex + 1;
    if (nextQIdx >= questionsDeck.length) {
      setPhase('LEADERBOARD');
      sounds.playSuccess();
      confetti({ particleCount: 160, spread: 90 });
    } else {
      setCurrentQuestionIndex(nextQIdx);
      setActivePlayerIndex((activePlayerIndex + 1) % players.length);
      startQuestionRound(questionsDeck[nextQIdx]);
    }
  };

  const currentQ = questionsDeck[currentQuestionIndex] || QUIZ_QUESTIONS[0];
  const activeP = players[activePlayerIndex] || players[0];

  // ==========================================
  // RENDER: SETUP
  // ==========================================
  if (phase === 'SETUP') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <button 
            onClick={onBackToVeiling}
            className="mb-2 text-xs font-bold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full"
          >
            ← Terug naar Slokken Veiling
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold mb-2">
            <Swords className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Multiplayer Drank-Quiz</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            KAMPVUUR QUIZ BATTLE
          </h1>
          <p className="text-slate-400 text-xs mt-1">Beantwoord vragen, verdien punten & ontwijk strafslokken!</p>
        </div>

        <div className="my-auto space-y-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2 text-amber-300">
              <Beer className="w-5 h-5" /> Quiz Spelers ({players.length})
            </h2>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Naam van de speler..."
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
            />
            <button 
              onClick={addPlayer}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-4 py-3 rounded-xl transition flex items-center justify-center"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800 px-4 py-2.5 rounded-xl">
                <span className="font-semibold text-slate-200">{p.name}</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3" /> 1x Schild
                </span>
                <button onClick={() => removePlayer(p.id)} className="text-slate-500 hover:text-red-400 p-1">
                  <UserMinus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-6 z-10 space-y-2">
          <button 
            onClick={startQuizGame}
            className="w-full bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" />
            START DE QUIZ BATTLE
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: QUESTION
  // ==========================================
  if (phase === 'QUESTION') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="flex items-center justify-between z-10 pt-2 border-b border-slate-900 pb-2">
          <span className="text-xs font-bold text-slate-400">
            Vraag {currentQuestionIndex + 1} / {questionsDeck.length}
          </span>
          <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
            {currentQ.category}
          </span>
        </div>

        <div className="mt-2 z-10 bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/40 rounded-2xl p-5 shadow-2xl text-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Beantwoorder:</span>
            <span className="text-base font-black text-amber-300 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> {activeP.name}
            </span>
          </div>

          <div className="text-2xl font-black text-white leading-relaxed">
            &quot;{currentQ.question}&quot;
          </div>

          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-slate-950 border border-amber-500/40 rounded-full">
            <Clock className={`w-4 h-4 ${timerSeconds <= 5 ? 'text-red-500 animate-ping' : 'text-amber-400'}`} />
            <span className={`text-lg font-black ${timerSeconds <= 5 ? 'text-red-500' : 'text-amber-400'}`}>
              {timerSeconds}s
            </span>
          </div>
        </div>

        <div className="my-3 z-10 space-y-2">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className="w-full bg-slate-900 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500 p-4 rounded-xl text-left text-sm font-black text-white transition active:scale-95 flex items-center justify-between"
            >
              <span>{opt}</span>
              <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 text-xs font-black flex items-center justify-center text-slate-400">
                {String.fromCharCode(65 + idx)}
              </span>
            </button>
          ))}
        </div>

        <div className="pb-4 z-10 text-center text-xs text-slate-500">
          Goede antwoorden geven snelheidsbonus! Fout = 2 slokken boete.
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: RESULT
  // ==========================================
  if (phase === 'RESULT' && lastOutcome) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-1">
            {lastOutcome.isCorrect ? (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> GOED BEANTWOORD!
              </span>
            ) : (
              <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full flex items-center gap-1">
                <XCircle className="w-4 h-4" /> FOUT ANTWOORD!
              </span>
            )}
          </div>

          <h2 className="text-3xl font-black text-white">
            {lastOutcome.playerName}
          </h2>
        </div>

        <div className="my-auto z-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
          {lastOutcome.isCorrect ? (
            <div className="space-y-2">
              <div className="text-5xl">🎉</div>
              <div className="text-xl font-black text-amber-300">PUNTEN GEKOST!</div>
              <p className="text-xs text-slate-300 font-medium">{lastOutcome.explanation}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lastOutcome.shieldUsed ? (
                <>
                  <div className="text-5xl">🛡️</div>
                  <div className="text-xl font-black text-emerald-400">SLOKKEN-SCHILD INGEZET!</div>
                  <p className="text-xs text-slate-300">Je schild heeft je gered van strafslokken!</p>
                </>
              ) : (
                <>
                  <div className="text-5xl">🍻</div>
                  <div className="text-2xl font-black text-red-400">DRINK {lastOutcome.sipsToDrink} STRAFSLOKKEN!</div>
                  <p className="text-xs text-slate-300">{lastOutcome.explanation}</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="pb-6 z-10">
          <button 
            onClick={nextQuestion}
            className="w-full bg-gradient-to-r from-purple-500 to-amber-500 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95"
          >
            <span>VOLGENDE VRAAG</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: LEADERBOARD
  // ==========================================
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
      <div className="pt-4 text-center z-10 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
          <Trophy className="w-4 h-4" /> EINDSTAND QUIZ BATTLE
        </div>
        <h2 className="text-3xl font-black text-white">Gefeliciteerd!</h2>
      </div>

      <div className="my-auto z-10 space-y-2 max-h-72 overflow-y-auto">
        {sortedPlayers.map((p, idx) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center ${
                idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                #{idx + 1}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{p.name}</div>
                <div className="text-[10px] text-slate-400">{p.correctAnswers} goed / {p.wrongAnswers} fout</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-purple-400">{p.score} Ptn</div>
              <div className="text-[10px] text-amber-400 font-bold flex items-center justify-end gap-1">
                <Beer className="w-3 h-3" /> {p.sipsDrunk} slokken
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-6 z-10 space-y-2">
        <button 
          onClick={startQuizGame}
          className="w-full bg-gradient-to-r from-purple-500 to-amber-500 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          HERKANSING SPELEN
        </button>
        <button 
          onClick={onBackToVeiling}
          className="w-full bg-slate-900 text-slate-400 font-bold py-3 rounded-xl text-xs"
        >
          Terug naar Slokken Veiling
        </button>
      </div>
    </div>
  );
}
