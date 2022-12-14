import React from 'react';
import Home from './home';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Gallery, GalleryService } from '../gallery-service/gallery.service';
import { mock, when, verify, instance } from 'ts-mockito';
import { AlbumProps } from '../album/album';

let mockGallery: GalleryService;
beforeEach(() => {
  mockGallery = mock(GalleryService);
});

jest.mock('../album/Album', () => {
  const mockAlbum = (props: AlbumProps) => <div data-testid={`album-${props.album.name}`}></div>;
  return mockAlbum;
});

it('should render video from gallery', async () => {
  const gallery: Gallery = {
    videos: [
      {
        name: 'Video',
        src: 'video.webm',
        type: 'video/webm',
      },
    ],
    albums: [],
  };
  when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery));
  const component = render(<Home galleryService={instance(mockGallery)} />);
  await waitFor(() => {
    const video = component.container.querySelector('#main-video');
    expect(video).toBeInTheDocument();
    const sourceNode = video?.children[0];
    expect(sourceNode?.getAttribute('src')).toBe('video.webm');
    expect(sourceNode?.getAttribute('type')).toBe('video/webm');
  });
  verify(mockGallery.getGallery()).called();
});

it('should render album from gallery', async () => {
  const gallery: Gallery = {
    videos: [],
    albums: [
      {
        name: 'Album 1',
        images: [],
      },
      {
        name: 'Album 2',
        images: [],
      },
    ],
  };
  when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery));
  const { getByTestId } = render(<Home galleryService={instance(mockGallery)} />);
  await waitFor(() => {
    expect(getByTestId('album-Album 1')).toBeInTheDocument();
    expect(getByTestId('album-Album 2')).toBeInTheDocument();
  });
});
