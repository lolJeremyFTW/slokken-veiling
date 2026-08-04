export interface CategoryChallenge {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  defaultTimeSeconds: number;
  isSpecialEvent?: 'HORSE_RACE' | 'WHEEL_BONUS' | 'NEVER_HAVE_I_EVER' | 'GROUP_VOTE' | 'SLOK_BOM';
}

export interface Dare {
  id: string;
  type: 'VICTORY' | 'PENALTY' | 'WILDCARD';
  title: string;
  description: string;
  isWildcard?: boolean;
  isQuizmaster?: boolean;
}

export interface DoubleOrNothingChallenge {
  id: string;
  title: string;
  task: string;
}

export interface NeverHaveIEverCard {
  id: string;
  statement: string;
}

export interface GroupVoteCard {
  id: string;
  question: string;
}

// 15 Concrete Double or Nothing Challenges generated automatically!
export const DOUBLE_OR_NOTHING_CHALLENGES: DoubleOrNothingChallenge[] = [
  { id: "don-1", title: "⚡ Snelheidstest", task: "Noem nog 3 EXTRA items in de categorie binnen 5 seconden!" },
  { id: "don-2", title: "🎪 Balans Proef", task: "Balanceer je glas of een flesje 10 seconden op je hoofd zonder te vallen!" },
  { id: "don-3", title: "🎭 De Hysterische Lach", task: "Lach 5 seconden lang overdreven hard en gemeen als een slechterik uit een film!" },
  { id: "don-4", title: "💪 Kampvuur Push-ups", task: "Doe 5 snelle push-ups of squats bij het kampvuur!" },
  { id: "don-5", title: "🎙️ De Mop Verteller", task: "Klinkt er een droge mop of grap uit je mond binnen 10 seconden?" },
  { id: "don-6", title: "👁️ Staren Zonder Knipperen", task: "Staar 10 seconden strak naar de uitdager zonder te knipperen!" },
  { id: "don-7", title: "🎶 Zang-Solo", task: "Zing de eerste 2 regels van een bekend Nederlands feestnummer!" },
  { id: "don-8", title: "🤫 Tongstrelend", task: "Raak met je tong het puntje van je neus aan (of probeer het 5 sec fel)!" },
  { id: "don-9", title: "🕺 Maffia Dance Move", task: "Doe 10 seconden een bekende dansmove (bijv. de Moonwalk of Floss)!" },
  { id: "don-10", title: "🔥 Kampvuur Quiz", task: "Noem binnen 5 seconden de voornaam van ieders moeder om het vuur!" },
  { id: "don-11", title: "📱 Snelste Apper", task: "Open je telefoon en noem het 1e woord van je laatst ontvangen appje!" },
  { id: "don-12", title: "🍻 Het Vlugge Glas", task: "Neem een denkbeeldige slok en doe een perfecte ober-buiging!" }
];

// 20 Group Vote Questions
export const GROUP_VOTE_QUESTIONS: GroupVoteCard[] = [
  { id: "gv-1", question: "Wie van de groep zou het eerst verdwalen als we zonder GPS het bos in lopen?" },
  { id: "gv-2", question: "Wie van de groep is de grootste bluffer tijdens deze veiling?" },
  { id: "gv-3", question: "Wie van de groep heeft de neiging om als eerste in slaap te vallen bij het kampvuur?" },
  { id: "gv-4", question: "Wie van de groep maakt de meeste rommel in de tent of op de camping?" },
  { id: "gv-5", question: "Wie van de groep heeft vanavond de meeste slokken nodig om echt los te komen?" },
  { id: "gv-6", question: "Wie van de groep zou de hoofdprijs winnen in de Lotto en het binnen 1 week uitgeven?" },
  { id: "gv-7", question: "Wie van de groep is het allerslechtst in neep praten of een geheim bewaren?" },
  { id: "gv-8", question: "Wie van de groep stuurt de meeste spraakberichten op WhatsApp?" },
  { id: "gv-9", question: "Wie van de groep zou het langst overleven op een onbewoond eiland?" },
  { id: "gv-10", question: "Wie van de groep pakt altijd stiekem het laatste stukje eten of snack?" },
  { id: "gv-11", question: "Wie van de groep heeft de ergste muzieksmaak?" },
  { id: "gv-12", question: "Wie van de groep is het meest verslaafd aan zijn/haar telefoon?" },
  { id: "gv-13", question: "Wie van de groep zou per ongeluk de tent laten instorten?" },
  { id: "gv-14", question: "Wie van de groep kan absoluut niet tegen zijn/haar verlies?" },
  { id: "gv-15", question: "Wie van de groep maakt altijd de flauwste mopjes bij het vuur?" }
];

