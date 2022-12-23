import React from 'react';
import { Link } from 'react-router-dom';
import Album from '../album/album';
import { Gallery } from '../gallery-service/gallery.service';

export default function Home(props: HomeProps) {
  const gallery = props.gallery;
  const video = gallery.videos[0];
  const albums = gallery.albums.map((album, index) => (
    <Link key={index} to={`/${album.name.replace(' ', '-')}`}>
      <Album key={index} album={album} />
    </Link>
  ));
  return (
    <div>
      {video && (
        <div className="flex justify-center my-5 max-h-[vh40]">
          <h3 className="text-white font-extrabold absolute z-50 left-2/5">{video.name}</h3>
          <video
            className="aspect-video opacity-100 bg-black rounded-lg max-w-[90vw] max-h-[66vh] "
            id="main-video"
            controls
            loop
          >
            <source src={video.src} type={video.type}></source>
          </video>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2 mx-5">{albums}</div>
    </div>
  );
}

interface HomeProps {
  gallery: Gallery;
}
