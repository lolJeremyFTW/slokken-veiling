export interface CategoryChallenge {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  defaultTimeSeconds: number;
}

export interface Dare {
  id: string;
  type: 'VICTORY' | 'PENALTY' | 'WILDCARD';
  title: string;
  description: string;
  isWildcard?: boolean;
  isQuizmaster?: boolean;
}

export interface NeverHaveIEverCard {
  id: string;
  statement: string;
}

export const NEVER_HAVE_I_EVER_QUESTIONS: NeverHaveIEverCard[] = [
  {
    id: "nhie-1",
    statement: "Ik heb nog nooit gedaan alsof ik sliep om het opruimen of de afwas op de camping te ontlopen!"
  },
  {
    id: "nhie-2",
    statement: "Ik heb nog nooit in het wild of in de natuur geplast waar het eigenlijk absoluut niet mocht!"
  },
  {
    id: "nhie-3",
    statement: "Ik heb nog nooit volgehouden dat ik de weg wist, terwijl we eigenlijk straalverdwaald waren!"
  },
  {
    id: "nhie-4",
    statement: "Ik heb nog nooit stiekem iemands drankje of glas bijgeschonken zonder dat diegene het doorhad!"
  },
  {
    id: "nhie-5",
    statement: "Ik heb nog nooit een vette smoes gebruikt om een groepsactiviteit te skippen!"
  },
  {
    id: "nhie-6",
    statement: "Ik heb nog nooit een hele nacht doorgehaald bij een kampvuur tot de zon opkwam!"
  },
  {
    id: "nhie-7",
    statement: "Ik heb nog nooit spullen in mijn tas/tent gevonden die eigenlijk van een medespeler waren!"
  },
  {
    id: "nhie-8",
    statement: "Ik heb nog nooit per ongeluk in de verkeerde tent of op de verkeerde stoel gezeten!"
  },
  {
    id: "nhie-9",
    statement: "Ik heb nog nooit beweerd dat ik ergens heel goed in was, en faalde vervolgens keihard!"
  },
  {
    id: "nhie-10",
    statement: "Ik heb nog nooit een dronken appje of spraakbericht gestuurd waar ik de volgende ochtend spijt van had!"
  }
];

export const WILDCARD_VICTORY_DARE: Dare = {
  id: "wild-vic",
  type: "WILDCARD",
  title: "👑 WILDCARD: ATJE GEVEN!",
  description: "ZELDSAME WILDCARD! Jij hebt de categorie gehaald! Wijs iemand aan die direct zijn/haar hele glas in 1x leeg moet ADJEN!",
  isWildcard: true
};

export const WILDCARD_PENALTY_DARE: Dare = {
  id: "wild-pen",
  type: "WILDCARD",
  title: "💥 WILDCARD: ATJE TREKKEN!",
  description: "ZELDSAME WILDCARD BOETE! Jij hebt gefaald in je bod! Trek direct je hele glas in 1x helemaal leeg!",
  isWildcard: true
};

export const VICTORY_DARES: Dare[] = [
  {
    id: "vic-qm",
    type: "VICTORY",
    title: "👑 DE QUIZMASTER (1 MINUUT DE BAAS)",
    description: "Jij bent nu 1 MINUUT (60 sec) lang de Quizmaster! Iedereen om het kampvuur moet 60 seconden lang ALLES doen wat jij zegt! Weigeren = 3 slokken!",
    isQuizmaster: true
  },
  {
    id: "vic-1",
    type: "VICTORY",
    title: "🪑 Stoel Opeisen",
    description: "Je mag direct de stoel of de beste plek bij het kampvuur opeisen van een medespeler naar keuze!"
  },
  {
    id: "vic-2",
    type: "VICTORY",
    title: "❓ Eerlijke Vraag Stellen",
    description: "Je mag één willekeurige speler EEN directe vraag stellen. Diegene moet eerlijk antwoorden of 3 slokken drinken!"
  },
  {
    id: "vic-3",
    type: "VICTORY",
    title: "🍹 Hofleverancier",
    description: "Wijs een medespeler aan die jouw drankje de komende 2 rondes moet inschenken of halen."
  },
  {
    id: "vic-4",
    type: "VICTORY",
    title: "📜 Mini-Regel Bepalen",
    description: "Verzin 1 mini-regel voor de komende ronde (bijv. 'Niemand mag namen noemen' of 'Alleen met links drinken'). Overtreding = 2 slokken!"
  },
  {
    id: "vic-5",
    type: "VICTORY",
    title: "🎯 Slokken Verdelen",
    description: "Je mag 4 bonus-slokken willekeurig verdelen over je medespelers!"
  },
  {
    id: "vic-6",
    type: "VICTORY",
    title: "🤫 De Stilte Straf",
    description: "Wijs een medespeler aan die 1 ronde lang helemaal NIET meer mag praten. Zegt hij toch wat? 2 slokken per woord!"
  },
  {
    id: "vic-7",
    type: "VICTORY",
    title: "📱 Melding Voorlezen",
    description: "Wijs iemand aan die het laaste ontvangen berichtje op zijn/haar telefoon hardop moet voorlezen (of 3 slokken drinkt)!"
  }
];

