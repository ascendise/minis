import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Gallery, GalleryService } from '../gallery-service/gallery.service';
import Home from '../home/home';
import ImageGallery from '../image-gallery/image.gallery';

export default function App(props: AppProps) {
  const [state, setState] = useState<AppState>({
    gallery: {
      albums: [],
      videos: [],
    },
  });
  const albumRoutes = state.gallery.albums.map((album, index) => 
    <Route 
      key={index}
      path={`/${album.name.replace(' ', '-')}`} 
      element={<ImageGallery />}
    />
  );
  useEffect(() => {
    props.galleryService.getGallery().then(res => {
      setState({
        gallery: res,
      });
    });
  }, []);
  
  return (
    <div className="flex flex-col h-screen bg-orange-200">
      <div className="text-center bg-orange-700 rounded-b-xl">
        <h1 className="text-white text-6xl font-bold inline">
          Minis!
          <img className="inline h-10" src="./logo.svg" alt="paint brush with brown handle and purple paint"></img>
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Home galleryService={props.galleryService}/>}/>
        {albumRoutes}
      </Routes>
    </div>
  );
}

export interface AppProps {
  galleryService: GalleryService;
}

export interface AppState {
  gallery: Gallery;
}
