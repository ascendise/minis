import React from 'react';
import { GalleryService } from "../gallery-service/gallery.service";

export default function Home(props: HomeProps) {
    const service = props.galleryService;
    const gallery = service.getGallery();
    const video = gallery.videos[0];
    const albums = gallery.albums.map((album, index) => 
        <div key={index}>
            {album.name}
            {album.images.length > 0 &&
                <img 
                    src={album.images[0].src} 
                    alt={album.images[0].alt}
                    aria-label={album.images[0].name}
                ></img>
            } 
        </div>
    );
    return (
        <div>
            {video &&
                <video id='main-video'>
                    <source src={video.src} type={video.type}></source>
                </video>
            }
            {albums}
        </div>
    )
}

interface HomeProps {
    galleryService: GalleryService,
}