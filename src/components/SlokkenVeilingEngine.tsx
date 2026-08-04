'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CATEGORIES, 
  VICTORY_DARES, 
  PENALTY_DARES, 
  WILDCARD_VICTORY_DARE, 
  WILDCARD_PENALTY_DARE, 
  WHEEL_SEGMENTS,
  NEVER_HAVE_I_EVER_QUESTIONS,
  GROUP_VOTE_QUESTIONS,
  DOUBLE_OR_NOTHING_CHALLENGES,
  CategoryChallenge, 
  Dare,
  WheelSegment,
  NeverHaveIEverCard,
  GroupVoteCard,
  DoubleOrNothingChallenge
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
  CheckCircle2, 
  XCircle, 
  Beer, 
  Clock, 
  ChevronRight,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  Crown,
  Disc,
  Shield,
  PlusCircle,
  Sparkle,
  ShieldCheck,
  FlameKindling,
  Gem,
  Bomb,
  Users,
  Scroll,
  Siren,
  Plus,
  Trash2
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  sipsDrunk: number;
  bidsWon: number;
  challengesFailed: number;
  totalPasses: number;
  highestBidPlaced: number;
}

type GamePhase = 'SETUP' | 'BIDDING' | 'TIMED_CHALLENGE' | 'WHEEL_BONUS' | 'HORSE_RACE' | 'CUSTOM_CATEGORY_CREATOR' | 'NEVER_HAVE_I_EVER' | 'GROUP_VOTE' | 'SLOK_BOM' | 'RESOLUTION' | 'STATS';

interface Horse {
  id: number;
  name: string;
  color: string;
  bgClass: string;
  progress: number;
}

const WHEEL_COLORS = [
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#ef4444',
  '#10b981',
  '#3b82f6',
];

