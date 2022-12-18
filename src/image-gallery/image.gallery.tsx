import React from 'react';
import { Album } from '../gallery-service/gallery.service';

export default function ImageGallery(props: ImageGalleryProps) {
    const images = props.album.images.map((img, index) => 
        <img key={index} src={img.src} alt={img.alt} />
    )
    return (
        <div>
            {images}
        </div>
    );
}

export interface ImageGalleryProps {
    album: Album;
}