// 20 Never Have I Ever Questions
export const NEVER_HAVE_I_EVER_QUESTIONS: NeverHaveIEverCard[] = [
  { id: "nhie-1", statement: "Ik heb nog nooit gedaan alsof ik sliep om het opruimen of de afwas te ontlopen!" },
  { id: "nhie-2", statement: "Ik heb nog nooit in het wild of in de natuur geplast waar het eigenlijk niet mocht!" },
  { id: "nhie-3", statement: "Ik heb nog nooit volgehouden dat ik de weg wist, terwijl we eigenlijk straalverdwaald waren!" },
  { id: "nhie-4", statement: "Ik heb nog nooit stiekem iemands drankje of glas bijgeschonken zonder dat diegene het doorhad!" },
  { id: "nhie-5", statement: "Ik heb nog nooit een vette smoes gebruikt om een groepsactiviteit te skippen!" },
  { id: "nhie-6", statement: "Ik heb nog nooit een hele nacht doorgehaald bij een kampvuur tot de zon opkwam!" },
  { id: "nhie-7", statement: "Ik heb nog nooit spullen in mijn tas/tent gevonden die eigenlijk van een medespeler waren!" },
  { id: "nhie-8", statement: "Ik heb nog nooit per ongeluk in de verkeerde tent of op de verkeerde stoel gezeten!" },
  { id: "nhie-9", statement: "Ik heb nog nooit beweerd dat ik ergens heel goed in was, en faalde vervolgens keihard!" },
  { id: "nhie-10", statement: "Ik heb nog nooit een dronken appje gestuurd waar ik de volgende ochtend spijt van had!" },
  { id: "nhie-11", statement: "Ik heb nog nooit een kledingstuk verkeerd-om of binnenstebuiten gedragen op een feestje!" },
  { id: "nhie-12", statement: "Ik heb nog nooit gedaan alsof ik een liedje kende terwijl ik de tekst ter plekke verzon!" },
  { id: "nhie-13", statement: "Ik heb nog nooit eten van de grond gegeten na de 5-seconden regel!" },
  { id: "nhie-14", statement: "Ik heb nog nooit een smoes gebruikt over een 'lege telefoonaccu' om niet te hoeven reageren!" },
  { id: "nhie-15", statement: "Ik heb nog nooit per ongeluk de verkeerde persoon geknuffeld of begroet op straat!" }
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

// 15+ Victory Dares
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
    description: "Verzin 1 mini-regel voor de komende 2 rondes (bijv. 'Niemand mag namen noemen' of 'Alleen met links drinken'). Overtreding = 2 slokken!"
  },
  {
    id: "vic-5",
    type: "VICTORY",
    title: "🎯 Slokken Verdelen (4 Slokken)",
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
    description: "Wijs iemand aan die het laatste ontvangen berichtje op zijn/haar telefoon hardop moet voorlezen (of 3 slokken drinkt)!"
  },
  {
    id: "vic-8",
    type: "VICTORY",
    title: "🛡️ Immunitijd Schilderij",
    description: "Je krijgt een immunitijd-kaart! De eerstvolgende keer dat je moet drinken mag je deze inzetten om NIET te drinken!"
  },
  {
    id: "vic-9",
    type: "VICTORY",
    title: "🎭 De Dj van het Vuur",
    description: "Jij kiest het volgende nummer dat afgespeeld wordt bij het vuur, of wijst de entertainer van de groep aan!"
  },
  {
    id: "vic-10",
    type: "VICTORY",
    title: "⚡ Slokken-Wissel",
    description: "Wissel je aantal gedronken slokken op het scorebord met de speler die de meeste slokken heeft!"
  },
  {
    id: "vic-11",
    type: "VICTORY",
    title: "🤝 Drank-Maatje Koppelen",
    description: "Koppel 2 medespelers aan elkaar. Elke keer dat Speler A moet drinken de komende 2 rondes, moet Speler B ook drinken!"
  },
  {
    id: "vic-12",
    type: "VICTORY",
    title: "👑 De Koninklijke Groet",
    description: "Iedereen moet jou de komende 2 rondes aanspreken met 'Uw Majesteit'. Vergeet iemand dit? 1 slok boete!"
  },
  {
    id: "vic-13",
    type: "VICTORY",
    title: "🔮 De Toekomst-Voorspelling",
    description: "Voorspel wie de volgende veiling gaat verliezen. Heb je het goed? Diegene drinkt 2 extra slokken!"
  },
  {
    id: "vic-14",
    type: "VICTORY",
    title: "🎁 De Gulhartige Gever",
    description: "Geef 2 slokken aan de speler met de minste slokken en 2 slokken aan de speler met de meeste slokken."
  }
];

