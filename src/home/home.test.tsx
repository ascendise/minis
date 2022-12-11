import React from 'react';
import Home from "./home";
import { render, screen } from "@testing-library/react";
import { Gallery, GalleryService } from "../gallery-service/gallery.service";
import { mock, when, verify, instance } from 'ts-mockito';

let mockGallery: GalleryService;

beforeEach(() => {
    mockGallery = mock(GalleryService);
});

it('should render video from gallery', () => {
    const gallery: Gallery = {
        videos: [
            {
                name: 'Video',
                src: 'video.webm',
                type: 'video/webm',
            }
        ],
        albums: [],
    }
    when(mockGallery.getGallery()).thenReturn(gallery)
    const component = render(<Home galleryService={instance(mockGallery)}/>);
    const video = component.container.querySelector("#main-video");
    expect(video).toBeInTheDocument();
    const sourceNode = video?.children[0];
    expect(sourceNode?.getAttribute('src')).toBe('video.webm');
    expect(sourceNode?.getAttribute('type')).toBe('video/webm');
    verify(mockGallery.getGallery()).once();
})

it('should render album title', () => {
    const gallery: Gallery = {
        videos: [],
        albums: [
            {
                name: "Album 1",
                images: [],
            },
            {
                name: "Album 2",
                images: [],
            }
        ]
    }
    when(mockGallery.getGallery()).thenReturn(gallery)
    const {getByText} = render(<Home galleryService={instance(mockGallery)}/>)
    expect(getByText('Album 1')).toBeInTheDocument();
    expect(getByText('Album 2')).toBeInTheDocument();
})

it('should render first image of album as preview', () => {
    const gallery: Gallery = {
        videos: [],
        albums: [
            {
                name: "Album 1",
                images: [{
                    name: 'Image of something',
                    path: './image.webp',
                    alt: 'Description of image'
                }],
            }
        ]
    }
    when(mockGallery.getGallery()).thenReturn(gallery)
    render(<Home galleryService={instance(mockGallery)}/>)
    const image = screen.getByRole('img', {name: 'Image of something'});
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('./image.webp');
    expect(image.getAttribute('alt')).toBe('Description of image');
})
