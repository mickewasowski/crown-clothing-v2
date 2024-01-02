import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import CartDropdown from '../cart-dropdown.component';

describe('Cart dropdown tests', () => {
    it('should render emprty cart dropdown if no items were added', () => {
        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        });

        const emptyText = screen.getByText(/Your cart is empty/i);

        expect(emptyText).toBeInTheDocument();
    });

    it('should render go to checkout button if items were added', () => {
        const initialCartItems = [
            { id: 1, name: 'Item 1', imageUrl: 'test', price: 10 },
            { id: 2, name: 'Item 2', imageUrl: 'test', price: 10 },
            { id: 3, name: 'Item 3', imageUrl: 'test', price: 10 },
            { id: 4, name: 'Item 4', imageUrl: 'test', price: 10 },
        ];

        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: [...initialCartItems],
                }
            }
        });

        const cartItemsList = screen.getAllByRole('img', { name: /item/i, exact: false });
        const goToCheckoutBtn = screen.getByRole('button', { name: /go to checkout/i });

        expect(cartItemsList.length).toEqual(4);
        expect(goToCheckoutBtn).toBeInTheDocument();
    });
});