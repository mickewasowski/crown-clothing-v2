import { getByText, queryByText, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";

describe('Navigation tests', () => {
    it('should render a sign in link and not sign out if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                }
            }
        });

        const signInBtn = screen.getByText(/sign in/i);
        expect(signInBtn).toBeInTheDocument();
        const signOutElem = screen.queryByText(/sign out/i);
        expect(signOutElem).toBeNull();
    });

    it('should render sign out and not sign in if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {
                        createdAt: '21/02/2023',
                        displayName: 'John Doe',
                        email: 'john@gmail.com',
                    }
                }
            }
        });

        const signOutElem = screen.getByText(/sign out/i);
        expect(signOutElem).toBeInTheDocument();
        const signInElem = screen.queryByText(/sign in/i);
        expect(signInElem).toBeNull();
    });

    it('should not render cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: [],
                }
            }
        });

        const cartDropdown = screen.queryByText('Your cart is empty');
        expect(cartDropdown).toBeNull();
    });

    it('should render cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                }
            }
        });

        const cartDropdown = screen.getByText('Your cart is empty');
        expect(cartDropdown).toBeInTheDocument();
    });
});
