import React from 'react';
import { GalleryService } from "../gallery-service/gallery.service";

export default function Home(props: HomeProps) {
    const service = props.galleryService;
    const gallery = service.getGallery();
    const video = gallery.videos[0];
    return (
        <div>
            <video id='main-video'>
                <source src={video.src} type={video.type}></source>
            </video>
        </div>
    )
}

interface HomeProps {
    galleryService: GalleryService,
}