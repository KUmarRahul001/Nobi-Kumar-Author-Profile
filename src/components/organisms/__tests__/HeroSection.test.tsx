import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '../HeroSection';

describe('HeroSection Component', () => {
  it('renders branding title and description content', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 2, name: /the novelist/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /the writer/i })).toBeInTheDocument();

    expect(screen.getByText(/psychological thrillers/i)).toBeInTheDocument();
    expect(screen.getByText(/nobi narrative universe/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /enter novels archive/i })).toHaveAttribute(
      'href',
      '/books'
    );
    expect(screen.getByRole('link', { name: /enter universe map/i })).toHaveAttribute(
      'href',
      '/universe'
    );
  });
});
