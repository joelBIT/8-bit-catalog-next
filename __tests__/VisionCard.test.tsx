import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { VisionCard } from '@/app/_components/home';

describe('VisionCard', () => {
    it('should render heading and text in VisionCard', () => {
        render(<VisionCard heading='Vision' text='This is the vision of the project'  />)
  
        const heading = screen.getByRole('heading', {name: 'Vision'});
        expect(heading).toBeInTheDocument();
        const text = screen.getByRole('paragraph');
        expect(text).toHaveTextContent('This is the vision of the project');
    });
});