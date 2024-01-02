import { screen, render } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import CategoryPreview from '../category-preview.component';

describe('Category Preview tests', () => {
    it('should render capital title and all provided items', () => {
        const title = 'womens';
        const products = [
            { id: 1, name: 'Item 1', imageUrl: 'test', price: 10 },
            { id: 2, name: 'Item 2', imageUrl: 'test', price: 10 },
            { id: 3, name: 'Item 3', imageUrl: 'test', price: 10 },
            { id: 4, name: 'Item 4', imageUrl: 'test', price: 10 },
        ];

        renderWithProviders(<CategoryPreview title={title} products={products}/>, {
            preloadedState: {}
        });

        const capitalTitle = screen.getByText('WOMENS');
        const productsElem = screen.getAllByRole('img');

        expect(capitalTitle).toBeInTheDocument();
        expect(productsElem.length).toEqual(4);
    });
});