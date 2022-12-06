import { cleanup, render, screen } from '@testing-library/react';
import Home from './home';

afterEach(cleanup);

it('should render website name', () => {
    render(<Home/>);
    const title = screen.queryByText('Minis!')
    expect(title).toBeInTheDocument();
})

it('should render logo on home page', () => {
    render(<Home/>);
    const logo = screen.queryByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo?.getAttribute('src')).toBe('./logo.svg');
})