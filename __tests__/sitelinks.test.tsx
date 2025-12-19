import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { URL_ARCHITECTURE_PAGE, URL_CONTACT_PAGE, URL_FAQ_PAGE, URL_RESOURCES_PAGE } from '@/app/_utils/utils';
import { SiteLinks } from '@/app/_components/footer';

describe('Site Links', () => {
    it('renders site links in footer and check if the links are in ascending order', () => {
        render(<SiteLinks />)
  
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', URL_ARCHITECTURE_PAGE);
        expect(links[1]).toHaveAttribute('href', URL_CONTACT_PAGE);
        expect(links[2]).toHaveAttribute('href', URL_FAQ_PAGE);
        expect(links[3]).toHaveAttribute('href', URL_RESOURCES_PAGE);
    })
});