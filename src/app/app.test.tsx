import { render, screen, waitFor } from '@testing-library/react';
import App from './app';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { instance, mock, when } from 'ts-mockito';
import { Gallery, GalleryService } from '../gallery-service/gallery.service';

let mockGallery: GalleryService;
beforeEach(() => {
  mockGallery = mock(GalleryService);
  const gallery: Gallery = {
    videos: [],
    albums: [],
  };
  when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery));
});

jest.mock('../home/home', () => {
  const mockHome = () => <div data-testid="home-page"></div>;
  return mockHome;
});

jest.mock('../image-gallery/image.gallery', () => {
  const mockImageGallery = () => <div data-testid="image-gallery-page"></div>;
  return mockImageGallery;
});

it('should render website name', async () => {
  render(
    <MemoryRouter>
      <App galleryService={instance(mockGallery)} />
    </MemoryRouter>
  );
  await waitFor(() => {
    const title = screen.queryByText('Minis!');
    expect(title).toBeInTheDocument();
  });
});

it('should render logo on home page', async () => {
  render(
    <MemoryRouter>
      <App galleryService={instance(mockGallery)} />
    </MemoryRouter>
  );
  await waitFor(() => {
    const logo = screen.queryByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo?.getAttribute('src')).toBe('./logo.svg');
  });
});

it('should render home page', async () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App galleryService={instance(mockGallery)} />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(getByTestId('home-page')).toBeInTheDocument();
  });
});

it('should render album on album page', async () => {
  const gallery: Gallery = {
    videos: [],
    albums: [
      {
        name: 'Album 1',
        images: [],
      },
    ],
  };
  when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery));
  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/Album-1']}>
      <App galleryService={instance(mockGallery)} />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(getByTestId('image-gallery-page')).toBeInTheDocument();
  });
});
