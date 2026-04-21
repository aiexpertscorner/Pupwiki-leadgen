import affiliateData from './affiliate-products.json';

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
  image: string;
  merchant: string;
  category: string;
}

export const affiliateProducts: AffiliateProduct[] = affiliateData as AffiliateProduct[];

export const getAffiliateProducts = (limit?: number) => {
  return limit ? affiliateProducts.slice(0, limit) : affiliateProducts;
};

export const getProductsByCategory = (category: string) => {
  return affiliateProducts.filter(p => p.category === category);
};
