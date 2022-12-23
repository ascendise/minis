import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
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
  const albumRoutes = state.gallery.albums.map((album, index) => (
    <Route key={index} path={`/${album.name.replaceAll(' ', '-')}`} element={<ImageGallery album={album} />} />
  ));
  useEffect(() => {
    props.galleryService.getGallery().then((res) => {
      setState({
        gallery: res,
      });
    });
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-x-clip">
      <div className="text-center bg-orange-700 rounded-b-xl">
        <Link to="/">
          <h1 className="text-white text-6xl font-bold inline">
            Minis!
            <img
              className="inline h-10"
              data-testid="logo"
              src="./logo.svg"
              alt="paint brush with brown handle and purple paint"
            ></img>
          </h1>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home gallery={state.gallery} />} />
        {albumRoutes}
      </Routes>
      <div className="flex justify-center items-center gap-10 py-1 mt-auto bg-orange-700 rounded-t-xl">
        <a href="https://github.com/ascendise/minis" target="blank">
          <img className="max-h-[5vh]" src="github-mark-white.svg" />
        </a>
        <a href="https://github.com/ascendise/minis/blob/main/LICENSE" target="blank">
          <span className="text-white font-bold">License</span>
        </a>
      </div>
    </div>
  );
}

export interface AppProps {
  galleryService: GalleryService;
}

export interface AppState {
  gallery: Gallery;
}