export default function SlokkenVeilingEngine() {
  // Game Configuration & Players
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Jeremy', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0, totalPasses: 0, highestBidPlaced: 0 },
    { id: '2', name: 'Lars', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0, totalPasses: 0, highestBidPlaced: 0 },
    { id: '3', name: 'Bram', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0, totalPasses: 0, highestBidPlaced: 0 },
    { id: '4', name: 'Sanne', sipsDrunk: 0, bidsWon: 0, challengesFailed: 0, totalPasses: 0, highestBidPlaced: 0 },
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerSpeed, setTimerSpeed] = useState<number>(15);
  
  // Active Game State
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [deck, setDeck] = useState<CategoryChallenge[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDoubleBidsActive, setIsDoubleBidsActive] = useState(false);
  const [activeRules, setActiveRules] = useState<string[]>([]);
  const [newRuleInput, setNewRuleInput] = useState('');
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSnitchModal, setShowSnitchModal] = useState(false);
  const [isAllInBid, setIsAllInBid] = useState(false);
  
  // Round Bidding State
  const [highestBidderId, setHighestBidderId] = useState<string | null>(null);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [passedPlayerIds, setPassedPlayerIds] = useState<string[]>([]);
  const [challengerId, setChallengerId] = useState<string | null>(null);

  // Group Vote State
  const [currentVoteCard, setCurrentVoteCard] = useState<GroupVoteCard | null>(null);

  // Slok-Bom State
  const [bombHolderIndex, setBombHolderIndex] = useState(0);
  const [bombTimer, setBombTimer] = useState<number>(15);
  const [isBombExploded, setIsBombExploded] = useState(false);
  const bombIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Never Have I Ever State
  const [nhieIndex, setNhieIndex] = useState(0);
  const [nhieQuestions, setNhieQuestions] = useState<NeverHaveIEverCard[]>([]);

  // Double or Nothing State
  const [activeDonTask, setActiveDonTask] = useState<DoubleOrNothingChallenge | null>(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [isDoubleRewarded, setIsDoubleRewarded] = useState(false);

  // Wheel of Fortune State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedWheelSegment, setSelectedWheelSegment] = useState<WheelSegment | null>(null);

  // Horse Race Minigame State
  const [horses, setHorses] = useState<Horse[]>([
    { id: 1, name: '⚡ Donderflits', color: 'text-amber-400', bgClass: 'bg-amber-500', progress: 0 },
    { id: 2, name: '🔥 Vuurpijl', color: 'text-orange-400', bgClass: 'bg-orange-500', progress: 0 },
    { id: 3, name: '💨 Schaduw', color: 'text-purple-400', bgClass: 'bg-purple-500', progress: 0 },
    { id: 4, name: '🍀 Geluksvogel', color: 'text-emerald-400', bgClass: 'bg-emerald-500', progress: 0 },
  ]);
  const [raceRunning, setRaceRunning] = useState(false);
  const [winningHorse, setWinningHorse] = useState<Horse | null>(null);
  const raceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Custom Category Creator State
  const [customCatTitle, setCustomCatTitle] = useState('');
  const [customCatDesc, setCustomCatDesc] = useState('');

  // Quizmaster 60s Timer State
  const [quizmasterTimer, setQuizmasterTimer] = useState<number>(60);
  const [isQuizmasterRunning, setIsQuizmasterRunning] = useState<boolean>(false);
  const qmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer State
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Active Dare State
  const [activeDare, setActiveDare] = useState<Dare | null>(null);

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

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // Ignore
      }
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    triggerHaptic();
  };

  const triggerProostCheers = () => {
    sounds.playSuccess();
    confetti({ particleCount: 80, spread: 60 });
    triggerHaptic();
  };

  const addActiveRule = () => {
    if (!newRuleInput.trim()) return;
    setActiveRules(prev => [...prev, newRuleInput.trim()]);
    setNewRuleInput('');
    sounds.playBid();
  };

  const removeActiveRule = (idx: number) => {
    setActiveRules(prev => prev.filter((_, i) => i !== idx));
    sounds.playPass();
  };

  const penalizeSnitchTarget = (playerId: string) => {
    sounds.playFail();
    triggerHaptic();
    updateSips([playerId], 1);
    setShowSnitchModal(false);
    alert(`🚨 SLOKKE-POLITIE: ${players.find(p => p.id === playerId)?.name} heeft een regel gebroken & neemt 1 strafslok!`);
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
      totalPasses: 0,
      highestBidPlaced: 0,
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
    const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentCardIndex(0);
    setActiveRules([]);
    startRound(shuffled[0], 0);
    sounds.playGavel();
    triggerHaptic();
  };

  // Start a new Bidding Round or trigger special event automatically!
  const startRound = (card: CategoryChallenge, roundIndex: number) => {
    if (card.isSpecialEvent) {
      if (card.isSpecialEvent === 'HORSE_RACE') triggerHorseRace();
      else if (card.isSpecialEvent === 'WHEEL_BONUS') triggerWheelBonus();
      else if (card.isSpecialEvent === 'NEVER_HAVE_I_EVER') startNeverHaveIEver();
      else if (card.isSpecialEvent === 'GROUP_VOTE') startGroupVote();
      else if (card.isSpecialEvent === 'SLOK_BOM') startSlokBom();
      return;
    }

    setPhase('BIDDING');
    setHighestBidderId(null);
    setHighestBid(0);
    setPassedPlayerIds([]);
    setChallengerId(null);
    setActiveDare(null);
    setActiveDonTask(null);
    setIsRedeemed(false);
    setIsDoubleRewarded(false);
    setIsAllInBid(false);
    
    const startingPlayerIdx = roundIndex % players.length;
    setActivePlayerIndex(startingPlayerIdx);
  };

  const currentCard = deck[currentCardIndex] || CATEGORIES[0];
  const activePlayer = players[activePlayerIndex] || players[0];

  const getNextActivePlayerIndex = (currentIdx: number, passedIds: string[]): number => {
    let nextIdx = (currentIdx + 1) % players.length;
    let attempts = 0;
    while (passedIds.includes(players[nextIdx].id) && attempts < players.length) {
      nextIdx = (nextIdx + 1) % players.length;
      attempts++;
    }
    return nextIdx;
  };

  const handlePlaceBid = (amount: number, isAllIn: boolean = false) => {
    const newBid = highestBid + amount;

    sounds.playBid();
    triggerHaptic();
    
    if (isAllIn) {
      setIsAllInBid(true);
      sounds.playChallenge();
    }

    setHighestBid(newBid);
    setHighestBidderId(activePlayer.id);

    setPlayers(prev => prev.map(p => p.id === activePlayer.id ? { ...p, highestBidPlaced: Math.max(p.highestBidPlaced, newBid) } : p));

    const remainingActive = players.filter(p => !passedPlayerIds.includes(p.id));
    if (remainingActive.length === 1) {
      finishBiddingRound(activePlayer.id, newBid);
    } else {
      const nextIdx = getNextActivePlayerIndex(activePlayerIndex, passedPlayerIds);
      setActivePlayerIndex(nextIdx);
    }
  };

  const handlePass = () => {
    sounds.playPass();
    triggerHaptic();

    setPlayers(prev => prev.map(p => p.id === activePlayer.id ? { ...p, totalPasses: p.totalPasses + 1 } : p));

    const newPassed = [...passedPlayerIds, activePlayer.id];
    setPassedPlayerIds(newPassed);

    const remainingActive = players.filter(p => !newPassed.includes(p.id));

    if (remainingActive.length === 0) {
      if (!highestBidderId) {
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
        finishBiddingRound(highestBidderId, highestBid);
      }
    } else if (remainingActive.length === 1 && highestBidderId === remainingActive[0].id) {
      finishBiddingRound(highestBidderId, highestBid);
    } else {
      const nextIdx = getNextActivePlayerIndex(activePlayerIndex, newPassed);
      setActivePlayerIndex(nextIdx);
    }
  };

  const handleChallengeCall = () => {
    if (!highestBidderId) return;
    sounds.playChallenge();
    triggerHaptic();

    setChallengerId(activePlayer.id);
    setPhase('TIMED_CHALLENGE');
    setTimeRemaining(timerSpeed);
    setIsTimerRunning(false);
  };

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

  // Quizmaster 60s Timer Logic
  useEffect(() => {
    if (isQuizmasterRunning && quizmasterTimer > 0) {
      qmIntervalRef.current = setInterval(() => {
        setQuizmasterTimer(prev => {
          if (prev <= 1) {
            clearInterval(qmIntervalRef.current as NodeJS.Timeout);
            setIsQuizmasterRunning(false);
            sounds.playGavel();
            return 0;
          }
          sounds.playTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      if (qmIntervalRef.current) clearInterval(qmIntervalRef.current);
    }

    return () => {
      if (qmIntervalRef.current) clearInterval(qmIntervalRef.current);
    };
  }, [isQuizmasterRunning, quizmasterTimer]);

  const toggleQuizmasterTimer = () => {
    if (quizmasterTimer === 0) setQuizmasterTimer(60);
    setIsQuizmasterRunning(!isQuizmasterRunning);
    sounds.playBid();
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    sounds.playBid();
  };

  // Draw Double or Nothing Challenge
  const startDoubleOrNothing = () => {
    const randomTask = DOUBLE_OR_NOTHING_CHALLENGES[Math.floor(Math.random() * DOUBLE_OR_NOTHING_CHALLENGES.length)];
    setActiveDonTask(randomTask);
    sounds.playChallenge();
  };

  const handleDonOutcome = (success: boolean) => {
    const bidder = players.find(p => p.id === highestBidderId);
    if (!bidder) return;

    setIsDoubleRewarded(true);
    if (success) {
      sounds.playSuccess();
      confetti({ particleCount: 140, spread: 80 });
      setResolutionData(prev => prev ? {
        ...prev,
        headline: `💎 DUBBELE BELONING GEPAKT BY ${bidder.name.toUpperCase()}!`,
        subtext: `Challenge voltooid! Je mag direct 4 BONUS SLOKKEN naar keuze uitdelen rond het vuur!`,
      } : null);
    } else {
      sounds.playFail();
      updateSips([bidder.id], 2);
      setResolutionData(prev => prev ? {
        ...prev,
        headline: `❌ DUBBEL OF NIETS GEFAALD!`,
        subtext: `Challenge gefaald! ${bidder.name} neemt 2 extra strafslokken!`,
        drinkers: [{ name: bidder.name, sips: 2, reason: "Gefaald in Dubbel of Niets challenge" }]
      } : null);
    }
  };

  // Group Vote Start
  const startGroupVote = () => {
    const randomQuestion = GROUP_VOTE_QUESTIONS[Math.floor(Math.random() * GROUP_VOTE_QUESTIONS.length)];
    setCurrentVoteCard(randomQuestion);
    setPhase('GROUP_VOTE');
    sounds.playGavel();
    confetti({ particleCount: 90, spread: 70 });
  };

  // Slok-Bom Start (Hot Potato)
  const startSlokBom = () => {
    const randomSeconds = Math.floor(Math.random() * 16) + 12;
    setBombTimer(randomSeconds);
    setBombHolderIndex(0);
    setIsBombExploded(false);
    setPhase('SLOK_BOM');
    sounds.playChallenge();

    bombIntervalRef.current = setInterval(() => {
      setBombTimer(prev => {
        sounds.playTick();
        if (prev <= 1) {
          clearInterval(bombIntervalRef.current as NodeJS.Timeout);
          setIsBombExploded(true);
          sounds.playFail();
          confetti({ particleCount: 150, spread: 90 });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const passBombNextPlayer = () => {
    if (isBombExploded) return;
    sounds.playBid();
    triggerHaptic();
    setBombHolderIndex((bombHolderIndex + 1) % players.length);
  };

  // Draw random dare with 10% WILDCARD chance
  const drawDare = (type: 'VICTORY' | 'PENALTY' | 'WILDCARD') => {
    const isWildcardRoll = Math.random() < 0.10;
    
    if (type === 'VICTORY') {
      if (isWildcardRoll) {
        setActiveDare(WILDCARD_VICTORY_DARE);
        sounds.playChallenge();
      } else {
        const randomDare = VICTORY_DARES[Math.floor(Math.random() * VICTORY_DARES.length)];
        setActiveDare(randomDare);
        sounds.playBid();
      }
    } else {
      if (isWildcardRoll) {
        setActiveDare(WILDCARD_PENALTY_DARE);
        sounds.playChallenge();
      } else {
        const randomDare = PENALTY_DARES[Math.floor(Math.random() * PENALTY_DARES.length)];
        setActiveDare(randomDare);
        sounds.playBid();
      }
    }
  };

  // Redeem Yourself Mechanic (Loss Recovery)
  const handleRedeemSelf = () => {
    const bidder = players.find(p => p.id === highestBidderId);
    if (!bidder || isRedeemed) return;

    sounds.playSuccess();
    confetti({ particleCount: 100, spread: 70 });
    setIsRedeemed(true);

    setResolutionData(prev => prev ? {
      ...prev,
      headline: `🔥 ${bidder.name} HEEFT ZICHZELF HERSTELD!`,
      subtext: `Opdracht met succes voltooid! De slokken-straf is geannuleerd!`,
      drinkers: []
    } : null);
  };

  // Trigger Never Have I Ever mode
  const startNeverHaveIEver = () => {
    const shuffledNHIE = [...NEVER_HAVE_I_EVER_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setNhieQuestions(shuffledNHIE);
    setNhieIndex(0);
    setPhase('NEVER_HAVE_I_EVER');
    sounds.playGavel();
    confetti({ particleCount: 80, spread: 60 });
  };

  // Handle Challenge Result
  const handleChallengeOutcome = (success: boolean) => {
    const bidder = players.find(p => p.id === highestBidderId);
    const challenger = players.find(p => p.id === challengerId);

    if (!bidder) return;

    const isWildcardRoll = Math.random() < 0.10;
    let sipsMultiplier = isDoubleBidsActive ? 2 : isAllInBid ? 3 : 1;

    if (success) {
      if (isWildcardRoll) {
        setActiveDare(WILDCARD_VICTORY_DARE);
        sounds.playChallenge();
      } else {
        const randomVictoryDare = VICTORY_DARES[Math.floor(Math.random() * VICTORY_DARES.length)];
        setActiveDare(randomVictoryDare);
        sounds.playSuccess();
      }

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      
      const sipsToDrink = highestBid * sipsMultiplier;
      setResolutionData({
        headline: isAllInBid ? `🔥 ALL-IN BLUF BEWEZEN BY ${bidder.name.toUpperCase()}!` : `🔥 ${bidder.name} HEEFT HET BEWEZEN!`,
        subtext: `${bidder.name} noemde ruim ${highestBid} ${currentCard.categoryName} binnen de tijd!`,
        actionDetails: challenger ? `${challenger.name} dacht dat je het niet kon en verliest!` : `Klasse prestatie!`,
        drinkers: challenger ? [{ name: challenger.name, sips: sipsToDrink, reason: `Verkeerd uitgedaagd (${sipsToDrink} slokken)` }] : []
      });
      if (challenger) updateSips([challenger.id], sipsToDrink);
      updateBidsWon(bidder.id);
    } else {
      if (isWildcardRoll) {
        setActiveDare(WILDCARD_PENALTY_DARE);
        sounds.playChallenge();
      } else {
        const randomPenaltyDare = PENALTY_DARES[Math.floor(Math.random() * PENALTY_DARES.length)];
        setActiveDare(randomPenaltyDare);
        sounds.playFail();
      }

      const sipsToDrink = highestBid * 2 * sipsMultiplier;
      setResolutionData({
        headline: isAllInBid ? `💥 ALL-IN BLUF KEIHARD GEFAALD!` : `❌ ${bidder.name} HEEFT GEFAALD!`,
        subtext: `${bidder.name} haalde de ${highestBid} ${currentCard.categoryName} NIET binnen de tijd!`,
        actionDetails: `Gefaald! Boete: Dubbele slokken!`,
        drinkers: [{ name: bidder.name, sips: sipsToDrink, reason: `Gefaald in bod (${sipsToDrink} slokken)` }]
      });
      updateSips([bidder.id], sipsToDrink);
      updateChallengesFailed(bidder.id);
    }

    setIsDoubleBidsActive(false);
    setIsAllInBid(false);
    setPhase('RESOLUTION');
  };

  const finishBiddingRound = (winnerId: string, bidAmount: number) => {
    setChallengerId(null);
    setPhase('TIMED_CHALLENGE');
    setTimeRemaining(timerSpeed);
    setIsTimerRunning(false);
  };

  // Trigger Wheel of Fortune
  const triggerWheelBonus = () => {
    setPhase('WHEEL_BONUS');
    setSelectedWheelSegment(null);
    setIsSpinning(false);
    sounds.playGavel();
  };

  // Spin Wheel of Fortune
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sounds.playBid();

    const selectedIdx = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const targetSegment = WHEEL_SEGMENTS[selectedIdx];

    const sliceAngle = 360 / WHEEL_SEGMENTS.length;
    const targetAngle = 360 - (selectedIdx * sliceAngle) - (sliceAngle / 2);
    const extraSpins = 5 * 360;
    const finalRotation = wheelRotation + extraSpins + (targetAngle - (wheelRotation % 360));

    setWheelRotation(finalRotation);

    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sounds.playWheelTick();
      tickCount++;
      if (tickCount >= 15) clearInterval(tickInterval);
    }, 150);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedWheelSegment(targetSegment);
      confetti({ particleCount: 100, spread: 70 });
      sounds.playSuccess();

      if (targetSegment.id === 'wheel-1') {
        const others = players.filter(p => p.id !== activePlayer.id).map(p => p.id);
        updateSips(others, 2);
      } else if (targetSegment.id === 'wheel-3') {
        setIsDoubleBidsActive(true);
      } else if (targetSegment.id === 'wheel-6') {
        const sorted = [...players].sort((a, b) => a.sipsDrunk - b.sipsDrunk);
        const maxDrinker = sorted[sorted.length - 1];
        if (maxDrinker) updateSips([maxDrinker.id], 2);
      }
    }, 3000);
  };

  // Trigger Horse Race Minigame
  const triggerHorseRace = () => {
    setPhase('HORSE_RACE');
    setWinningHorse(null);
    setRaceRunning(false);
    setHorses(prev => prev.map(h => ({ ...h, progress: 0 })));
    sounds.playGavel();
  };

  // Start Animated Horse Race
  const startHorseRace = () => {
    if (raceRunning) return;
    setRaceRunning(true);
    setWinningHorse(null);
    sounds.playBid();

    raceIntervalRef.current = setInterval(() => {
      setHorses(prev => {
        let hasWinner = false;
        let victor: Horse | null = null;

        const updated = prev.map(h => {
          if (h.progress >= 100) {
            hasWinner = true;
            victor = h;
            return h;
          }
          const increment = Math.floor(Math.random() * 12) + 3;
          const newProgress = Math.min(100, h.progress + increment);
          if (newProgress >= 100 && !victor) {
            hasWinner = true;
            victor = { ...h, progress: 100 };
          }
          return { ...h, progress: newProgress };
        });

        sounds.playWheelTick();

        if (hasWinner && victor) {
          clearInterval(raceIntervalRef.current as NodeJS.Timeout);
          setRaceRunning(false);
          setWinningHorse(victor);
          sounds.playSuccess();
          confetti({ particleCount: 150, spread: 80 });
        }

        return updated;
      });
    }, 250);
  };

  // Save Custom Category Card
  const saveCustomCategory = () => {
    if (!customCatTitle.trim() || !customCatDesc.trim()) {
      alert("Vul zowel een titel als een beschrijving in!");
      return;
    }

    const newCatCard: CategoryChallenge = {
      id: `custom-${Date.now()}`,
      title: `✨ ${customCatTitle.trim()}`,
      categoryName: customCatTitle.trim().toLowerCase(),
      description: customCatDesc.trim(),
      defaultTimeSeconds: timerSpeed
    };

    const newDeck = [...deck];
    newDeck.splice(currentCardIndex + 1, 0, newCatCard);
    setDeck(newDeck);

    setCustomCatTitle('');
    setCustomCatDesc('');
    confetti({ particleCount: 90, spread: 60 });
    sounds.playSuccess();

    alert("✨ Eigen categorie toegevoegd! Hij verschijnt nu direct als volgende kaart!");
    setPhase('BIDDING');
  };

  const updateSips = (playerIds: string[], amount: number) => {
    setPlayers(prev => prev.map(p => playerIds.includes(p.id) ? { ...p, sipsDrunk: p.sipsDrunk + amount } : p));
  };

  const updateBidsWon = (playerId: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, bidsWon: p.bidsWon + 1 } : p));
  };

  const updateChallengesFailed = (playerId: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, challengesFailed: p.challengesFailed + 1 } : p));
  };

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

  const getAwards = () => {
    const sortedBySips = [...players].sort((a, b) => b.sipsDrunk - a.sipsDrunk);
    const sortedByBids = [...players].sort((a, b) => b.bidsWon - a.bidsWon);
    const sortedByHighBid = [...players].sort((a, b) => b.highestBidPlaced - a.highestBidPlaced);
    const sortedByPasses = [...players].sort((a, b) => b.totalPasses - a.totalPasses);

    return {
      sipsKing: sortedBySips[0],
      auctionMaster: sortedByBids[0],
      boldBluffer: sortedByHighBid[0],
      safeFolder: sortedByPasses[0]
    };
  };

  // ==========================================
  // RENDER: SETUP PHASE
  // ==========================================
  if (phase === 'SETUP') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-2">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>Kampvuur Drankspel</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            DE SLOKKEN VEILING
          </h1>
          <p className="text-slate-400 text-xs mt-1">Bied hoeveel jij kunt noemen, pak de winst & speel minigames!</p>
        </div>

        <div className="my-auto space-y-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl z-10">
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

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
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

          <div className="border-t border-slate-800 pt-3 space-y-2">
            <label className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>⏱️ Timer Snelheid:</span>
              <span className="text-amber-400 font-extrabold">{timerSpeed} sec</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setTimerSpeed(10)}
                className={`py-2 rounded-xl text-xs font-black border transition ${
                  timerSpeed === 10 ? 'bg-red-600 text-white border-red-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                ⚡ Turbo (10s)
              </button>
              <button 
                onClick={() => setTimerSpeed(15)}
                className={`py-2 rounded-xl text-xs font-black border transition ${
                  timerSpeed === 15 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                ⏱️ Normaal (15s)
              </button>
              <button 
                onClick={() => setTimerSpeed(20)}
                className={`py-2 rounded-xl text-xs font-black border transition ${
                  timerSpeed === 20 ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                🏖️ Relaxed (20s)
              </button>
            </div>
          </div>
        </div>

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
  // RENDER: CLEAN BIDDING PHASE WITH ALL-IN BLUF, RULES BANNER & SNITCH BUTTON
  // ==========================================
  if (phase === 'BIDDING') {
    const highestBidder = players.find(p => p.id === highestBidderId);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="flex items-center justify-between z-10 pt-2 border-b border-slate-900 pb-2 gap-1">
          <span className="text-xs font-bold text-slate-400">
            Ronde {currentCardIndex + 1} / {deck.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={triggerProostCheers}
              className="px-2 py-1 bg-amber-500 text-slate-950 rounded-lg font-black text-[11px] flex items-center gap-1 active:scale-95 shadow"
              title="Proost!"
            >
              🍻 PROOST!
            </button>
            <button 
              onClick={() => setShowSnitchModal(true)}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-black text-[11px] flex items-center gap-1 active:scale-95 shadow animate-pulse"
              title="Meld Regelovertreding!"
            >
              <Siren className="w-3.5 h-3.5" /> VERKLIKKER!
            </button>
            <button 
              onClick={() => setPhase('CUSTOM_CATEGORY_CREATOR')}
              className="p-1.5 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800 text-[11px] font-bold"
              title="Categorie Toevoegen"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPhase('STATS')} 
              className="p-1.5 bg-slate-900 text-amber-400 rounded-lg border border-slate-800"
              title="Scorebord"
            >
              <Trophy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ACTIVE RULES BANNER */}
        <div className="mt-2 z-10 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pr-1">
            <Scroll className="w-4 h-4 text-amber-400 flex-shrink-0" />
            {activeRules.length > 0 ? (
              <span className="font-bold text-amber-300 truncate">
                📜 {activeRules[activeRules.length - 1]}
              </span>
            ) : (
              <span className="text-slate-500 italic">Geen actieve kampvuur regels</span>
            )}
          </div>
          <button 
            onClick={() => setShowRuleModal(true)}
            className="px-2 py-1 bg-slate-800 text-amber-400 hover:bg-slate-700 font-bold rounded-lg text-[10px] flex items-center gap-1 flex-shrink-0 ml-1"
          >
            <Plus className="w-3 h-3" /> Regel ({activeRules.length})
          </button>
        </div>

        {isDoubleBidsActive && (
          <div className="z-10 mt-1.5 bg-purple-600/30 border border-purple-500/50 rounded-xl py-1.5 px-3 text-center text-xs font-black text-purple-300 animate-bounce">
            ⚡ DUBBELE INZET ACTIEF VANUIT HET RAD!
          </div>
        )}

        <div className="mt-2.5 z-10 rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-400 bg-slate-950/60 border border-amber-500/30">
              <Layers className="w-3 h-3" /> Nemen & Bieden
            </span>
          </div>

          <h2 className="text-2.5xl font-black text-white mt-1 leading-tight">
            {currentCard.title}
          </h2>
          <p className="text-slate-200 text-xs mt-1.5 leading-relaxed">
            {currentCard.description}
          </p>
        </div>

        <div className="my-2 z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center shadow-xl">
          <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
            Hoogste Bod Momenteel
          </div>
          {highestBidder ? (
            <div className="animate-bounce">
              <div className="text-3.5xl font-black text-amber-400">
                {highestBid} <span className="text-lg font-bold text-white">{currentCard.categoryName}</span>
              </div>
              <div className="text-xs font-bold text-slate-300 mt-0.5">
                door <span className="text-orange-400 underline decoration-amber-400 decoration-2">{highestBidder.name}</span>
                {isAllInBid && <span className="ml-2 text-red-500 font-black text-xs uppercase animate-ping">🔥 ALL-IN!</span>}
              </div>
            </div>
          ) : (
            <div className="py-1 text-slate-500 text-xs font-medium italic">
              Nog geen bod geplaatst! Start bij 1.
            </div>
          )}
        </div>

        <div className="z-10 bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="text-xs font-bold text-slate-400">Bieder:</span>
            <span className="text-sm font-black text-amber-300 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> {activePlayer.name}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <button 
              onClick={() => handlePlaceBid(1)}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-sm"
            >
              +1
            </button>
            <button 
              onClick={() => handlePlaceBid(2)}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-sm"
            >
              +2
            </button>
            <button 
              onClick={() => handlePlaceBid(3)}
              className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black py-3 rounded-xl transition text-center shadow-md text-sm"
            >
              +3
            </button>
            <button 
              onClick={() => handlePlaceBid(5, true)}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 text-white font-black py-2.5 rounded-xl transition text-center shadow-md text-xs border border-red-400/50 flex flex-col items-center justify-center"
              title="3x Slokken Risico!"
            >
              <span>+5</span>
              <span className="text-[8px] text-red-200 uppercase font-black">ALL-IN</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button 
              onClick={handlePass}
              className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-red-400" /> PAS (Afhaken)
            </button>

            {highestBidderId && highestBidderId !== activePlayer.id ? (
              <button 
                onClick={handleChallengeCall}
                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black py-3 rounded-xl transition text-xs animate-pulse flex items-center justify-center gap-1 shadow-lg shadow-red-600/30"
              >
                <Zap className="w-4 h-4 fill-current" /> BEWIJS HET!
              </button>
            ) : (
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl py-3 text-center text-xs text-slate-500 flex items-center justify-center">
                Plaats een bod
              </div>
            )}
          </div>

          <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Spelers in ronde:</span>
            <div className="flex gap-1">
              {players.map(p => {
                const isPassed = passedPlayerIds.includes(p.id);
                const isHighest = p.id === highestBidderId;
                const isActive = p.id === activePlayer.id;
                return (
                  <span 
                    key={p.id}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
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

        {/* RULE MODAL POPUP */}
        {showRuleModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl w-full max-w-xs space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-amber-300 text-base flex items-center gap-1.5">
                  <Scroll className="w-4 h-4" /> Kampvuur Regels
                </h3>
                <button onClick={() => setShowRuleModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  placeholder="Bijv. Alleen drinken met links..."
                  value={newRuleInput}
                  onChange={(e) => setNewRuleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addActiveRule()}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button onClick={addActiveRule} className="bg-amber-500 text-slate-950 font-black px-3 rounded-xl text-xs">+</button>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {activeRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs">
                    <span className="text-amber-200">{rule}</span>
                    <button onClick={() => removeActiveRule(idx)} className="text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowRuleModal(false)} className="w-full bg-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs">
                KLAAR
              </button>
            </div>
          </div>
        )}

        {/* SNITCH (VERKLIKKER) MODAL POPUP */}
        {showSnitchModal && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-red-500/50 p-5 rounded-2xl w-full max-w-xs space-y-3 shadow-2xl text-center">
              <Siren className="w-8 h-8 text-red-500 mx-auto animate-bounce" />
              <h3 className="font-black text-white text-lg">🚨 REGELOVERTREDING!</h3>
              <p className="text-xs text-slate-300">Wie heeft een kampvuur-regel of afspraak gebroken?</p>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pt-1">
                {players.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => penalizeSnitchTarget(p.id)}
                    className="w-full bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500 p-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-between"
                  >
                    <span>{p.name}</span>
                    <span className="text-red-400 font-extrabold">+1 STRAFSLOK</span>
                  </button>
                ))}
              </div>

              <button onClick={() => setShowSnitchModal(false)} className="w-full bg-slate-800 text-slate-400 font-bold py-2 rounded-xl text-xs">
                Annuleren
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: BEAUTIFUL SVG WHEEL OF FORTUNE
  // ==========================================
  if (phase === 'WHEEL_BONUS') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-400 text-xs font-bold mb-1 animate-pulse">
            <Disc className="w-4 h-4" />
            VERRASSINGS-RONDE
          </div>
          <h2 className="text-3xl font-black text-amber-300">HET RAD VAN SLOKKEN</h2>
          <p className="text-slate-300 text-xs mt-1">Draai voor willekeurige groeps-events & cadeaus!</p>
        </div>

        <div className="my-auto z-10 text-center relative flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 flex items-center justify-center drop-shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-lg" />
            </div>

            <div 
              className="w-full h-full rounded-full transition-transform duration-[3000ms] ease-out shadow-2xl border-4 border-amber-400/80 overflow-hidden"
              style={{ transform: `rotate(${wheelRotation}deg)` }}
            >
              <svg viewBox="0 0 240 240" className="w-full h-full">
                {WHEEL_SEGMENTS.map((seg, idx) => {
                  const sliceAngle = 360 / WHEEL_SEGMENTS.length;
                  const startAngle = (idx * sliceAngle) * (Math.PI / 180);
                  const endAngle = ((idx + 1) * sliceAngle) * (Math.PI / 180);
                  const midAngle = ((idx + 0.5) * sliceAngle) * (Math.PI / 180);

                  const x1 = 120 + 120 * Math.cos(startAngle);
                  const y1 = 120 + 120 * Math.sin(startAngle);
                  const x2 = 120 + 120 * Math.cos(endAngle);
                  const y2 = 120 + 120 * Math.sin(endAngle);

                  const textX = 120 + 72 * Math.cos(midAngle);
                  const textY = 120 + 72 * Math.sin(midAngle);

                  const pathData = `M 120 120 L ${x1} ${y1} A 120 120 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <g key={seg.id}>
                      <path d={pathData} fill={WHEEL_COLORS[idx % WHEEL_COLORS.length]} stroke="#020617" strokeWidth="2" />
                      <g transform={`translate(${textX}, ${textY}) rotate(${(idx + 0.5) * sliceAngle + 90})`}>
                        <text 
                          x="0" 
                          y="0" 
                          fill="#ffffff" 
                          fontSize="10" 
                          fontWeight="900" 
                          textAnchor="middle" 
                          dominantBaseline="middle"
                          style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.9)' }}
                        >
                          {seg.icon} {seg.title}
                        </text>
                      </g>
                    </g>
                  );
                })}
                <circle cx="120" cy="120" r="22" fill="#020617" stroke="#f59e0b" strokeWidth="4" />
                <circle cx="120" cy="120" r="10" fill="#f59e0b" />
              </svg>
            </div>
          </div>

          <button 
            onClick={spinWheel}
            disabled={isSpinning}
            className={`mt-6 px-8 py-4 rounded-2xl font-black text-lg transition active:scale-95 shadow-xl ${
              isSpinning 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-amber-500 text-slate-950 hover:from-purple-600 hover:to-amber-600'
            }`}
          >
            {isSpinning ? 'BEZIG MET DRAAIEN...' : '🎲 DRAAI HET RAD!'}
          </button>
        </div>

        {selectedWheelSegment ? (
          <div className="mb-6 z-10 bg-slate-900 border border-amber-500/50 p-4 rounded-2xl text-center space-y-2 shadow-2xl animate-fade-in">
            <div className="text-2xl font-black text-amber-300">
              {selectedWheelSegment.icon} {selectedWheelSegment.title}
            </div>
            <p className="text-xs text-slate-200 font-medium">
              {selectedWheelSegment.description}
            </p>
            <button 
              onClick={nextCard}
              className="mt-2 w-full bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-sm"
            >
              SPEL HERVATTEN
            </button>
          </div>
        ) : (
          <div className="pb-6 z-10 text-center text-xs text-slate-500">
            Druk op de knop om het rad te laten spinnen!
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: GROUP VOTE
  // ==========================================
  if (phase === 'GROUP_VOTE' && currentVoteCard) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-400 text-xs font-bold mb-1">
            <Users className="w-4 h-4" /> VERRASSINGS-EVENT: GROEPS-STEMMING
          </div>
          <h2 className="text-3xl font-black text-amber-300">STEM OP DE SJAAK!</h2>
        </div>

        <div className="my-auto z-10 bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
          <div className="text-2xl font-black text-white leading-relaxed">
            &quot;{currentVoteCard.question}&quot;
          </div>
          <div className="text-sm font-bold text-amber-400 animate-pulse">
            Iedereen telt af: 3... 2... 1... Wijs TEGELIJK iemand aan!
          </div>
          <p className="text-xs text-slate-300">
            De persoon met de meesste vingers op zich gericht drinkt <b>2 STRAFSLOKKEN!</b>
          </p>
        </div>

        <div className="pb-6 z-10">
          <button 
            onClick={nextCard}
            className="w-full bg-amber-500 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl active:scale-95"
          >
            STEMMING VOLTOOID → SPEL HERVATTEN
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: SLOK-BOM
  // ==========================================
  if (phase === 'SLOK_BOM') {
    const holder = players[bombHolderIndex] || players[0];

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-xs font-bold mb-1 animate-pulse">
            <Bomb className="w-4 h-4" /> VERRASSINGS-MINIGAME
          </div>
          <h2 className="text-3xl font-black text-red-400">DE TIKKENDE SLOK-BOM!</h2>
          <p className="text-slate-300 text-xs mt-1">Geef de telefoon rond het vuur & noem 1 item!</p>
        </div>

        <div className="my-auto text-center z-10 space-y-4">
          {!isBombExploded ? (
            <div className="bg-slate-900 border border-red-500/50 p-6 rounded-2xl space-y-3 shadow-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase">Telefoon vasthouder:</div>
              <div className="text-3xl font-black text-amber-400 animate-bounce">{holder.name}</div>
              <div className="text-5xl animate-pulse">💣</div>
              <p className="text-xs text-slate-300">
                Noem 1 item (bijv. biermerk/stad) en geef de telefoon DIRECT door!
              </p>
              <button 
                onClick={passBombNextPlayer}
                className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black py-4 rounded-xl text-base shadow-xl animate-pulse"
              >
                PAS TELEFOON DOOR AAN VOLGENDE SPELER! ⏩
              </button>
            </div>
          ) : (
            <div className="bg-red-950/80 border border-red-500 p-6 rounded-2xl space-y-3 shadow-2xl animate-bounce">
              <div className="text-5xl">💥 BOOM!</div>
              <h3 className="text-2xl font-black text-white">DE BOM IS ONTPLOFT!</h3>
              <div className="text-lg font-black text-amber-300">{holder.name} HOUDT DE BOM VAST!</div>
              <p className="text-xs text-slate-200">Neem direct <b>3 STRAFSLOKKEN!</b></p>
              <button 
                onClick={nextCard}
                className="w-full bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-sm mt-2"
              >
                SPEL HERVATTEN
              </button>
            </div>
          )}
        </div>

        <div className="pb-4 z-10 text-center text-xs text-slate-500">
          Tijd stopt op een willekeurig geheim moment!
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: NEVER HAVE I EVER MODE
  // ==========================================
  if (phase === 'NEVER_HAVE_I_EVER') {
    const currentNHIE = nhieQuestions[nhieIndex] || NEVER_HAVE_I_EVER_QUESTIONS[0];

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-400 text-xs font-bold mb-1">
            🍻 IK HEB NOG NOOIT... (Vraag {nhieIndex + 1} / {nhieQuestions.length})
          </div>
          <h2 className="text-3xl font-black text-amber-300">Kampvuur Biecht Ronde</h2>
        </div>

        <div className="my-auto z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
          <div className="text-2xl font-black text-white leading-relaxed">
            &quot;{currentNHIE.statement}&quot;
          </div>
          <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
            🍻 ALLES WAAR IS? DRINK AANWEZIG 1 FLINKE SLOK!
          </p>
        </div>

        <div className="pb-6 z-10 space-y-2">
          {nhieIndex < nhieQuestions.length - 1 ? (
            <button 
              onClick={() => {
                setNhieIndex(nhieIndex + 1);
                sounds.playBid();
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <span>VOLGENDE BIECHT VRAAG</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={nextCard}
              className="w-full bg-amber-500 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl active:scale-95"
            >
              VEILING HERVATTEN
            </button>
          )}
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
              {isTimerRunning ? 'PAUZE' : `START TIMER (${timerSpeed} SEC)`}
            </button>
          </div>
        </div>

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
                Winst + Belonings-opdracht!
              </span>
            </button>

            <button 
              onClick={() => handleChallengeOutcome(false)}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black py-4 rounded-2xl shadow-lg transition flex flex-col items-center justify-center gap-1"
            >
              <XCircle className="w-6 h-6" />
              <span>GEFAALD!</span>
              <span className="text-[10px] font-normal opacity-80">Slokken + Boete-opdracht!</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: HORSE RACE VISUAL MINIGAME
  // ==========================================
  if (phase === 'HORSE_RACE') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold mb-1">
            🐎 VISUELE MINIGAME
          </div>
          <h2 className="text-3xl font-black text-amber-300">DE KAMPVUUR PAARDENRACE</h2>
          <p className="text-slate-300 text-xs mt-1">Zet slokken in op een paard & start de race!</p>
        </div>

        <div className="my-auto z-10 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
            <span>START</span>
            <span>RACE BAAN</span>
            <span className="text-amber-400 flex items-center gap-1">FINISH</span>
          </div>

          <div className="space-y-4">
            {horses.map(horse => (
              <div key={horse.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className={horse.color}>{horse.name}</span>
                  <span className="text-slate-400">{horse.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-5 rounded-full overflow-hidden border border-slate-800 relative">
                  <div 
                    className={`h-full ${horse.bgClass} transition-all duration-300 rounded-full flex items-center justify-end pr-1 text-xs`}
                    style={{ width: `${Math.max(8, horse.progress)}%` }}
                  >
                    🐎
                  </div>
                </div>
              </div>
            ))}
          </div>

          {winningHorse && (
            <div className="mt-4 bg-amber-500/20 border border-amber-500 p-3 rounded-xl text-center animate-bounce">
              <div className="text-xs font-black uppercase text-amber-400">🏆 GEWONNEN DOOR</div>
              <div className="text-xl font-black text-white">{winningHorse.name}!</div>
              <div className="text-xs text-slate-300 mt-1">Iedereen die géén gok had op dit paard neemt 2 slokken!</div>
            </div>
          )}
        </div>

        <div className="pb-6 z-10 space-y-2">
          {!winningHorse ? (
            <button 
              onClick={startHorseRace}
              disabled={raceRunning}
              className={`w-full font-black text-lg py-4 rounded-2xl shadow-xl transition ${
                raceRunning 
                  ? 'bg-slate-800 text-slate-500' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-600 hover:to-orange-600 active:scale-95'
              }`}
            >
              {raceRunning ? 'RACE IS BEZIG...' : '🏁 START DE RACE!'}
            </button>
          ) : (
            <button 
              onClick={nextCard}
              className="w-full bg-amber-500 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl active:scale-95"
            >
              SPEL HERVATTEN
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: CUSTOM CATEGORY CREATOR
  // ==========================================
  if (phase === 'CUSTOM_CATEGORY_CREATOR') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="pt-4 text-center z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-bold mb-1">
            <PlusCircle className="w-4 h-4" />
            INSIDE-JOKE CREATOR
          </div>
          <h2 className="text-3xl font-black text-white">EIGEN CATEGORIE MAKEN</h2>
          <p className="text-slate-400 text-xs mt-1">Voeg een maffe inside-joke of categorie toe aan de stapel!</p>
        </div>

        <div className="my-auto z-10 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Titel van de categorie:</label>
            <input 
              type="text" 
              placeholder="Bijv. 🍺 Smoesjes van Jeremy"
              value={customCatTitle}
              onChange={(e) => setCustomCatTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Vraag & Uitleg:</label>
            <textarea 
              placeholder="Bijv. Hoeveel bekende uitspraken van Jeremy kun jij noemen in 15 seconden?"
              value={customCatDesc}
              onChange={(e) => setCustomCatDesc(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="pb-6 z-10 space-y-2">
          <button 
            onClick={saveCustomCategory}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-slate-950 font-black text-lg py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
          >
            <Sparkle className="w-5 h-5 fill-current" />
            CATEGORIE TOEVOEGEN AAN SPEL
          </button>
          <button 
            onClick={() => setPhase('BIDDING')}
            className="w-full bg-slate-900 text-slate-400 font-bold text-xs py-2.5 rounded-xl"
          >
            Annuleren
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: RESOLUTION PHASE WITH DYNAMIC DOUBLE OR NOTHING POPUP
  // ==========================================
  if (phase === 'RESOLUTION' && resolutionData) {
    const bidder = players.find(p => p.id === highestBidderId);
    const hasFailed = resolutionData.drinkers.length > 0 && bidder && resolutionData.drinkers.some(d => d.name === bidder.name);
    const hasWon = !hasFailed && bidder;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="pt-4 text-center z-10 space-y-1">
          <h2 className="text-3xl font-black text-amber-300 leading-tight">
            {resolutionData.headline}
          </h2>
          <p className="text-slate-300 text-xs font-medium">
            {resolutionData.subtext}
          </p>
        </div>

        {/* Dynamic Victory / Penalty Dare Card */}
        {activeDare && (
          <div className={`my-2 z-10 border rounded-2xl p-4 shadow-2xl relative overflow-hidden text-center backdrop-blur-md transition-all ${
            activeDare.isQuizmaster
              ? 'bg-gradient-to-b from-amber-900/90 via-orange-950 to-slate-950 border-amber-400 animate-pulse shadow-amber-500/30'
              : activeDare.isWildcard 
              ? 'bg-gradient-to-b from-amber-900/90 via-purple-950 to-slate-950 border-amber-400 animate-pulse shadow-amber-500/30' 
              : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-amber-500/50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                activeDare.isQuizmaster
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : activeDare.isWildcard
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : activeDare.type === 'VICTORY' 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-red-950 text-red-400 border border-red-500/40'
              }`}>
                {activeDare.isQuizmaster ? <Crown className="w-3.5 h-3.5" /> : activeDare.isWildcard ? <Crown className="w-3.5 h-3.5" /> : <Sparkles className="w-3 h-3" />}
                {activeDare.isQuizmaster ? '👑 DE QUIZMASTER (1 MINUUT)' : activeDare.isWildcard ? '⚡ ZELDSAME WILDCARD' : activeDare.type === 'VICTORY' ? 'OVERWINNINGS-RECHT' : 'EXTRA BOETE OPDRACHT'}
              </span>

              <button 
                onClick={() => drawDare(activeDare.type)}
                className="p-1 text-slate-400 hover:text-white transition flex items-center gap-1 text-[10px]"
                title="Draai een ander"
              >
                <RefreshCw className="w-3 h-3" /> Herloop
              </button>
            </div>

            <h3 className={`text-lg font-black ${activeDare.isQuizmaster || activeDare.isWildcard ? 'text-amber-300 text-xl' : 'text-white'}`}>
              {activeDare.title}
            </h3>
            <p className={`text-xs mt-1 leading-relaxed font-medium ${activeDare.isQuizmaster || activeDare.isWildcard ? 'text-amber-100 font-bold' : 'text-amber-200'}`}>
              {activeDare.description}
            </p>

            {activeDare.isQuizmaster && (
              <div className="mt-3 pt-2 border-t border-amber-400/30">
                <button 
                  onClick={toggleQuizmasterTimer}
                  className={`w-full py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 ${
                    isQuizmasterRunning ? 'bg-amber-400 text-slate-950' : 'bg-orange-500 text-slate-950'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {isQuizmasterRunning ? `PAUZE QUIZMASTER TIMER (${quizmasterTimer}s)` : `👑 START 60 SEC QUIZMASTER TIMER`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* AUTOMATIC DOUBLE OR NOTHING CHALLENGE POPUP FOR WINNERS */}
        {hasWon && !isDoubleRewarded && (
          <div className="my-2 z-10 bg-gradient-to-r from-emerald-950 to-amber-950 border border-emerald-500/50 p-4 rounded-2xl text-center shadow-xl space-y-3">
            {!activeDonTask ? (
              <>
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider">
                  <Gem className="w-4 h-4 animate-bounce text-emerald-400" />
                  💎 DUBBEL OF NIETS (BONUS CHALLENGE)!
                </div>
                <p className="text-xs text-slate-200">
                  Durf jij een extra willekeurige challenge aan voor <b>4 EXTRA BONUS SLOKKEN</b>?
                </p>
                <button 
                  onClick={startDoubleOrNothing}
                  className="w-full bg-gradient-to-r from-emerald-400 to-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-lg"
                >
                  🎲 TREK DUBBEL OF NIETS CHALLENGE!
                </button>
              </>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-500/40">
                  {activeDonTask.title}
                </span>
                <div className="text-base font-black text-white">{activeDonTask.task}</div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    onClick={() => handleDonOutcome(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> GELUKT! (+4 SLOKKEN)
                  </button>
                  <button 
                    onClick={() => handleDonOutcome(false)}
                    className="bg-red-600 hover:bg-red-700 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> GEFAALD (+2 DRINKEN)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* REDEEM YOURSELF MECHANIC BUTTON FOR LOSERS */}
        {hasFailed && !isRedeemed && (
          <div className="my-2 z-10 bg-gradient-to-r from-orange-950 to-amber-950 border border-orange-500/50 p-3.5 rounded-2xl text-center shadow-xl space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-orange-400 uppercase tracking-wider">
              <FlameKindling className="w-4 h-4 animate-bounce text-orange-400" />
              HERSTEL-KANS (REDEEM YOURSELF)!
            </div>
            <p className="text-xs text-slate-200">
              Voer de boete-opdracht uit om je slokken-straf <b>HELEMAAL TE KANCELEN!</b>
            </p>
            <button 
              onClick={handleRedeemSelf}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" /> OPDRACHT VOLTOOID! (SCHELD SLOKKEN KROON)
            </button>
          </div>
        )}

        <div className="my-2 z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-2xl">
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">
            Slokken Verdeling
          </div>

          {resolutionData.drinkers.length > 0 ? (
            <div className="space-y-2">
              {resolutionData.drinkers.map((d, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-950 border border-amber-500/30 p-3 rounded-xl">
                  <div>
                    <div className="font-black text-base text-white">{d.name}</div>
                    <div className="text-[11px] text-slate-400">{d.reason}</div>
                  </div>
                  <div className="text-xl font-black text-amber-400 flex items-center gap-1">
                    <Beer className="w-5 h-5 text-amber-400" />
                    <span>{d.sips} {d.sips === 1 ? 'Slok' : 'Slokken'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-2 text-slate-400 text-xs">
              Niemand hoeft te drinken in deze ronde! Veilig!
            </div>
          )}
        </div>

        <div className="pb-4 z-10 space-y-2">
          <button 
            onClick={nextCard}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-slate-950 font-black text-base py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
          >
            <span>VOLGENDE CATEGORIE</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: STATS & DYNAMIC AWARDS
  // ==========================================
  const awards = getAwards();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
      <div className="pt-4 text-center z-10 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
          <Trophy className="w-4 h-4" />
          SLOKKEN SCOREBORD & AWARDS
        </div>
        <h2 className="text-3xl font-black text-white">Eindstand Kampvuur</h2>
      </div>

      <div className="my-2 z-10 grid grid-cols-2 gap-2">
        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl text-center">
          <Crown className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-[10px] font-extrabold text-amber-400 uppercase">Veiling-Meester</div>
          <div className="font-black text-white text-sm">{awards.auctionMaster?.name}</div>
          <div className="text-[10px] text-slate-400">{awards.auctionMaster?.bidsWon} veilingen gewonnen</div>
        </div>

        <div className="bg-slate-900 border border-orange-500/40 p-3 rounded-xl text-center">
          <Beer className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-[10px] font-extrabold text-orange-400 uppercase">Slokken-Koning</div>
          <div className="font-black text-white text-sm">{awards.sipsKing?.name}</div>
          <div className="text-[10px] text-slate-400">{awards.sipsKing?.sipsDrunk} totaal gedronken</div>
        </div>

        <div className="bg-slate-900 border border-red-500/40 p-3 rounded-xl text-center">
          <Zap className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="text-[10px] font-extrabold text-red-400 uppercase">Gevaarlijke Bluffer</div>
          <div className="font-black text-white text-sm">{awards.boldBluffer?.name}</div>
          <div className="text-[10px] text-slate-400">Hoogste bod: {awards.boldBluffer?.highestBidPlaced} stuks</div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/40 p-3 rounded-xl text-center">
          <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-[10px] font-extrabold text-emerald-400 uppercase">Veilige Vlater</div>
          <div className="font-black text-white text-sm">{awards.safeFolder?.name}</div>
          <div className="text-[10px] text-slate-400">{awards.safeFolder?.totalPasses} keer gepast</div>
        </div>
      </div>

      <div className="my-2 z-10 space-y-2 max-h-44 overflow-y-auto">
        {[...players].sort((a, b) => b.sipsDrunk - a.sipsDrunk).map((p, idx) => (
          <div key={p.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                #{idx + 1}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{p.name}</div>
                <div className="text-[10px] text-slate-400">{p.bidsWon} gewonnen</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-amber-400 flex items-center gap-1 justify-end">
                <Beer className="w-4 h-4" /> {p.sipsDrunk}
              </div>
              <div className="text-[9px] text-slate-500 uppercase font-semibold">Slokken</div>
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
