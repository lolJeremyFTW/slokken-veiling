export interface QuizQuestion {
  id: string;
  category: '🎤 OLD SCHOOL HIPHOP' | '🎬 RAUWE FILMS & CRIME' | '⚽ VOETBAL & VECHTSPORT' | '🍺 RAUWE DRANK' | '🧠 STRATEN KENNIS';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 🎤 OLD SCHOOL HIPHOP
  {
    id: "q-1",
    category: "🎤 OLD SCHOOL HIPHOP",
    question: "Uit welke New Yorkse wijk komt de legendarische rap-groep Wu-Tang Clan?",
    options: ["Queens", "Brooklyn", "Staten Island (Shaolin)", "The Bronx"],
    correctIndex: 2,
    explanation: "Wu-Tang Clan komt uit Staten Island, door hen omgedoopt tot Shaolin!"
  },
  {
    id: "q-2",
    category: "🎤 OLD SCHOOL HIPHOP",
    question: "Welke Zwolse rap-groep (met Rico, Sticks en Delic) bracht het meesterwerk album 'Eigen Wereld' uit?",
    options: ["Zwart Licht", "Opgezwolle", "Great Minds", "Osdorp Posse"],
    correctIndex: 1,
    explanation: "Opgezwolle bracht in 2006 het legendarische album 'Eigen Wereld' uit!"
  },
  {
    id: "q-3",
    category: "🎤 OLD SCHOOL HIPHOP",
    question: "Wat was het allereerste dubbel-album in de geschiedenis van de hiphop, uitgebracht door 2Pac in 1996?",
    options: ["Me Against The World", "All Eyez On Me", "Don Killuminati", "Strictly 4 My N.I.G.G.A.Z."],
    correctIndex: 1,
    explanation: "All Eyez On Me was de allereerste rap dubbel-CD ooit!"
  },
  {
    id: "q-4",
    category: "🎤 OLD SCHOOL HIPHOP",
    question: "Welke Rotterdamse rapper staat bekend om zijn rauwe mixtapes 'Puur' en nummers over de straat?",
    options: ["Hef", "Winne", "Feis", "Kevin"],
    correctIndex: 0,
    explanation: "Hef (Koning van de straat) brak door met Puur!"
  },
  {
    id: "q-5",
    category: "🎤 OLD SCHOOL HIPHOP",
    question: "Welke legendarische album van Nas uit 1994 wordt door hiphop-puristen gezien als het beste rap-album aller tijden?",
    options: ["It Was Written", "Illmatic", "Stillmatic", "God's Son"],
    correctIndex: 1,
    explanation: "Illmatic uit 1994 is de absolute heilige graal van de old school hiphop!"
  },

  // 🎬 RAUWE FILMS & CRIME
  {
    id: "q-6",
    category: "🎬 RAUWE FILMS & CRIME",
    question: "Wat is de iconische quote van Al Pacino in de film Scarface wanneer hij met zijn M16 schiet?",
    options: ["'I'm gonna make him an offer'", "'Say hello to my little friend!'", "'You talking to me?'", "'Keep your friends close'"],
    correctIndex: 1,
    explanation: "SAY HELLO TO MY LITTLE FRIEND!"
  },
  {
    id: "q-7",
    category: "🎬 RAUWE FILMS & CRIME",
    question: "Hoe heet de meedogenloze bendeleider uit de Britse misdaadserie 'Peaky Blinders'?",
    options: ["Arthur Shelby", "Tommy Shelby", "John Shelby", "Alfies Solomons"],
    correctIndex: 1,
    explanation: "Thomas (Tommy) Shelby, played by Cillian Murphy!"
  },
  {
    id: "q-8",
    category: "🎬 RAUWE FILMS & CRIME",
    question: "In de rauwe Nederlandse misdaadserie Mocro Maffia, hoe heet het personage gespeeld door Robert de Hoog?",
    options: ["Tatta", "Romano", "Pencil", "Jaouad"],
    correctIndex: 0,
    explanation: "Tatta!"
  },
  {
    id: "q-9",
    category: "🎬 RAUWE FILMS & CRIME",
    question: "In de cult-film Pulp Fiction van Quentin Tarantino, hoe noemen ze een 'Quarter Pounder with Cheese' in Parijs?",
    options: ["Le Mac Big", "Royale with Cheese", "Le Burger Deluxe", "Cheese Quarter"],
    correctIndex: 1,
    explanation: "Royale with cheese, because of the metric system!"
  },

  // ⚽ VOETBAL & VECHTSPORT
  {
    id: "q-10",
    category: "⚽ VOETBAL & VECHTSPORT",
    question: "Tegen welk land gaf Zinedine Zidane zijn beruchte kopstoot in de WK-finale van 2006?",
    options: ["Brazilië", "Duitsland", "Italië", "Spanje"],
    correctIndex: 2,
    explanation: "Zidane gaf Materazzi van Italië een kopstoot op de borst!"
  },
  {
    id: "q-11",
    category: "⚽ VOETBAL & VECHTSPORT",
    question: "Welke legendarische bokser beet in 1997 een stuk uit het oor van zijn tegenstander Evander Holyfield?",
    options: ["George Foreman", "Mike Tyson", "Muhammad Ali", "Floyd Mayweather"],
    correctIndex: 1,
    explanation: "Iron Mike Tyson!"
  },
  {
    id: "q-12",
    category: "⚽ VOETBAL & VECHTSPORT",
    question: "Welke Zweedse spits staat bekend om zijn uitspraak: 'Zlatan doesn't do auditions'?",
    options: ["Henrik Larsson", "Zlatan Ibrahimović", "Alexander Isak", "Viktor Gyökeres"],
    correctIndex: 1,
    explanation: "Zlatan Ibrahimović!"
  },

  // 🍺 RAUWE DRANK
  {
    id: "q-13",
    category: "🍺 RAUWE DRANK",
    question: "Uit welk land komt de oersterke rum 'Stroh 80' met 80% alcohol?",
    options: ["Duitsland", "Oostenrijk", "Polen", "Rusland"],
    correctIndex: 1,
    explanation: "Stroh komt uit Oostenrijk en sloopt elke keel!"
  },
  {
    id: "q-14",
    category: "🍺 RAUWE DRANK",
    question: "Wat is het hoofdbestanddeel van een klassieke Scotch Single Malt Whiskey?",
    options: ["Geweekte maïs", "Gecultiveerde gerst (mout)", "Rogge", "Aardappel"],
    correctIndex: 1,
    explanation: "Single Malt wordt gemaakt van 100% gemoute gerst!"
  },
  {
    id: "q-15",
    category: "🍺 RAUWE DRANK",
    question: "Volgens het eeuwenoude kampvuur-geloof: Welk bier moet verplicht op kamertemperatuur gedronken worden?",
    options: ["Klok bier", "Schultenbräu", "Bavaria", "Pitt bier"],
    correctIndex: 0,
    explanation: "Een man van cultuur drinkt z'n Klok op kamertemperatuur!"
  },

  // 🧠 STRATEN KENNIS
  {
    id: "q-16",
    category: "🧠 STRATEN KENNIS",
    question: "Wat betekent het straattaalwoord 'Esko' of 'Esko zetten'?",
    options: ["Slapen", "Chillen / Iets goeds regelen", "Vluchten", "Vechten"],
    correctIndex: 1,
    explanation: "Esko zetten = de boel goed regelen!"
  },
  {
    id: "q-17",
    category: "🧠 STRATEN KENNIS",
    question: "Welke Amerikaanse rap-groep bracht het iconische nummer 'Straight Outta Compton' uit in 1988?",
    options: ["Run-DMC", "N.W.A", "Public Enemy", "Cypress Hill"],
    correctIndex: 1,
    explanation: "N.W.A (Dr. Dre, Ice Cube, Eazy-E, MC Ren, DJ Yella)!"
  }
];
