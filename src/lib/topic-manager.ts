/**
 * src/lib/topic-manager.ts
 * Nobi Kumar Knowledge Base Topic & Uniqueness Selection Manager
 * Enforces §3.4 Blog Content Generation — Uniqueness Rules:
 * - Reads published content log (Supabase database Post table + local JSON log fallback)
 * - Guarantees category rotation (Reader Files, Case Files, Author Chronicles, Releases, Universe Files)
 * - Excludes any previously covered topic, title, or angle
 * - Varies tags per post topic rather than fixed 5-tag blocks
 * - If all topics in the verified canon pool are exhausted, returns null (skip cycle rather than spamming repeats)
 */

import fs from 'fs';
import path from 'path';
import { createClientSafe as createClient } from './supabase/server';

export interface KnowledgeTopic {
  id: string;
  category: 'Case Files' | 'Universe Files' | 'Author Chronicles' | 'Reader Files' | 'Releases';
  topic: string;
  theme: string;
  canonicalContext: string;
  tags: string[];
}

export const VERIFIED_KNOWLEDGE_BASE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'case-st-jude-stairwell',
    category: 'Case Files',
    topic: 'The Psychological Anatomy of St. Jude College Stairwell Incident',
    theme: 'Dark campus secrecy, unsaid trauma, academic rivalry, and student surveillance in NNU.',
    canonicalContext:
      'Inside the prestigious St. Jude College campus in the Nobi Narrative Universe, an unpublicized stairwell incident reveals systemic surveillance and hidden rivalry between top students.',
    tags: [
      'Nobi Kumar',
      'NNU',
      'Case Files',
      'St Jude College',
      'Campus Thriller',
      'Psychological Mystery',
    ],
  },
  {
    id: 'universe-verma-estate-silence',
    category: 'Universe Files',
    topic: 'Unraveling the Verma Estate Legacy: Three Generations of Silence',
    theme: 'Interconnected family secrets, hidden wills, and atmospheric estate mystery.',
    canonicalContext:
      'The Verma Saga anchors the southern edge of the Nobi Narrative Universe. The estate holds sealed documents and genealogical maps tracing thirty years of unspoken family truth.',
    tags: [
      'Nobi Kumar',
      'NNU',
      'Verma Legacy',
      'Universe Lore',
      'Family Mystery',
      'Atmospheric Suspense',
    ],
  },
  {
    id: 'author-unreliable-narrators',
    category: 'Author Chronicles',
    topic: 'Why Psychological Thrillers Need Unreliable Narrators to Mirror Reality',
    theme:
      'Crafting psychological suspense, moral ambiguity, and building tension in dark fiction.',
    canonicalContext:
      'Author Nobi Kumar examines the craft of perspective: how subjective memory, grief, and denial create authentic psychological suspense for modern readers.',
    tags: [
      'Nobi Kumar',
      'Author Chronicles',
      'Writing Craft',
      'Psychological Thriller',
      'Storytelling Insights',
    ],
  },
  {
    id: 'reader-verma-chronicles-reading-map',
    category: 'Reader Files',
    topic: 'The Verma Chronicles Reading Map: Easter Eggs & Hidden Clues',
    theme: 'Behind-the-scenes character links between The Verma Legacy and The Shadow Who Watched.',
    canonicalContext:
      'Reader guide and connective thread analysis exploring recurring character cameos, shared timeline dates, and hidden background artifacts across Nobi Kumar novels.',
    tags: ['Nobi Kumar', 'NNU', 'Reader Files', 'Verma Chronicles', 'Easter Eggs', 'Reading Guide'],
  },
  {
    id: 'releases-first-draft-to-novel',
    category: 'Releases',
    topic: 'Inside Nobi Kumar’s Writing Archive: From First Draft to Published Novel',
    theme: 'Exclusive look at story outlines, character dossier building, and universe expansion.',
    canonicalContext:
      'A craft walkthrough of the transition from initial notebook outlines to final published novels on Amazon KDP, highlighting scene pacing and character design.',
    tags: ['Nobi Kumar', 'Releases', 'Publishing Journey', 'Author Archive', 'Book Production'],
  },
  {
    id: 'case-shadow-witness-dossier',
    category: 'Case Files',
    topic: 'Classified Dossier: The Unnamed Witness in The Shadow Who Watched',
    theme: 'Psychological guilt, eyewitness unreliability, and nocturne investigation in NNU.',
    canonicalContext:
      'A character psychology file examining the hidden motives and paranoia of the central witness in The Shadow Who Watched.',
    tags: [
      'Nobi Kumar',
      'NNU',
      'Case Files',
      'The Shadow Who Watched',
      'Witness Dossier',
      'Dark Suspense',
    ],
  },
  {
    id: 'universe-nnu-interconnected-geography',
    category: 'Universe Files',
    topic: 'Mapping the Nobi Narrative Universe: Connecting Towns, Mansions & Campuses',
    theme: 'Geographical coherence and recurring locations across independent novels.',
    canonicalContext:
      'A cartographic breakdown of regional locations in the NNU, demonstrating how standalone mysteries share bordering territories.',
    tags: ['Nobi Kumar', 'NNU', 'Universe Files', 'World Building', 'Location Map'],
  },
  {
    id: 'author-memory-as-weapon',
    category: 'Author Chronicles',
    topic: 'Memory as a Weapon: Exploring Trauma and Distortion in Suspense Writing',
    theme:
      'How fractured memories shape plot twists and emotional arcs in psychological thrillers.',
    canonicalContext:
      'An author craft exploration on how psychological trauma alters perception, turning recollection into the ultimate suspense mechanism.',
    tags: [
      'Nobi Kumar',
      'Author Chronicles',
      'Writing Craft',
      'Memory & Trauma',
      'Psychological Suspense',
    ],
  },
];

