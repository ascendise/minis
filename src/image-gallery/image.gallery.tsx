import React from 'react';
import { Album } from '../gallery-service/gallery.service';

export default function ImageGallery(props: ImageGalleryProps) {
  const images = props.album.images.map((img, index) => (
    <a key={index} href={img.src} target='blank'>
      <img src={img.src} alt={img.alt} className="max-h-64 rounded-sm" />
    </a>
  ));
  return (
    <div className="mx-5">
      <h2 className="text-orange-600 font-bold text-center text-size text-2xl">{props.album.name}</h2>
      <div className="flex flex-row flex-wrap justify-center gap-5">{images}</div>
    </div>
  );
}

export interface ImageGalleryProps {
  album: Album;
}
