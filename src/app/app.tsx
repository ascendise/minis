import React from 'react';
import { GalleryService } from '../gallery-service/gallery.service';
import Home from '../home/home';

export default function App() {
  return (
    <div>
      <div className="text-center bg-orange-300 rounded-b-xl">
        <h1 className="text-white text-6xl font-bold inline">
          Minis!
          <img className="inline h-10" src="./logo.svg" alt="paint brush with brown handle and purple paint"></img>
        </h1>
      </div>
      <Home galleryService={new GalleryService()} />
    </div>
  );
}
