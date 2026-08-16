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
  Shield,
  Link2,
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

/* ── Hexagon path helper ─────────────────────────────────────────── */
function hexPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M ${pts.join(' L ')} Z`;
}

/* ── Node styling ───────────────────────────────────────────────── */
const NODE_STYLES = {
  story: {
    fill: '#1a0508',
    stroke: '#b21f2d',
    glow: '#b21f2d',
    textColor: '#fca5a5',
    glowId: 'glowRed',
    label: 'Story Node',
    accent: '#b21f2d',
  },
  character: {
    fill: '#100d1a',
    stroke: '#8b5cf6',
    glow: '#8b5cf6',
    textColor: '#c4b5fd',
    glowId: 'glowPurple',
    label: 'Character',
    accent: '#8b5cf6',
  },
  location: {
    fill: '#071018',
    stroke: '#38bdf8',
    glow: '#38bdf8',
    textColor: '#bae6fd',
    glowId: 'glowBlue',
    label: 'Location',
    accent: '#38bdf8',
  },
  default: {
    fill: '#111114',
    stroke: '#52525b',
    glow: '#52525b',
    textColor: '#d4d4d8',
    glowId: 'glowGray',
    label: 'Node',
    accent: '#52525b',
  },
};

function getStyle(type: string) {
  return NODE_STYLES[type as keyof typeof NODE_STYLES] ?? NODE_STYLES.default;
}

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

  /* Connections for selected node */
  const connectedEdges = (edges || []).filter(
    (e) => e.sourceNodeId === selectedNode?.id || e.targetNodeId === selectedNode?.id
  );
  const connectedNodes = connectedEdges
    .map((e) => {
      const peerId = e.sourceNodeId === selectedNode?.id ? e.targetNodeId : e.sourceNodeId;
      const peer = nodes.find((n) => n.id === peerId);
      return peer ? { node: peer, relation: e.relationType } : null;
    })
    .filter(Boolean) as { node: UniverseNode; relation: string }[];

  const getNodeIcon = (type: string, size = 14) => {
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
    <div
      className="w-full max-w-7xl mx-auto rounded-2xl bg-[#07080c] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.9)] border border-white/[0.06] relative"
      style={{ minHeight: 760 }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#b21f2d]/[0.04] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[#8b5cf6]/[0.04] blur-[80px] rounded-full" />
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Header bar ───────────────────────────────────────────── */}
      <div className="relative z-20 px-5 py-3.5 border-b border-white/[0.07] flex flex-wrap gap-3 items-center justify-between bg-white/[0.02] backdrop-blur-sm">
        {/* View toggle */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/[0.08] gap-0.5">
          {[
            {
              mode: 'graph' as ViewMode,
              icon: <Network className="w-3.5 h-3.5" />,
              label: 'Lore Map',
            },
            {
              mode: 'timeline' as ViewMode,
              icon: <Clock className="w-3.5 h-3.5" />,
              label: 'Timeline',
            },
          ].map(({ mode, icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${
                viewMode === mode
                  ? 'bg-[#b21f2d] text-white shadow-[0_0_16px_rgba(178,31,45,0.5)]'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.05]'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Search nodes, lore, characters…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-[11px] font-mono rounded-lg bg-black/50 border border-white/[0.08] text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-[#b21f2d]/60 focus:shadow-[0_0_0_1px_rgba(178,31,45,0.3)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filters (graph only) */}
        {viewMode === 'graph' && (
          <div className="flex gap-1 items-center">
            {(['all', 'story', 'character', 'location'] as FilterType[]).map((type) => {
              const accent =
                type === 'story'
                  ? '#b21f2d'
                  : type === 'character'
                    ? '#8b5cf6'
                    : type === 'location'
                      ? '#38bdf8'
                      : '#52525b';
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase rounded-lg transition-all border font-bold tracking-wider ${
                    filter === type
                      ? 'text-white border-current'
                      : 'text-zinc-600 border-white/[0.06] hover:text-zinc-300 hover:border-white/20'
                  }`}
                  style={
                    filter === type
                      ? {
                          color: accent,
                          borderColor: accent,
                          background: `${accent}18`,
                          boxShadow: `0 0 10px ${accent}30`,
                        }
                      : {}
                  }
                >
                  {type}
                </button>
              );
            })}
          </div>
        )}

        {/* Zoom controls */}
        {viewMode === 'graph' && (
          <div className="hidden lg:flex items-center gap-0.5 bg-black/50 p-1 rounded-lg border border-white/[0.07]">
            {[
              {
                icon: <ZoomIn size={13} />,
                action: () => setZoomLevel((z) => Math.min(z + 0.15, 1.6)),
                title: 'Zoom in',
              },
              {
                icon: <ZoomOut size={13} />,
                action: () => setZoomLevel((z) => Math.max(z - 0.15, 0.6)),
                title: 'Zoom out',
              },
              { icon: <RotateCcw size={13} />, action: () => setZoomLevel(1), title: 'Reset' },
            ].map(({ icon, action, title }, i) => (
              <button
                key={i}
                onClick={action}
                title={title}
                className="p-1.5 text-zinc-600 hover:text-zinc-200 hover:bg-white/[0.06] rounded transition-all"
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Timeline view ────────────────────────────────────────── */}
      {viewMode === 'timeline' ? (
        <div className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b21f2d]/10 border border-[#b21f2d]/25 text-[#b21f2d] text-[10px] font-mono uppercase tracking-widest font-bold">
              <Sparkles size={10} /> Canon Chronology Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white/90 uppercase tracking-tight">
              Nobi Narrative Universe Timeline
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Direct chronological progression spanning the Verma Saga origin, St. Jude stairwell
              events, and the multi-novel convergence.
            </p>
          </div>

          <div className="relative ml-4 sm:ml-20 border-l border-[#b21f2d]/25 pl-8 sm:pl-12 space-y-8">
            {filteredTimeline.length === 0 && (
              <p className="text-zinc-600 text-sm font-mono text-center py-10">
                No timeline events found.
              </p>
            )}
            {filteredTimeline.map((event, idx) => (
              <div key={event.id} className="relative group">
                {/* Step marker */}
                <div className="absolute -left-[52px] sm:-left-[64px] top-1 bg-[#b21f2d] text-white text-[9px] font-mono font-black px-2 py-0.5 rounded-sm shadow-[0_0_14px_rgba(178,31,45,0.7)]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                {/* Dot */}
                <div className="absolute -left-[17px] top-3 w-2.5 h-2.5 rounded-full bg-[#b21f2d] shadow-[0_0_8px_rgba(178,31,45,0.8)] border border-[#b21f2d]/50" />

                <div className="bg-white/[0.03] border border-white/[0.07] hover:border-[#b21f2d]/40 p-5 rounded-xl transition-all duration-300 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgba(178,31,45,0.08)]">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[9px] font-mono text-[#b21f2d] uppercase tracking-[0.2em] font-bold block mb-1">
                        {event.year}
                      </span>
                      <h3 className="text-sm sm:text-base font-serif font-bold text-white/90 group-hover:text-[#b21f2d] transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-black/50 text-zinc-500 border border-white/[0.06] text-[9px] font-mono uppercase rounded-md shrink-0">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <BookOpen size={12} className="text-[#b21f2d]" /> {event.novel}
                    </span>
                    <Link
                      href={`/books/${event.novelSlug}`}
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#b21f2d] hover:text-white border border-[#b21f2d]/30 hover:bg-[#b21f2d] px-3 py-1.5 rounded-md transition-all uppercase tracking-wider"
                    >
                      Read Novel <ChevronRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── Graph + Dossier ──────────────────────────────────── */
        <div className="flex flex-col lg:flex-row flex-1 relative z-10" style={{ minHeight: 680 }}>
          {/* Mobile node strip */}
          <div className="lg:hidden px-4 py-3 border-b border-white/[0.07] overflow-x-auto flex gap-2">
            {filteredNodes.map((node) => {
              const s = getStyle(node.type);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap border transition-all"
                  style={
                    selectedNodeId === node.id
                      ? { background: `${s.accent}22`, borderColor: s.accent, color: s.textColor }
                      : {
                          background: 'transparent',
                          borderColor: 'rgba(255,255,255,0.08)',
                          color: '#71717a',
                        }
                  }
                >
                  {getNodeIcon(node.type, 11)}
                  {node.label}
                </button>
              );
            })}
          </div>

          {/* ── SVG Canvas ──────────────────────────────────────── */}
          <div className="flex-1 relative overflow-hidden bg-[#06070a]">
            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/[0.07] text-[9px] font-mono">
              {(['story', 'character', 'location'] as const).map((type) => {
                const s = getStyle(type);
                return (
                  <span
                    key={type}
                    className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
                    style={{ color: s.textColor }}
                  >
                    <span
                      className="w-2 h-2 rounded-sm inline-block"
                      style={{ background: s.stroke, boxShadow: `0 0 6px ${s.glow}` }}
                    />
                    {type}
                  </span>
                );
              })}
            </div>

            <div
              className="w-full h-full flex items-center justify-center"
              style={{ minHeight: 580 }}
            >
              <svg
                className="w-full h-full select-none"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease',
                }}
                viewBox="0 0 1000 620"
                aria-label="Nobi Narrative Universe Lore Map"
              >
                <defs>
                  {/* Glow filters */}
                  {(['Red', 'Purple', 'Blue', 'Gray'] as const).map((c) => {
                    const colorMap = {
                      Red: '#b21f2d',
                      Purple: '#8b5cf6',
                      Blue: '#38bdf8',
                      Gray: '#52525b',
                    };
                    return (
                      <filter key={c} id={`glow${c}`} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                        <feFlood floodColor={colorMap[c]} floodOpacity="0.6" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                          <feMergeNode in="glow" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    );
                  })}
                  {/* Edge gradient */}
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b21f2d" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#b21f2d" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#b21f2d" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* ── Edges ── */}
                {edges.map((edge) => {
                  const src = nodes.find((n) => n.id === edge.sourceNodeId);
                  const tgt = nodes.find((n) => n.id === edge.targetNodeId);
                  if (!src || !tgt) return null;

                  const srcVisible = filter === 'all' || src.type === filter;
                  const tgtVisible = filter === 'all' || tgt.type === filter;
                  if (!srcVisible || !tgtVisible) return null;

                  const x1 = Number(src.positionX);
                  const y1 = Number(src.positionY);
                  const x2 = Number(tgt.positionX);
                  const y2 = Number(tgt.positionY);
                  const cx = (x1 + x2) / 2;
                  const cy = (y1 + y2) / 2 - 20;

                  const isActive =
                    selectedNodeId === src.id ||
                    selectedNodeId === tgt.id ||
                    hoveredNodeId === src.id ||
                    hoveredNodeId === tgt.id;

                  return (
                    <g key={edge.id}>
                      {/* Glow trail */}
                      {isActive && (
                        <path
                          d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                          fill="none"
                          stroke="#b21f2d"
                          strokeWidth="6"
                          strokeOpacity="0.12"
                          strokeLinecap="round"
                        />
                      )}
                      {/* Main line */}
                      <path
                        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                        fill="none"
                        stroke={isActive ? '#b21f2d' : '#2a2a30'}
                        strokeWidth={isActive ? '2' : '1'}
                        strokeOpacity={isActive ? '0.9' : '0.5'}
                        strokeDasharray={isActive ? undefined : '5 4'}
                        className="transition-all duration-300"
                      />
                      {/* Edge label */}
                      {isActive && edge.relationType && (
                        <>
                          <rect
                            x={cx - 38}
                            y={cy - 9}
                            width="76"
                            height="16"
                            rx="4"
                            fill="#0d0d10"
                            stroke="#b21f2d"
                            strokeWidth="0.5"
                            opacity="0.9"
                          />
                          <text
                            x={cx}
                            y={cy + 3}
                            fill="#ff6b78"
                            fontSize="7"
                            fontFamily="monospace"
                            fontWeight="700"
                            textAnchor="middle"
                            letterSpacing="0.05em"
                          >
                            {edge.relationType.toUpperCase()}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* ── Nodes ── */}
                {filteredNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const s = getStyle(node.type);
                  const r = node.type === 'story' ? 24 : 19;
                  const cx = Number(node.positionX);
                  const cy = Number(node.positionY);
                  const active = isSelected || isHovered;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Outer glow ring (selected) */}
                      {isSelected && (
                        <path
                          d={hexPath(cx, cy, r + 10)}
                          fill="none"
                          stroke={s.stroke}
                          strokeWidth="1"
                          strokeOpacity="0.35"
                          strokeDasharray="3 3"
                        />
                      )}
                      {/* Hover halo */}
                      {active && (
                        <path
                          d={hexPath(cx, cy, r + 5)}
                          fill={s.stroke}
                          fillOpacity="0.06"
                          stroke={s.stroke}
                          strokeWidth="0.5"
                          strokeOpacity="0.4"
                        />
                      )}
                      {/* Hex body */}
                      <path
                        d={hexPath(cx, cy, r)}
                        fill={active ? s.fill : '#0c0d12'}
                        stroke={active ? s.stroke : '#2c2c35'}
                        strokeWidth={isSelected ? '2' : '1.2'}
                        style={{
                          filter: active ? `url(#${s.glowId})` : undefined,
                          transition: 'all 0.2s ease',
                        }}
                      />
                      {/* Inner hex accent */}
                      <path
                        d={hexPath(cx, cy, r * 0.55)}
                        fill="none"
                        stroke={active ? s.stroke : '#1e1e24'}
                        strokeWidth="0.8"
                        strokeOpacity={active ? '0.6' : '0.4'}
                      />
                      {/* Icon via foreignObject */}
                      <foreignObject
                        x={cx - 8}
                        y={cy - 8}
                        width="16"
                        height="16"
                        className="pointer-events-none"
                      >
                        <div
                          className="flex items-center justify-center w-full h-full"
                          style={{ color: active ? s.textColor : '#3f3f48' }}
                        >
                          {getNodeIcon(node.type, 13)}
                        </div>
                      </foreignObject>
                      {/* Label */}
                      <g transform={`translate(${cx}, ${cy + r + 12})`}>
                        <rect
                          x={-(node.label.length * 3.4 + 7)}
                          y="-9"
                          width={node.label.length * 6.8 + 14}
                          height="16"
                          rx="3"
                          fill="#09090d"
                          stroke={isSelected ? s.stroke : '#1e1e24'}
                          strokeWidth="0.8"
                        />
                        <text
                          y="3"
                          fill={isSelected ? s.textColor : '#5a5a65'}
                          fontSize="8.5"
                          fontFamily="ui-monospace, monospace"
                          fontWeight="700"
                          textAnchor="middle"
                          letterSpacing="0.02em"
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

          {/* ── Dossier Panel ─────────────────────────────────── */}
          <div className="w-full lg:w-[340px] xl:w-[380px] border-t lg:border-t-0 lg:border-l border-white/[0.07] bg-[#08090e] flex flex-col overflow-hidden">
            {selectedNode ? (
              <>
                {/* Header */}
                <div className="p-5 border-b border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono font-black uppercase tracking-widest border"
                      style={{
                        color: getStyle(selectedNode.type).textColor,
                        borderColor: `${getStyle(selectedNode.type).stroke}40`,
                        background: `${getStyle(selectedNode.type).stroke}12`,
                      }}
                    >
                      <Shield size={9} /> {selectedNode.type} dossier
                    </span>
                    <span className="text-[8px] font-mono text-red-500/60 uppercase tracking-widest font-bold">
                      ● CLASSIFIED
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-black text-white/95 leading-tight">
                    {selectedNode.label}
                  </h3>
                  {/* Accent line */}
                  <div
                    className="h-px w-12 rounded"
                    style={{ background: getStyle(selectedNode.type).stroke }}
                  />
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {/* Summary */}
                  <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-4 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.15em] font-bold block">
                      Canonical Summary
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {selectedNode.summary || 'No summary available.'}
                    </p>
                  </div>

                  {/* Bio / notes */}
                  {selectedNode.bio && (
                    <div className="rounded-lg bg-[#b21f2d]/[0.05] border border-[#b21f2d]/20 p-4 space-y-2">
                      <span className="text-[9px] font-mono text-[#b21f2d]/80 uppercase tracking-[0.15em] font-bold block">
                        Classified Notes
                      </span>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                        "{selectedNode.bio}"
                      </p>
                    </div>
                  )}

                  {/* Connections */}
                  {connectedNodes.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Link2 size={10} className="text-zinc-600" />
                        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.15em] font-bold">
                          Connections ({connectedNodes.length})
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {connectedNodes.map(({ node: peer, relation }) => {
                          const ps = getStyle(peer.type);
                          return (
                            <button
                              key={peer.id}
                              onClick={() => setSelectedNodeId(peer.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all text-left group"
                            >
                              <span
                                className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                                style={{ background: `${ps.stroke}15`, color: ps.textColor }}
                              >
                                {getNodeIcon(peer.type, 10)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-mono text-zinc-300 group-hover:text-white transition-colors font-bold block truncate">
                                  {peer.label}
                                </span>
                                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-wider">
                                  {relation}
                                </span>
                              </div>
                              <ChevronRight
                                size={11}
                                className="text-zinc-700 group-hover:text-zinc-400 shrink-0 transition-colors"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {selectedNode.bookId && (
                    <Link
                      href={`/books/${selectedNode.bookId}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest text-white transition-all"
                      style={{
                        background: '#b21f2d',
                        boxShadow: '0 0 24px rgba(178,31,45,0.35)',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow = '0 0 36px rgba(178,31,45,0.55)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = '0 0 24px rgba(178,31,45,0.35)')
                      }
                    >
                      Read Connected Novel <ChevronRight size={13} />
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <Network className="w-8 h-8 text-[#b21f2d]/30 animate-pulse" />
                <p className="text-xs font-mono text-zinc-700">
                  Select a node from the map to view its classified dossier.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
