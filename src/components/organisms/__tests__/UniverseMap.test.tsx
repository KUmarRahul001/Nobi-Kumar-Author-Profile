import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UniverseMap from '../UniverseMap';
import { UniverseNode, UniverseEdge } from '@/lib/db';

const mockNodes: UniverseNode[] = [
  {
    id: 'node-1',
    slug: 'character-1',
    label: 'Aarav Verma',
    type: 'character',
    summary: 'Protag summary.',
    bookId: 'book-1',
    positionX: 100,
    positionY: 100,
    bio: 'Archivist bio.',
  },
  {
    id: 'node-2',
    slug: 'location-1',
    label: 'Verma Estate',
    type: 'location',
    summary: 'Location summary.',
    bookId: 'book-1',
    positionX: 300,
    positionY: 200,
    bio: 'Estate bio.',
  },
];

const mockEdges: UniverseEdge[] = [
  {
    id: 'edge-1',
    sourceNodeId: 'node-1',
    targetNodeId: 'node-2',
    relationType: 'explores',
  },
];

describe('UniverseMap Component', () => {
  it('renders graph nodes and responds to click selection actions', () => {
    render(<UniverseMap nodes={mockNodes} edges={mockEdges} />);

    // Check nodes rendered in lists (graceful degradation check)
    expect(screen.getAllByText('Aarav Verma').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Verma Estate').length).toBeGreaterThan(0);

    // Select a node (first item in the mobile listing list for test ease)
    const characterButton = screen.getAllByRole('button', { name: /aarav verma/i })[0];
    fireEvent.click(characterButton);

    // Check detailed sidebar content display
    expect(screen.getByText('Archivist bio.')).toBeInTheDocument();
  });
});
