import { screen, render, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SignInForm from '../sign-in-form.component';
import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase.utils';

jest.mock('../../../utils/firebase/firebase.utils');

describe('Sign in form tests', () => {
    it('should render empty sign in form', () => {
        render(<SignInForm />);

        const emailElem = screen.getByTestId('email-input');
        const passwordElem = screen.getByTestId('password-input');
        const submitBtn = screen.getByTestId('password-signin-button');

        expect(emailElem.value).toBe('');
        expect(passwordElem.value).toBe('');
        expect(submitBtn).toBeInTheDocument();
    });

    it('should test regular sign in flow', async () => {
        act(() => {
            render(<SignInForm />);
        });

        const emailElem = screen.getByTestId('email-input');
        const passwordElem = screen.getByTestId('password-input');
        const submitBtn = screen.getByTestId('password-signin-button');

        fireEvent.click(submitBtn);
        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalled();
        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalledWith('', '')

        await act(async () => {
            await userEvent.click(emailElem);
            await userEvent.clear(emailElem);
            await userEvent.type(emailElem, 'test@example.com');
        });

        await waitFor(() => {
            expect(emailElem.value).toBe('test@example.com');
        });

        await act(async () => {
            await userEvent.click(passwordElem);
            await userEvent.clear(passwordElem);
            await userEvent.type(passwordElem, 'testpassword');
        });

        await waitFor(() => {
            expect(passwordElem.value).toBe('testpassword');
        });

        act(() => {
            fireEvent.click(submitBtn);
        });

        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalled();
        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });
});