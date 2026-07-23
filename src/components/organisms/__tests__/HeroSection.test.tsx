import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '../HeroSection';

describe('HeroSection Component', () => {
  it('renders branding title and description content', () => {
    render(<HeroSection />);

    // Check main title
    expect(screen.getByRole('heading', { level: 1, name: /nobi kumar/i })).toBeInTheDocument();

    // Check introduction details
    expect(screen.getByText(/unraveling the architecture of memory/i)).toBeInTheDocument();

    // Check explore button CTA
    expect(screen.getByRole('link', { name: /explore bibliography/i })).toHaveAttribute(
      'href',
      '/books'
    );
  });
});
