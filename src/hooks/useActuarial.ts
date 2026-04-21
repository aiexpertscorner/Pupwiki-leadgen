import { useMemo } from 'react';
import ageFactorsData from '../data/actuarial-age-factors.json';
import breedRatesData from '../data/actuarial-breed-rates.json';
import statesIndexData from '../data/us-states-index.json';

export interface ActuarialResult {
  basePremium: number;
  ageFactor: number;
  stateMultiplier: number;
  finalMonthlyPremium: number;
  riskCategory: string;
  isEstimate: boolean;
}

export const useActuarial = (breedSlug: string, ageYears: number, stateCode: string) => {
  return useMemo(() => {
    // 1. Find Base Breed Rate
    const breedRate = breedRatesData.breed_rates.find(r => r.breed_slug === breedSlug);
    const basePremium = breedRate?.base_premium || 43.0; // Fallback to national average
    const riskCategory = breedRate?.risk_category || 'Standard';

    // 2. Find Age Factor
    const ageFactorEntry = ageFactorsData.age_factors.find(f => 
      ageYears >= f.min_age_years && ageYears <= f.max_age_years
    );
    // If age is beyond 14, use the last factor (3.53) as suggested by meta
    const ageFactor = ageFactorEntry?.premium_factor || (ageYears > 14 ? 3.53 : 1.0);

    // 3. Find State Multiplier
    const stateEntry = statesIndexData.states.find(s => s.code === stateCode);
    const stateMultiplier = stateEntry?.cost_multiplier || 1.0;

    // 4. Calculate Final
    const finalMonthlyPremium = basePremium * ageFactor * stateMultiplier;

    return {
      basePremium,
      ageFactor,
      stateMultiplier,
      finalMonthlyPremium,
      riskCategory,
      isEstimate: !breedRate || !stateEntry
    };
  }, [breedSlug, ageYears, stateCode]);
};
