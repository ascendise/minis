export class GalleryService {
    public getGallery(): Gallery {
        return {
            videos: [{
                name: '',
                src: '',
                type: ''
            }],
            albums: [],
        }
    }
}

export interface Gallery {
    videos: Video[],
    albums: Album[],
}

export interface Video {
    name: string,
    src: string,
    type: string,
}

export interface Album {
    name: string,
    images: Image[],
}

export interface Image {
    name: string,
    path: string,
    alt: string,
}