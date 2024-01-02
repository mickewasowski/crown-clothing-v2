import { screen, render } from '@testing-library/react';
import CartItem from '../cart-item.component';

describe('Cart Item tests', () => {
    it('should render the item\'s data', () => {
        const cartItemMock = {
            id: 1,
            name: 'Item 1',
            imageUrl: 'test',
            price: 10,
            quantity: 2
        };

        render(<CartItem cartItem={cartItemMock}/>);

        const imgElem = screen.getByAltText(/item/i, { exact: false });
        const itemNameElem = screen.getByText(/item/i, { exact: false });

        expect(imgElem).toBeInTheDocument();
        expect(itemNameElem).toBeInTheDocument();
    });
});