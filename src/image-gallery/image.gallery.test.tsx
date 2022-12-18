import { render } from '@testing-library/react';
import React from 'react';
import { Album } from '../gallery-service/gallery.service';
import ImageGallery from './image.gallery';

it('should render', () => {
    const album: Album = {
        name: '',
        images: [],
    }
    const view = render(<ImageGallery album={album}/>);
    expect(view).not.toBeNull();
})

it('should render all images inside album', async () => {
    const album: Album = {
        name: 'Album',
        images: [
            {
                src: './image1.jpg',
                name: 'Image 1',
                alt: 'Image 1'
            },
            {
                src: './image2.jpg',
                name: 'Image 2',
                alt: 'Image 2'
            }
        ]
    }
    const { findAllByRole } = render(<ImageGallery album={album} />);
    const images = await findAllByRole('img');
    expect(images[0].getAttribute('src')).toBe('./image1.jpg');
    expect(images[0].getAttribute('alt')).toBe('Image 1');
    expect(images[1].getAttribute('src')).toBe('./image2.jpg');
    expect(images[1].getAttribute('alt')).toBe('Image 2');
})