import { selectCartCount, selectCartItems, selectCartTotal, selectIsCartOpen } from '../cart.selector';

const mockState = {
    cart: {
        isCartOpen: true,
        cartItems: [
            { id: 1, name: 'Product 1', imageUrl: 'test', price: 10, quantity: 1 },
            { id: 2, name: 'Product 2', imageUrl: 'test', price: 10, quantity: 2 },
            { id: 3, name: 'Product 3', imageUrl: 'test', price: 10, quantity: 3 },
            { id: 4, name: 'Product 4', imageUrl: 'test', price: 10, quantity: 4 }
        ]
    }
}

describe('Cart selector tests', () => {
    it('should select isCartOpen', () => {
        const isCartOpen = selectIsCartOpen(mockState);

        expect(isCartOpen).toBe(true);
    });

    it('should select cart count', () => {
        const cartCount = selectCartCount(mockState);

        expect(cartCount).toBe(10);
    });

    it('should select cart items', () => {
        const cartItems = selectCartItems(mockState);

        expect(cartItems).toEqual(mockState.cart.cartItems);
    });

    it('should select cart total', () => {
        const cartTotal = selectCartTotal(mockState);

        const mockTotal = mockState.cart.cartItems.reduce((total, cartItem) => total += cartItem.quantity * cartItem.price, 0);

        expect(cartTotal).toBe(mockTotal);
    })
});