export const PENALTY_DARES: Dare[] = [
  {
    id: "pen-1",
    type: "PENALTY",
    title: "🪑 Stoel Afstaan",
    description: "Je moet je stoel of zitplek voor 2 rondes afstaan aan de uitdager!"
  },
  {
    id: "pen-2",
    type: "PENALTY",
    title: "❓ Biecht Vraag Antwoorden",
    description: "De uitdager mag jou 1 directe vraag stellen. Je moet eerlijk antwoorden of 3 extra slokken nemen!"
  },
  {
    id: "pen-3",
    type: "PENALTY",
    title: "🍹 Drankje Inschenken",
    description: "Schenk het glas van de uitdager (of een medespeler) weer helemaal vol tot de rand!"
  },
  {
    id: "pen-4",
    type: "PENALTY",
    title: "📱 Melding Voorlezen",
    description: "Lees het laatst ontvangen appje op jouw telefoon hardop voor aan de groep (of neem 3 slokken boete)!"
  },
  {
    id: "pen-5",
    type: "PENALTY",
    title: "🍻 Dubbele Slokken Boete",
    description: "Neem direct 2 extra slokken bovenop je gefaalde bod als boete voor je bluf!"
  },
  {
    id: "pen-6",
    type: "PENALTY",
    title: "🎭 Verplicht Accent",
    description: "Praat de komende 2 rondes verplicht met een Belgisch of Amsterdams accent."
  }
];

export const WHEEL_SEGMENTS = [
  {
    id: "wheel-1",
    title: "💥 JACKPOT!",
    description: "De draaier is veilig! Iedereen behalve de draaier neemt direct 2 strafslokken!",
    color: "from-amber-500 to-orange-500",
    icon: "🎰"
  },
  {
    id: "wheel-2",
    title: "🚰 HYDRATIE CHECK",
    description: "Kampvuur regel: Iedereen neemt verplicht een flinke slok water!",
    color: "from-blue-500 to-cyan-500",
    icon: "🚰"
  },
  {
    id: "wheel-3",
    title: "⚡ DUBBELE INZET",
    description: "Biedingen & strafslokken in de VOLGENDE veiling tellen DUBBEL!",
    color: "from-purple-500 to-pink-500",
    icon: "⚡"
  },
  {
    id: "wheel-4",
    title: "🎲 SHOT ROULETTE",
    description: "Het rad kiest 1 willekeurige speler die zijn/haar glas in 1x leeg moet adje!",
    color: "from-red-600 to-rose-600",
    icon: "🍾"
  },
  {
    id: "wheel-5",
    title: "🪑 STOEL-RUIL",
    description: "Iedereen staat op en schuift 1 plek door naar rechts rond het kampvuur!",
    color: "from-emerald-500 to-green-600",
    icon: "🪑"
  },
  {
    id: "wheel-6",
    title: "🎯 SLOKKEN-SWAP",
    description: "De speler met de minste slokken geeft 2 slokken aan de speler met de meeste slokken!",
    color: "from-yellow-500 to-amber-600",
    icon: "🔄"
  }
];

