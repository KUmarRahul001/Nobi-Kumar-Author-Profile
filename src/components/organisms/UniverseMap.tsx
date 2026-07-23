'use client';

import * as React from 'react';
import Link from 'next/link';
import { UniverseNode, UniverseEdge } from '@/lib/db';
import { Info, User, BookOpen, MapPin, X, Network, Clock, ListFilter } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  novel: string;
  novelSlug: string;
  category: string;
  description: string;
}

interface UniverseMapProps {
  nodes: UniverseNode[];
  edges: UniverseEdge[];
  timeline?: TimelineEvent[];
}

type FilterType = 'all' | 'character' | 'story' | 'location';
type ViewMode = 'graph' | 'timeline';

export default function UniverseMap({ nodes, edges, timeline = [] }: UniverseMapProps) {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [viewMode, setViewMode] = React.useState<ViewMode>('graph');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const filteredNodes = nodes.filter((node) => {
    if (filter === 'all') return true;
    return node.type === filter;
  });

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'character':
        return <User size={16} />;
      case 'story':
        return <BookOpen size={16} />;
      case 'location':
        return <MapPin size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto border border-border/60 rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden flex flex-col min-h-[650px] shadow-2xl">
      {/* Top Header Navigation & Mode Switcher */}
      <div className="p-4 border-b border-border/60 flex flex-wrap gap-4 items-center justify-between bg-card/90 z-20">
        {/* Left: Universe Title & View Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex bg-neutral-900/80 p-1 rounded-xl border border-border/40">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                viewMode === 'graph'
                  ? 'bg-crimson text-white shadow-md'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Network className="w-3.5 h-3.5" /> Interactive Map
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                viewMode === 'timeline'
                  ? 'bg-crimson text-white shadow-md'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> NNU Timeline & Events
            </button>
          </div>
        </div>

        {/* Right: Entity Filter Pills (Graph View Only) */}
        {viewMode === 'graph' && (
          <div className="flex gap-1.5 items-center" role="tablist">
            {(['all', 'character', 'story', 'location'] as FilterType[]).map((type) => (
              <button
                key={type}
                role="tab"
                aria-selected={filter === type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 text-[10px] font-mono uppercase rounded-lg transition-all ${
                  filter === type
                    ? 'bg-crimson text-white font-bold shadow-md'
                    : 'bg-neutral-800/60 text-muted hover:text-foreground border border-border/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Viewport Container */}
      {viewMode === 'timeline' ? (
        /* Chronological NNU Timeline View (Manuscript Analyzed Events) */
        <div className="p-6 md:p-10 space-y-8 bg-background/50 overflow-y-auto max-h-[600px]">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono text-crimson uppercase tracking-widest block font-bold">
              Chronological Canon
            </span>
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Nobi Narrative Universe Timeline
            </h2>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Analyzed directly from all 7 novel manuscripts, tracking key mysteries from the 2018
              St. Jude stairwell tragedy to the 2026 NNU convergence.
            </p>
          </div>

          <div className="relative border-l-2 border-crimson/40 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
            {timeline.map((event) => (
              <div key={event.id} className="relative group">
                {/* Year Marker Badge */}
                <div className="absolute -left-[31px] md:-left-[47px] top-0 bg-crimson text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border-2 border-background shadow-md">
                  {event.year}
                </div>

                {/* Event Content Card */}
                <div className="bg-card border border-border/60 hover:border-crimson/50 p-5 rounded-xl shadow-lg transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-serif font-bold text-foreground group-hover:text-crimson transition-colors">
                      {event.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-muted text-[9px] font-mono uppercase rounded">
                      {event.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted leading-relaxed font-sans">
                    {event.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-border/40">
                    <span className="text-[11px] font-mono text-foreground font-semibold">
                      📖 {event.novel}
                    </span>
                    <Link
                      href={`/books/${event.novelSlug}`}
                      className="text-[10px] font-mono font-bold text-crimson hover:underline uppercase tracking-wider"
                    >
                      Read Novel →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Interactive Graph Canvas View */
        <div className="flex flex-col md:flex-row flex-1">
          <div className="flex-1 flex flex-col relative min-h-[500px] md:min-h-[580px] bg-background/50">
            {/* Mobile List View */}
            <div className="flex-1 md:hidden overflow-y-auto p-4 space-y-3">
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
                Select an NNU novel or character node to reveal lore connections:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {filteredNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-xl text-left border flex items-center gap-3 transition-colors ${
                      selectedNodeId === node.id
                        ? 'bg-crimson/15 border-crimson text-foreground'
                        : 'bg-card border-border/60 text-muted hover:text-foreground'
                    }`}
                  >
                    <span className="text-crimson">{getNodeIcon(node.type)}</span>
                    <span className="text-xs font-serif font-semibold">{node.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop SVG Canvas */}
            <div className="hidden md:block flex-1 relative overflow-hidden w-full h-full min-h-[650px]">
              <svg
                className="w-full h-full select-none"
                viewBox="0 0 1000 650"
                aria-label="Visual connections of the Nobi Narrative Universe"
              >
                {edges.map((edge) => {
                  const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId);
                  const targetNode = nodes.find((n) => n.id === edge.targetNodeId);
                  if (!sourceNode || !targetNode) return null;

                  const isSourceVisible = filter === 'all' || sourceNode.type === filter;
                  const isTargetVisible = filter === 'all' || targetNode.type === filter;
                  if (!isSourceVisible || !isTargetVisible) return null;

                  return (
                    <g key={edge.id}>
                      <line
                        x1={sourceNode.positionX}
                        y1={sourceNode.positionY}
                        x2={targetNode.positionX}
                        y2={targetNode.positionY}
                        stroke="#dc2626"
                        strokeWidth="1.8"
                        strokeOpacity="0.4"
                        strokeDasharray="5 3"
                      />
                      <text
                        x={(Number(sourceNode.positionX) + Number(targetNode.positionX)) / 2}
                        y={(Number(sourceNode.positionY) + Number(targetNode.positionY)) / 2 - 4}
                        fill="#9ca3af"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {edge.relationType}
                      </text>
                    </g>
                  );
                })}

                {filteredNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.positionX}, ${node.positionY})`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      <circle
                        r="18"
                        fill={isSelected ? '#dc2626' : '#171717'}
                        stroke={isSelected ? '#ffffff' : '#dc2626'}
                        strokeWidth="2"
                        className="transition-all duration-300 group-hover:scale-110 group-hover:stroke-white shadow-lg"
                      />
                      <g transform="translate(-8, -8)" className="text-white pointer-events-none">
                        <foreignObject
                          width="16"
                          height="16"
                          className={isSelected ? 'text-white' : 'text-crimson'}
                        >
                          <div className="flex items-center justify-center w-full h-full">
                            {getNodeIcon(node.type)}
                          </div>
                        </foreignObject>
                      </g>
                      <text
                        y="32"
                        fill={isSelected ? '#dc2626' : '#e5e5e5'}
                        fontSize="10"
                        fontFamily="serif"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="transition-colors duration-300 group-hover:fill-white drop-shadow"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Node Details Sidebar Panel */}
          <div
            className={`w-full md:w-80 border-t md:border-t-0 md:border-l border-border/60 bg-card/90 flex flex-col h-auto md:h-full transition-transform duration-300 ${
              selectedNode ? 'translate-x-0' : 'hidden md:flex'
            }`}
          >
            {selectedNode ? (
              <div className="p-6 flex flex-col h-full space-y-5">
                <header className="flex items-start justify-between border-b border-border/60 pb-3">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono uppercase bg-crimson/20 text-crimson font-bold border border-crimson/30">
                      {selectedNode.type}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-foreground">
                      {selectedNode.label}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedNodeId(null)}
                    className="p-1 rounded text-muted hover:text-foreground transition-colors"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>
                </header>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  <p className="text-xs text-muted font-sans leading-relaxed">
                    {selectedNode.bio || selectedNode.summary}
                  </p>

                  {selectedNode.bookId && (
                    <div className="pt-3 border-t border-border/40">
                      <h4 className="text-[10px] font-mono text-crimson uppercase tracking-widest mb-1 font-bold">
                        Connected NNU Novel
                      </h4>
                      <Link
                        href={`/books/${selectedNode.bookId}`}
                        className="inline-block px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-bold uppercase rounded-lg hover:bg-crimson dark:hover:bg-crimson transition-all"
                      >
                        View Novel Details →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-3 text-muted font-mono">
                <Network className="w-8 h-8 text-crimson/50 animate-pulse" />
                <p className="text-xs leading-relaxed">
                  Click any novel, character, or location node on the universe map graph to reveal
                  lore connections.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
