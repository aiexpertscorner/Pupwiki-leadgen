import masterData from './master-breeds.json';
import crossbreedData from './crossbreeds-master-schema-enriched.json';

export interface BreedHealthRisk {
  condition: string;
  probability: "Low" | "Medium" | "High" | "low" | "medium" | "high";
  avgCost: number;
  description: string;
}

export type BreedSize = "Small" | "Medium" | "Large" | "small" | "medium" | "large";
export type RiskTier = "A" | "B" | "C" | "D"; 

export interface BreedData {
  id: string;
  name: string;
  slug: string;
  description: string;
  size: BreedSize;
  temperament: string | string[];
  origin: string;
  isHypoallergenic: boolean;
  isCrossbreed: boolean;
  parentLinks?: string[]; 
  lineage?: string; 
  riskTier: RiskTier;
  traits: {
    energyLevel: number; 
    trainability: number; 
    shedding: number; 
    lifespan: string;
    weight: string;
    energy_value?: number;
    shedding_value?: number;
    grooming_value?: number;
    trainability_value?: number;
    demeanor_value?: number;
  };
  healthRisks: BreedHealthRisk[];
  avgMonthlyInsurance: number;
  image: string;
  // Crossbreed specific
  parent_breeds?: {
    name: string;
    slug: string;
    size_category: string;
  }[];
  parent_blend_summary?: string;
  // Extended SEO & EEAT Data
  care_tips?: string[];
  grooming_freq?: string;
  seo?: {
    title: string;
    description: string;
    meta_description?: string;
    rich_content?: string;
  };
  ranking_data?: {
    intelligence_rank?: number;
    intelligence_pct?: string;
    intelligence_index?: string;
    intelligence_label?: string;
    grooming_label?: string;
    lifetime_cost_usd?: number;
    annual_food_cost?: number;
    purchase_price_usd?: number;
    longevity_years?: number;
    genetic_ailments?: number;
    genetic_ailment_names?: string;
    children_score?: number;
    overall_score?: number;
    breed_type?: string;
  };
  product_picks?: any; // Updated to any to support the new object structure
  akc_group?: string;
  akc_popularity?: number;
}

// Transformation helper to normalize master data
const transformMasterData = (data: any[]): BreedData[] => {
  return data.map((item, index) => ({
    id: `m-${index}`,
    name: item.name,
    slug: item.slug,
    description: item.description,
    size: (item.size_category?.charAt(0).toUpperCase() + item.size_category?.slice(1)) as BreedSize || "Medium",
    temperament: typeof item.temperament === 'string' ? item.temperament.split(', ') : item.temperament,
    origin: item.origin_country || "Unknown",
    isHypoallergenic: item.shedding_level === 'minimal' || item.description?.toLowerCase().includes('hypoallergenic') || false,
    isCrossbreed: false,
    riskTier: item.akc_popularity < 20 ? "A" : item.akc_popularity < 50 ? "B" : "C",
    traits: {
      energyLevel: Math.round((item.traits?.energy_value || 0.5) * 10),
      trainability: Math.round((item.traits?.trainability_value || 0.5) * 10),
      shedding: Math.round((item.traits?.shedding_value || 0.5) * 10),
      lifespan: `${item.life_expectancy?.min || 10}-${item.life_expectancy?.max || 12} years`,
      weight: `${item.weight?.min_lbs || 0}-${item.weight?.max_lbs || 0} lbs`,
      ...item.traits
    },
    healthRisks: [
      {
        condition: item.ranking_data?.genetic_ailment_names?.split(', ')[0] || "General Health",
        probability: "Medium",
        avgCost: 2500,
        description: `Potential risk related to ${item.ranking_data?.genetic_ailment_names || 'breed-specific genetics'}.`
      }
    ],
    avgMonthlyInsurance: Math.round(50 + (item.akc_popularity < 10 ? 20 : 0)),
    image: item.image_url || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
    ...item
  }));
};

const processedMasterBreeds = transformMasterData(masterData);

const processedCrossbreeds: BreedData[] = (crossbreedData as any[]).map((item, index) => {
  const genetics = item.ranking_data?.genetic_ailment_names || item.crossbreed_health_specific_risks_csv || "General Health";
  
  return {
    ...item,
    id: `c-${index}`,
    size: (item.size_category?.charAt(0).toUpperCase() + item.size_category?.slice(1)) as BreedSize || "Medium",
    temperament: typeof item.temperament === 'string' ? item.temperament.split(', ') : item.temperament || [],
    origin: item.origin_country || "Unknown",
    isHypoallergenic: item.description?.toLowerCase().includes('low shed') || item.description?.toLowerCase().includes('hypoallergenic') || false,
    isCrossbreed: true,
    riskTier: "B",
    traits: {
      ...item.traits,
      energyLevel: Math.round((item.traits?.energy_value || 0.6) * 10),
      trainability: Math.round((item.traits?.trainability_value || 0.6) * 10),
      shedding: Math.round((item.traits?.shedding_value || 0.4) * 10),
      lifespan: `${item.life_expectancy?.min || 10}-${item.life_expectancy?.max || 15} years`,
      weight: `${item.weight?.min_lbs || 0}-${item.weight?.max_lbs || 0} lbs`,
    },
    healthRisks: genetics.split(', ').map((name: string) => ({
      condition: name,
      probability: "Medium",
      avgCost: 3500,
      description: `A common health monitoring area for ${item.name}.`
    })),
    avgMonthlyInsurance: 60,
    image: item.image_url || `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800&sig=${item.slug}`,
  };
});

export const breeds: BreedData[] = [...processedMasterBreeds, ...processedCrossbreeds];
