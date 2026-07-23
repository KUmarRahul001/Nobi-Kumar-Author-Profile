import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders sitemap links and copyright text', () => {
    render(<Footer />);

    // Check semantic role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Check sitemap links
    expect(screen.getByRole('link', { name: /novels/i })).toHaveAttribute('href', '/books');
    expect(screen.getByRole('link', { name: /universe map/i })).toHaveAttribute(
      'href',
      '/universe'
    );

    // Check copyright content
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
