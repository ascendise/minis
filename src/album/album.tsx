import React from 'react';
import { Album as AlbumData } from '../gallery-service/gallery.service'

export default function Album(props: AlbumProps) {
    const album = props.album;
    return (
        <div className="bg-slate-900 text-white rounded-sm font-bold text-2xl aspect-video grid place-items-center">
            {album.name}
            {album.images.length > 0 &&
                <img 
                    src={album.images[0].src} 
                    alt={album.images[0].alt}
                    aria-label={album.images[0].name}
                ></img>
            } 
        </div>
    )
}

export interface AlbumProps {
    album: AlbumData
}