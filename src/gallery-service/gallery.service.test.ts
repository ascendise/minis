import { Gallery, GalleryService } from './gallery.service'

beforeEach(() => {
    fetchMock.resetMocks();
})

it('should return manifest file', async () => {
    const expectedGallery: Gallery = {
        videos: [
            {
                name: "My video",
                type: "video/webm",
                src: "./my-video.webm"
            }
        ],
        albums: [
            {
                name: "Images",
                images: [
                    {
                        name: "My image",
                        src: "image.jpg",
                        alt: "Description of image"
                    }
                ]
            }
        ]
    };
    fetchMock.mockResponse(JSON.stringify(expectedGallery));
    const galleryService = new GalleryService();
    const gallery = await galleryService.getGallery();
    expect(gallery).toEqual(expectedGallery);
})