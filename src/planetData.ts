export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  color: string;
  texture?: string;
  description: string;
  facts: string[];
  moons: number;
  mass: string;
  temperature: string;
}

export const planetsData: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.4,
    distance: 4,
    orbitalPeriod: 88,
    rotationPeriod: 59,
    color: "#8C7853",
    description: "The smallest planet and closest to the Sun",
    facts: [
      "No atmosphere",
      "Extreme temperature variations",
      "Heavily cratered surface",
      "No moons"
    ],
    moons: 0,
    mass: "3.3 × 10²³ kg",
    temperature: "-173°C to 427°C"
  },
  {
    name: "Venus",
    radius: 0.9,
    distance: 7,
    orbitalPeriod: 225,
    rotationPeriod: 243,
    color: "#FFA500",
    description: "The hottest planet with a thick toxic atmosphere",
    facts: [
      "Rotates backwards",
      "Hottest planet in solar system",
      "Thick CO₂ atmosphere",
      "Surface pressure 90x Earth's"
    ],
    moons: 0,
    mass: "4.9 × 10²⁴ kg",
    temperature: "462°C average"
  },
  {
    name: "Earth",
    radius: 1,
    distance: 10,
    orbitalPeriod: 365,
    rotationPeriod: 1,
    color: "#6B93D6",
    description: "Our home planet, the only known planet with life",
    facts: [
      "71% of surface is water",
      "Only known planet with life",
      "Has one natural satellite",
      "Magnetic field protects from radiation"
    ],
    moons: 1,
    mass: "5.97 × 10²⁴ kg",
    temperature: "-89°C to 58°C"
  },
  {
    name: "Mars",
    radius: 0.5,
    distance: 15,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    color: "#CD5C5C",
    description: "The Red Planet with polar ice caps and the largest volcano",
    facts: [
      "Has water ice at poles",
      "Largest volcano in solar system (Olympus Mons)",
      "Day length similar to Earth",
      "Two small moons"
    ],
    moons: 2,
    mass: "6.4 × 10²³ kg",
    temperature: "-87°C to -5°C"
  },
  {
    name: "Jupiter",
    radius: 2.5,
    distance: 25,
    orbitalPeriod: 4333,
    rotationPeriod: 0.4,
    color: "#D8CA9D",
    description: "The largest planet, a gas giant with a Great Red Spot",
    facts: [
      "Largest planet in solar system",
      "Great Red Spot is a giant storm",
      "Has over 80 moons",
      "Mainly hydrogen and helium"
    ],
    moons: 95,
    mass: "1.9 × 10²⁷ kg",
    temperature: "-108°C average"
  },
  {
    name: "Saturn",
    radius: 2.1,
    distance: 35,
    orbitalPeriod: 10756,
    rotationPeriod: 0.45,
    color: "#FAD5A5",
    description: "Famous for its spectacular ring system",
    facts: [
      "Spectacular ring system",
      "Less dense than water",
      "Has over 80 moons",
      "Titan is larger than Mercury"
    ],
    moons: 146,
    mass: "5.7 × 10²⁶ kg",
    temperature: "-139°C average"
  },
  {
    name: "Uranus",
    radius: 1.8,
    distance: 50,
    orbitalPeriod: 30687,
    rotationPeriod: 0.7,
    color: "#4FD0E7",
    description: "An ice giant that rotates on its side",
    facts: [
      "Rotates on its side",
      "Made of water, methane, and ammonia",
      "Has faint rings",
      "Coldest planetary atmosphere"
    ],
    moons: 27,
    mass: "8.7 × 10²⁵ kg",
    temperature: "-197°C average"
  },
  {
    name: "Neptune",
    radius: 1.7,
    distance: 65,
    orbitalPeriod: 60190,
    rotationPeriod: 0.67,
    color: "#4169E1",
    description: "The windiest planet with speeds up to 2,100 km/h",
    facts: [
      "Windiest planet in solar system",
      "Deep blue color from methane",
      "Has 14 known moons",
      "Takes 165 years to orbit the Sun"
    ],
    moons: 14,
    mass: "1.0 × 10²⁶ kg",
    temperature: "-201°C average"
  }
];

export const sunData = {
  name: "Sun",
  radius: 3,
  color: "#FDB813",
  description: "The star at the center of our solar system",
  facts: [
    "Contains 99.86% of the system's mass",
    "Surface temperature: 5,778 K (5,505°C)",
    "Core temperature: 15 million°C",
    "Produces energy through nuclear fusion"
  ],
  mass: "1.989 × 10³⁰ kg",
  temperature: "5,505°C surface"
};