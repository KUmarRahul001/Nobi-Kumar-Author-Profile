'use client';

import * as React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { GENRES } from '@/constants/genres';
import { SERIES } from '@/constants/series';
import { LANGUAGES } from '@/constants/languages';

interface BookFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedGenre: string;
  onGenreChange: (val: string) => void;
  selectedSeries: string;
  onSeriesChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedLanguage: string;
  onLanguageChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
}

export default function BookFilters({
  search,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedSeries,
  onSeriesChange,
  selectedStatus,
  onStatusChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortByChange,
}: BookFiltersProps) {
  return (
    <div className="bg-card border border-border/60 rounded-xl p-5 space-y-4 shadow-md">
      <div className="flex items-center gap-2 border-b border-border/30 pb-3">
        <SlidersHorizontal size={16} className="text-crimson" />
        <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-foreground">
          Filter & Sort Catalog
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
          <input
            id="search-input"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, ISBN..."
            className="w-full bg-neutral-900 border border-border rounded pl-9 pr-3 py-2 text-xs text-foreground focus:outline-none focus:border-crimson placeholder-neutral-600 focus:ring-2 focus:ring-crimson"
          />
        </div>

        {/* Genre Filter */}
        <div>
          <label htmlFor="genre-select" className="sr-only">
            Genre
          </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-muted hover:text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          >
            <option value="all">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Series Filter */}
        <div>
          <label htmlFor="series-select" className="sr-only">
            Series
          </label>
          <select
            id="series-select"
            value={selectedSeries}
            onChange={(e) => onSeriesChange(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-muted hover:text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          >
            <option value="all">All Series</option>
            {SERIES.map((series) => (
              <option key={series} value={series}>
                {series}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status-select" className="sr-only">
            Status
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-muted hover:text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="coming-soon">Coming Soon</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label htmlFor="language-select" className="sr-only">
            Language
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-muted hover:text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          >
            <option value="all">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label htmlFor="sort-select" className="sr-only">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-muted hover:text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          >
            <option value="displayOrder">Default Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="alphabetical-desc">Alphabetical (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
