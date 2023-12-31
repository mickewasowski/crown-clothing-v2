import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import Category from '../category.component';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens',
    })
}))

describe('Category tests', () => {
    it('should render a spinner if isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        })

        const spinnerElem = screen.getByTestId('spinner');
        expect(spinnerElem).toBeInTheDocument();
    });

    it('should render products if isLoading is false and there are items present', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [{
                        title: 'mens',
                        items: [{ id: 1, name: 'Product 1'}, { id: 2, name: 'Product 2'}]
                    }]
                }
            }
        })

        const spinnerElem = screen.queryByTestId('spinner');
        expect(spinnerElem).toBeNull();

        const product1 = screen.getByText(/product 1/i);
        expect(product1).toBeInTheDocument();
    })
});