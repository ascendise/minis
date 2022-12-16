import { render, screen } from '@testing-library/react';
import App from './app';
import React from 'react';

jest.mock('../home/home', () => {
  const mockHome = () => <div data-testid="home-page"></div>;
  return mockHome;
});

jest.mock('../image-gallery/image.gallery', () => {
  const mockImageGallery = () => <div data-testid="image-gallery-page"></div>;
  return mockImageGallery;
})

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

it('should render home page', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('home-page')).toBeInTheDocument();
});