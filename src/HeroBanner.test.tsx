import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

test('renders learn react link', () => {
  render(<HeroBanner />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
