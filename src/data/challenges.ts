export type ChallengeCategory = 'CAPACITY' | 'ESCAPE' | 'VICTIM';

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  description: string;
  defaultTimeSeconds?: number;
  unitName?: string; // e.g. "items", "seconden"
  suggestedStartBid?: number;
}

export const CATEGORY_INFO: Record<ChallengeCategory, { label: string; color: string; bg: string; border: string; icon: string; explanation: string }> = {
  CAPACITY: {
    label: "Bluff & Bewijs",
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-500/50",
    icon: "⚡",
    explanation: "Bied hoeveel jij er kunt noemen of doen binnen de tijd! Iemand kan 'BEWIJS HET!' roepen."
  },
  ESCAPE: {
    label: "Ontkom aan de Straf",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
    border: "border-emerald-500/50",
    icon: "🛡️",
    explanation: "Bied slokken om deze uitdaging of straf NIET te hoeven doen. Wie past moet het doen!"
  },
  VICTIM: {
    label: "Koop een Slachtoffer",
    color: "text-purple-400",
    bg: "bg-purple-950/40",
    border: "border-purple-500/50",
    icon: "🎯",
    explanation: "De hoogste bieder mag bepalen WIE van de groep deze actie moet uitvoeren!"
  }
};

export const CHALLENGES: Challenge[] = [
  // --- CAPACITY (Bluff & Bewijs) ---
  {
    id: "cap-1",
    title: "Biermerken Noemen",
    category: "CAPACITY",
    description: "Hoeveel verschillende biermerken kun jij noemen in 15 seconden?",
    unitName: "biermerken",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-2",
    title: "Automerken met een B of K",
    category: "CAPACITY",
    description: "Hoeveel automerken die beginnen met een B of K kun jij noemen in 15 seconden?",
    unitName: "automerken",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-3",
    title: "Bekende Nederlanders",
    category: "CAPACITY",
    description: "Hoeveel BN'ers (voetballers, BN'ers, presentatoren) kun jij noemen binnen 15 seconden?",
    unitName: "BN'ers",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-4",
    title: "Push-ups in 20 Sec",
    category: "CAPACITY",
    description: "Hoeveel nette push-ups kun jij op de grond doen in 20 seconden?",
    unitName: "push-ups",
    defaultTimeSeconds: 20
  },
  {
    id: "cap-5",
    title: "Nederlandse Steden",
    category: "CAPACITY",
    description: "Hoeveel Nederlandse steden met meer dan 50.000 inwoners kun jij opnoemen in 15 seconden?",
    unitName: "steden",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-6",
    title: "Fastfood Keten & Snacks",
    category: "CAPACITY",
    description: "Hoeveel bekende frituursnacks of fastfoodketens kun jij opnoemen in 15 seconden?",
    unitName: "snacks",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-7",
    title: "Engelse Scheldwoorden / Slang",
    category: "CAPACITY",
    description: "Hoeveel verschillende Engelse scheld- of straattaalwoorden kun jij opnoemen in 10 seconden?",
    unitName: "woorden",
    defaultTimeSeconds: 10
  },
  {
    id: "cap-8",
    title: "Festivals in Nederland/België",
    category: "CAPACITY",
    description: "Hoeveel muziekfestivals kun jij noemen in 15 seconden?",
    unitName: "festivals",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-9",
    title: "Groenten met een S of P",
    category: "CAPACITY",
    description: "Hoeveel fruit- of groentesoorten kun jij noemen in 15 seconden?",
    unitName: "soorten",
    defaultTimeSeconds: 15
  },
  {
    id: "cap-10",
    title: "Hondenrassen",
    category: "CAPACITY",
    description: "Hoeveel hondenrassen kun jij opnoemen in 15 seconden?",
    unitName: "rassen",
    defaultTimeSeconds: 15
  },

  // --- ESCAPE (Ontkom aan de Straf) ---
  {
    id: "esc-1",
    title: "IJsblokje / Koud Water in je Nek",
    category: "ESCAPE",
    description: "Laat iemand een ijsblokje of een scheut ijskoud water achter in je shirt of nek glijden! Bied slokken om dit te ontlopen.",
  },
  {
    id: "esc-2",
    title: "Maffe Groepsapp Selfie",
    category: "ESCAPE",
    description: "Stuur een idiote selfie zonder context naar je familie-app of vrienden-groepsapp. Bied slokken om te ontsnappen!",
  },
  {
    id: "esc-3",
    title: "Imiteer een Dronken Boswachter",
    category: "ESCAPE",
    description: "Doe 30 seconden lang een gepassioneerde imitatie van een dronken boswachter rond het kampvuur. Wie past moet optreden!",
  },
  {
    id: "esc-4",
    title: "Laat iemand je Kapsel Stylen",
    category: "ESCAPE",
    description: "De medespeler rechts van je mag je haar voor de rest van de avond helemaal maffiseren met water/gel. Bied om te ontkomen!",
  },
  {
    id: "esc-5",
    title: "Kikkersprongen rond het Vuur",
    category: "ESCAPE",
    description: "Doe 5 kikkersprongen rond het kampvuur terwijl je kwaakt. Wie past mag springen!",
  },
  {
    id: "esc-6",
    title: "Serenade aan een Medespeler",
    category: "ESCAPE",
    description: "Zing 30 seconden lang een romantisch geïmproviseerd liefdesliedje voor de persoon tegenover je.",
  },
  {
    id: "esc-7",
    title: "Eet een Lepel Scherp / Zuur",
    category: "ESCAPE",
    description: "Eet een lepel mosterd, mayo, sambal of citroensap zonder te trekken met je gezicht!",
  },
  {
    id: "esc-8",
    title: "Mobiel in het Engels",
    category: "ESCAPE",
    description: "Zet de taal van je mobiel tot het einde van het spel op het Engels (of Duits). Bied slokken om te ontsnappen!",
  },

  // --- VICTIM (Koop een Slachtoffer) ---
  {
    id: "vic-1",
    title: "Slokken Adjen",
    category: "VICTIM",
    description: "De hoogste bieder wijst iemand aan die direct 4 flinke slokken van zijn of haar drankje moet adjen!",
  },
  {
    id: "vic-2",
    title: "Vreemd Accent Verplicht",
    category: "VICTIM",
    description: "De hoogste bieder kiest een speler die de komende 3 rondes met een Vlaams, Amsterdams of Duits accent MOET praten.",
  },
  {
    id: "vic-3",
    title: "De Barmhartige Samaritaan",
    category: "VICTIM",
    description: "Kies iemand die voor iedereen de komende ronde het drankje moet inschenken of halen.",
  },
  {
    id: "vic-4",
    title: "Telefoon Afstaan",
    category: "VICTIM",
    description: "Wijs iemand aan die zijn/haar telefoon open op tafel moet leggen. Meldingen worden hardop voorgelezen!",
  },
  {
    id: "vic-5",
    title: "Slokken Verdelen",
    category: "VICTIM",
    description: "De hoogste bieder mag 5 slokken willekeurig verdelen over alle medespelers!",
  },
  {
    id: "vic-6",
    title: "De Stilte Straf",
    category: "VICTIM",
    description: "Wijs iemand aan die 2 rondes lang helemaal NIET meer mag praten. Zegt hij/zij toch wat? 2 slokken straf per woord!",
  }
];
