/**
 * src/lib/graph.ts
 * Extended Knowledge Graph Engine for Nobi Narrative Universe (NNU)
 * Connects Author → Series → Books → Characters → Locations → Research Notes → Articles → Purchase Links
 */

export interface CharacterNode {
  id: string;
  slug: string;
  name: string;
  role: string;
  summary: string;
  psychologicalProfile: string;
  appearedInBooks: { title: string; slug: string }[];
  relatedArticles: { title: string; slug: string }[];
  locations: string[];
}

export interface ContentCluster {
  slug: string;
  title: string;
  description: string;
  category:
    | 'Psychological Thrillers'
    | 'Campus Mysteries'
    | 'NNU Universe'
    | 'Verma Saga'
    | 'Writing Process';
  relatedBooks: { title: string; slug: string }[];
  relatedArticles: { title: string; slug: string }[];
}

export const NNU_CHARACTERS: CharacterNode[] = [
  {
    id: 'char-kabir-verma',
    slug: 'kabir-verma',
    name: 'Kabir Verma',
    role: 'Estate Heir & Protagonist',
    summary:
      'Central character in the Verma Legacy arc dealing with inherited psychological trauma and estate secrets.',
    psychologicalProfile: 'Obsessive memory retention, guilt-driven investigative hyper-vigilance.',
    appearedInBooks: [
      { title: 'The Verma Legacy', slug: 'the-verma-legacy' },
      { title: 'Verma Legacy: Shadow of Secrets', slug: 'verma-legacy-shadow-of-secrets' },
    ],
    relatedArticles: [
      {
        title: 'Behind the Story: The Psychology of Estate Secrets',
        slug: 'welcome-to-the-universe',
      },
    ],
    locations: ['Verma Estate, Shimla', 'Central Archives, Delhi'],
  },
  {
    id: 'char-ananya-roy',
    slug: 'ananya-roy',
    name: 'Ananya Roy',
    role: 'Investigative Crime Journalist',
    summary:
      'Tenacious crime reporter uncovering academic surveillance and corruption in campus thrillers.',
    psychologicalProfile: 'Analytical skeptic, persistent under surveillance stress.',
    appearedInBooks: [
      { title: 'The Silent Witness', slug: 'the-silent-witness' },
      { title: 'The Shadow Who Watched', slug: 'the-shadow-who-watched' },
    ],
    relatedArticles: [
      {
        title: 'Campus Thrillers: Truth vs Fiction in Academic Crime',
        slug: 'welcome-to-the-universe',
      },
    ],
    locations: ['St. Jude University Campus', 'North Campus Library'],
  },
];

export const NNU_TOPIC_CLUSTERS: ContentCluster[] = [
  {
    slug: 'psychological-thrillers',
    title: 'Indian Psychological Thriller Fiction',
    category: 'Psychological Thrillers',
    description:
      'Deep-dive explorations into trauma, unreliable narrators, and dark suspense set in contemporary India.',
    relatedBooks: [
      { title: 'The Silent Witness', slug: 'the-silent-witness' },
      { title: 'The Verma Legacy', slug: 'the-verma-legacy' },
    ],
    relatedArticles: [
      {
        title: 'Behind the Story: The Psychology of Estate Secrets',
        slug: 'welcome-to-the-universe',
      },
    ],
  },
  {
    slug: 'verma-saga',
    title: 'The Verma Saga & Family Legacy',
    category: 'Verma Saga',
    description:
      'Chronological roadmap of the ancestral secrets, corporate espionage, and psychological twists of the Verma family.',
    relatedBooks: [
      { title: 'The Verma Legacy', slug: 'the-verma-legacy' },
      { title: 'Verma Legacy: Shadow of Secrets', slug: 'verma-legacy-shadow-of-secrets' },
    ],
    relatedArticles: [
      {
        title: 'Behind the Story: The Psychology of Estate Secrets',
        slug: 'welcome-to-the-universe',
      },
    ],
  },
];

export function getCharactersForBook(bookSlug: string): CharacterNode[] {
  return NNU_CHARACTERS.filter((c) => c.appearedInBooks.some((b) => b.slug === bookSlug));
}

export function getRelatedClusters(category?: string): ContentCluster[] {
  if (!category) return NNU_TOPIC_CLUSTERS;
  return NNU_TOPIC_CLUSTERS.filter((cluster) => cluster.category === category);
}
