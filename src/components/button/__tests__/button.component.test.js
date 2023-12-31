import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';
import 'jest-styled-components';

describe('button tests', () => {
    it('should render base button when nothing is passed', () => {
        render(<Button>Test</Button>);
        // const buttonElement = screen.getByText(/test/i);
        // expect(buttonElement).toHaveStyleRule('background-color', 'black');

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyleRule('background-color', 'black');
    });

    it('should render google button when passed google type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

        const googleElement = screen.getByRole('button');
        expect(googleElement).toHaveStyleRule('background-color', '#4285f4');
    });

    it('should render inverted button when passed inverted type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

        const invertedElement = screen.getByRole('button');
        expect(invertedElement).toHaveStyleRule('background-color', 'white');
    });

    it('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true} />);

        const btnElem = screen.getByRole('button');
        expect(btnElem).toBeDisabled();
    });
});
