import React from 'react';
import { Album as AlbumData } from '../gallery-service/gallery.service'

export default function Album(props: AlbumProps) {
    const album = props.album;
    return (
        <div>
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