import { describe, it, expect } from 'vitest';
import { getUniverseData } from '../db';

describe('Database Universe Map Parser', () => {
  it('correctly loads and validates the JSON graph elements', async () => {
    const data = await getUniverseData();

    // Check that graph lists are arrays
    expect(Array.isArray(data.nodes)).toBe(true);
    expect(Array.isArray(data.edges)).toBe(true);

    // If elements are present, check their structure
    if (data.nodes.length > 0) {
      const firstNode = data.nodes[0];
      expect(firstNode).toHaveProperty('id');
      expect(firstNode).toHaveProperty('label');
      expect(firstNode).toHaveProperty('type');
      expect(['character', 'story', 'location']).toContain(firstNode.type);
    }
  });
});
