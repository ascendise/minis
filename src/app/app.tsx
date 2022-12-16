import React from 'react';
import { GalleryService } from '../gallery-service/gallery.service';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../home/home';
import ImageGallery from '../image-gallery/image.gallery';

const router = createHashRouter([
  {
    path: "/",
    element: <Home galleryService={new GalleryService()}/>
  },
  {
    path: ":album-name",
    element: <ImageGallery />
  }
])

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-orange-200">
      <div className="text-center bg-orange-700 rounded-b-xl">
        <h1 className="text-white text-6xl font-bold inline">
          Minis!
          <img className="inline h-10" src="./logo.svg" alt="paint brush with brown handle and purple paint"></img>
        </h1>
      </div>
      <RouterProvider router={router}/>
    </div>
  );
}