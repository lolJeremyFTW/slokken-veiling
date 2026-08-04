export interface QuizQuestion {
  id: string;
  category: '🍺 BIER & ALCOHOL' | '🏎️ SPORT & F1' | '🎵 MUZIEK & HITS' | '🧠 MAFFE FEITJES' | '🎬 FILMS & TV';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 🍺 BIER & ALCOHOL
  {
    id: "q-1",
    category: "🍺 BIER & ALCOHOL",
    question: "Welk biermerk gebruikt het motto 'Vakmanschap is Meesterschap'?",
    options: ["Heineken", "Grolsch", "Hertog Jan", "Amstel"],
    correctIndex: 1,
    explanation: "Grolsch gebruikt sinds 1959 de beroemde leus 'Vakmanschap is Meesterschap'!"
  },
  {
    id: "q-2",
    category: "🍺 BIER & ALCOHOL",
    question: "Uit welk land komt de bekende cocktail 'Mojito' oorspronkelijk?",
    options: ["Mexico", "Spanje", "Cuba", "Brazilië"],
    correctIndex: 2,
    explanation: "Mojito is uitgevonden in Havana, Cuba!"
  },
  {
    id: "q-3",
    category: "🍺 BIER & ALCOHOL",
    question: "Hoeveel procent alcohol bevat een standaard blikje Klok bier op kamertemperatuur?",
    options: ["4.8%", "5.0%", "8.5%", "11.6%"],
    correctIndex: 1,
    explanation: "Een echte gladiator drinkt Klok van 5.0% op kamertemperatuur!"
  },
  {
    id: "q-4",
    category: "🍺 BIER & ALCOHOL",
    question: "Wat is de hoofdingrediënt van de Mexicaanse drank Tequila?",
    options: ["Suikerriet", "Blauwe Agave", "Cactusvijg", "Maïs"],
    correctIndex: 1,
    explanation: "Echte Tequila wordt gemaakt van het sap van de Blauwe Agave plant!"
  },
  {
    id: "q-5",
    category: "🍺 BIER & ALCOHOL",
    question: "Welk Belgisch speciaalbier heeft een kabouter met een rode muts op het etiket?",
    options: ["Duvel", "La Chouffe", "Kasteelbier", "Delirium Tremens"],
    correctIndex: 1,
    explanation: "La Chouffe staat bekend om de kabouter Marcel met zijn rode muts!"
  },

  // 🏎️ SPORT & F1
  {
    id: "q-6",
    category: "🏎️ SPORT & F1",
    question: "In welk jaar werd Max Verstappen voor de allereerste keer wereldkampioen Formule 1?",
    options: ["2019", "2020", "2021", "2022"],
    correctIndex: 2,
    explanation: "Max won zijn eerste F1 wereldtitel in het legendarische seizoen 2021 in Abu Dhabi!"
  },
  {
    id: "q-7",
    category: "🏎️ SPORT & F1",
    question: "Hoeveel spelers staan er per team tegelijk op het veld bij een klassieke voetbalwedstrijd?",
    options: ["9", "10", "11", "12"],
    correctIndex: 2,
    explanation: "11 spelers inclusief de keeper!"
  },
  {
    id: "q-8",
    category: "🏎️ SPORT & F1",
    question: "Wat is de maximale score die je in 1 enkele worp met 3 pijltjes kunt gooien bij Darts?",
    options: ["140", "160", "180", "200"],
    correctIndex: 2,
    explanation: "3x Triple 20 = 180!"
  },
  {
    id: "q-9",
    category: "🏎️ SPORT & F1",
    question: "Welke club heeft de meeste UEFA Champions League titels ooit gewonnen?",
    options: ["FC Barcelona", "Bayern München", "Real Madrid", "AC Milan"],
    correctIndex: 2,
    explanation: "Real Madrid is de koning van Europa met meer dan 15 Champions League bekers!"
  },

  // 🎵 MUZIEK & HITS
  {
    id: "q-10",
    category: "🎵 MUZIEK & HITS",
    question: "Wie zong de gigantische feest-hit 'Engelbewaarder'?",
    options: ["Tino Martin", "Marco Schuitmaker", "Mart Hoogkamer", "Snollebollekes"],
    correctIndex: 1,
    explanation: "Marco Schuitmaker scoorde een megahit met Engelbewaarder!"
  },
  {
    id: "q-11",
    category: "🎵 MUZIEK & HITS",
    question: "Welke artiest staat bekend als The King of Pop?",
    options: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"],
    correctIndex: 2,
    explanation: "Michael Jackson is The King of Pop!"
  },
  {
    id: "q-12",
    category: "🎵 MUZIEK & HITS",
    question: "Wat moet je doen als de Snollebollekes zingen 'Naar Links... Naar...'?",
    options: ["Voren", "Achteren", "Rechts", "Boven"],
    correctIndex: 2,
    explanation: "Naar links... NAAR RECHTS!"
  },
  {
    id: "q-13",
    category: "🎵 MUZIEK & HITS",
    question: "Welke Nederlandse DJ werd meerdere keren uitgeroepen tot #1 DJ van de wereld op 17-jarige leeftijd?",
    options: ["Armin van Buuren", "Tiësto", "Martin Garrix", "Hardwell"],
    correctIndex: 2,
    explanation: "Martin Garrix brak op 17-jarige leeftijd door met 'Animals'!"
  },

  // 🧠 MAFFE FEITJES
  {
    id: "q-14",
    category: "🧠 MAFFE FEITJES",
    question: "Hoeveel harten heeft een inktvis (octopus)?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    explanation: "Een inktvis heeft maar liefst 3 harten!"
  },
  {
    id: "q-15",
    category: "🧠 MAFFE FEITJES",
    question: "Wat is het enige zoogdier op aarde dat echt kan vliegen?",
    options: ["Vliegende eekhoorn", "Vleermuis", "Vliegende vis", "Kolibrie"],
    correctIndex: 1,
    explanation: "Vleermuizen zijn de enige zoogdieren die actief kunnen vliegen!"
  },
  {
    id: "q-16",
    category: "🧠 MAFFE FEITJES",
    question: "Welke kleur heeft het bloed van een kreeft?",
    options: ["Rood", "Groen", "Blauw", "Geel"],
    correctIndex: 2,
    explanation: "Kreeftenbloed bevat koper (hemocyanine) waardoor het blauw is!"
  },
  {
    id: "q-17",
    category: "🧠 MAFFE FEITJES",
    question: "Wat is het snelste landdier ter wereld?",
    options: ["Jachtluipaard (Cheetah)", "Leeuw", "Antelope", "Hazewindhond"],
    correctIndex: 0,
    explanation: "De cheetah renat tot wel 120 km/u!"
  },

  // 🎬 FILMS & TV
  {
    id: "q-18",
    category: "🎬 FILMS & TV",
    question: "Hoe heet de denkbeeldige school voor magie waar Harry Potter naartoe gaat?",
    options: ["Zwerkbal", "Zweinstein", "Narnia", "Midden-Aarde"],
    correctIndex: 1,
    explanation: "Zweinstein (Hogwarts)!"
  },
  {
    id: "q-19",
    category: "🎬 FILMS & TV",
    question: "In de serie 'New Kids', in welk Brabants dorp spelen de avonturen zich af?",
    options: ["Eindhoven", "Maaskantje", "Tilburg", "Den Bosch"],
    correctIndex: 1,
    explanation: "Maaskantje, kut!"
  },
  {
    id: "q-20",
    category: "🎬 FILMS & TV",
    question: "Wat is de naam van de blauwe wezens die in een rood paddenstoelenhuis wonen?",
    options: ["Minions", "Smurfen", "Teletubbies", "Trollen"],
    correctIndex: 1,
    explanation: "De Smurfen met Grote Smurf!"
  }
];
