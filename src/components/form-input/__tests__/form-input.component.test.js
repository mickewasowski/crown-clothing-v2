import { screen, render, fireEvent, waitFor, act } from '@testing-library/react';
import FormInput from '../form-input.component';

describe('Form input tests', () => {
    it('should render initial form input state', async () => {
        const mockChange = jest.fn();
        render(<FormInput 
                label='First name'
                type='text'
                required
                name='first-name'
                value=''
                onChange={mockChange}
            />);

        const inputElem = screen.getByTestId('form-input');
        expect(inputElem.value).toEqual('');

        const labelInput = screen.getByTestId('form-label');
        expect(labelInput.innerHTML).toEqual('First name');

        await fireEvent.change(inputElem, { target: { value: 'some text' } });
        expect(mockChange).toHaveBeenCalled();
    });

    it('should change the input value', async () => {
        render(<FormInput 
            label='First name'
            type='text'
            required
            name='first-name'
        />);

        const inputElem = screen.getByTestId('form-input');
        expect(inputElem.value).toEqual('');

        await fireEvent.change(inputElem, { target: { value: 'some text' } });

        await waitFor(() => {
            expect(inputElem.value).toBe('some text');
        })
    });
});