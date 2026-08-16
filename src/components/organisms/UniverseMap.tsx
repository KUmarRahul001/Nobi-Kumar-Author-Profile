'use client';

import * as React from 'react';
import Link from 'next/link';
import { UniverseNode, UniverseEdge } from '@/lib/db';
import {
  Info,
  User,
  BookOpen,
  MapPin,
  X,
  Network,
  Clock,
  Search,
  Sparkles,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

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

export default function UniverseMap({ nodes = [], edges = [], timeline = [] }: UniverseMapProps) {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(nodes[0]?.id || null);
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [viewMode, setViewMode] = React.useState<ViewMode>('graph');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);

  const selectedNode =
    nodes && nodes.length > 0 ? nodes.find((n) => n.id === selectedNodeId) || nodes[0] : null;

  const filteredNodes = (nodes || []).filter((node) => {
    const matchesFilter = filter === 'all' || node.type === filter;
    const matchesSearch =
      !searchQuery ||
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.summary && node.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredTimeline = (timeline || []).filter((event) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(q) ||
      event.novel.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q)
    );
  });

  const getNodeColor = (type: string, isSelected: boolean, isHovered: boolean) => {
    if (isSelected)
      return { bg: '#b21f2d', border: '#ff4d5a', glow: 'rgba(178,31,45,0.6)', text: '#ffffff' };
    if (isHovered)
      return { bg: '#262930', border: '#b21f2d', glow: 'rgba(178,31,45,0.4)', text: '#ffffff' };
    switch (type) {
      case 'character':
        return { bg: '#13151b', border: '#8b5cf6', glow: 'rgba(139,92,246,0.3)', text: '#c4b5fd' };
      case 'story':
        return { bg: '#161315', border: '#b21f2d', glow: 'rgba(178,31,45,0.3)', text: '#fca5a5' };
      case 'location':
        return { bg: '#0f172a', border: '#38bdf8', glow: 'rgba(56,189,248,0.3)', text: '#bae6fd' };
      default:
        return { bg: '#18181b', border: '#71717a', glow: 'rgba(113,113,122,0.3)', text: '#e4e4e7' };
    }
  };

  const getNodeIcon = (type: string, size = 16) => {
    switch (type) {
      case 'character':
        return <User size={size} />;
      case 'story':
        return <BookOpen size={size} />;
      case 'location':
        return <MapPin size={size} />;
      default:
        return <Info size={size} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto border border-border/80 rounded-3xl bg-[#08090b]/95 backdrop-blur-xl overflow-hidden flex flex-col min-h-[720px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
      <div className="absolute inset-0 bg-[radial-gradient(#b21f2d0d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-4 sm:p-5 border-b border-border/60 flex flex-wrap gap-4 items-center justify-between bg-card/80 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-3">
          <div className="flex bg-neutral-950/90 p-1 rounded-2xl border border-border/60 shadow-inner">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
                viewMode === 'graph'
                  ? 'bg-crimson text-white shadow-[0_0_15px_rgba(178,31,45,0.5)] scale-[1.02]'
                  : 'text-muted hover:text-foreground hover:bg-neutral-900'
              }`}
            >
              <Network className="w-4 h-4" /> Interactive Lore Map
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
                viewMode === 'timeline'
                  ? 'bg-crimson text-white shadow-[0_0_15px_rgba(178,31,45,0.5)] scale-[1.02]'
                  : 'text-muted hover:text-foreground hover:bg-neutral-900'
              }`}
            >
              <Clock className="w-4 h-4" /> Chronological Timeline
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search lore, books, characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-xs font-sans rounded-xl bg-neutral-950/80 border border-border/60 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson w-48 sm:w-60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {viewMode === 'graph' && (
            <div
              className="flex gap-1 items-center bg-neutral-950/80 p-1 rounded-xl border border-border/60"
              role="tablist"
            >
              {(['all', 'story', 'character', 'location'] as FilterType[]).map((type) => (
                <button
                  key={type}
                  role="tab"
                  aria-selected={filter === type}
                  onClick={() => setFilter(type)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded-lg transition-all ${
                    filter === type
                      ? 'bg-crimson text-white font-bold shadow-md'
                      : 'text-muted hover:text-foreground hover:bg-neutral-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {viewMode === 'graph' && (
            <div className="hidden lg:flex items-center gap-1 bg-neutral-950/80 p-1 rounded-xl border border-border/60 text-muted">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                className="p-1 hover:text-foreground hover:bg-neutral-900 rounded"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.75))}
                className="p-1 hover:text-foreground hover:bg-neutral-900 rounded"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-foreground hover:bg-neutral-900 rounded"
                title="Reset View"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="p-6 sm:p-10 space-y-10 bg-background/30 overflow-y-auto max-h-[640px] relative z-10 custom-scrollbar">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/30 text-crimson text-[10px] font-mono uppercase tracking-widest font-bold">
              <Sparkles size={12} /> Canon Chronology Archive
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-foreground uppercase tracking-tight">
              Nobi Narrative Universe Timeline
            </h2>
            <p className="text-xs text-muted leading-relaxed font-sans max-w-lg mx-auto">
              Direct chronological progression spanning the Verma Saga origin, St. Jude stairwell
              events, and the multi-novel convergence.
            </p>
          </div>

          <div className="relative border-l-2 border-crimson/40 ml-4 sm:ml-24 md:ml-36 space-y-10 pl-6 sm:pl-10">
            {filteredTimeline.map((event, idx) => (
              <div key={event.id} className="relative group transition-all duration-300">
                <div className="absolute -left-[35px] sm:-left-[53px] md:-left-[59px] top-0 bg-crimson text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border-2 border-background shadow-[0_0_12px_rgba(178,31,45,0.6)] group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>

                <div className="bg-card/90 border border-border/80 hover:border-crimson/70 p-6 rounded-2xl shadow-xl hover:shadow-[0_10px_30px_rgba(178,31,45,0.15)] transition-all space-y-3 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-crimson uppercase tracking-widest font-bold block mb-1">
                        {event.year}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-foreground group-hover:text-crimson transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-muted border border-border/60 text-[10px] font-mono uppercase rounded-full">
                      {event.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-border/40">
                    <span className="text-xs font-mono text-foreground font-semibold flex items-center gap-1.5">
                      <BookOpen size={14} className="text-crimson" /> {event.novel}
                    </span>
                    <Link
                      href={`/books/${event.novelSlug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-crimson hover:text-white hover:bg-crimson px-3 py-1 rounded-lg border border-crimson/40 transition-all uppercase tracking-wider"
                    >
                      Read Novel <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row flex-1 relative z-10">
          {/* Mobile Node Selector List */}
          <div className="lg:hidden p-4 bg-neutral-950/90 border-b border-border/60 overflow-x-auto flex gap-2">
            {filteredNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap flex items-center gap-2 border transition-all ${
                  selectedNodeId === node.id
                    ? 'bg-crimson text-white border-crimson shadow-md'
                    : 'bg-card border-border/60 text-muted hover:text-foreground'
                }`}
              >
                {getNodeIcon(node.type, 13)}
                <span>{node.label}</span>
              </button>
            ))}
          </div>

          {/* Main Map Visual Canvas */}
          <div className="flex-1 flex flex-col relative min-h-[520px] lg:min-h-[640px] bg-neutral-950/40 overflow-hidden">
            <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-3 bg-neutral-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-border/60 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-crimson font-bold">
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_#b21f2d]" /> Story
                Node
              </span>
              <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />{' '}
                Character
              </span>
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />{' '}
                Location
              </span>
            </div>

            <div className="w-full h-full flex-1 flex items-center justify-center p-4">
              <svg
                className="w-full h-full select-none transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
                viewBox="0 0 1000 650"
                aria-label="Visual connections of the Nobi Narrative Universe"
              >
                <defs>
                  <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="6"
                      floodColor="#b21f2d"
                      floodOpacity="0.7"
                    />
                  </filter>
                </defs>

                {edges.map((edge) => {
                  const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId);
                  const targetNode = nodes.find((n) => n.id === edge.targetNodeId);
                  if (!sourceNode || !targetNode) return null;

                  const isSourceVisible = filter === 'all' || sourceNode.type === filter;
                  const isTargetVisible = filter === 'all' || targetNode.type === filter;
                  if (!isSourceVisible || !isTargetVisible) return null;

                  const isHighlighted =
                    selectedNodeId === sourceNode.id ||
                    selectedNodeId === targetNode.id ||
                    hoveredNodeId === sourceNode.id ||
                    hoveredNodeId === targetNode.id;

                  const x1 = Number(sourceNode.positionX);
                  const y1 = Number(sourceNode.positionY);
                  const x2 = Number(targetNode.positionX);
                  const y2 = Number(targetNode.positionY);
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2 - 15;

                  return (
                    <g key={edge.id} className="transition-all duration-300">
                      <path
                        d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                        fill="none"
                        stroke={isHighlighted ? '#b21f2d' : '#3f3f46'}
                        strokeWidth={isHighlighted ? '2.5' : '1.2'}
                        strokeOpacity={isHighlighted ? '0.9' : '0.4'}
                        strokeDasharray={isHighlighted ? 'none' : '4 3'}
                        className="transition-all duration-300"
                      />
                      <rect
                        x={midX - 45}
                        y={midY - 8}
                        width="90"
                        height="16"
                        rx="8"
                        fill="#090a0f"
                        stroke={isHighlighted ? '#b21f2d' : '#27272a'}
                        strokeWidth="1"
                        opacity={isHighlighted ? '0.95' : '0.75'}
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        fill={isHighlighted ? '#ffffff' : '#a1a1aa'}
                        fontSize="7.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {edge.relationType}
                      </text>
                    </g>
                  );
                })}

                {filteredNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const style = getNodeColor(node.type, isSelected, isHovered);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.positionX}, ${node.positionY})`}
                      className="cursor-pointer group select-none"
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {(isSelected || isHovered) && (
                        <circle
                          r="28"
                          fill="none"
                          stroke={style.border}
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                          className="animate-spin"
                          style={{ animationDuration: '8s' }}
                          opacity="0.8"
                        />
                      )}
                      <circle
                        r={node.type === 'story' ? '22' : '18'}
                        fill={style.bg}
                        stroke={style.border}
                        strokeWidth={isSelected ? '3' : '2'}
                        style={{ filter: isSelected ? 'url(#crimsonGlow)' : 'none' }}
                        className="transition-all duration-300 group-hover:scale-110 shadow-2xl"
                      />
                      <foreignObject
                        x={node.type === 'story' ? -10 : -8}
                        y={node.type === 'story' ? -10 : -8}
                        width={node.type === 'story' ? 20 : 16}
                        height={node.type === 'story' ? 20 : 16}
                        className="pointer-events-none"
                      >
                        <div
                          className="flex items-center justify-center w-full h-full transition-colors"
                          style={{ color: style.text }}
                        >
                          {getNodeIcon(node.type, node.type === 'story' ? 15 : 13)}
                        </div>
                      </foreignObject>
                      <g transform="translate(0, 36)">
                        <rect
                          x={-node.label.length * 3.5 - 8}
                          y="-10"
                          width={node.label.length * 7 + 16}
                          height="18"
                          rx="9"
                          fill="#090a0f"
                          stroke={isSelected ? '#b21f2d' : '#27272a'}
                          strokeWidth="1"
                          className="transition-all duration-300"
                        />
                        <text
                          y="2.5"
                          fill={isSelected ? '#ffffff' : '#d4d4d8'}
                          fontSize="9"
                          fontFamily="serif"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="transition-colors duration-300 group-hover:fill-white"
                        >
                          {node.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border/80 bg-card/95 backdrop-blur-xl flex flex-col p-6 space-y-6">
            {selectedNode ? (
              <>
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-mono uppercase bg-crimson/15 text-crimson font-bold border border-crimson/30">
                      {getNodeIcon(selectedNode.type, 11)} {selectedNode.type} dossier
                    </span>
                    <h3 className="text-xl font-serif font-black text-foreground">
                      {selectedNode.label}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-border/60 space-y-2">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block font-bold">
                      Canonical Summary
                    </span>
                    <p className="text-xs text-foreground/90 font-sans leading-relaxed">
                      {selectedNode.summary}
                    </p>
                  </div>

                  {selectedNode.bio && (
                    <div className="p-4 rounded-xl bg-neutral-950/80 border border-border/60 space-y-2">
                      <span className="text-[10px] font-mono text-crimson uppercase tracking-wider block font-bold">
                        Classified Dossier Notes
                      </span>
                      <p className="text-xs text-muted font-sans leading-relaxed italic">
                        "{selectedNode.bio}"
                      </p>
                    </div>
                  )}

                  {selectedNode.bookId && (
                    <div className="pt-2">
                      <Link
                        href={`/books/${selectedNode.bookId}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(178,31,45,0.4)] hover:scale-[1.02]"
                      >
                        <span>Read Connected Novel</span> <ChevronRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-muted p-8">
                <Network className="w-8 h-8 text-crimson/50 animate-pulse" />
                <p className="text-xs font-mono">
                  Select a node from the map to view dossier lore.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
