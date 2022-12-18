import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GalleryService } from '../gallery-service/gallery.service';
import Home from '../home/home';

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-orange-200">
      <div className="text-center bg-orange-700 rounded-b-xl">
        <h1 className="text-white text-6xl font-bold inline">
          Minis!
          <img className="inline h-10" src="./logo.svg" alt="paint brush with brown handle and purple paint"></img>
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Home galleryService={new GalleryService()}/>}/>
      </Routes>
    </div>
  );
}