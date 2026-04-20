export interface BreedHealthRisk {
  condition: string;
  probability: "Low" | "Medium" | "High";
  avgCost: number;
  description: string;
}

export type BreedSize = "Small" | "Medium" | "Large";

export interface BreedData {
  id: string;
  name: string;
  slug: string;
  description: string;
  size: BreedSize;
  temperament: string[];
  origin: string;
  traits: {
    energyLevel: number; // 1-10
    trainability: number; // 1-10
    shedding: number; // 1-10
    lifespan: string;
    weight: string;
  };
  healthRisks: BreedHealthRisk[];
  avgMonthlyInsurance: number;
  image: string;
}

export const breeds: BreedData[] = [
  {
    id: "1",
    name: "French Bulldog",
    slug: "french-bulldog",
    description: "The French Bulldog is a popular companion breed known for its compact size, 'bat ears', and affectionate nature.",
    size: "Small",
    temperament: ["Affectionate", "Patient", "Playful", "Calm"],
    origin: "France",
    traits: {
      energyLevel: 4,
      trainability: 6,
      shedding: 2,
      lifespan: "10-12 years",
      weight: "16-28 lbs"
    },
    healthRisks: [
      {
        condition: "BOAS",
        probability: "High",
        avgCost: 3500,
        description: "Brachycephalic Obstructive Airway Syndrome affects breathing."
      },
      {
        condition: "Intervertebral Disc Disease",
        probability: "High",
        avgCost: 6000,
        description: "Condition affecting the spinal cord."
      }
    ],
    avgMonthlyInsurance: 85,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    name: "Golden Retriever",
    slug: "golden-retriever",
    description: "Golden Retrievers are energetic, friendly, and reliable dogs. They are excellent family pets.",
    size: "Large",
    temperament: ["Friendly", "Intelligent", "Reliable", "Kind"],
    origin: "Scotland",
    traits: {
      energyLevel: 8,
      trainability: 10,
      shedding: 8,
      lifespan: "10-12 years",
      weight: "55-75 lbs"
    },
    healthRisks: [
      {
        condition: "Hip & Elbow Dysplasia",
        probability: "High",
        avgCost: 4500,
        description: "Common joint issues in larger breeds."
      },
      {
        condition: "Hemangiosarcoma",
        probability: "Medium",
        avgCost: 8000,
        description: "A fast-growing cancer common in the breed."
      }
    ],
    avgMonthlyInsurance: 60,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    name: "Poodle",
    slug: "poodle",
    description: "Poodles are highly intelligent and energetic. They come in three sizes but all share a hypoallergenic coat.",
    size: "Medium",
    temperament: ["Intelligent", "Active", "Alert", "Trainable"],
    origin: "Germany",
    traits: {
      energyLevel: 7,
      trainability: 9,
      shedding: 1,
      lifespan: "12-15 years",
      weight: "40-70 lbs"
    },
    healthRisks: [
      {
        condition: "Addison's Disease",
        probability: "Low",
        avgCost: 3000,
        description: "Hormonal disorder affecting adrenal glands."
      }
    ],
    avgMonthlyInsurance: 55,
    image: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    name: "Chihuahua",
    slug: "chihuahua",
    description: "The smallest dog breed, Chihuahuas are known for their big personalities and devotion to their owners.",
    size: "Small",
    temperament: ["Devoted", "Lively", "Alert", "Courageous"],
    origin: "Mexico",
    traits: {
      energyLevel: 6,
      trainability: 5,
      shedding: 2,
      lifespan: "14-16 years",
      weight: "2-6 lbs"
    },
    healthRisks: [
      {
        condition: "Patellar Luxation",
        probability: "High",
        avgCost: 2000,
        description: "Kneecap dislocation common in small breeds."
      }
    ],
    avgMonthlyInsurance: 40,
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    name: "German Shepherd",
    slug: "german-shepherd",
    description: "German Shepherds are courageous, intelligent, and versatile working dogs.",
    size: "Large",
    temperament: ["Confident", "Cunning", "Courageous", "Alert"],
    origin: "Germany",
    traits: {
      energyLevel: 9,
      trainability: 10,
      shedding: 6,
      lifespan: "9-13 years",
      weight: "50-90 lbs"
    },
    healthRisks: [
      {
        condition: "Degenerative Myelopathy",
        probability: "Medium",
        avgCost: 1500,
        description: "Progressive spinal cord disease."
      }
    ],
    avgMonthlyInsurance: 75,
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800"
  }
];
