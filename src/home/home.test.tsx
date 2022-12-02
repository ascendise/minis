import { cleanup, render, screen } from '@testing-library/react';
import Home from './home';

afterEach(cleanup);

it('renders website name', () => {
    render(<Home/>);
    const title = screen.queryByText('Minis!')
    expect(title).toBeInTheDocument();
})