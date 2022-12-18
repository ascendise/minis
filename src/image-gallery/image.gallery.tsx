import React from 'react';
import { useParams } from 'react-router-dom';

export default function ImageGallery() {
    const { seg } = useParams();
    return (<div>{seg}</div>);
}