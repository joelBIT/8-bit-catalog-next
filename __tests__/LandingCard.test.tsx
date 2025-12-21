import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LandingCard } from '@/app/_components/home';

describe('LandingCard', () => {
    it('renders heading and text in LandingCard', () => {
        render(<LandingCard heading='Vision' text='This is the vision of the project'  />)
  
        const heading = screen.getByRole('heading', {name: 'Vision'});
        expect(heading).toBeInTheDocument();
        const text = screen.getByRole('paragraph');
        expect(text).toHaveTextContent('This is the vision of the project');
    });
});