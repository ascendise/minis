import React from 'react';
import Home from "./home";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { Gallery, GalleryService } from "../gallery-service/gallery.service";
import { mock, when, verify, instance } from 'ts-mockito';

let mockGallery: GalleryService;

beforeEach(() => {
    mockGallery = mock(GalleryService);
});

it('should render video from gallery', async () => {
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
    when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery))
    const component = render(<Home galleryService={instance(mockGallery)}/>);
    await waitFor(() => {
        const video = component.container.querySelector("#main-video");
        expect(video).toBeInTheDocument();
        const sourceNode = video?.children[0];
        expect(sourceNode?.getAttribute('src')).toBe('video.webm');
        expect(sourceNode?.getAttribute('type')).toBe('video/webm');
    });
    verify(mockGallery.getGallery()).called();
})

it('should render album title', async () => {
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
    when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery))
    const {getByText} = render(<Home galleryService={instance(mockGallery)}/>)
    await waitFor(() => {
        expect(getByText('Album 1')).toBeInTheDocument();
        expect(getByText('Album 2')).toBeInTheDocument();
    })
    verify(mockGallery.getGallery()).called();
})

it('should render first image of album as preview', async () => {
    const gallery: Gallery = {
        videos: [],
        albums: [
            {
                name: "Album 1",
                images: [{
                    name: 'Image of something',
                    src: './image.webp',
                    alt: 'Description of image'
                }],
            }
        ]
    }
    when(mockGallery.getGallery()).thenReturn(Promise.resolve(gallery))
    render(<Home galleryService={instance(mockGallery)}/>)
    await waitFor(() => {
        const image = screen.getByRole('img', {name: 'Image of something'});
        expect(image).toBeInTheDocument();
        expect(image.getAttribute('src')).toBe('./image.webp');
        expect(image.getAttribute('alt')).toBe('Description of image');
    });
    verify(mockGallery.getGallery()).called();
})
