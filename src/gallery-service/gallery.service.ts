export class GalleryService {
  public async getGallery(): Promise<Gallery> {
    const response = await fetch('gallery.json');
    return response.json();
  }
}

export interface Gallery {
  videos: Video[];
  albums: Album[];
}

export interface Video {
  name: string;
  src: string;
  type: string;
}

export interface Album {
  name: string;
  images: Image[];
}

export interface Image {
  name: string;
  src: string;
  alt: string;
}