export const CATEGORIES: CategoryChallenge[] = [
  {
    id: "cat-qm",
    title: "👑 De Quizmaster Vragen",
    categoryName: "quizvragen",
    description: "Hoeveel algemene kennis- of kampvuurvragen kun jij goed beantwoorden binnen 30 seconden?",
    defaultTimeSeconds: 30
  },
  {
    id: "cat-1",
    title: "🚬 Sigaretten & Tabak",
    categoryName: "sigarettenmerken",
    description: "Hoeveel verschillende sigaretten- of tabaksmerken kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-2",
    title: "🍺 Biermerken",
    categoryName: "biermerken",
    description: "Hoeveel verschillende biermerken (pils, speciaalbier, pilsners) kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-3",
    title: "🚗 Automerken",
    categoryName: "automerken",
    description: "Hoeveel automerken kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-4",
    title: "🍟 Fastfood & Frituursnacks",
    categoryName: "snacks / fastfoodketens",
    description: "Hoeveel fastfoodketens of bekende frituursnacks kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-5",
    title: "🏙️ Nederlandse & Belgische Steden",
    categoryName: "steden",
    description: "Hoeveel steden in Nederland of België kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-6",
    title: "🛒 Supermarkten",
    categoryName: "supermarkten",
    description: "Hoeveel supermarktketens (Nederlands of buitenlands) kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-7",
    title: "🤬 Scheldwoorden & Straattaal",
    categoryName: "scheldwoorden",
    description: "Hoeveel scheldwoorden en straattaalwoorden kun jij opnoemen in 10 seconden?",
    defaultTimeSeconds: 10
  },
  {
    id: "cat-8",
    title: "⚽ Voetbalclubs",
    categoryName: "voetbalclubs",
    description: "Hoeveel professionele voetbalclubs (binnen- of buitenland) kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-9",
    title: "🍹 Sterke Drank & Cocktails",
    categoryName: "alcohol / cocktails",
    description: "Hoeveel soorten sterke drank of bekende cocktails kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-10",
    title: "👟 Kleding- & Schoenenmerken",
    categoryName: "kledingmerken",
    description: "Hoeveel kleding- of schoenenmerken kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-11",
    title: "🎬 Netflix Series & Films",
    categoryName: "films / series",
    description: "Hoeveel films of Netflix-series kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-12",
    title: "🎤 Zangers, Rappers & Bandjes",
    categoryName: "artiesten / rappers",
    description: "Hoeveel bekende zangers, zangeressen of rappers kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-13",
    title: "🥤 Energiedrankjes & Frisdrank",
    categoryName: "frisdrank / energiedrank",
    description: "Hoeveel frisdrank- of energiedrankmerken kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-14",
    title: "🏖️ Vakantiebestemmingen / Eilanden",
    categoryName: "vakantielanden / eilanden",
    description: "Hoeveel vakantielanden of eilanden kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-15",
    title: "🍕 Pizza's & Italiaanse Gerechten",
    categoryName: "pizza's / pasta's",
    description: "Hoeveel soorten pizza's of Italiaanse gerechten kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-16",
    title: "📱 Apps op je Telefoon",
    categoryName: "apps",
    description: "Hoeveel mobiele apps (Social media, games, tools) kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-17",
    title: "🎪 Festivals & Feesten",
    categoryName: "festivals",
    description: "Hoeveel muziekfestivals of feestconcepten kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-18",
    title: "🚘 Automodellen",
    categoryName: "automodellen",
    description: "Hoeveel specifieke automodellen (bijv. Golf, Polo, Civic, Mustang) kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-19",
    title: "🏕️ Spullen voor op de Camping",
    categoryName: "campingspullen",
    description: "Hoeveel voorwerpen die je meeneemt naar de camping kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-20",
    title: "🥔 Chips- & Snoepmerken",
    categoryName: "chips / snoep",
    description: "Hoeveel chipssoorten of snoepmerken kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-21",
    title: "🐕 Hondenrassen & Dieren",
    categoryName: "hondenrassen / dieren",
    description: "Hoeveel hondenrassen op wilde dieren kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-22",
    title: "🎧 Bekende DJ's",
    categoryName: "DJ's",
    description: "Hoeveel bekende nationale en internationale DJ's kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-23",
    title: "🏎️ Formule 1 Coureurs & Teams",
    categoryName: "F1 coureurs / teams",
    description: "Hoeveel Formule 1 coureurs of teams (nu of vroeger) kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-24",
    title: "🧀 Kaassoorten & Broodbeleg",
    categoryName: "kaas / broodbeleg",
    description: "Hoeveel kaassoorten of soorten broodbeleg kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-25",
    title: "🎮 Videogames & Consoles",
    categoryName: "games / consoles",
    description: "Hoeveel bekende videogames of spelcomputers kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-26",
    title: "🗼 Hoofdsteden van de Wereld",
    categoryName: "hoofdsteden",
    description: "Hoeveel wereld-hoofdsteden kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-27",
    title: "🥦 Groenten & Fruitsoorten",
    categoryName: "groenten / fruit",
    description: "Hoeveel groenten of fruitsoorten kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-28",
    title: "🎢 Pretparken & Dierentuinen",
    categoryName: "pretparken / dierentuinen",
    description: "Hoeveel pretparken of dierentuinen kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-29",
    title: "📺 Bekende TV Programma's",
    categoryName: "TV programma's",
    description: "Hoeveel Nederlandse TV programma's of reality shows kun jij opnoemen in 15 seconden?",
    defaultTimeSeconds: 15
  },
  {
    id: "cat-30",
    title: "⚓ Scheeps- / Bootsoorten",
    categoryName: "bootsoorten",
    description: "Hoeveel soorten vaartuigen of boten kun jij noemen in 15 seconden?",
    defaultTimeSeconds: 15
  }
];
