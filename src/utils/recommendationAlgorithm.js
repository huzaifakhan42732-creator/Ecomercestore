import { products, categories } from '../data/productsData.js';

export const getCategories = () => {
  return ['All', ...new Set(products.map(p => p.category))];
};

export const getRecommendations = (viewedProductIds, limit = 4) => {
  if (viewedProductIds.length === 0) {
    return products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  const viewedCategories = viewedProductIds
    .map(id => products.find(p => p.id === id)?.category)
    .filter(Boolean);

  const viewedTags = viewedProductIds
    .flatMap(id => products.find(p => p.id === id)?.tags || []);

  return products
    .filter(p => !viewedProductIds.includes(p.id))
    .map(p => {
      let score = 0;

      if (viewedCategories.includes(p.category)) score += 3;

      const tagMatches = p.tags.filter(tag => viewedTags.includes(tag)).length;
      score += tagMatches;

      score += p.rating;

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