/**
 * Get all published titles and topics from Supabase DB and the local JSON content log.
 */
export async function getPublishedContentHistory(): Promise<{
  titles: string[];
  topics: string[];
  categories: string[];
}> {
  const titles = new Set<string>();
  const topics = new Set<string>();
  const categories: string[] = [];

  // 1. Read from local content log file (src/content/published_topics.json)
  const logPath = path.join(process.cwd(), 'src/content/published_topics.json');
  if (fs.existsSync(logPath)) {
    try {
      const fileData = fs.readFileSync(logPath, 'utf-8');
      const items = JSON.parse(fileData);
      if (Array.isArray(items)) {
        for (const item of items) {
          if (item.title) titles.add(item.title.trim().toLowerCase());
          if (item.topic) topics.add(item.topic.trim().toLowerCase());
          if (item.category) categories.push(item.category);
        }
      }
    } catch {}
  }

  // 2. Read live Supabase published posts
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data: posts, error } = await supabase.from('Post').select('title, category');
      if (!error && posts) {
        for (const p of posts) {
          if (p.title) titles.add(p.title.trim().toLowerCase());
          if (p.category) categories.push(p.category);
        }
      }
    }
  } catch {}

  return {
    titles: Array.from(titles),
    topics: Array.from(topics),
    categories,
  };
}

/**
 * Select the next unique, non-duplicate topic following category rotation rules.
 * If all verified topics have been published, returns null (skip cycle to prevent duplicates).
 */
export async function selectNextUniqueTopic(): Promise<KnowledgeTopic | null> {
  const history = await getPublishedContentHistory();

  // Find all candidate topics that haven't been published yet
  const availableTopics = VERIFIED_KNOWLEDGE_BASE_TOPICS.filter((t) => {
    const topicNorm = t.topic.trim().toLowerCase();
    const isTopicCovered = history.topics.some(
      (covered) =>
        covered === topicNorm || covered.includes(topicNorm) || topicNorm.includes(covered)
    );
    const isTitleCovered = history.titles.some(
      (title) => title.includes(topicNorm) || topicNorm.includes(title)
    );
    return !isTopicCovered && !isTitleCovered;
  });

  if (availableTopics.length === 0) {
    console.warn(
      '[Topic Manager] All verified canon topics have already been published. Skipping publish cycle to prevent duplicate content.'
    );
    return null;
  }

  // Category rotation: prefer categories with the fewest previous publications
  const categoryCounts: Record<string, number> = {};
  for (const cat of [
    'Case Files',
    'Universe Files',
    'Author Chronicles',
    'Reader Files',
    'Releases',
  ]) {
    categoryCounts[cat] = history.categories.filter(
      (c) => c.toLowerCase() === cat.toLowerCase()
    ).length;
  }

  // Sort available topics by least-used category first
  availableTopics.sort((a, b) => {
    const countA = categoryCounts[a.category] || 0;
    const countB = categoryCounts[b.category] || 0;
    return countA - countB;
  });

  return availableTopics[0];
}

/**
 * Record a newly published article in the local content log (src/content/published_topics.json).
 */
export function recordPublishedTopicToLog(entry: {
  slug: string;
  title: string;
  category: string;
  topic: string;
  publishedAt: string;
}) {
  const logPath = path.join(process.cwd(), 'src/content/published_topics.json');
  let currentLog: any[] = [];

  if (fs.existsSync(logPath)) {
    try {
      const fileData = fs.readFileSync(logPath, 'utf-8');
      currentLog = JSON.parse(fileData);
      if (!Array.isArray(currentLog)) currentLog = [];
    } catch {
      currentLog = [];
    }
  }

  // Prevent duplicate log entry
  const exists = currentLog.some(
    (item) => item.slug === entry.slug || item.title.toLowerCase() === entry.title.toLowerCase()
  );
  if (!exists) {
    currentLog.push(entry);
    try {
      fs.writeFileSync(logPath, JSON.stringify(currentLog, null, 2), 'utf-8');
    } catch {}
  }
}
