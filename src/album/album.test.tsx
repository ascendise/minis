import { render, screen } from '@testing-library/react';
import React from 'react';
import Album from './album';

it('should render', () => {
    const view = render(<Album album={{name: 'name', images: []}}/>);
    expect(view).not.toBeNull();
})

it('should render album title', async () => {
    const album = {
        name: "Album 1",
        images: [],
    }
    const {getByText} = render(<Album album={album}/>)
    expect(getByText('Album 1')).toBeInTheDocument();
})

it('should render first image of album as preview', async () => {
    const album = {
        name: "Album 1",
        images: [{
            name: 'Image of something',
            src: './image.webp',
            alt: 'Description of image'
        }],
    }
    render(<Album album={album}/>)
    const image = screen.getByRole('img', {name: 'Image of something'});
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('./image.webp');
    expect(image.getAttribute('alt')).toBe('Description of image');
})