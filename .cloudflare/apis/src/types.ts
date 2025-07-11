interface Model {
  id: string;
  name: string;
  provider_id: string;
  [key: string]: any;
}

interface SearchResult {
  model: Model;
  score: number;
}
