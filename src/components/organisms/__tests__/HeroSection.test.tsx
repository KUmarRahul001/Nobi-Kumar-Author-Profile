import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '../HeroSection';

describe('HeroSection Component', () => {
  it('renders Nobi Archive branding title and editorial CTAs', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 1, name: /nobi kumar/i })).toBeInTheDocument();
    expect(screen.getByText(/NOBI KUMAR \/ AUTHOR DOSSIER 001/i)).toBeInTheDocument();

    expect(screen.getByText(/psychological thrillers/i)).toBeInTheDocument();
    expect(screen.getByText(/nobi narrative universe/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /explore the books/i })).toHaveAttribute(
      'href',
      '/books'
    );
    expect(screen.getByRole('link', { name: /enter the universe/i })).toHaveAttribute(
      'href',
      '/universe'
    );
    expect(screen.getByRole('link', { name: /read the chronicles/i })).toHaveAttribute(
      'href',
      '/blog'
    );
  });
});
