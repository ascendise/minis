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
            <div className='flex justify-center my-5 max-h-[vh40]'>
                <h3 className="text-white font-extrabold absolute z-50 left-2/5">
                    {video.name}
                </h3>
                <video className='aspect-video opacity-100 bg-black rounded-lg max-w-[100vh]' id='main-video' controls loop>
                    <source src={video.src} type={video.type}></source>
                </video>
            </div>
            }
            <div className="grid grid-cols-4 gap-4 mx-5">
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