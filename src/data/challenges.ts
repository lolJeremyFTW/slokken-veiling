export interface CategoryChallenge {
  id: string;
  title: string;
  categoryName: string; // e.g. "Sigarettenmerken"
  description: string;  // e.g. "Hoeveel verschillende sigaretten- of tabaksmerken kun jij noemen in 15 seconden?"
  defaultTimeSeconds: number;
}

export interface Dare {
  id: string;
  type: 'VICTORY' | 'PENALTY';
  title: string;
  description: string;
}

export const VICTORY_DARES: Dare[] = [
  {
    id: "vic-1",
    type: "VICTORY",
    title: "👑 Koning van het Kampvuur",
    description: "De winnaar mag bepalen WIE van de medespelers 10 seconden lang een gekke overwinningsdans rond het vuur moet doen!"
  },
  {
    id: "vic-2",
    title: "🎯 De Barmhartige Samaritaan",
    description: "Wijs een medespeler aan die jouw drankje voor de rest van de avond moet inschenken/halen!"
  },
  {
    id: "vic-3",
    title: "🎭 Accent Verplicht",
    description: "Wijs iemand aan die de komende 3 rondes met een zwaar Frans, Vlaams of Duits accent MOET praten."
  },
  {
    id: "vic-4",
    title: "🍾 Dubbele Genade",
    description: "De verliezer (die dacht dat jij het niet kon) moet BINNEN 10 seconden zijn glas adje/bijdrinken!"
  },
  {
    id: "vic-5",
    title: "📸 De Overwinnaars-Selfie",
    description: "Iedereen behalve jij moet een gekke smoel trekken op een groepsfoto die jij nu maakt!"
  },
  {
    id: "vic-6",
    title: "🤫 De Stilte Straf",
    description: "Wijs een medespeler aan die 2 rondes lang helemaal NIET meer mag praten. Zegt hij toch wat? 2 slokken per woord!"
  },
  {
    id: "vic-7",
    title: "👑 De Koninklijke Stoel",
    description: "Iemand moet zijn/haar stoel voor jou afstaan of je 1 minuut lang als een koning bedienen!"
  }
];

export const PENALTY_DARES: Dare[] = [
  {
    id: "pen-1",
    type: "PENALTY",
    title: "🤡 Groepsapp Schande",
    description: "Stuur een maffe selfie met gekke smoel zonder enige context naar je vrienden- of familie-groepsapp!"
  },
  {
    id: "pen-2",
    type: "PENALTY",
    title: "🧊 Koud Water / IJsblokje",
    description: "Laat de uitdager een koud ijsblokje of een scheutje ijskoud water achter in je nek of shirt glijden!"
  },
  {
    id: "pen-3",
    type: "PENALTY",
    title: "🎤 Kampvuur Serenade",
    description: "Zing de eerste 4 regels van een bekend kampvuurnummer of kinderliedje keihard voor de groep!"
  },
  {
    id: "pen-4",
    type: "PENALTY",
    title: "🌶️ De Scherpe Happer",
    description: "Eet een lepel mosterd, mayo, sambal of citroensap zonder te trekken met je gezicht!"
  },
  {
    id: "pen-5",
    type: "PENALTY",
    title: "🐸 Kikkersprongen",
    description: "Doe 5 kikkersprongen rond het kampvuur terwijl je hardop 'KWAAK' roept bij elke sprong!"
  },
  {
    id: "pen-6",
    type: "PENALTY",
    title: "💇‍♂️ Maffiseer je Kapsel",
    description: "De uitdager mag je haar voor de rest van de avond helemaal maffiseren met water/gel!"
  },
  {
    id: "pen-7",
    type: "PENALTY",
    title: "📱 Engelse Telefoon",
    description: "Zet de taal van je mobiel tot het einde van het spel op het Engels (of Duits)!"
  }
];

export const CATEGORIES: CategoryChallenge[] = [
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
    description: "Hoeveel scheldwoorden of straattaalwoorden kun jij opnoemen in 10 seconden?",
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
    description: "Hoeveel hondenrassen of wilde dieren kun jij opnoemen in 15 seconden?",
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
