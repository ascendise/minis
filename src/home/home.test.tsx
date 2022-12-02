import { unmountComponentAtNode } from 'react-dom';

let container: Element;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container!);
    container.remove();
})

