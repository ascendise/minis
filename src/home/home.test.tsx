import React from 'react';
import Home from "./home";
import { cleanup, render } from "@testing-library/react";
import { Gallery, GalleryService } from "../gallery-service/gallery.service";
import { mock, when, verify } from 'ts-mockito';

let mockGallery: GalleryService;

beforeEach(() => {
    mockGallery = mock(GalleryService);
});

afterEach(cleanup);

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
    const component = render(<Home galleryService={new GalleryService()}/>);
    const video = component.container.querySelector("#main-video");
    expect(video).toBeInTheDocument();
    const sourceNode = video?.children[0];
    console.log(sourceNode)
    expect(sourceNode?.getAttribute('src')).toBe('video.webm');
    expect(sourceNode?.getAttribute('type')).toBe('video/webm');
    verify(mockGallery.getGallery()).once();
})