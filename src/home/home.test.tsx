import React from 'react';
import Home from './home';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AlbumProps } from '../album/album';
import { Gallery } from '../gallery-service/gallery.service';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../album/album', () => {
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
  const component = render(
    <MemoryRouter>
      <Home gallery={gallery} />
    </MemoryRouter>
  );
  await waitFor(() => {
    const video = component.container.querySelector('#main-video');
    expect(video).toBeInTheDocument();
    const sourceNode = video?.children[0];
    expect(sourceNode?.getAttribute('src')).toBe('video.webm');
    expect(sourceNode?.getAttribute('type')).toBe('video/webm');
  });
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
  const { getByTestId } = render(
    <MemoryRouter>
      <Home gallery={gallery} />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(getByTestId('album-Album 1')).toBeInTheDocument();
    expect(getByTestId('album-Album 2')).toBeInTheDocument();
  });
});
