export interface Destination {
  id: number;
  name: string;
  clues: string[];
  facts: string[];
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Taj Mahal",
    clues: [
      "I am a monument of eternal love",
      "My white marble walls change color with the light",
      "I took over 20 years to complete with help from 20,000 artisans",
      "I stand proudly in Agra, India",
    ],
    facts: [
      "Built between 1632 and 1653",
      "Commissioned by Mughal Emperor Shah Jahan",
      "The architecture combines Persian, Ottoman Turkish and Indian styles",
      "The main mausoleum was completed in 1643",
    ],
    image: "taj-mahal.jpg",
  },
  {
    id: 2,
    name: "Machu Picchu",
    clues: [
      "I am a city in the clouds",
      "The Inca built me without using wheels",
      "I remained hidden from the Spanish conquistadors",
      "I sit high in the Andes mountains",
    ],
    facts: [
      "Built in the 15th century",
      "Discovered by Hiram Bingham in 1911",
      "Located 7,970 feet above sea level",
      "Named a UNESCO World Heritage Site in 1983",
    ],
    image: "machu-picchu.jpg",
  },
  // Add more destinations...
];
