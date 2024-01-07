import React from 'react';
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
        render(<SignInForm />);

        const emailElem = screen.getByTestId('email-input');
        const passwordElem = screen.getByTestId('password-input');
        const submitBtn = screen.getByTestId('password-signin-button');

        fireEvent.click(submitBtn);
        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalled();
        expect(signInAuthUserWithEmailAndPassword).toHaveBeenCalledWith('', '')

        act(async () => {
            await userEvent.click(emailElem);
            await userEvent.clear(emailElem);
            await userEvent.type(emailElem, 'test@example.com');
        });

        await waitFor(() => {
            expect(emailElem.value).toBe('test@example.com');
        });

        act(async () => {
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

    it('should update the state when typing in the inputs and reset the state when we submit the form', async () => {
        const setState = jest.fn();
        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(initState => [initState, setState]);

        render(<SignInForm />);

        const emailElem = screen.getByTestId('email-input');
        const passwordElem = screen.getByTestId('password-input');
        const submitBtn = screen.getByTestId('password-signin-button');
        
        act(() => {
            fireEvent.change(emailElem, { target: { name: 'email', value: 'test@example.com' } });

            fireEvent.change(passwordElem, { target: { name: 'password', value: 'testPass' } });
        });

        await waitFor(() => {
            expect(setState).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: ''
            });

            expect(setState).toHaveBeenCalledWith({
                email: '',
                password: 'testPass'
            });
        });

        act(() => {
            fireEvent.click(submitBtn);
        });

        await waitFor(() => {
            expect(setState).toHaveBeenCalled();
            expect(setState).toHaveBeenCalledWith({
                email: '',
                password: ''
            });
        });
    });
});