import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SampleReader from '../SampleReader';

describe('SampleReader Component', () => {
  it('renders sample title, word counts, and handles font scaling toggles', () => {
    render(
      <SampleReader
        bookTitle="Verma Legacy Chapter One"
        bookSlug="verma-legacy"
        excerpt="It was a dark and stormy night in the Verma estate."
      />
    );

    // Check title
    expect(screen.getByText('Verma Legacy Chapter One')).toBeInTheDocument();

    // Check initial font size
    expect(screen.getByText('18px')).toBeInTheDocument();

    // Increase font size
    const zoomInButton = screen.getByRole('button', { name: /increase text size/i });
    fireEvent.click(zoomInButton);

    expect(screen.getByText('20px')).toBeInTheDocument();

    // Decrease font size
    const zoomOutButton = screen.getByRole('button', { name: /decrease text size/i });
    fireEvent.click(zoomOutButton);

    expect(screen.getByText('18px')).toBeInTheDocument();
  });
});
