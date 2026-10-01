import { products, categories, Product } from './data';

// --- Tokenizer ---

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'it', 'in', 'on', 'of', 'to', 'for', 'and', 'or',
  'but', 'with', 'as', 'at', 'by', 'from', 'be', 'are', 'was', 'were', 'been',
  'has', 'have', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'shall', 'can', 'this', 'that', 'these', 'those', 'i', 'you',
  'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
  'his', 'its', 'our', 'their', 'what', 'which', 'who', 'whom', 'where', 'when',
  'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
  'some', 'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
  'very', 'just', 'because', 'if', 'then', 'else', 'while', 'about', 'up',
  'out', 'off', 'over', 'under', 'again', 'further', 'once', 'here', 'there',
  'any', 'also', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'now', 'even', 'still', 'well', 'back', 'much',
  'many', 'get', 'got', 'make', 'made', 'like', 'want', 'love', 'one', 'two',
  'per', 'via', 'our',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

// --- Sparse vector types ---

export type SparseVector = Map<string, number>;

// --- TF-IDF Vectorizer ---

interface VectorizerOutput {
  idf: SparseVector;
  tfidfVectors: SparseVector[];
}

function computeIdf(corpus: string[][]): SparseVector {
  const N = corpus.length;
  const df = new Map<string, number>();
  for (const tokens of corpus) {
    const unique = new Set(tokens);
    for (const t of unique) {
      df.set(t, (df.get(t) ?? 0) + 1);
    }
  }
  const idf = new Map<string, number>();
  for (const [term, freq] of df) {
    idf.set(term, Math.log((N + 1) / (freq + 1)) + 1);
  }
  return idf;
}

function vectorizeCorpus(tokenizedCorpus: string[][], idf: SparseVector): SparseVector[] {
  return tokenizedCorpus.map((tokens) => {
    const tf = new Map<string, number>();
    for (const t of tokens) {
      tf.set(t, (tf.get(t) ?? 0) + 1);
    }
    const maxTf = Math.max(...Array.from(tf.values()), 1);
    const vec = new Map<string, number>();
    for (const [term, count] of tf) {
      const idfVal = idf.get(term);
      if (idfVal !== undefined && idfVal > 0) {
        vec.set(term, (count / maxTf) * idfVal);
      }
    }
    return vec;
  });
}

// --- Cosine Similarity ---

export function cosineSimilarity(a: SparseVector, b: SparseVector): number {
  if (a.size === 0 || b.size === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const val of a.values()) normA += val * val;
  for (const val of b.values()) normB += val * val;

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;

  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  for (const [term, val] of smaller) {
    const other = larger.get(term);
    if (other !== undefined) dot += val * other;
  }

  return dot / denom;
}

// --- Product Index (built once at module load) ---

interface ProductDocument {
  product: Product;
  vector: SparseVector;
}

let _index: ProductDocument[] | null = null;
let _corpusIdf: SparseVector | null = null;

function buildIndex(): ProductDocument[] {
  const active = products.filter((p) => p.active);

  const corpus = active.map((p) => {
    const cat = categories.find((c) => c.id === p.category_id);
    const parts = [
      p.name,
      p.description,
      p.brand,
      cat?.name ?? '',
      ...p.scent_top,
      ...p.scent_heart,
      ...p.scent_base,
    ];
    return tokenize(parts.join(' '));
  });

  _corpusIdf = computeIdf(corpus);
  const vectors = vectorizeCorpus(corpus, _corpusIdf);

  return active.map((product, i) => ({ product, vector: vectors[i] }));
}

export function getProductIndex(): ProductDocument[] {
  if (!_index) _index = buildIndex();
  return _index;
}

export function getCorpusIdf(): SparseVector {
  if (!_corpusIdf) buildIndex();
  return _corpusIdf!;
}

// --- Query vectorization (uses the same IDF as the corpus) ---

export function vectorizeQuery(query: string): SparseVector {
  const tokens = tokenize(query);
  const idf = getCorpusIdf();
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  const maxTf = Math.max(...Array.from(tf.values()), 1);
  const vec = new Map<string, number>();
  for (const [term, count] of tf) {
    const idfVal = idf.get(term);
    if (idfVal !== undefined && idfVal > 0) {
      vec.set(term, (count / maxTf) * idfVal);
    }
  }
  return vec;
}
