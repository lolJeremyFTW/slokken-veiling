'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CATEGORIES, 
  CategoryChallenge 
} from '../data/challenges';
import { sounds } from '../utils/soundEffects';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  UserPlus, 
  UserMinus, 
  Play, 
  Gavel, 
  RotateCcw, 
  Trophy, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Beer, 
  Clock, 
  ChevronRight,
  Info,
  Layers
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  sipsDrunk: number;
  bidsWon: number;
  challengesFailed: number;
}

type GamePhase = 'SETUP' | 'BIDDING' | 'TIMED_CHALLENGE' | 'RESOLUTION' | 'STATS';

export default function SlokkenVeilingEngine() {
  // Game Configuration & Players
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Jeremy', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0 },
    { id: '2', name: 'Lars', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0 },
    { id: '3', name: 'Bram', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0 },
    { id: '4', name: 'Sanne', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0 },
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [maxBidLimit, setMaxBidLimit] = useState(25);
  
  // Active Game State
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [deck, setDeck] = useState<CategoryChallenge[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Round Bidding State
  const [highestBidderId, setHighestBidderId] = useState<string | null>(null);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [passedPlayerIds, setPassedPlayerIds] = useState<string[]>([]);
  const [challengerId, setChallengerId] = useState<string | null>(null);

  // Timer State
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Resolution State
  const [resolutionData, setResolutionData] = useState<{
    headline: string;
    subtext: string;
    actionDetails: string;
    drinkers: { name: string; sips: number; reason: string }[];
  } | null>(null);

  // Sync sound settings
  useEffect(() => {
    sounds.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Haptic feedback helper
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // Ignore if restricted
      }
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    triggerHaptic();
  };

  // Add / Remove Player
  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      sipsDrunk: 0,
      bidsWon: 0,
      challengesFailed: 0,
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
    sounds.playBid();
    triggerHaptic();
  };

  const removePlayer = (id: string) => {
    if (players.length <= 2) {
      alert("Je hebt minimaal 2 spelers nodig voor de veiling!");
      return;
    }
    setPlayers(players.filter(p => p.id !== id));
    sounds.playPass();
  };

  // Start New Game
  const startGame = () => {
    if (players.length < 2) {
      alert("Voeg minimaal 2 spelers toe!");
      return;
    }
    // Shuffle categories deck
    const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    startRound(shuffled[0], 0);
    sounds.playGavel();
    triggerHaptic();
  };

  // Start a new Bidding Round
  const startRound = (card: CategoryChallenge, roundIndex: number) => {
    setPhase('BIDDING');
    setHighestBidderId(null);
    setHighestBid(0);
    setPassedPlayerIds([]);
    setChallengerId(null);
    
    // Rotate starting player for fairness
    const startingPlayerIdx = roundIndex % players.length;
    setActivePlayerIndex(startingPlayerIdx);
  };

  const currentCard = deck[currentCardIndex] || CATEGORIES[0];
  const activePlayer = players[activePlayerIndex] || players[0];

  // Advance to next active player who hasn't passed
  const getNextActivePlayerIndex = (currentIdx: number, passedIds: string[]): number => {
    let nextIdx = (currentIdx + 1) % players.length;
    let attempts = 0;
    while (passedIds.includes(players[nextIdx].id) && attempts < players.length) {
      nextIdx = (nextIdx + 1) % players.length;
      attempts++;
    }
    return nextIdx;
  };

  // Handle placing a bid (+1, +2, +3, etc.)
  const handlePlaceBid = (amount: number) => {
    const newBid = highestBid + amount;
    if (newBid > maxBidLimit) {
      alert(`Het maximale bod is ingesteld op ${maxBidLimit}!`);
      return;
    }

    sounds.playBid();
    triggerHaptic();
    
    setHighestBid(newBid);
    setHighestBidderId(activePlayer.id);

    const remainingActive = players.filter(p => !passedPlayerIds.includes(p.id));
    if (remainingActive.length === 1) {
      // Everyone else passed, highest bidder wins
      finishBiddingRound(activePlayer.id, newBid);
    } else {
      const nextIdx = getNextActivePlayerIndex(activePlayerIndex, passedPlayerIds);
      setActivePlayerIndex(nextIdx);
    }
  };

  // Handle player passing (folding)
  const handlePass = () => {
    sounds.playPass();
    triggerHaptic();

    const newPassed = [...passedPlayerIds, activePlayer.id];
    setPassedPlayerIds(newPassed);

    const remainingActive = players.filter(p => !newPassed.includes(p.id));

    if (remainingActive.length === 0) {
      if (!highestBidderId) {
        // Everyone passed with 0 bids
        setResolutionData({
          headline: "Niemand durfde te bieden!",
          subtext: "De veiling is afgeblazen.",
          actionDetails: "De hele groep neemt 1 strafslok voor de lafheid!",
          drinkers: players.map(p => ({ name: p.name, sips: 1, reason: "Iedereen heeft gepast" }))
        });
        updateSips(players.map(p => p.id), 1);
        setPhase('RESOLUTION');
        sounds.playFail();
        return;
      } else {
        // Highest bidder wins!
        finishBiddingRound(highestBidderId, highestBid);
      }
    } else if (remainingActive.length === 1 && highestBidderId === remainingActive[0].id) {
      // Highest bidder is the only one remaining
      finishBiddingRound(highestBidderId, highestBid);
    } else {
      const nextIdx = getNextActivePlayerIndex(activePlayerIndex, newPassed);
      setActivePlayerIndex(nextIdx);
    }
  };

  // Handle "BEWIJS HET!" call
  const handleChallengeCall = () => {
    if (!highestBidderId) return;
    sounds.playChallenge();
    triggerHaptic();

    setChallengerId(activePlayer.id);
    setPhase('TIMED_CHALLENGE');
    setTimeRemaining(currentCard.defaultTimeSeconds || 15);
    setIsTimerRunning(false);
  };

  // Timer logic for countdown
  useEffect(() => {
    if (phase === 'TIMED_CHALLENGE' && isTimerRunning && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current as NodeJS.Timeout);
            setIsTimerRunning(false);
            sounds.playFail();
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
  }, [phase, isTimerRunning, timeRemaining]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    sounds.playBid();
  };

  // Handle Challenge Result (Completed vs Failed)
  const handleChallengeOutcome = (success: boolean) => {
    const bidder = players.find(p => p.id === highestBidderId);
    const challenger = players.find(p => p.id === challengerId);

    if (!bidder || !challenger) return;

    if (success) {
      // Bidder succeeded! Challenger drinks the bid!
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      sounds.playSuccess();
      setResolutionData({
        headline: `🔥 ${bidder.name} HEEFT HET BEWEZEN!`,
        subtext: `${bidder.name} noemde ruim ${highestBid} ${currentCard.categoryName} binnen 15 seconden!`,
        actionDetails: `${challenger.name} riep 'BEWIJS HET!' en verliest de gok!`,
        drinkers: [{ name: challenger.name, sips: highestBid, reason: `Verkeerd uitgedaagd (${highestBid} slokken)` }]
      });
      updateSips([challenger.id], highestBid);
      updateBidsWon(bidder.id);
    } else {
      // Bidder failed! Bidder drinks DOUBLE the bid!
      sounds.playFail();
      const sipsToDrink = highestBid * 2;
      setResolutionData({
        headline: `❌ ${bidder.name} HEEFT GEFAALD!`,
        subtext: `${bidder.name} haalde de ${highestBid} ${currentCard.categoryName} NIET binnen de tijd!`,
        actionDetails: `Gefaald in de uitdaging! Straf: Dubbele slokken!`,
        drinkers: [{ name: bidder.name, sips: sipsToDrink, reason: `Gefaald in bod (${highestBid} × 2 slokken)` }]
      });
      updateSips([bidder.id], sipsToDrink);
      updateChallengesFailed(bidder.id);
    }
    setPhase('RESOLUTION');
  };

  // Finish bidding round when everyone passed without a challenge
  const finishBiddingRound = (winnerId: string, bidAmount: number) => {
    const winner = players.find(p => p.id === winnerId);
    if (!winner) return;

    // Highest bidder can choose to prove it or just take the win!
    setChallengerId(null);
    setPhase('TIMED_CHALLENGE');
    setTimeRemaining(currentCard.defaultTimeSeconds || 15);
    setIsTimerRunning(false);
  };

  // Helper score updaters
  const updateSips = (playerIds: string[], amount: number) => {
    setPlayers(prev => prev.map(p => playerIds.includes(p.id) ? { ...p, sipsDrunk: p.sipsDrunk + amount } : p));
  };

  const updateBidsWon = (playerId: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, bidsWon: p.bidsWon + 1 } : p));
  };

  const updateChallengesFailed = (playerId: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, challengesFailed: p.challengesFailed + 1 } : p));
  };

  // Next Card
  const nextCard = () => {
    sounds.playBid();
    triggerHaptic();
    const nextIdx = currentCardIndex + 1;
    if (nextIdx >= deck.length) {
      setPhase('STATS');
      sounds.playSuccess();
    } else {
      setCurrentCardIndex(nextIdx);
      startRound(deck[nextIdx], nextIdx);
    }
  };

  // ==========================================
  // RENDER: SETUP PHASE
  // ==========================================
  if (phase === 'SETUP') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        {/* Ambient Campfire Background Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-2">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>Kampvuur Drankspel</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            DE SLOKKEN VEILING
          </h1>
          <p className="text-slate-400 text-xs mt-1">Bied hoeveel jij kunt noemen & laat vrienden drinken!</p>
        </div>

        {/* Setup Card */}
        <div className="my-auto space-y-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2 text-amber-300">
              <Beer className="w-5 h-5" /> Spelers ({players.length})
            </h2>
            <button 
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
              title="Geluid"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>

          {/* Add Player Input */}
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Naam van de speler..."
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 placeholder-slate-500 text-white"
            />
            <button 
              onClick={addPlayer}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold px-4 py-3 rounded-xl transition flex items-center justify-center"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          {/* Player List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800 px-4 py-2.5 rounded-xl">
                <span className="font-semibold text-slate-200">{p.name}</span>
                <button 
                  onClick={() => removePlayer(p.id)}
                  className="text-slate-500 hover:text-red-400 p-1 transition"
                >
                  <UserMinus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pb-6 z-10">
          <button 
            onClick={startGame}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" />
            START DE VEILING
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: BIDDING PHASE
  // ==========================================
  if (phase === 'BIDDING') {
    const highestBidder = players.find(p => p.id === highestBidderId);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between z-10 pt-2">
          <span className="text-xs font-bold text-slate-400">
            Categorie {currentCardIndex + 1} / {deck.length}
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPhase('STATS')} 
              className="p-2 bg-slate-900 text-amber-400 rounded-lg border border-slate-800"
              title="Scorebord"
            >
              <Trophy className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleSound}
              className="p-2 bg-slate-900 text-slate-300 rounded-lg border border-slate-800"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Category Card */}
        <div className="mt-3 z-10 rounded-2xl border border-amber-500/40 bg-amber-950/30 p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-400 bg-slate-950/60 border border-amber-500/30">
              <Layers className="w-3.5 h-3.5" /> Nemen & Bieden
            </span>
          </div>

          <h2 className="text-3xl font-black text-white mt-2 leading-tight">
            {currentCard.title}
          </h2>
          <p className="text-slate-200 text-sm mt-2 leading-relaxed">
            {currentCard.description}
          </p>

          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
            <span>Bied om de beurt. Roep <b>BEWIJS HET!</b> als je denkt dat de ander het niet kan!</span>
          </div>
        </div>

        {/* Current Highest Bid Display */}
        <div className="my-3 z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center shadow-xl">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
            Hoogste Bod Momenteel
          </div>
          {highestBidder ? (
            <div className="animate-bounce">
              <div className="text-4xl font-black text-amber-400">
                {highestBid} <span className="text-xl font-bold text-white">{currentCard.categoryName}</span>
              </div>
              <div className="text-sm font-bold text-slate-300 mt-1">
                door <span className="text-orange-400 underline decoration-amber-400 decoration-2">{highestBidder.name}</span>
              </div>
            </div>
          ) : (
            <div className="py-2 text-slate-500 text-sm font-medium italic">
              Nog geen bod geplaatst! Start bij 1.
            </div>
          )}
        </div>

        {/* Turn & Player Bidding Actions */}
        <div className="z-10 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-400">Aan de beurt om te bieden:</span>
            <span className="text-base font-black text-amber-300 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> {activePlayer.name}
            </span>
          </div>

          {/* Bidding buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => handlePlaceBid(1)}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-base"
            >
              +{1}
            </button>
            <button 
              onClick={() => handlePlaceBid(2)}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-base"
            >
              +2
            </button>
            <button 
              onClick={() => handlePlaceBid(3)}
              className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-base"
            >
              +3
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* PASS Button */}
            <button 
              onClick={handlePass}
              className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-red-400" /> PAS (Ik haak af)
            </button>

            {/* BEWIJS HET Button */}
            {highestBidderId && highestBidderId !== activePlayer.id ? (
              <button 
                onClick={handleChallengeCall}
                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black py-3.5 rounded-xl transition text-sm animate-pulse flex items-center justify-center gap-1 shadow-lg shadow-red-600/30"
              >
                <Zap className="w-4 h-4 fill-current" /> BEWIJS HET!
              </button>
            ) : (
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl py-3 text-center text-xs text-slate-500 flex items-center justify-center">
                Plaats een bod
              </div>
            )}
          </div>

          {/* Active / Passed Players Status */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Spelers in ronde:</span>
            <div className="flex gap-1.5">
              {players.map(p => {
                const isPassed = passedPlayerIds.includes(p.id);
                const isHighest = p.id === highestBidderId;
                const isActive = p.id === activePlayer.id;
                return (
                  <span 
                    key={p.id}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isPassed 
                        ? 'bg-slate-950 text-slate-600 line-through' 
                        : isHighest 
                        ? 'bg-amber-400 text-slate-950' 
                        : isActive 
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {p.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: TIMED CHALLENGE PHASE
  // ==========================================
  if (phase === 'TIMED_CHALLENGE') {
    const bidder = players.find(p => p.id === highestBidderId);
    const challenger = players.find(p => p.id === challengerId);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="text-center pt-4 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold mb-2">
            <Gavel className="w-4 h-4" />
            NOEM ZE HARDOP!
          </div>
          <h2 className="text-3xl font-black text-white">{currentCard.title}</h2>
          <p className="text-slate-300 text-sm mt-2">
            <span className="text-amber-400 font-extrabold">{bidder?.name}</span> moet nu hardop <span className="text-white font-black text-xl">{highestBid}</span> {currentCard.categoryName} noemen!
          </p>
          {challenger && (
            <p className="text-xs text-red-400 mt-1 font-semibold">
              (Uitgedaagd door {challenger.name})
            </p>
          )}
        </div>

        {/* Timer display */}
        <div className="my-auto text-center z-10">
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-48 h-48 rounded-full border-4 ${timeRemaining <= 5 ? 'border-red-500 animate-ping' : 'border-amber-500'} flex items-center justify-center bg-slate-900/90 shadow-2xl`}>
              <span className={`text-6xl font-black ${timeRemaining <= 5 ? 'text-red-500' : 'text-amber-400'}`}>
                {timeRemaining}s
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button 
              onClick={toggleTimer}
              className={`px-6 py-3 rounded-xl font-black text-sm transition flex items-center gap-2 ${
                isTimerRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
              }`}
            >
              <Clock className="w-5 h-5" />
              {isTimerRunning ? 'PAUZE' : 'START TIMER (15 SEC)'}
            </button>
          </div>
        </div>

        {/* Outcome Decision Buttons */}
        <div className="space-y-3 pb-6 z-10">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            Is het gelukt binnen de tijd?
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleChallengeOutcome(true)}
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black py-4 rounded-2xl shadow-lg transition flex flex-col items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>GELUKT!</span>
              <span className="text-[10px] font-normal opacity-80">
                {challenger ? `${challenger.name} drinkt ${highestBid} slokken` : `Veiling gewonnen!`}
              </span>
            </button>

            <button 
              onClick={() => handleChallengeOutcome(false)}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black py-4 rounded-2xl shadow-lg transition flex flex-col items-center justify-center gap-1"
            >
              <XCircle className="w-6 h-6" />
              <span>GEFAALD!</span>
              <span className="text-[10px] font-normal opacity-80">{bidder?.name} drinkt {highestBid * 2} slokken</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: RESOLUTION PHASE
  // ==========================================
  if (phase === 'RESOLUTION' && resolutionData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="pt-6 text-center z-10 space-y-2">
          <h2 className="text-3xl font-black text-amber-300 leading-tight">
            {resolutionData.headline}
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            {resolutionData.subtext}
          </p>
        </div>

        {/* Drinkers Summary Card */}
        <div className="my-auto z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">
            Slokken Verdeling
          </div>

          {resolutionData.drinkers.length > 0 ? (
            <div className="space-y-3">
              {resolutionData.drinkers.map((d, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-950 border border-amber-500/30 p-4 rounded-xl">
                  <div>
                    <div className="font-black text-lg text-white">{d.name}</div>
                    <div className="text-xs text-slate-400">{d.reason}</div>
                  </div>
                  <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5">
                    <Beer className="w-6 h-6 text-amber-400" />
                    <span>{d.sips} {d.sips === 1 ? 'Slok' : 'Slokken'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-400 text-sm">
              Niemand hoeft te drinken in deze ronde! Veilig!
            </div>
          )}
        </div>

        {/* Next round action */}
        <div className="pb-6 z-10 space-y-2">
          <button 
            onClick={nextCard}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
          >
            <span>VOLGENDE CATEGORIE</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: STATS / LEADERBOARD PHASE
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
      <div className="pt-4 text-center z-10 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
          <Trophy className="w-4 h-4" />
          SLOKKEN SCOREBORD
        </div>
        <h2 className="text-3xl font-black text-white">Eindstand & Statistieken</h2>
      </div>

      <div className="my-auto z-10 space-y-3">
        {/* Player Stats Ranked by Sips */}
        {[...players].sort((a, b) => b.sipsDrunk - a.sipsDrunk).map((p, idx) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full font-black text-sm flex items-center justify-center ${
                idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                #{idx + 1}
              </div>
              <div>
                <div className="font-bold text-white text-base">{p.name}</div>
                <div className="text-xs text-slate-400">
                  {p.bidsWon} veilingen gewonnen
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-amber-400 flex items-center gap-1 justify-end">
                <Beer className="w-5 h-5" /> {p.sipsDrunk}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Totaal Slokken</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-6 z-10 space-y-2">
        <button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 active:scale-95 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          NIEUW SPEL STARTEN
        </button>
      </div>
    </div>
  );
}
