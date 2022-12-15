import { render } from '@testing-library/react';
import React from 'react';
import ImageGallery from './image.gallery';

it('should render', () => {
    const view = render(<ImageGallery/>);
    expect(view).not.toBeNull();
})