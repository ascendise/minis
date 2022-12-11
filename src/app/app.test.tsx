import {  render, screen } from '@testing-library/react';
import App from './app';
import React from 'react';

it('should render website name', () => {
  render(<App />);
  const title = screen.queryByText('Minis!');
  expect(title).toBeInTheDocument();
});

it('should render logo on home page', () => {
  render(<App />);
  const logo = screen.queryByRole('img');
  expect(logo).toBeInTheDocument();
  expect(logo?.getAttribute('src')).toBe('./logo.svg');
});
