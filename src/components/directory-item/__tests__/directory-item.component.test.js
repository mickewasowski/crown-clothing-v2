import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import DirectoryItem from '../directory-item.component'
import { BrowserRouter } from 'react-router-dom';

describe('Directory item tests', () => {
    it('should render properly and navigate to the proper route', async () => {
        const mockItem = {
            id: 1,
            title: 'mens',
            imageUrl: 'test',
            route: 'mensroute'
        };

        render(
            <BrowserRouter>
                <DirectoryItem category={mockItem}/>
            </BrowserRouter>);

        const navigateBtn = screen.getByTestId('mens');
        await fireEvent.click(navigateBtn);

        await waitFor(() => expect(window.location.href).toContain('/mensroute'));
    });
});