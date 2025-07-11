const MAX_SEARCH_LIMIT = 20;
const DEFAULT_SEARCH_LIMIT = 5;

export const parseLimit = (limit: string | undefined): number => {
  if (!limit) return DEFAULT_SEARCH_LIMIT;

  const parsed = parseInt(limit, 10);
  return isNaN(parsed) || parsed < 0 || parsed > MAX_SEARCH_LIMIT
    ? DEFAULT_SEARCH_LIMIT
    : parsed;
};

export const splitIntoWords = (text: string): string[] =>
  text.split(/[\s\-_.]/).filter(Boolean);

export const calculateScore = (model: Model, searchTerms: string[]): number => {
  const modelId = model.id?.toLowerCase() || "";
  const modelName = model.name?.toLowerCase() || "";
  const modelProvider = model.provider_id?.toLowerCase() || "";

  let score = 0;
  let matchCount = 0;

  for (const term of searchTerms) {
    let termMatched = false;

    // Direct substring matches
    if (modelId.includes(term)) {
      score += 10;
      termMatched = true;
    }
    if (modelProvider.includes(term)) {
      score += 6;
      termMatched = true;
    }

    if (!termMatched) {
      if (splitIntoWords(modelId).some((word) => word.includes(term))) {
        score += 3;
        termMatched = true;
      } else if (
        splitIntoWords(modelProvider).some((word) => word.includes(term))
      ) {
        score += 1;
        termMatched = true;
      }
    }

    if (termMatched) {
      matchCount++;
    }
  }

  // Return score only if all terms matched
  return matchCount === searchTerms.length ? score : 0;
};

export const searchModels = (
  models: Model[],
  query: string,
  limit: number,
): Model[] => {
  if (!query.trim()) {
    return models.slice(0, limit);
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return models
    .map((model) => {
      const score = calculateScore(model, searchTerms);
      return score > 0 ? { model, score } : null;
    })
    .filter((result): result is SearchResult => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.model);
};