// 15+ Penalty Dares
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
  },
  {
    id: "pen-7",
    type: "PENALTY",
    title: "🙋‍♂️ Hand in de Lucht",
    description: "Je moet de hele volgende ronde je linkerhand op je hoofd houden. Vergeet je dit? 2 slokken!"
  },
  {
    id: "pen-8",
    type: "PENALTY",
    title: "🎙️ Kampvuur Compliment",
    description: "Geef elke medespeler om de beurt een oprecht en mooi compliment (of neem 3 slokken boete)!"
  },
  {
    id: "pen-9",
    type: "PENALTY",
    title: "🕺 Kampvuur Dansje",
    description: "Doe 10 seconden lang een maffia- of kampvuurdansje rond het vuur!"
  },
  {
    id: "pen-10",
    type: "PENALTY",
    title: "🤐 Het Verboden Woord",
    description: "De uitdager kiest 1 veelgebruikt woord (bijv. 'Ja', 'Nee', 'Bieden'). Zeg je dit in de komende ronde? 1 slok per keer!"
  },
  {
    id: "pen-11",
    type: "PENALTY",
    title: "👀 Oogcontact Vasthouden",
    description: "Kijk de uitdager 15 seconden lang strak in de ogen aan zonder te lachen. Lach je wel? 2 slokken!"
  },
  {
    id: "pen-12",
    type: "PENALTY",
    title: "👑 De Hofnar",
    description: "Moet de uitdager de komende ronde bedienen en 'Ja baas' zeggen na elke zin."
  },
  {
    id: "pen-13",
    type: "PENALTY",
    title: "🧢 Petje Af / Muts Ruilen",
    description: "Ruil voor de rest van het spel je hoofddeksel, jas of accessoire met de speler tegenover je!"
  },
  {
    id: "pen-14",
    type: "PENALTY",
    title: "🎶 Zing je Bod",
    description: "De volgende keer dat je biedt in de veiling, moet je je bod al zingend uitspreken!"
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

// FULL 50 CATEGORIES DECK!
export const CATEGORIES: CategoryChallenge[] = [
  { id: "cat-event-1", title: "🐎 VERRASSINGS-EVENT: DE KAMPVUUR PAARDENRACE", categoryName: "paardenrace", description: "Verrassings-minigame! Zet slokken in op 1 van de 4 paarden en kijk wie er wint op het scherm!", defaultTimeSeconds: 15, isSpecialEvent: "HORSE_RACE" },
  { id: "cat-event-2", title: "🍻 VERRASSINGS-EVENT: KAMPVUUR BIECHT", categoryName: "ik heb nog nooit", description: "Verrassings-ronde! 5 rondes 'Ik heb nog nooit...'. Wie schuldig is drinkt 1 slok!", defaultTimeSeconds: 15, isSpecialEvent: "NEVER_HAVE_I_EVER" },
  { id: "cat-event-3", title: "🎡 VERRASSINGS-EVENT: RAD VAN SLOKKEN", categoryName: "rad van slokken", description: "Verrassings-ronde! Draai het Rad van Slokken voor een willekeurig groeps-event!", defaultTimeSeconds: 15, isSpecialEvent: "WHEEL_BONUS" },
  { id: "cat-event-4", title: "🎭 VERRASSINGS-EVENT: STEM OP DE SJAAK", categoryName: "groeps-stemming", description: "Verrassings-ronde! De groep krijgt een vraag en telt af 3..2..1.. Wijs tegelijk iemand aan! Meeste stemmen = 2 slokken!", defaultTimeSeconds: 15, isSpecialEvent: "GROUP_VOTE" },
  { id: "cat-event-5", title: "💣 VERRASSINGS-EVENT: DE TIKKENDE SLOK-BOM", categoryName: "slok bom", description: "Verrassings-minigame! Geef de telefoon rond het vuur en noem om de beurt 1 item. Waar de bom ontploft drinkt 3 slokken!", defaultTimeSeconds: 15, isSpecialEvent: "SLOK_BOM" },
  
  { id: "cat-qm", title: "👑 De Quizmaster Vragen", categoryName: "quizvragen", description: "Hoeveel algemene kennis- of kampvuurvragen kun jij goed beantwoorden binnen 30 seconden?", defaultTimeSeconds: 30 },
  { id: "cat-1", title: "🚬 Sigaretten & Tabak", categoryName: "sigarettenmerken", description: "Hoeveel verschillende sigaretten- of tabaksmerken kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-2", title: "🍺 Biermerken", categoryName: "biermerken", description: "Hoeveel verschillende biermerken (pils, speciaalbier, pilsners) kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-3", title: "🚗 Automerken", categoryName: "automerken", description: "Hoeveel automerken kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-4", title: "🍟 Fastfood & Frituursnacks", categoryName: "snacks / fastfoodketens", description: "Hoeveel fastfoodketens of bekende frituursnacks kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-5", title: "🏙️ Nederlandse & Belgische Steden", categoryName: "steden", description: "Hoeveel steden in Nederland of België kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-6", title: "🛒 Supermarkten", categoryName: "supermarkten", description: "Hoeveel supermarktketens (Nederlands of buitenlands) kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-7", title: "🤬 Scheldwoorden & Straattaal", categoryName: "scheldwoorden", description: "Hoeveel scheldwoorden en straattaalwoorden kun jij opnoemen in 10 seconden?", defaultTimeSeconds: 10 },
  { id: "cat-8", title: "⚽ Voetbalclubs", categoryName: "voetbalclubs", description: "Hoeveel professionele voetbalclubs (binnen- of buitenland) kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-9", title: "🍹 Sterke Drank & Cocktails", categoryName: "alcohol / cocktails", description: "Hoeveel soorten sterke drank en bekende cocktails kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-10", title: "👟 Kleding- & Schoenenmerken", categoryName: "kledingmerken", description: "Hoeveel kleding- of schoenenmerken kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-11", title: "🎬 Netflix Series & Films", categoryName: "films / series", description: "Hoeveel films of Netflix-series kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-12", title: "🎤 Zangers, Rappers & Bandjes", categoryName: "artiesten / rappers", description: "Hoeveel bekende zangers, zangeressen of rappers kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-13", title: "🥤 Energiedrankjes & Frisdrank", categoryName: "frisdrank / energiedrank", description: "Hoeveel frisdrank- of energiedrankmerken kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-14", title: "🏖️ Vakantiebestemmingen / Eilanden", categoryName: "vakantielanden / eilanden", description: "Hoeveel vakantielanden of eilanden kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-15", title: "🍕 Pizza's & Italiaanse Gerechten", categoryName: "pizza's / pasta's", description: "Hoeveel soorten pizza's of Italiaanse gerechten kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-16", title: "📱 Apps op je Telefoon", categoryName: "apps", description: "Hoeveel mobiele apps (Social media, games, tools) kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-17", title: "🎪 Festivals & Feesten", categoryName: "festivals", description: "Hoeveel muziekfestivals of feestconcepten kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-18", title: "🚘 Automodellen", categoryName: "automodellen", description: "Hoeveel specifieke automodellen (bijv. Golf, Polo, Civic, Mustang) kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-19", title: "🏕️ Spullen voor op de Camping", categoryName: "campingspullen", description: "Hoeveel voorwerpen die je meeneemt naar de camping kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-20", title: "🥔 Chips- & Snoepmerken", categoryName: "chips / snoep", description: "Hoeveel chipssoorten of snoepmerken kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-21", title: "🐕 Hondenrassen & Dieren", categoryName: "hondenrassen / dieren", description: "Hoeveel hondenrassen op wilde dieren kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-22", title: "🎧 Bekende DJ's", categoryName: "DJ's", description: "Hoeveel bekende nationale en internationale DJ's kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-23", title: "🏎️ Formule 1 Coureurs & Teams", categoryName: "F1 coureurs / teams", description: "Hoeveel Formule 1 coureurs of teams (nu of vroeger) kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-24", title: "🧀 Kaassoorten & Broodbeleg", categoryName: "kaas / broodbeleg", description: "Hoeveel kaassoorten of soorten broodbeleg kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-25", title: "🎮 Videogames & Consoles", categoryName: "games / consoles", description: "Hoeveel bekende videogames of spelcomputers kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-26", title: "🗼 Hoofdsteden van de Wereld", categoryName: "hoofdsteden", description: "Hoeveel wereld-hoofdsteden kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-27", title: "🥦 Groenten & Fruitsoorten", categoryName: "groenten / fruit", description: "Hoeveel groenten of fruitsoorten kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-28", title: "🎢 Pretparken & Dierentuinen", categoryName: "pretparken / dierentuinen", description: "Hoeveel pretparken of dierentuinen kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-29", title: "📺 Bekende TV Programma's", categoryName: "TV programma's", description: "Hoeveel Nederlandse TV programma's of reality shows kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-30", title: "⚓ Scheeps- / Bootsoorten", categoryName: "bootsoorten", description: "Hoeveel soorten vaartuigen of boten kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-31", title: "🍦 IJssoorten & IJsmerken", categoryName: "ijsjes / ijsmerken", description: "Hoeveel ijssoorten of ijsmerken kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-32", title: "🎸 Bekende Rock & Pop Bands", categoryName: "muziek bands", description: "Hoeveel bekende bands kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-33", title: "🛸 Superhero / Marvel Characters", categoryName: "superhelden", description: "Hoeveel superhelden of Marvel/DC personages kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-34", title: "🥊 Bekende Sporters", categoryName: "sporters", description: "Hoeveel bekende Nederlandse of internationale topsporters kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-35", title: "☕ Koffie- & Theesoorten", categoryName: "koffie / thee", description: "Hoeveel verschillende soorten koffie of thee kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-36", title: "📱 Social Media Platformen", categoryName: "social media", description: "Hoeveel social media netwerken en apps kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-37", title: "🧰 Gereedschap & Bouwspullen", categoryName: "gereedschap", description: "Hoeveel stukken gereedschap of bouwspullen kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-38", title: "✈️ Luchtvaartmaatschappijen", categoryName: "vliegmaatschappijen", description: "Hoeveel luchtvaartmaatschappijen kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-39", title: "🍣 Japanse & Aziatische Gerechten", categoryName: "Aziatisch eten", description: "Hoeveel Aziatische gerechten kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-40", title: "🏰 Disney Films & Personages", categoryName: "Disney personages", description: "Hoeveel bekende Disney personages of animatiefilms kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-41", title: "🍫 Chocolademerken & Repen", categoryName: "chocolademerk", description: "Hoeveel chocolademerken of repen kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-42", title: "🎾 Sporten & Atletiek", categoryName: "sporttakken", description: "Hoeveel verschillende beoefende sporten kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-43", title: "📺 Reality TV Shows", categoryName: "reality shows", description: "Hoeveel reality TV programma's kun jij noemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-44", title: "🍇 Fruitsoorten & Bessen", categoryName: "fruit & bessen", description: "Hoeveel verschillende fruitsoorten of bessen kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 },
  { id: "cat-45", title: "🍺 Speciaalbieren & Blondjes", categoryName: "speciaalbieren", description: "Hoeveel specifieke namen van speciaalbieren kun jij opnoemen in 15 seconden?", defaultTimeSeconds: 15 }
];
