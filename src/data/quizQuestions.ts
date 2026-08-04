export interface QuizQuestion {
  id: string;
  category: '🍺 BIER & DRANK' | '🏎️ SPORT & F1' | '🎵 HIPHOP & FEESTHITS' | '📲 MEMES & TIKTOK' | '🎬 REALITY & TV';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 🎵 HIPHOP & FEESTHITS (18-25)
  {
    id: "q-1",
    category: "🎵 HIPHOP & FEESTHITS",
    question: "Welke Nederlandse zangeres scoorde een gigantische hit met het nummer 'Sugardaddy'?",
    options: ["MEAU", "Roxy Dekker", "Suzan & Freek", "Froukje"],
    correctIndex: 1,
    explanation: "Roxy Dekker scoorde een megahit met 'Sugardaddy' en 'Satisfyer'!"
  },
  {
    id: "q-2",
    category: "🎵 HIPHOP & FEESTHITS",
    question: "Welke Haagse band werd in 1 klap beroemd met nummers als 'Noodgeval' en 'Jaap Resema'?",
    options: ["Chef'Special", "Direct", "Goldband", "Krang"],
    correctIndex: 2,
    explanation: "Goldband uit Den Haag veroverde alle festivals met Noodgeval!"
  },
  {
    id: "q-3",
    category: "🎵 HIPHOP & FEESTHITS",
    question: "Met welk nummer vertegenwoordigde Joost Klein Nederland op het Eurovisie Songfestival?",
    options: ["Frikandel Speciaal", "Europapa", "Wachtmuziek", "Friesenjung"],
    correctIndex: 1,
    explanation: "Joost Klein brak het internet af met Europapa!"
  },
  {
    id: "q-4",
    category: "🎵 HIPHOP & FEESTHITS",
    question: "Welke bekende Haagse feest-groep zingt 'Pads Geweest' en maakt studentenhits?",
    options: ["Turfy Gang", "Bankzitters", "Pim & Pom", "Kusjesdag"],
    correctIndex: 0,
    explanation: "Turfy Gang scoorde enorme hits in de studenten- en feestwereld!"
  },
  {
    id: "q-5",
    category: "🎵 HIPHOP & FEESTHITS",
    question: "Welk nummer van Lil Kleine en Ronnie Flex werd in 2015 de allereerste #1 hiphop-hit in Nederland?",
    options: ["Krantenwijk", "Drank & Dronken", "Drank & Drugs", "Loterij"],
    correctIndex: 2,
    explanation: "Drank & Drugs veranderde de Nederlandse hiphop-industrie in 2015!"
  },

  // 🍺 BIER & DRANK (18-25)
  {
    id: "q-6",
    category: "🍺 BIER & DRANK",
    question: "Wat zit er verplicht in de beruchte 'Jägerbomb' shot?",
    options: ["Jägermeister + Vodka", "Jägermeister + Red Bull", "Jägermeister + Cola", "Jägermeister + Bier"],
    correctIndex: 1,
    explanation: "Een Jägerbomb is een shotglas Jägermeister laten vallen in een glas Red Bull!"
  },
  {
    id: "q-7",
    category: "🍺 BIER & DRANK",
    question: "Welk iconisch shotje met een geel/rood dopje heeft een eendje op het flesje?",
    options: ["Trojka", "Flügel", "Boswandeling", "Rocketshot"],
    correctIndex: 1,
    explanation: "Flügel! Flesje op de neus en tikken op de bar!"
  },
  {
    id: "q-8",
    category: "🍺 BIER & DRANK",
    question: "Hoeveel procent alcohol bevat een standaard flesje Baco (Bacardi Cola) premix?",
    options: ["5.0%", "7.0%", "10.0%", "14.0%"],
    correctIndex: 0,
    explanation: "Een Baco premix blikje zit rond de 5.0% alcohol!"
  },
  {
    id: "q-9",
    category: "🍺 BIER & DRANK",
    question: "Wat is de naam van het befaamde spaanse feesteiland waar duizenden jongeren zomervakantie vieren?",
    options: ["Ibiza", "Mallorca", "Chersonissos", "Lloret de Mar"],
    correctIndex: 1,
    explanation: "El Arenal op Mallorca en Lloret de Mar zijn de jongeren hotspots!"
  },
  {
    id: "q-10",
    category: "🍺 BIER & DRANK",
    question: "Welk biermerk staat bekend om het flesje met de beugeldop die met een harde 'PLOP' opengaat?",
    options: ["Heineken", "Grolsch", "Bavaria", "Brand"],
    correctIndex: 1,
    explanation: "De iconische Grolsch Beugelfles!"
  },

  // 📲 MEMES & TIKTOK (18-25)
  {
    id: "q-11",
    category: "📲 MEMES & TIKTOK",
    question: "Welke bekende Nederlandse YouTuber-groep bestaat uit Milo, Matthy, Raoul, Robbert en Koen?",
    options: ["StukTV", "Bankzitters", "Ponkers", "Furtjuh"],
    correctIndex: 1,
    explanation: "De Bankzitters veroveren YouTube, Spotify en de hitlijsten!"
  },
  {
    id: "q-12",
    category: "📲 MEMES & TIKTOK",
    question: "Wie is het gezicht van de virale quote: 'Een koekje van eigen deeg, met een beetje mayo'?",
    options: ["Mastermovies", "Rundfunk", "Sluipschutters", "Geer & Goor"],
    correctIndex: 0,
    explanation: "Mastermovies classics zoals Arie & Bastiaan!"
  },
  {
    id: "q-13",
    category: "📲 MEMES & TIKTOK",
    question: "Welk beroemd videogame platform gebruikt de slogan 'Victory Royale' als je wint?",
    options: ["Call of Duty", "Fortnite", "Apex Legends", "PUBG"],
    correctIndex: 1,
    explanation: "Fortnite Battle Royale!"
  },
  {
    id: "q-14",
    category: "📲 MEMES & TIKTOK",
    question: "Welk getal is op internet- en memecultuur beroemd vanwege de datum 20 april (w**d day)?",
    options: ["69", "420", "666", "1337"],
    correctIndex: 1,
    explanation: "420 is de ultieme internet meme!"
  },

  // 🎬 REALITY & TV (18-25)
  {
    id: "q-15",
    category: "🎬 REALITY & TV",
    question: "In welk realityprogramma gaan koppels naar een tropisch eiland om te testen of ze verleiding kunnen weerstaan?",
    options: ["Ex on the Beach", "Temptation Island", "Love Island", "De Bachelorette"],
    correctIndex: 1,
    explanation: "Temptation Island, waar de kampvuur-ceremonies plaatsvinden!"
  },
  {
    id: "q-16",
    category: "🎬 REALITY & TV",
    question: "Wat roepen de kandidaten van Ex on the Beach als er een nieuwe ex uit de zee komt lopen?",
    options: ["DE TERROR TABLET!", "DE RECYCLE BEL!", "DE EX ALARM!", "DE ALARM KNOP!"],
    correctIndex: 0,
    explanation: "De Terror Tablet stelt nooit teleur!"
  },
  {
    id: "q-17",
    category: "🎬 REALITY & TV",
    question: "In de cult-serie New Kids, wat is de favoriete snack van Richard, Rikkert, Robbie, Barrie en Gerrie?",
    options: ["Kroket", "Frikandel Speciaal", "Broodje Bakpao", "Kapsalon"],
    correctIndex: 2,
    explanation: "Broodje Bakpao, kut!"
  },

  // 🏎️ SPORT & F1 (18-25)
  {
    id: "q-18",
    category: "🏎️ SPORT & F1",
    question: "Voor welk Formule 1 team rijdt Max Verstappen al jarenlang zijn races?",
    options: ["Ferrari", "Mercedes", "Red Bull Racing", "McLaren"],
    correctIndex: 2,
    explanation: "Red Bull Racing!"
  },
  {
    id: "q-19",
    category: "🏎️ SPORT & F1",
    question: "Welke Nederlandse voetballer maakte de legendarische 'Vliegende Hollander' kopbal op het WK 2014 tegen Spanje?",
    options: ["Arjen Robben", "Robin van Persie", "Wesley Sneijder", "Memphis Depay"],
    correctIndex: 1,
    explanation: "Robin van Persie zweefde door de lucht tegen Spanje!"
  },
  {
    id: "q-20",
    category: "🏎️ SPORT & F1",
    question: "Hoe heet de populairste jaarlijkse voetbalgame van EA Sports die voorheen FIFA heette?",
    options: ["eFootball", "EA Sports FC", "Ultimate Team", "UFL Football"],
    correctIndex: 1,
    explanation: "EA Sports FC (EA FC 24 / EA FC 25)!"
  }
];
