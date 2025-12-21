import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SuggestionList } from '@/app/_components/home';

const mockSetGameTitle = jest.fn();
const optionList = ["Mega Man 2", "Battletoads", "Castlevania"];

describe('Suggestion List', () => {

    describe('Render', () => {
        it('should render the supplied game titles', () => {
            render(<SuggestionList options={optionList} setGameTitle={mockSetGameTitle} />)
  
            const options = screen.getAllByRole('option', {hidden: true});
            expect(options[0]).toHaveAttribute('value', "Mega Man 2");
            expect(options[1]).toHaveAttribute('value', "Battletoads");
            expect(options[2]).toHaveAttribute('value', "Castlevania");
        });

        it('should render a button', () => {
            render(<SuggestionList options={optionList} setGameTitle={mockSetGameTitle} />)
  
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });
    });

    describe('Behavior', () => {
        it('should call setGameTitle when button is clicked', () => {
            render(<SuggestionList options={optionList} setGameTitle={mockSetGameTitle} />)
  
            const button = screen.getByRole('button');
            fireEvent(button, new MouseEvent('click', {bubbles: true, cancelable: true}));
            expect(mockSetGameTitle).toHaveBeenCalledTimes(1)
        });

        it('should call setGameTitle with the selected game title as argument', () => {
            render(<SuggestionList options={optionList} setGameTitle={mockSetGameTitle} />)
  
            const input = screen.getByPlaceholderText('Game Title');
            fireEvent.change(input, {target: {value: optionList[1]}});
            const button = screen.getByRole('button');
            fireEvent(button, new MouseEvent('click', {bubbles: true, cancelable: true}));
            expect(mockSetGameTitle.mock.calls[0][0]).toBe(optionList[1]);
        });
    });
});