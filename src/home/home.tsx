import React, { useEffect, useState } from 'react';
import Album from '../album/album';
import { Gallery, GalleryService } from "../gallery-service/gallery.service";

export default function Home(props: HomeProps) {
    const [state, setState] = useState<HomeState>({
        gallery: {
            albums: [],
            videos: [],
        }
    });
    useEffect(() => {
        props.galleryService.getGallery().then(res => {
            setState({
                gallery: res,
            });
        })
    });
    const gallery = state.gallery;
    const video = gallery.videos[0];
    const albums = gallery.albums.map((album, index) => 
        <Album key={index} album={album} />
    );
    return (
        <div>
            {video &&
                <video id='main-video'>
                    <source src={video.src} type={video.type}></source>
                </video>
            }
            <div className="grid grid-cols-4 gap-4">
                {albums}
            </div>
        </div>
    )
}

interface HomeProps {
    galleryService: GalleryService,
}

interface HomeState {
    gallery: Gallery,
}