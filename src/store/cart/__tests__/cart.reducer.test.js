import { CART_INITIAL_STATE, cartReducer } from '../cart.reducer';
import { setIsCartOpen, setCartItems, addItemToCart, removeItemFromCart, clearItemFromCart } from '../cart.action';

describe('Cart reducer tests', () => {
    it('should set isCartOpen to true', () => {
        const expectedState = {
            ...CART_INITIAL_STATE,
            isCartOpen: true
        };

        expect(cartReducer(CART_INITIAL_STATE, setIsCartOpen(true))).toEqual(expectedState);
    });

    it('should add item to cart', () => {
        const productToAdd = { id: 1, imageUrl: 'test', name: 'Product 1', price: 10 };
        const expectedState = {
            ...CART_INITIAL_STATE,
            cartItems: [
                { id: 1, imageUrl: 'test', name: 'Product 1', price: 10, quantity: 1 }
            ]
        };

        expect(cartReducer(CART_INITIAL_STATE, addItemToCart(CART_INITIAL_STATE.cartItems, productToAdd))).toEqual(expectedState);
    });

    it('should reduce item quantity from cart', () => {
        const productToRemove = { id: 1, imageUrl: 'test', name: 'Product 1', price: 10 };
        const cartState = {
            isCartOpen: false,
            cartItems: [
                { id: 1, imageUrl: 'test', name: 'Product 1', price: 10, quantity: 3 }
            ]
        }
        const expectedState = {
            ...CART_INITIAL_STATE,
            cartItems: [
                { id: 1, imageUrl: 'test', name: 'Product 1', price: 10, quantity: 2 }
            ]
        };

        expect(cartReducer(cartState, removeItemFromCart(cartState.cartItems, productToRemove))).toEqual(expectedState);
    });

    it('should remove the item from the cart array', () => {
        const productToRemove = { id: 1, imageUrl: 'test', name: 'Product 1', price: 10 };
        const cartState = {
            isCartOpen: false,
            cartItems: [
                { id: 1, imageUrl: 'test', name: 'Product 1', price: 10, quantity: 3 }
            ]
        }
        const expectedState = {
            ...CART_INITIAL_STATE,
            cartItems: []
        };

        expect(cartReducer(cartState, clearItemFromCart(cartState.cartItems, productToRemove))).toEqual(expectedState);
    });

    it('should set cart items array', () => {
        const cartItems = [
            { id: 1, imageUrl: 'test', name: 'Product 1', price: 10 },
            { id: 2, imageUrl: 'test', name: 'Product 2', price: 10 },
            { id: 3, imageUrl: 'test', name: 'Product 3', price: 10 },
        ];
        const expectedState = {
            ...CART_INITIAL_STATE,
            cartItems
        };

        expect(cartReducer(CART_INITIAL_STATE, setCartItems(cartItems))).toEqual(expectedState);
    });
});