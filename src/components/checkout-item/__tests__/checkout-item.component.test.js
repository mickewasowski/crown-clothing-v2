import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import CheckoutItem from '../checkout-item.component';
import * as reactRedux from 'react-redux';
import { addItemToCart } from '../../../store/cart/cart.action';

describe('Checkout item tests', () => {
    it('should render checkout item properly', () => {
        const initialState = {
            cart: {
                cartItems: []
            }
        }
        const currentItem = { id: 1, name: 'Item 1', price: 10, imageUrl: 'test', quantity: 1 };

        renderWithProviders(<CheckoutItem cartItem={currentItem}/>, {
            preloadedState: initialState
        });

        const increaseBtn = screen.getByTestId('increaseQuantity');
        expect(increaseBtn).toBeInTheDocument();

        const quantity = screen.getByTestId('itemQuantity');
        expect(quantity.innerHTML).toEqual('1');    
    });

    it('should increase the quantity of the item when the increase button is clicked', async () => {
        const initialState = {
            cart: {
                cartItems: [
                    { id: 1, name: 'Item 1', price: 10, imageUrl: 'test', quantity: 1 },
                    { id: 2, name: 'Item 2', price: 10, imageUrl: 'test', quantity: 1 },
                ]
            }
        }
        const currentItem = initialState.cart.cartItems[0];

        const { store } = renderWithProviders(<CheckoutItem cartItem={currentItem}/>, {
            preloadedState: initialState
        });

        const increaseBtn = screen.getByTestId('increaseQuantity');

        await fireEvent.click(increaseBtn);
        expect(store.getState().cart.cartItems[0].quantity).toEqual(2);
    });
});